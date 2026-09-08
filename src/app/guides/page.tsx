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
  Compass,
  Cpu,
  Layers,
  Code
} from 'lucide-react';
import GuideCard from '@/components/GuideCard';
import { PREP_GUIDES } from '@/lib/guidesData';
import { ECE_PREP_GUIDES } from '@/lib/eceGuidesData';
import { useDomain } from '@/lib/DomainContext';

export default function GuidesPage() {
  const { domain } = useDomain();
  const [trackFilter, setTrackFilter] = useState<'all' | 'it' | 'ece'>(domain || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active pool of guides
  const activeGuidesPool = useMemo(() => {
    if (trackFilter === 'it') return PREP_GUIDES;
    if (trackFilter === 'ece') return ECE_PREP_GUIDES;
    return [...PREP_GUIDES, ...ECE_PREP_GUIDES];
  }, [trackFilter]);

  // Extract categories present in active pool
  const categories = useMemo(() => {
    const cats = new Set<string>();
    activeGuidesPool.forEach(g => cats.add(g.category));
    return ['All', ...Array.from(cats)];
  }, [activeGuidesPool]);

  // Filter guides
  const filteredGuides = useMemo(() => {
    return activeGuidesPool.filter((guide) => {
      const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
      const matchesSearch = 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.testedCompanies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeGuidesPool, selectedCategory, searchQuery]);

  // Aggregate stats
  const totalProblems = activeGuidesPool.reduce((acc, g) => acc + g.problems.length, 0);
  const totalHours = activeGuidesPool.reduce((acc, g) => acc + g.estimatedHours, 0);

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-violet-100/70 via-purple-50/40 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 left-10 w-72 h-72 bg-fuchsia-100/50 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-violet-600" />
            <span>Dual-Track Preparation Blueprints</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Topic-Wise <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">Placement Study Guides</span> & Problem Roadmaps
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Deep-dive master guides with verified interview questions from LeetCode, GFG, and HDLBits. Covers algorithms, system design, digital logic, STA, Verilog, and embedded firmware.
          </p>

          {/* Quick Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span>{PREP_GUIDES.length + ECE_PREP_GUIDES.length} Comprehensive Guides</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>{totalProblems}+ Curated Problems</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>~{totalHours} Total Guided Study Hours</span>
            </div>
          </div>
        </div>

        {/* Filter and Track Control Center */}
        <div className="glass-card rounded-2xl p-5 border border-slate-200 space-y-4 shadow-sm bg-white">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Track Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
              <button
                onClick={() => { setTrackFilter('all'); setSelectedCategory('All'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  trackFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Guides ({PREP_GUIDES.length + ECE_PREP_GUIDES.length})</span>
              </button>
              <button
                onClick={() => { setTrackFilter('it'); setSelectedCategory('All'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  trackFilter === 'it'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Software Track ({PREP_GUIDES.length})</span>
              </button>
              <button
                onClick={() => { setTrackFilter('ece'); setSelectedCategory('All'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  trackFilter === 'ece'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Semiconductor Track ({ECE_PREP_GUIDES.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guide by topic, tag, or target company..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs pt-2 border-t border-slate-100 scrollbar-none">
            <div className="flex items-center gap-1 text-slate-400 font-semibold uppercase tracking-wider pr-2 shrink-0">
              <Filter className="w-3 h-3" />
              <span>Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredGuides.length}</strong> of{' '}
              {activeGuidesPool.length} guides in track
            </span>
            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="text-violet-600 hover:underline font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center space-y-4 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">No study guides found</h3>
                <p className="text-xs text-slate-500">
                  Try adjusting your search query or reset the category filter.
                </p>
              </div>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setTrackFilter('all'); }}
                className="px-4 py-2 rounded-lg bg-violet-600 text-white text-xs font-semibold shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
