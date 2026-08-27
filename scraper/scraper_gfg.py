"""
PlacementPrep Radar - GeeksforGeeks Interview Experience Scraper
Extracts structured company, role, year, and round-by-round segments from GFG interview posts.
"""

import re
from typing import Any, Dict, List, Optional
from bs4 import BeautifulSoup
import httpx


DEFAULT_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def infer_round_type(title_or_text: str) -> str:
    """Classifies the round type based on heading or content."""
    t = title_or_text.lower()
    if any(k in t for k in ["online assessment", "oa", "coding test", "written test", "hackerrank", "codility"]):
        return "Online Assessment"
    if any(k in t for k in ["system design", "lld", "hld", "low level design", "high level design", "architecture"]):
        return "System Design"
    if any(k in t for k in ["hr", "human resource", "fitment", "cultural fit", "behavioral", "managerial", "leadership"]):
        return "HR"
    if any(k in t for k in ["technical", "tech", "coding round", "dsa", "problem solving", "algorithm"]):
        return "Technical"
    return "Technical"


def extract_metadata_from_title(title: str) -> Dict[str, Any]:
    """
    Parses typical GFG titles like:
    'Google Interview Experience for SDE-1 (On-Campus 2024)'
    'Amazon Interview Experience for SDE Intern | 2023'
    """
    meta: Dict[str, Any] = {
        "company": None,
        "role": "Software Development Engineer",
        "year": 2024,
    }

    # Extract year (4 digits: 2018-2026)
    year_match = re.search(r"\b(201[8-9]|202[0-6])\b", title)
    if year_match:
        meta["year"] = int(year_match.group(1))

    # Extract company (e.g. before 'Interview Experience')
    company_match = re.search(r"^(.*?)(?:\s+Interview Experience|\s+On-Campus|\s+Off-Campus)", title, re.IGNORECASE)
    if company_match:
        meta["company"] = company_match.group(1).strip()

    # Extract role (e.g., 'for SDE-1', 'for SDE Intern', 'for Software Engineer')
    role_match = re.search(r"for\s+([^|(\n]+)", title, re.IGNORECASE)
    if role_match:
        meta["role"] = role_match.group(1).strip()

    return meta


def parse_gfg_html(html_text: str, source_url: str) -> Dict[str, Any]:
    """
    Parses raw HTML from a GeeksforGeeks interview experience page.
    Returns structured dict with company, role, year, raw_text, and list of rounds.
    """
    soup = BeautifulSoup(html_text, "html.parser")

    # 1. Extract Title
    title_tag = soup.find("h1") or soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else "Interview Experience"
    meta = extract_metadata_from_title(title)

    # 2. Extract Article Body
    # GFG typically uses <article>, <div class="article-content">, <div class="text">, or <div class="content">
    content_container = (
        soup.find("article")
        or soup.find("div", class_=re.compile(r"article[_-]content|entry[_-]content|text", re.I))
        or soup.find("div", id="content")
        or soup.body
    )

    if not content_container:
        return {
            "company": meta["company"] or "Unknown",
            "role": meta["role"],
            "year": meta["year"],
            "source_url": source_url,
            "source_platform": "GeeksforGeeks",
            "raw_text": title,
            "rounds": [],
        }

    # Clean unwanted tags
    for tag in content_container(["script", "style", "nav", "aside", "footer", "form", "button"]):
        tag.decompose()

    full_text = content_container.get_text(separator="\n", strip=True)

    # 3. Split content into rounds
    # Typical patterns: "Round 1:", "Round 1 (Coding):", "Technical Round 1:", "Round 2 - Technical"
    round_split_regex = re.compile(
        r"(?:^|\n)(?=(?:Round\s*\d+|Technical\s*Round\s*\d*|HR\s*Round|Online\s*Assessment|Coding\s*Round|OA\s*Round|System\s*Design\s*Round)[:\-\s])",
        re.IGNORECASE,
    )

    chunks = round_split_regex.split(full_text)
    rounds: List[Dict[str, Any]] = []

    round_idx = 1
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk or len(chunk) < 20:
            continue

        # Detect round heading
        first_line = chunk.split("\n")[0]
        if re.search(r"Round|Assessment|Test|OA|Interview", first_line, re.IGNORECASE):
            round_type = infer_round_type(first_line)
            rounds.append({
                "round_number": round_idx,
                "round_type": round_type,
                "round_text": chunk,
            })
            round_idx += 1
        elif round_idx == 1 and len(rounds) == 0:
            # Introduction or OA description
            rounds.append({
                "round_number": 1,
                "round_type": infer_round_type(chunk),
                "round_text": chunk,
            })
            round_idx += 1

    # Fallback if no specific round delimiters were matched
    if not rounds and full_text:
        rounds.append({
            "round_number": 1,
            "round_type": "Technical",
            "round_text": full_text[:4000],
        })

    return {
        "company": meta["company"] or "Tech Company",
        "role": meta["role"],
        "year": meta["year"],
        "source_url": source_url,
        "source_platform": "GeeksforGeeks",
        "raw_text": full_text[:8000],
        "rounds": rounds,
    }


async def fetch_and_parse_gfg(url: str, override_company: Optional[str] = None) -> Dict[str, Any]:
    """Fetches a GFG URL asynchronously and parses its interview rounds."""
    async with httpx.AsyncClient(headers=DEFAULT_HEADERS, timeout=20.0, follow_redirects=True) as client:
        response = await client.get(url)
        response.raise_for_status()
        data = parse_gfg_html(response.text, url)
        if override_company:
            data["company"] = override_company
        return data


def fetch_and_parse_gfg_sync(url: str, override_company: Optional[str] = None) -> Dict[str, Any]:
    """Synchronous version for CLI execution."""
    with httpx.Client(headers=DEFAULT_HEADERS, timeout=20.0, follow_redirects=True) as client:
        response = client.get(url)
        response.raise_for_status()
        data = parse_gfg_html(response.text, url)
        if override_company:
            data["company"] = override_company
        return data
