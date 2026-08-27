# PlacementPrep Radar — Python Data Pipeline & Scraper

This microservice ingests interview experiences from GeeksforGeeks and curated seed datasets, parses multi-round interview structures, runs rule-based topic classification, and upserts the structured insights directly into Supabase.

---

## 🛠️ Quick Setup

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment**:
   Copy `.env.example` to `.env` (or set credentials in the root `.env.local`):
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_KEY=your-service-role-secret
   ```

---

## 🚀 Usage

### 1. Preview topic classifier in terminal (no DB required)
```bash
python main.py --preview --seed-csv seed_data.csv
```

### 2. Seed database from CSV
```bash
python main.py --seed-csv seed_data.csv
```

### 3. Scrape a specific GeeksforGeeks interview post
```bash
python main.py --company "Google" --url "https://www.geeksforgeeks.org/google-interview-experience-sde1-2024"
```

---

## 🧠 Architecture Highlights
- **Deterministic Keyword Classifier**: Instant, 100% explainable topic tagging without ML latency or hallucinations (`classifier.py`).
- **Deduplication**: Keyed on `source_url` with PostgreSQL foreign key cascades.
- **Round Segmentation**: Extracts round numbers, round types (Online Assessment, Technical, System Design, HR), and assigns granular topic tags to each round.
