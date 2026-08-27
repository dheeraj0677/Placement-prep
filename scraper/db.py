"""
PlacementPrep Radar - Supabase Upsert Database Handler
Handles inserting/upserting companies, experiences, rounds, and classified topic tags.
Deduplicates posts automatically using unique source_url.
"""

import os
from typing import Any, Dict, List, Optional
from dotenv import load_dotenv
from supabase import Client, create_client
from classifier import classify_round

load_dotenv()


def get_supabase_client() -> Optional[Client]:
    """Initializes and returns the Supabase client using env credentials."""
    url = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    # In python scraper, preferably use SERVICE_ROLE_KEY to bypass RLS, fallback to ANON_KEY
    key = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

    if not url or not key or "placeholder-project" in url:
        return None

    try:
        return create_client(url, key)
    except Exception as e:
        print(f"[Supabase Init Error] {e}")
        return None


def get_or_create_company(supabase: Client, company_name: str, industry: Optional[str] = "Technology") -> str:
    """
    Finds or creates a company by name and returns its UUID.
    """
    cleaned_name = company_name.strip()
    # Check if company exists
    res = supabase.table("companies").select("id").ilike("name", cleaned_name).limit(1).execute()
    if res.data and len(res.data) > 0:
        return res.data[0]["id"]

    # Insert new company
    insert_res = supabase.table("companies").insert({
        "name": cleaned_name,
        "industry": industry or "Technology",
        "logo_url": f"https://logo.clearbit.com/{cleaned_name.lower().replace(' ', '')}.com"
    }).execute()

    if insert_res.data and len(insert_res.data) > 0:
        return insert_res.data[0]["id"]
    
    # In case of race condition / unique constraint
    res = supabase.table("companies").select("id").ilike("name", cleaned_name).limit(1).execute()
    return res.data[0]["id"]


def upsert_interview_experience(
    supabase: Client,
    company_name: str,
    role: str,
    year: int,
    source_url: str,
    source_platform: str,
    raw_text: str,
    rounds: List[Dict[str, Any]],
    industry: Optional[str] = "Technology"
) -> Dict[str, Any]:
    """
    Upserts an entire interview experience:
    1. Gets/creates company_id
    2. Upserts experience record (keyed on source_url)
    3. Deletes existing rounds for that experience to ensure clean update
    4. Inserts new rounds
    5. Runs keyword classifier on each round and inserts round_tags
    """
    company_id = get_or_create_company(supabase, company_name, industry)

    # 1. Check if experience already exists
    existing_exp = supabase.table("experiences").select("id").eq("source_url", source_url).limit(1).execute()

    if existing_exp.data and len(existing_exp.data) > 0:
        experience_id = existing_exp.data[0]["id"]
        # Update experience details
        supabase.table("experiences").update({
            "company_id": company_id,
            "role": role,
            "year": year,
            "source_platform": source_platform,
            "raw_text": raw_text,
        }).eq("id", experience_id).execute()
        # Clean existing rounds for re-tagging
        supabase.table("experience_rounds").delete().eq("experience_id", experience_id).execute()
    else:
        # Insert new experience
        ins_exp = supabase.table("experiences").insert({
            "company_id": company_id,
            "role": role,
            "year": year,
            "source_platform": source_platform,
            "source_url": source_url,
            "raw_text": raw_text,
        }).execute()
        experience_id = ins_exp.data[0]["id"]

    # 2. Insert rounds and classify tags
    inserted_tags_count = 0
    for r in rounds:
        round_text = r.get("round_text", "")
        round_number = r.get("round_number", 1)
        round_type = r.get("round_type", "Technical")

        ins_round = supabase.table("experience_rounds").insert({
            "experience_id": experience_id,
            "round_number": round_number,
            "round_type": round_type,
            "round_text": round_text,
        }).execute()

        if ins_round.data and len(ins_round.data) > 0:
            round_id = ins_round.data[0]["id"]
            # Classify tags with rule-based topic classifier
            tags = classify_round(round_text)
            for tag in tags:
                supabase.table("round_tags").insert({
                    "round_id": round_id,
                    "tag": tag,
                }).execute()
                inserted_tags_count += 1

    return {
        "status": "success",
        "experience_id": experience_id,
        "company": company_name,
        "rounds_count": len(rounds),
        "tags_count": inserted_tags_count,
    }
