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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-4 sm:right-20 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-80 left-4 sm:left-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Ticker Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-inner backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-shimmer font-bold">PlacementPrep Radar v2.0</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Live 2024–2025 Hiring Shift Analysis</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Stop scrolling endless posts.{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent glow-text-blue">
                Target what companies actually test.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We ingest real interview experiences from GeeksforGeeks and LeetCode, classify rounds into deterministic topic frequencies, and generate actionable roadmaps.
            </p>

            {/* Hero Search Box */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <SearchBar autoNavigate placeholder="Search target company (e.g. Google, TCS, Infosys, Amazon, Capgemini)..." />
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-slate-400">
                <span className="text-slate-500 font-medium">Quick Jump:</span>
                {['Google', 'TCS', 'Infosys', 'Amazon', 'Capgemini', 'Microsoft', 'Flipkart', 'Goldman Sachs'].map((comp) => (
                  <Link
                    key={comp}
                    href={`/companies?search=${encodeURIComponent(comp)}`}
                    className="px-2.5 py-0.5 rounded-md bg-slate-900/90 hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-slate-800 hover:border-blue-500/40 transition font-medium"
                  >
                    {comp}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <Link
                href="/companies"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-blue-500/30 active:scale-95 border border-blue-400/30"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Company Radars</span>
              </Link>
              
              <Link
                href="/compare"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-300 hover:text-white font-semibold text-sm border border-indigo-500/30 transition shadow-md shadow-indigo-500/10 active:scale-95 backdrop-blur-md"
              >
                <GitCompare className="w-4 h-4 text-indigo-400" />
                <span>Compare Companies</span>
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition active:scale-95"
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>My Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Radar Scope Visual (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 max-w-full flex items-center justify-center">
              {/* Outer Radar Rings */}
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-pulse-glow" />
              <div className="absolute inset-6 rounded-full border border-indigo-500/25" />
              <div className="absolute inset-14 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-24 rounded-full border border-slate-700/50" />
              
              {/* Crosshair lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
              </div>

              {/* Rotating Radar Sweep Cone */}
              <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="w-full h-full animate-radar origin-center"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(59, 130, 246, 0.4) 360deg)',
                  }}
                />
              </div>

              {/* Central Glowing Radar Core */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-blue-400/50 flex items-center justify-center text-white shadow-xl shadow-blue-500/40 animate-pulse">
                <Radar className="w-8 h-8 text-white" />
              </div>

              {/* Interactive Pulsing Radar Blips representing Companies */}
              <Link
                href="/companies/comp-google"
                title="Google Radar (High DP / Graphs)"
                className="absolute top-10 right-10 z-20 group"
              >
                <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-blue-500/50 text-[11px] font-bold text-blue-300 shadow-lg shadow-blue-500/20 flex items-center gap-1 group-hover:scale-110 transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                  <span>Google</span>
                </div>
              </Link>

              <Link
                href="/companies/comp-amazon"
                title="Amazon Radar (Arrays / OOP / System Design)"
                className="absolute bottom-12 left-6 z-20 group"
              >
                <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/50 text-[11px] font-bold text-amber-300 shadow-lg shadow-amber-500/20 flex items-center gap-1 group-hover:scale-110 transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Amazon</span>
                </div>
              </Link>

              <Link
                href="/companies/comp-tcs"
                title="TCS Radar (Aptitude / DBMS / OOP)"
                className="absolute bottom-8 right-12 z-20 group"
              >
                <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-emerald-500/50 text-[11px] font-bold text-emerald-300 shadow-lg shadow-emerald-500/20 flex items-center gap-1 group-hover:scale-110 transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>TCS</span>
                </div>
              </Link>

              <Link
                href="/companies/comp-microsoft"
                title="Microsoft Radar (Trees / Graphs / OS)"
                className="absolute top-16 left-8 z-20 group"
              >
                <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-purple-500/50 text-[11px] font-bold text-purple-300 shadow-lg shadow-purple-500/20 flex items-center gap-1 group-hover:scale-110 transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                  <span>Microsoft</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-blue-500/40 transition">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">
              {MOCK_COMPANIES.length}+
            </div>
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              Top Tech Companies
            </div>
            <p className="text-[11px] text-slate-500">FAANG, Unicorns & Services</p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-indigo-500/40 transition">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">
              100+
            </div>
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              Rounds Analyzed
            </div>
            <p className="text-[11px] text-slate-500">OA, Technical & System Design</p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-emerald-500/40 transition">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
              50+
            </div>
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              Must-Solve Questions
            </div>
            <p className="text-[11px] text-slate-500">Direct LeetCode & GFG Links</p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-purple-500/40 transition">
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">
              1-Click
            </div>
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
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
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Radar className="w-4 h-4 animate-spin-slow" />
              <span>Target Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Company Radars
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live topic frequency breakdown and round distribution calculated from authentic interview posts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start md:self-auto">
            {(['All', 'Product', 'Services', 'Fintech'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeCategoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition shadow-sm"
          >
            <span>Explore All {MOCK_COMPANIES.length}+ Company Radars</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </Link>
        </div>
      </section>

      {/* Preparation Guides Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Study Blueprints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Topic-Wise Preparation Guides & Roadmaps
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Curated roadmaps with must-solve LeetCode/GFG questions and live practice countdown timer.
            </p>
          </div>

          <Link
            href="/guides"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition shrink-0"
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
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Modern Engineering Stack</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Why PlacementPrep Radar is different
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Raw interview posts are unstructured, noisy, and overwhelming. We transform them into structured signals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-blue-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">1. Python Ingestion Pipeline</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Asynchronous <code className="text-blue-300 font-mono">httpx</code> scraper parsing GeeksforGeeks and LeetCode Discuss posts into discrete rounds (OA, Technical, System Design, HR).
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">2. Deterministic Classifier</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rule-based taxonomy mapping DP, Graphs, Trees, OOP, DBMS, OS, and CN with zero ML hallucination — 100% transparent and defensible.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">3. SQL Trend Aggregations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Postgres relational aggregation computing topic frequency percentages, round breakdowns, and generating 1-click personalized prep checklists.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
