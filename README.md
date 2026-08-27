# 🎯 PlacementPrep Radar

> A full-stack platform that aggregates real interview experiences per tech company and turns them into structured, trend-based preparation insights — not just a raw feed of posts.

---

## ⚡ Overview & Key Features

- **Company Trend Radar**: Live topic breakdown % (DP, Graphs, Trees, System Design, etc.) and round-type breakdown (OA, Technical, HR) using Recharts.
- **Year-over-Year Shift Analysis**: Detects topics gaining traction in recent hiring cycles.
- **Multi-Round Experience Segmenter**: Clean breakdowns of real interviews with round numbers, round types, and tagged topics.
- **1-Click Personalized Checklist**: Generates prioritized preparation checklists based on a target company's top tested concepts with completion tracking.
- **Python Ingestion Pipeline**: Asynchronous scraper for GeeksforGeeks and LeetCode Discuss with rule-based keyword classifier and deduplication by `source_url`.
- **Supabase Integration**: PostgreSQL with Row-Level Security (RLS) and cookie-based authentication with Google OAuth via `@supabase/ssr`.

---

## 🏗️ System Architecture

```
                        ┌─────────────────────────────┐
                        │   Data Sources (public)      │
                        │  - GeeksforGeeks interview   │
                        │    experience posts          │
                        │  - LeetCode Discuss          │
                        │  - Manually curated CSV seed │
                        └──────────────┬───────────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────┐
                    │   Python Scraper Microservice     │
                    │   (httpx + BeautifulSoup)         │
                    │                                   │
                    │  1. Fetch listing pages           │
                    │  2. Parse: company, role, year,   │
                    │     round-by-round text           │
                    │  3. Run keyword classifier         │
                    │     (rule-based deterministic)    │
                    │  4. Upsert into Supabase           │
                    │     (dedupe by source_url)         │
                    └──────────────┬────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────────┐
                    │        Supabase (Postgres)        │
                    │  - companies                       │
                    │  - experiences                     │
                    │  - experience_rounds                │
                    │  - round_tags                       │
                    │  - users (Supabase Auth)            │
                    │  - user_checklists                  │
                    │  Row-Level Security on all tables   │
                    └──────────────┬────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────────┐
                    │   Next.js 14 (App Router) API     │
                    │   Route Handlers                  │
                    │  - /api/companies                 │
                    │  - /api/companies/[id]/trends      │
                    │  - /api/checklist                  │
                    └──────────────┬────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────────┐
                    │     Next.js Frontend (Tailwind)   │
                    │  - / (Landing + Hero + Metrics)   │
                    │  - /companies (Browse + Search)   │
                    │  - /companies/[id] (Radar Charts) │
                    │  - /checklist (Personalized Prep) │
                    │  - /login (Supabase Google OAuth) │
                    └────────────────────────────────────┘
```

---

## 🚀 Getting Started

### 1. Frontend & API (Next.js 14)

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

### 2. Supabase Setup (When Ready to Connect)

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** -> **New Query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and run it.
3. In **Project Settings** -> **API**, copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (for scraper)
4. Add these into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
5. *(Optional)* In **Authentication** -> **Providers**, enable **Google** and add `http://localhost:3000/auth/callback` to the redirect URLs.

---

### 3. Python Scraper & Seeder Pipeline

```bash
cd scraper

# Install Python requirements
pip install -r requirements.txt

# Preview topic classification on seed data (no database required):
python main.py --preview --seed-csv seed_data.csv

# Seed all 12 companies & 70+ rounds into Supabase:
# (set SUPABASE_URL and SUPABASE_SERVICE_KEY in scraper/.env)
python main.py --seed-csv seed_data.csv

# Scrape a specific GeeksforGeeks interview experience post:
python main.py --company "Google" --url "https://www.geeksforgeeks.org/google-interview-experience-sde1-2024"
```

---

## 📂 Project Structure

```
Placement Prep/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── checklist/route.ts       # Checklist CRUD API
│   │   │   └── companies/
│   │   │       ├── route.ts             # Companies listing & search API
│   │   │       └── [id]/
│   │   │           ├── route.ts         # Single company API
│   │   │           └── trends/route.ts  # Topic & round trend aggregation API
│   │   ├── auth/callback/route.ts       # Supabase OAuth callback
│   │   ├── checklist/page.tsx           # Personalized checklist page
│   │   ├── companies/
│   │   │   ├── page.tsx                 # Companies browser server page
│   │   │   └── CompanyListClient.tsx    # Interactive search & filter
│   │   ├── companies/[id]/page.tsx      # Detailed company radar with Recharts
│   │   ├── login/page.tsx               # Supabase Google OAuth sign in
│   │   ├── layout.tsx                   # App shell layout
│   │   ├── page.tsx                     # Landing page
│   │   └── globals.css                  # Custom radar design system & styling
│   ├── components/
│   │   ├── AuthButton.tsx               # Supabase Auth client button
│   │   ├── ChartWrapper.tsx             # Recharts hydration-safe wrapper
│   │   ├── ChecklistButton.tsx          # 1-Click checklist generator
│   │   ├── CompanyCard.tsx              # Interactive company card
│   │   ├── ExperienceCard.tsx           # Multi-round post accordion
│   │   ├── Footer.tsx                   # Site footer
│   │   ├── Navbar.tsx                   # Top navigation with radar logo
│   │   ├── RoundTypePieChart.tsx        # Donut round distribution chart
│   │   ├── SearchBar.tsx                # Real-time search component
│   │   └── TopicBarChart.tsx            # Horizontal topic breakdown bar chart
│   ├── lib/
│   │   ├── constants.ts                 # Keywords, colors, & categories
│   │   ├── mockData.ts                  # Curated fallback store for offline/demo
│   │   └── supabase/
│   │       ├── client.ts                # Browser Supabase client (@supabase/ssr)
│   │       ├── middleware.ts            # Session refresh middleware helper
│   │       └── server.ts                # Server Supabase client
│   ├── types/
│   │   └── database.ts                  # TypeScript interfaces for schema & trends
│   └── middleware.ts                    # Next.js session refresh middleware
├── scraper/
│   ├── classifier.py                    # Deterministic topic classifier
│   ├── db.py                            # Supabase deduplicated upsert logic
│   ├── main.py                          # CLI runner (--seed-csv, --url, --preview)
│   ├── requirements.txt                 # httpx, beautifulsoup4, supabase, dotenv
│   ├── scraper_gfg.py                   # GFG HTML parser & round segmenter
│   ├── seed_data.csv                    # Curated seed data for 12 top companies
│   └── README.md                        # Scraper documentation
├── supabase/
│   └── schema.sql                       # Master PostgreSQL schema & RLS policies
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎤 Interview Talking Points

- **Why deterministic keyword tagging over LLM/ML?** 100% explainable, zero hallucination risk, instantaneous sub-millisecond execution, and reproducible across hundreds of posts.
- **Deduplication Strategy**: Unique index on `source_url` with PostgreSQL foreign key cascades.
- **SQL Aggregation vs Client Compute**: Aggregated in database/API layer for optimal cacheability, reduced payload sizes, and high performance.
- **Row-Level Security**: Interview data is public read-only (`USING (true)`), while user checklists are private to each user (`USING (auth.uid() = user_id)`).
