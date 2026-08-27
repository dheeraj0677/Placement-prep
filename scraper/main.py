"""
PlacementPrep Radar - Scraper & Seeding CLI
Entrypoint for scraping single interview posts, batch processing CSV seeds,
and running topic classifications.

Usage:
  # Seed from CSV file into Supabase:
  python main.py --seed-csv seed_data.csv

  # Scrape a specific GFG URL:
  python main.py --company "Google" --url "https://www.geeksforgeeks.org/..."

  # Preview classification results in terminal without database:
  python main.py --preview --seed-csv seed_data.csv
"""

import argparse
import csv
import os
import sys
from collections import defaultdict
from typing import Any, Dict, List

# Force stdout encoding to utf-8 if needed on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

from classifier import classify_round
from scraper_gfg import fetch_and_parse_gfg_sync
from db import get_supabase_client, upsert_interview_experience


def process_csv_seed(csv_path: str, preview_only: bool = False):
    """
    Reads a CSV file of interview experiences and rounds,
    groups by experience (source_url), classifies topic tags,
    and inserts into Supabase or prints a preview.
    """
    if not os.path.exists(csv_path):
        print(f"[ERROR] CSV file not found at {csv_path}")
        sys.exit(1)

    print(f"\n[*] Reading seed data from: {csv_path}")

    experiences_by_url: Dict[str, Dict[str, Any]] = {}

    with open(csv_path, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = row.get("source_url", "").strip()
            if not url:
                continue

            if url not in experiences_by_url:
                experiences_by_url[url] = {
                    "company": row.get("company", "Tech Company").strip(),
                    "industry": row.get("industry", "Technology").strip(),
                    "role": row.get("role", "Software Engineer").strip(),
                    "year": int(row.get("year", 2024)),
                    "source_platform": row.get("source_platform", "Curated Seed").strip(),
                    "source_url": url,
                    "raw_text": row.get("round_text", ""),
                    "rounds": [],
                }

            round_num = int(row.get("round_number", len(experiences_by_url[url]["rounds"]) + 1))
            round_type = row.get("round_type", "Technical").strip()
            round_text = row.get("round_text", "").strip()

            experiences_by_url[url]["rounds"].append({
                "round_number": round_num,
                "round_type": round_type,
                "round_text": round_text,
            })

    total_exps = len(experiences_by_url)
    total_rounds = sum(len(exp["rounds"]) for exp in experiences_by_url.values())
    print(f"[*] Found {total_exps} distinct interview experiences with {total_rounds} total rounds.\n")

    if preview_only:
        print("[*] RUNNING PREVIEW MODE (Topic Classification Summary)")
        print("=" * 70)
        tag_counts = defaultdict(int)
        company_counts = defaultdict(int)

        for url, exp in experiences_by_url.items():
            company_counts[exp["company"]] += 1
            print(f"[{exp['company']}] {exp['role']} ({exp['year']}) - {len(exp['rounds'])} rounds")
            for r in exp["rounds"]:
                tags = classify_round(r["round_text"])
                for t in tags:
                    tag_counts[t] += 1
                print(f"   +- Round {r['round_number']} ({r['round_type']}): Tags -> {tags}")
            print()

        print("=" * 70)
        print("[*] TOPIC FREQUENCY BREAKDOWN:")
        total_tag_instances = sum(tag_counts.values()) or 1
        for tag, count in sorted(tag_counts.items(), key=lambda x: x[1], reverse=True):
            pct = (count / total_tag_instances) * 100
            bar = "#" * int(pct // 3)
            print(f"  {tag:<18} : {count:>3} mentions ({pct:>5.1f}%) {bar}")
        print("=" * 70)
        return

    # Check Supabase connection
    supabase = get_supabase_client()
    if not supabase:
        print("[!] Supabase credentials not configured in scraper/.env or .env.local")
        print("    Running in preview mode instead...\n")
        process_csv_seed(csv_path, preview_only=True)
        return

    print("[*] Upserting experiences into Supabase...")
    success_count = 0
    total_tags_count = 0

    for url, exp in experiences_by_url.items():
        try:
            result = upsert_interview_experience(
                supabase=supabase,
                company_name=exp["company"],
                role=exp["role"],
                year=exp["year"],
                source_url=exp["source_url"],
                source_platform=exp["source_platform"],
                raw_text=exp["raw_text"],
                rounds=exp["rounds"],
                industry=exp["industry"],
            )
            success_count += 1
            total_tags_count += result.get("tags_count", 0)
            print(f"  [+] [{exp['company']}] {exp['role']} -> {result['rounds_count']} rounds, {result['tags_count']} tags")
        except Exception as e:
            print(f"  [-] Error inserting [{exp['company']}]: {e}")

    print(f"\n[OK] Done! Successfully seeded {success_count}/{total_exps} experiences ({total_tags_count} tags generated).")


def process_single_url(url: str, company: str, role: str = "Software Engineer", year: int = 2024, preview_only: bool = False):
    """Fetches, parses, classifies, and inserts a single URL."""
    print(f"\n[*] Fetching & parsing URL: {url}")
    try:
        data = fetch_and_parse_gfg_sync(url, override_company=company)
    except Exception as e:
        print(f"[ERROR] Fetching URL failed: {e}")
        return

    if role:
        data["role"] = role
    if year:
        data["year"] = year

    print(f"Company: {data['company']}")
    print(f"Role: {data['role']} ({data['year']})")
    print(f"Detected Rounds: {len(data['rounds'])}")

    for r in data["rounds"]:
        tags = classify_round(r["round_text"])
        print(f"  +- Round {r['round_number']} ({r['round_type']}): Tags -> {tags}")

    if preview_only:
        return

    supabase = get_supabase_client()
    if not supabase:
        print("\n[!] No active Supabase client configured. Results previewed above.")
        return

    res = upsert_interview_experience(
        supabase=supabase,
        company_name=data["company"],
        role=data["role"],
        year=data["year"],
        source_url=data["source_url"],
        source_platform=data["source_platform"],
        raw_text=data["raw_text"],
        rounds=data["rounds"],
    )
    print(f"\n[OK] Successfully saved to Supabase! (Experience ID: {res['experience_id']})")


def main():
    parser = argparse.ArgumentParser(description="PlacementPrep Radar Scraper & Seeding Tool")
    parser.add_argument("--seed-csv", type=str, help="Path to CSV file with seed data")
    parser.add_argument("--url", type=str, help="GeeksforGeeks interview experience URL to scrape")
    parser.add_argument("--company", type=str, default="Google", help="Company name (for single URL scrape)")
    parser.add_argument("--role", type=str, default="Software Engineer", help="Role name")
    parser.add_argument("--year", type=int, default=2024, help="Interview year")
    parser.add_argument("--preview", action="store_true", help="Preview classifications without saving to database")

    args = parser.parse_args()

    if args.seed_csv:
        process_csv_seed(args.seed_csv, preview_only=args.preview)
    elif args.url:
        process_single_url(args.url, company=args.company, role=args.role, year=args.year, preview_only=args.preview)
    else:
        default_csv = os.path.join(os.path.dirname(__file__), "seed_data.csv")
        if os.path.exists(default_csv):
            print("No arguments provided. Running classification preview on seed_data.csv:")
            process_csv_seed(default_csv, preview_only=True)
        else:
            parser.print_help()


if __name__ == "__main__":
    main()
