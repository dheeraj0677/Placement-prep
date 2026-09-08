'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Search, 
  Sparkles, 
  Code, 
  Briefcase, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  Zap, 
  HelpCircle,
  BarChart3,
  CheckSquare,
  Cpu
} from 'lucide-react';
import { CAREER_ROLES } from '@/lib/careerPathsData';
import { ECE_CAREER_ROLES } from '@/lib/eceCareerPathsData';
import RoleCard from '@/components/RoleCard';
import { useDomain } from '@/lib/DomainContext';

export default function CareerPathsPage() {
  const { domain } = useDomain();
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState<'all' | 'it' | 'ece'>(domain || 'all');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Technical' | 'Non-Technical'>('All');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('All');

  // Combined pool based on track
  const activeRolesPool = useMemo(() => {
    if (trackFilter === 'it') return CAREER_ROLES;
    if (trackFilter === 'ece') return ECE_CAREER_ROLES;
    return [...CAREER_ROLES, ...ECE_CAREER_ROLES];
  }, [trackFilter]);

  // Popular filter tags
  const popularSkillTags = [
    'All',
    'DSA',
    'Verilog',
    'Embedded C',
    'STA',
    'Python',
    'SQL',
    'RISC-V',
    'Op-Amps',
    'Cloud',
    'Communication',
    'Product Sense'
  ];

  // Filter roles based on search query, category, and skill tag
  const filteredRoles = useMemo(() => {
    return activeRolesPool.filter((role) => {
      // Category filter
      if (selectedCategory !== 'All' && role.category !== selectedCategory) {
        return false;
      }

      // Skill tag filter
      if (selectedSkillFilter !== 'All') {
        const hasSkill = role.coreSkills.some((s) => 
          s.name.toLowerCase().includes(selectedSkillFilter.toLowerCase()) ||
          s.category.toLowerCase().includes(selectedSkillFilter.toLowerCase())
        );
        if (!hasSkill) return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = role.title.toLowerCase().includes(query);
        const matchesTagline = role.tagline.toLowerCase().includes(query);
        const matchesSkills = role.coreSkills.some((s) => s.name.toLowerCase().includes(query));
        const matchesCompanies = role.hiringCompanies.some((c) => c.name.toLowerCase().includes(query));
        const matchesOverview = role.overview.toLowerCase().includes(query);

        if (!matchesTitle && !matchesTagline && !matchesSkills && !matchesCompanies && !matchesOverview) {
          return false;
        }
      }

      return true;
    });
  }, [activeRolesPool, searchQuery, selectedCategory, selectedSkillFilter]);

  const techCount = activeRolesPool.filter((r) => r.category === 'Technical').length;
  const nonTechCount = activeRolesPool.filter((r) => r.category === 'Non-Technical').length;

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-violet-900/10 via-purple-900/5 to-cyan-900/10 border border-slate-200 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-violet-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />

        <div className="relative space-y-4 max-w-3xl">
          {/* Workshop Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold tracking-wide">
            <Compass className="w-3.5 h-3.5 text-violet-600 animate-spin-slow" />
            <span>Dual-Track Career Compass</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-800 font-semibold">Software & Semiconductor Blueprints</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Discover Your Ideal Career Path:{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Software & Hardware Blueprints
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Understand what companies expect across software engineering (SDE, Data, AI) and core hardware profiles (VLSI, Verification, Physical Design, Embedded C, Firmware), with transparent CTC packages and verified interview rounds.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-violet-600 font-mono">{CAREER_ROLES.length + ECE_CAREER_ROLES.length}</div>
              <div className="text-[11px] text-slate-500 font-medium">Job Blueprints</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-purple-600 font-mono">45+</div>
              <div className="text-[11px] text-slate-500 font-medium">Recruiting Companies</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-cyan-600 font-mono">40+</div>
              <div className="text-[11px] text-slate-500 font-medium">Core Skills Mapped</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">100%</div>
              <div className="text-[11px] text-slate-500 font-medium">Free Roadmaps</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold transition shadow-lg shadow-violet-500/25 active:scale-95 border border-violet-400/30"
            >
              <Sparkles className="w-4 h-4 text-fuchsia-200" />
              <span>Skill Gap Analyzer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/path-advisor"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition shadow-sm active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Core vs IT Advisor</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="space-y-4">
        {/* Track Filter Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 bg-slate-100/80 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTrackFilter('all')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                trackFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Tracks ({CAREER_ROLES.length + ECE_CAREER_ROLES.length})</span>
            </button>
            <button
              onClick={() => setTrackFilter('it')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                trackFilter === 'it'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Software & IT ({CAREER_ROLES.length})</span>
            </button>
            <button
              onClick={() => setTrackFilter('ece')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                trackFilter === 'ece'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Semiconductor & ECE ({ECE_CAREER_ROLES.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, skill (e.g. Verilog, Python, STA), company..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 transition shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skill Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-500 scrollbar-none">
          <span className="text-slate-500 font-semibold whitespace-nowrap">Filter by Skill:</span>
          {popularSkillTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedSkillFilter(tag)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedSkillFilter === tag
                  ? 'bg-violet-50 text-violet-700 border border-violet-200 font-semibold shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900 font-bold">{filteredRoles.length}</strong> of{' '}
          {activeRolesPool.length} career paths
        </span>
        {(searchQuery || selectedSkillFilter !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSkillFilter('All');
              setSelectedCategory('All');
            }}
            className="text-violet-600 hover:underline font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Role Cards Grid */}
      {filteredRoles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <RoleCard key={role.slug} role={role} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center space-y-4 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Compass className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No career paths matched your criteria</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query, switching tracks, or clearing your skill filters.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSkillFilter('All');
              setSelectedCategory('All');
              setTrackFilter('all');
            }}
            className="px-4 py-2 rounded-lg bg-violet-600 text-white text-xs font-semibold shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
