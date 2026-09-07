'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Radar, 
  Compass, 
  CheckSquare, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Database, 
  BarChart3, 
  Terminal, 
  TrendingUp, 
  Layers, 
  GitCompare,
  CheckCircle2,
  Flame,
  Clock,
  Target,
  Search,
  ExternalLink,
  Building2,
  Zap,
  Star
} from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import CompanyCard from '@/components/CompanyCard';
import GuideCard from '@/components/GuideCard';
import { MOCK_COMPANIES } from '@/lib/mockData';
import { PREP_GUIDES } from '@/lib/guidesData';
import { CAREER_ROLES } from '@/lib/careerPathsData';
import RoleCard from '@/components/RoleCard';

export default function HomePage() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'All' | 'Product' | 'Services' | 'Fintech'>('All');

  // Filter companies based on category tabs
  const filteredCompanies = MOCK_COMPANIES.filter((comp) => {
    if (activeCategoryFilter === 'All') return true;
    if (activeCategoryFilter === 'Product') {
      return ['Technology', 'E-Commerce & Cloud', 'E-Commerce', 'Consumer Tech', 'Enterprise Software'].includes(comp.industry || '');
    }
    if (activeCategoryFilter === 'Services') {
      return ['IT Services & Consulting', 'IT & Strategy Consulting', 'Telecommunications & Tech'].includes(comp.industry || '');
    }
    if (activeCategoryFilter === 'Fintech') {
      return ['Financial Services', 'Fintech & Payments'].includes(comp.industry || '');
    }
    return true;
  }).slice(0, 6);

  const featuredGuides = PREP_GUIDES.slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Ambient Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-violet-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-4 sm:right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-80 left-4 sm:left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Ticker Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-shimmer font-bold">PlacementPrep Radar v2.0</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">Live 2024–2025 Hiring Shift Analysis</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Stop scrolling endless posts.{' '}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Target what companies actually test.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We ingest real interview experiences from GeeksforGeeks and LeetCode, classify rounds into deterministic topic frequencies, and generate actionable roadmaps.
            </p>

            {/* Hero Search Box */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <SearchBar autoNavigate placeholder="Search target company (e.g. Google, TCS, Infosys, Amazon, Capgemini)..." />
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-slate-500">
                <span className="text-slate-400 font-medium">Quick Jump:</span>
                {['Google', 'TCS', 'Infosys', 'Amazon', 'Capgemini', 'Microsoft', 'Flipkart', 'Goldman Sachs'].map((comp) => (
                  <Link
                    key={comp}
                    href={`/companies?search=${encodeURIComponent(comp)}`}
                    className="px-2.5 py-0.5 rounded-md bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-700 border border-slate-200 hover:border-violet-300 transition font-medium shadow-sm"
                  >
                    {comp}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <Link
                href="/career-paths"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm transition shadow-lg shadow-violet-500/25 active:scale-95 border border-violet-400/30"
              >
                <Compass className="w-4 h-4 text-violet-200" />
                <span>Career Compass</span>
                <span className="px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded bg-white/20 text-white">
                  Workshop
                </span>
              </Link>
              
              <Link
                href="/companies"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-900 font-semibold text-sm border border-slate-200 transition shadow-sm active:scale-95"
              >
                <Building2 className="w-4 h-4 text-violet-600" />
                <span>Company Radars</span>
              </Link>

              <Link
                href="/skills"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-900 font-semibold text-sm border border-emerald-200 transition shadow-sm active:scale-95 backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Skill Matrix</span>
              </Link>

              <Link
                href="/compare"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-sm border border-slate-200 transition shadow-sm active:scale-95"
              >
                <GitCompare className="w-4 h-4 text-purple-600" />
                <span>Compare</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Radar Scope Visual (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 max-w-full flex items-center justify-center">
              {/* Outer Radar Rings */}
              <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-pulse-glow" />
              <div className="absolute inset-6 rounded-full border border-purple-500/20" />
              <div className="absolute inset-14 rounded-full border border-emerald-500/15" />
              <div className="absolute inset-24 rounded-full border border-slate-200" />
              
              {/* Crosshair lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-400/25 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-violet-400/25 to-transparent" />
              </div>

              {/* Rotating Radar Sweep Cone */}
              <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="w-full h-full animate-radar origin-center"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(168, 85, 247, 0.25) 360deg)',
                  }}
                />
              </div>

              {/* Central Glowing Radar Core */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 border border-violet-400/50 flex items-center justify-center text-white shadow-xl shadow-violet-500/30 animate-pulse">
                <Radar className="w-8 h-8 text-white" />
              </div>

              {/* Interactive Pulsing Radar Blips representing Companies */}
              <Link
                href="/companies/comp-google"
                title="Google Radar (High DP / Graphs)"
                className="absolute top-10 right-10 z-20 group"
              >
                <div className="px-2.5 py-1 rounded-lg bg-white border border-violet-200 text-[11px] font-bold text-violet-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-ping" />
                  <span>Google</span>
                </div>
              </Link>

              <Link
                href="/companies/comp-amazon"
                title="Amazon Radar (Arrays / OOP / System Design)"
                className="absolute bottom-12 left-6 z-20 group"
              >
                <div className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-[11px] font-bold text-amber-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  <span>Amazon</span>
                </div>
              </Link>

              <Link
                href="/companies/comp-tcs"
                title="TCS Radar (Aptitude / DBMS / OOP)"
                className="absolute bottom-8 right-12 z-20 group"
              >
                <div className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-[11px] font-bold text-emerald-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>TCS</span>
                </div>
              </Link>

              <Link
                href="/companies/comp-microsoft"
                title="Microsoft Radar (Trees / Graphs / OS)"
                className="absolute top-16 left-8 z-20 group"
              >
                <div className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-[11px] font-bold text-purple-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                  <span>Microsoft</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-violet-300 transition shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-violet-600 font-mono">
              {MOCK_COMPANIES.length}+
            </div>
            <div className="text-xs text-slate-800 font-semibold uppercase tracking-wider">
              Top Tech Companies
            </div>
            <p className="text-[11px] text-slate-500">FAANG, Unicorns & Services</p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-fuchsia-300 transition shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-fuchsia-600 font-mono">
              100+
            </div>
            <div className="text-xs text-slate-800 font-semibold uppercase tracking-wider">
              Rounds Analyzed
            </div>
            <p className="text-[11px] text-slate-500">OA, Technical & System Design</p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-emerald-300 transition shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">
              50+
            </div>
            <div className="text-xs text-slate-800 font-semibold uppercase tracking-wider">
              Must-Solve Questions
            </div>
            <p className="text-[11px] text-slate-500">Direct LeetCode & GFG Links</p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-purple-300 transition shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 font-mono">
              1-Click
            </div>
            <div className="text-xs text-slate-800 font-semibold uppercase tracking-wider">
              Personal Checklists
            </div>
            <p className="text-[11px] text-slate-500">With sync & streak tracking</p>
          </div>
        </div>
      </section>

      {/* Featured Companies Section with Category Filter Tabs */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-600 uppercase tracking-wider">
              <Radar className="w-4 h-4 animate-spin-slow" />
              <span>Target Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Featured Company Radars
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Live topic frequency breakdown and round distribution calculated from authentic interview posts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            {(['All', 'Product', 'Services', 'Fintech'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeCategoryFilter === cat
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat === 'All' ? 'All Companies' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {/* View All Companies Footer CTA */}
        <div className="text-center pt-2">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold transition shadow-sm"
          >
            <span>Explore All {MOCK_COMPANIES.length}+ Company Radars</span>
            <ArrowRight className="w-4 h-4 text-violet-600" />
          </Link>
        </div>
      </section>

      {/* Career Compass Event Workshop Showcase Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-violet-600" />
              <span>Workshop Showcase</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">Career Compass</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Explore Career Paths, Roles & Skills
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Break down the exact technical (SDE, Data, AI, Cloud, Cyber) and non-technical (PM, Consulting, Analytics, Sales) roles companies hire for on-campus and off-campus.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/career-paths"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-violet-600 hover:text-violet-700 transition"
            >
              <span>Explore all 15 role blueprints</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured Roles Grid (3 Featured Profiles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAREER_ROLES.slice(0, 3).map((role) => (
            <RoleCard key={role.slug} role={role} />
          ))}
        </div>

        {/* Career Compass Sub-Banner with Direct Skill Gap Analyzer Link */}
        <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-violet-50/60 to-slate-50 border border-violet-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold text-violet-900 flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Not sure which path fits your current skill set?</span>
            </div>
            <p className="text-xs text-slate-600">
              Check off your languages and tools to calculate your readiness match for all 15 career paths in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/skills"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold transition shadow-md shadow-violet-500/20 active:scale-95"
            >
              Open Skill Gap Analyzer →
            </Link>
          </div>
        </div>
      </section>

      {/* Preparation Guides Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Study Blueprints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Topic-Wise Preparation Guides & Roadmaps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Curated roadmaps with must-solve LeetCode/GFG questions and live practice countdown timer.
            </p>
          </div>

          <Link
            href="/guides"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700 transition shrink-0"
          >
            <span>Explore all {PREP_GUIDES.length} study guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      {/* Interactive Bento Feature Grid */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 relative overflow-hidden space-y-8 shadow-sm">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Modern Engineering Stack</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Why PlacementPrep Radar is different
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Raw interview posts are unstructured, noisy, and overwhelming. We transform them into structured signals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-violet-300 transition">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Python Ingestion Pipeline</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Asynchronous <code className="text-violet-700 font-mono bg-violet-50 px-1 py-0.5 rounded border border-violet-200">httpx</code> scraper parsing GeeksforGeeks and LeetCode Discuss posts into discrete rounds (OA, Technical, System Design, HR).
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-indigo-300 transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Deterministic Classifier</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rule-based taxonomy mapping DP, Graphs, Trees, OOP, DBMS, OS, and CN with zero ML hallucination — 100% transparent and defensible.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-300 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. SQL Trend Aggregations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Postgres relational aggregation computing topic frequency percentages, round breakdowns, and generating 1-click personalized prep checklists.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
