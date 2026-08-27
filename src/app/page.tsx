import React from 'react';
import Link from 'next/link';
import { Radar, Compass, CheckSquare, BookOpen, Sparkles, ArrowRight, ShieldCheck, Cpu, Database, BarChart3, Terminal, TrendingUp, Layers } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import CompanyCard from '@/components/CompanyCard';
import GuideCard from '@/components/GuideCard';
import { MOCK_COMPANIES } from '@/lib/mockData';
import { PREP_GUIDES } from '@/lib/guidesData';

export default function HomePage() {
  const featuredCompanies = MOCK_COMPANIES.slice(0, 6);
  const featuredGuides = PREP_GUIDES.slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/15 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-96 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>PlacementPrep Radar v1.1 • Live Trends & Prep Roadmaps</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Stop scrolling endless posts.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Target what companies actually test.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We aggregate real interview experiences from GeeksforGeeks and LeetCode Discuss,
            classify rounds into deterministic topic trends, and provide curated roadmaps of must-solve problems.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-xl mx-auto">
            <SearchBar autoNavigate placeholder="Search target company (e.g. Google, TCS, Infosys, Amazon, Capgemini)..." />
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
              <span className="text-slate-500">Popular:</span>
              {['Google', 'TCS', 'Infosys', 'Capgemini', 'Amazon', 'Wipro', 'Accenture', 'Microsoft'].map((comp) => (
                <Link
                  key={comp}
                  href={`/companies?search=${encodeURIComponent(comp)}`}
                  className="px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition"
                >
                  {comp}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/companies"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-blue-500/25 active:scale-98"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Company Radars</span>
            </Link>
            <Link
              href="/guides"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-white font-semibold text-sm border border-purple-500/30 transition shadow-lg shadow-purple-500/10 active:scale-98"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Topic Prep Guides</span>
            </Link>
            <Link
              href="/checklist"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition"
            >
              <CheckSquare className="w-4 h-4 text-blue-400" />
              <span>My Prep Checklist</span>
            </Link>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card rounded-xl p-4 sm:p-5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">{MOCK_COMPANIES.length}+</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Top Tech & Service Companies</div>
          </div>
          <div className="glass-card rounded-xl p-4 sm:p-5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">100+</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Rounds Classified</div>
          </div>
          <div className="glass-card rounded-xl p-4 sm:p-5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">50+</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Must-Solve Problems</div>
          </div>
          <div className="glass-card rounded-xl p-4 sm:p-5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">1-Click</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Checklist Generation</div>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <Radar className="w-4 h-4 animate-spin-slow" />
              <span>Target Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Featured Company Radars
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live topic breakdown and round distribution calculated from interview posts.
            </p>
          </div>

          <Link
            href="/companies"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
          >
            <span>View all {MOCK_COMPANIES.length}+ companies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* Preparation Guides Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Study Blueprints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Topic-Wise Preparation Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Curated roadmaps with must-solve LeetCode/GFG questions and tactical interview takeaways.
            </p>
          </div>

          <Link
            href="/guides"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition"
          >
            <span>Explore all {PREP_GUIDES.length} guides</span>
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

      {/* System Architecture / Why PlacementPrep Radar Section */}
      <section id="architecture" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>End-to-End Pipeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why PlacementPrep Radar is more than just a feed
            </h2>
            <p className="text-sm text-slate-400">
              Raw interview posts are unstructured, noisy, and overwhelming. We transform them into structured signals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">1. Python Ingestion Pipeline</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Asynchronous <code className="text-blue-300">httpx</code> scraper parsing GeeksforGeeks and LeetCode Discuss posts into discrete rounds (OA, Technical, System Design, HR).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">2. Deterministic Classifier</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rule-based taxonomy mapping DP, Graphs, Trees, OOP, DBMS, OS, and CN with zero ML hallucination — 100% transparent and defensible.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
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
