"""
PlacementPrep Radar - AmbitionBox Interview Experience Scraper
Extracts structured interview rounds, questions, and difficulty ratings from AmbitionBox interview pages.
"""

import re
from typing import Any, Dict, List, Optional
from bs4 import BeautifulSoup
import httpx

DEFAULT_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.google.com/",
}


def infer_round_type(title_or_text: str) -> str:
    """Classifies round type from AmbitionBox review text."""
    t = title_or_text.lower()
    if any(k in t for k in ["online assessment", "oa", "aptitude", "written test", "hackerrank"]):
        return "Online Assessment"
    if any(k in t for k in ["system design", "lld", "hld", "architecture"]):
        return "System Design"
    if any(k in t for k in ["hr", "behavioral", "cultural", "managerial", "fitment"]):
        return "HR"
    if any(k in t for k in ["lab", "hands-on", "practical", "breadboard"]):
        return "Lab / Practical"
    return "Technical"


def parse_ambitionbox_html(html_text: str, source_url: str) -> Dict[str, Any]:
    """
    Parses AmbitionBox interview HTML.
    Extracts company name, role, year, and multi-round interview details.
    """
    soup = BeautifulSoup(html_text, "html.parser")

    # 1. Company and Role Extraction
    title_tag = soup.find("h1") or soup.find("title")
    title_text = title_tag.get_text(strip=True) if title_tag else "AmbitionBox Interview Review"

    company = "Tech Company"
    role = "Software Engineer"
    year = 2024

    # Extract year (4-digit: 2020-2026)
    year_match = re.search(r"\b(202[0-6])\b", title_text)
    if year_match:
        year = int(year_match.group(1))

    # Pattern: "Google Interview Questions for Software Engineer"
    comp_match = re.search(r"^([A-Za-z0-9\s]+?)\s+(?:Interview\s+Questions|Interview\s+Experience)", title_text, re.IGNORECASE)
    if comp_match:
        company = comp_match.group(1).strip()

    role_match = re.search(r"for\s+([^|(\n]+)", title_text, re.IGNORECASE)
    if role_match:
        role = role_match.group(1).strip()

    # 2. Extract Rounds & Interview Text
    # AmbitionBox often divides interview into Question blocks or Process stages
    content_blocks = soup.find_all("div", class_=re.compile(r"interview-desc|review-body|question-card|round-info", re.I))
    
    rounds: List[Dict[str, Any]] = []

    if content_blocks:
        for idx, block in enumerate(content_blocks, 1):
            text = block.get_text(separator="\n", strip=True)
            if len(text) > 20:
                rounds.append({
                    "round_number": idx,
                    "round_type": infer_round_type(text),
                    "round_text": text,
                })
    else:
        # Fallback: Extract all paragraph content
        body_text = soup.get_text(separator="\n", strip=True)
        # Attempt to split on "Round 1", "Round 2", "Technical Round"
        chunks = re.split(r"(?:^|\n)(?=(?:Round\s*\d+|Technical\s*Round|HR\s*Round|Assessment)[:\-\s])", body_text, flags=re.IGNORECASE)
        valid_chunks = [c.strip() for c in chunks if len(c.strip()) > 30][:5]
        
        for idx, chunk in enumerate(valid_chunks, 1):
            rounds.append({
                "round_number": idx,
                "round_type": infer_round_type(chunk),
                "round_text": chunk[:2000],
            })

    if not rounds:
        rounds.append({
            "round_number": 1,
            "round_type": "Technical",
            "round_text": title_text,
        })

    return {
        "company": company,
        "role": role,
        "year": year,
        "source_url": source_url,
        "source_platform": "AmbitionBox",
        "raw_text": f"AmbitionBox interview experience for {company} - {role}",
        "rounds": rounds,
    }


async def fetch_and_parse_ambitionbox(url: str, override_company: Optional[str] = None) -> Dict[str, Any]:
    """Asynchronously scrapes an AmbitionBox interview page."""
    async with httpx.AsyncClient(headers=DEFAULT_HEADERS, timeout=20.0, follow_redirects=True) as client:
        response = await client.get(url)
        response.raise_for_status()
        data = parse_ambitionbox_html(response.text, url)
        if override_company:
            data["company"] = override_company
        return data


def fetch_and_parse_ambitionbox_sync(url: str, override_company: Optional[str] = None) -> Dict[str, Any]:
    """Synchronous version for CLI execution."""
    with httpx.Client(headers=DEFAULT_HEADERS, timeout=20.0, follow_redirects=True) as client:
        response = client.get(url)
        response.raise_for_status()
        data = parse_ambitionbox_html(response.text, url)
        if override_company:
            data["company"] = override_company
        return data
