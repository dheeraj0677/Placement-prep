-- ==============================================================================
-- PlacementPrep Radar - Master Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. companies table
create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  logo_url text,
  industry text,
  created_at timestamptz default now()
);

-- 2. experiences table (one per interview experience post)
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  role text,               -- e.g. "SDE Intern", "Software Engineer", "Analyst"
  year int,
  source_platform text,    -- 'GeeksforGeeks', 'LeetCode Discuss', 'User Submitted'
  source_url text unique,
  raw_text text,
  submitted_by uuid references auth.users(id), -- null if scraped
  created_at timestamptz default now()
);

-- 3. experience_rounds table (each interview round within an experience)
create table if not exists experience_rounds (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid references experiences(id) on delete cascade,
  round_number int,
  round_type text,          -- 'Online Assessment', 'Technical', 'HR', 'System Design', etc.
  round_text text,
  created_at timestamptz default now()
);

-- 4. round_tags table (topic tags extracted per round, via keyword classifier)
create table if not exists round_tags (
  id uuid primary key default gen_random_uuid(),
  round_id uuid references experience_rounds(id) on delete cascade,
  tag text not null,        -- 'DP', 'Graphs', 'Trees', 'System Design', 'HR', etc.
  created_at timestamptz default now()
);

-- 5. user_checklists table (persisted preparation checklist items per user/company/tag)
create table if not exists user_checklists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  company_id uuid references companies(id) on delete cascade,
  tag text not null,
  is_done boolean default false,
  created_at timestamptz default now(),
  unique(user_id, company_id, tag)
);

-- Create performance indexes for aggregations and lookups
create index if not exists idx_experiences_company_id on experiences(company_id);
create index if not exists idx_experiences_year on experiences(year);
create index if not exists idx_experience_rounds_exp_id on experience_rounds(experience_id);
create index if not exists idx_round_tags_round_id on round_tags(round_id);
create index if not exists idx_round_tags_tag on round_tags(tag);
create index if not exists idx_user_checklists_user_id on user_checklists(user_id);
create index if not exists idx_user_checklists_company_id on user_checklists(company_id);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable RLS on all tables
alter table companies enable row level security;
alter table experiences enable row level security;
alter table experience_rounds enable row level security;
alter table round_tags enable row level security;
alter table user_checklists enable row level security;

-- Public read access for data tables
drop policy if exists "Public read companies" on companies;
create policy "Public read companies" on companies for select using (true);

drop policy if exists "Public read experiences" on experiences;
create policy "Public read experiences" on experiences for select using (true);

drop policy if exists "Public read rounds" on experience_rounds;
create policy "Public read rounds" on experience_rounds for select using (true);

drop policy if exists "Public read tags" on round_tags;
create policy "Public read tags" on round_tags for select using (true);

-- User-authenticated access for checklists
drop policy if exists "Users manage their own checklist" on user_checklists;
create policy "Users manage their own checklist"
  on user_checklists for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Service role bypasses RLS for scraping and upsert operations automatically in Supabase.
