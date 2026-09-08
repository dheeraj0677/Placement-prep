"""
PlacementPrep Radar - Naukri Code360 (Coding Ninjas) Interview Experience Scraper
Extracts structured interview rounds and questions from Code360 placement archives.
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
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.naukri.com/code360",
}


def infer_round_type(title_or_text: str) -> str:
    """Classifies round type from Code360 experience content."""
    t = title_or_text.lower()
    if any(k in t for k in ["online test", "oa", "coding test", "written", "aptitude", "mcq"]):
        return "Online Assessment"
    if any(k in t for k in ["system design", "lld", "hld", "machine coding"]):
        return "System Design"
    if any(k in t for k in ["hr", "behavioral", "managerial", "fitment", "cultural"]):
        return "HR"
    if any(k in t for k in ["lab", "practical", "simulation"]):
        return "Lab / Practical"
    return "Technical"


def parse_code360_html(html_text: str, source_url: str) -> Dict[str, Any]:
    """
    Parses Code360 interview experience HTML.
    Extracts company, role, year, and structured rounds.
    """
    soup = BeautifulSoup(html_text, "html.parser")

    # 1. Extract Title and Metadata
    title_tag = soup.find("h1") or soup.find("title")
    title_text = title_tag.get_text(strip=True) if title_tag else "Code360 Interview Experience"

    company = "Tech Company"
    role = "Software Development Engineer"
    year = 2024

    # Extract year
    year_match = re.search(r"\b(202[0-6])\b", title_text)
    if year_match:
        year = int(year_match.group(1))

    # Pattern: "Amazon Interview Experience for SDE Intern"
    comp_match = re.search(r"^([A-Za-z0-9\s]+?)\s+(?:Interview\s+Experience|Interview\s+Process)", title_text, re.IGNORECASE)
    if comp_match:
        company = comp_match.group(1).strip()

    role_match = re.search(r"for\s+([^|(\n]+)", title_text, re.IGNORECASE)
    if role_match:
        role = role_match.group(1).strip()

    # 2. Extract Round Details
    # Code360 often has round accordions or headings (<h3>Round 1: ...</h3>)
    rounds: List[Dict[str, Any]] = []

    round_headers = soup.find_all(re.compile(r"h[2-4]"), string=re.compile(r"Round|Assessment|Test", re.I))
    
    if round_headers:
        for idx, h in enumerate(round_headers, 1):
            heading = h.get_text(strip=True)
            # Find following content sibling
            content = []
            curr = h.find_next_sibling()
            while curr and not re.match(r"h[2-4]", curr.name, re.I):
                text = curr.get_text(strip=True)
                if text:
                    content.append(text)
                curr = curr.find_next_sibling()
            
            round_text = "\n".join(content) if content else heading
            rounds.append({
                "round_number": idx,
                "round_type": infer_round_type(heading + " " + round_text),
                "round_text": round_text[:3000],
            })
    else:
        # Fallback text chunking
        body_text = soup.get_text(separator="\n", strip=True)
        chunks = re.split(r"(?:^|\n)(?=(?:Round\s*\d+|Technical\s*Round|HR\s*Round|Coding\s*Round)[:\-\s])", body_text, flags=re.IGNORECASE)
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
        "source_platform": "Naukri Code360",
        "raw_text": f"Code360 interview experience for {company} - {role}",
        "rounds": rounds,
    }


async def fetch_and_parse_code360(url: str, override_company: Optional[str] = None) -> Dict[str, Any]:
    """Asynchronously scrapes a Naukri Code360 interview experience page."""
    async with httpx.AsyncClient(headers=DEFAULT_HEADERS, timeout=20.0, follow_redirects=True) as client:
        response = await client.get(url)
        response.raise_for_status()
        data = parse_code360_html(response.text, url)
        if override_company:
            data["company"] = override_company
        return data


def fetch_and_parse_code360_sync(url: str, override_company: Optional[str] = None) -> Dict[str, Any]:
    """Synchronous version for CLI execution."""
    with httpx.Client(headers=DEFAULT_HEADERS, timeout=20.0, follow_redirects=True) as client:
        response = client.get(url)
        response.raise_for_status()
        data = parse_code360_html(response.text, url)
        if override_company:
            data["company"] = override_company
        return data
