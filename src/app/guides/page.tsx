'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Target, 
  Clock, 
  Filter, 
  ArrowRight, 
  Code2, 
  CheckSquare, 
  CheckCircle2, 
  Compass 
} from 'lucide-react';
import GuideCard from '@/components/GuideCard';
import { PREP_GUIDES, getAllCategories } from '@/lib/guidesData';

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = getAllCategories();

  // Filter guides
  const filteredGuides = useMemo(() => {
    return PREP_GUIDES.filter((guide) => {
      const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
      const matchesSearch = 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.testedCompanies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Aggregate stats
  const totalGuides = PREP_GUIDES.length;
  const totalProblems = PREP_GUIDES.reduce((acc, g) => acc + g.problems.length, 0);
  const totalHours = PREP_GUIDES.reduce((acc, g) => acc + g.estimatedHours, 0);

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-violet-600/15 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 left-10 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold shadow-inner">
            <BookOpen className="w-3.5 h-3.5 text-violet-400" />
            <span>Curated Placement Preparation Roadmaps</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Topic-Wise <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">Placement Guides</span> & Must-Solve Questions
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Stop solving random problems without direction. Use curated study roadmaps, core concept blueprints, and must-solve LeetCode/GFG questions tailored for software engineering placements.
          </p>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card rounded-xl p-4 sm:p-5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-violet-400">{totalGuides}</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">In-Depth Guides</div>
          </div>
          <div className="glass-card rounded-xl p-4 sm:p-5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-fuchsia-400">{totalProblems}+</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Must-Solve Problems</div>
          </div>
          <div className="glass-card rounded-xl p-4 sm:p-5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">~{totalHours}h</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Estimated Study Time</div>
          </div>
          <div className="glass-card rounded-xl p-4 sm:p-5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">100%</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Direct LeetCode & GFG Links</div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. Dynamic Programming, Graphs, System Design, Google, Amazon)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-800 focus:border-violet-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 border border-violet-400/40'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center space-y-4 border border-slate-800 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto text-violet-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No guides match your search</h3>
              <p className="text-xs text-slate-400">
                Try searching for a different keyword or select another category filter above.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-semibold transition shadow-md shadow-violet-500/20"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Quick Links Banner to Companies & Checklists */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Want to see which topics your target company tests?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Check real interview frequency radars for Google, Amazon, Microsoft, Flipkart, and more.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/companies"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-violet-500/20"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Company Radars</span>
            </Link>
            <Link
              href="/checklist"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
            >
              <CheckSquare className="w-4 h-4 text-violet-400" />
              <span>My Prep Checklist</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
