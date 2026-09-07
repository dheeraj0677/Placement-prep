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
  CheckSquare
} from 'lucide-react';
import { CAREER_ROLES } from '@/lib/careerPathsData';
import RoleCard from '@/components/RoleCard';

export default function CareerPathsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Technical' | 'Non-Technical'>('All');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('All');

  // Popular filter tags
  const popularSkillTags = [
    'All',
    'DSA',
    'SQL',
    'Python',
    'Aptitude',
    'Machine Learning',
    'Cloud',
    'Product Sense',
    'Communication',
    'Excel'
  ];

  // Filter roles based on search query, category, and skill tag
  const filteredRoles = useMemo(() => {
    return CAREER_ROLES.filter((role) => {
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
  }, [searchQuery, selectedCategory, selectedSkillFilter]);

  const techCount = CAREER_ROLES.filter((r) => r.category === 'Technical').length;
  const nonTechCount = CAREER_ROLES.filter((r) => r.category === 'Non-Technical').length;

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Workshop Event Hero Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 glass-card border border-violet-200 overflow-hidden shadow-sm">
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Workshop Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold tracking-wide">
            <Compass className="w-3.5 h-3.5 text-violet-600 animate-spin-slow" />
            <span>Club Workshop Series</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-800 font-semibold">Career Compass: Companies, Roles & Skills</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Discover Your Career Path:{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Technical & Non-Technical Roles
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Understand what companies expect across different job profiles, their day-to-day responsibilities, eligibility requirements, and the exact skill sets you need to prepare for internships and campus placements.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xl sm:text-2xl font-black text-violet-600 font-mono">15+</div>
              <div className="text-[11px] text-slate-500 font-medium">Job Profiles</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xl sm:text-2xl font-black text-purple-600 font-mono">27+</div>
              <div className="text-[11px] text-slate-500 font-medium">Recruiting Companies</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">28</div>
              <div className="text-[11px] text-slate-500 font-medium">Core Skills Mapped</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-600 font-mono">100%</div>
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
              <span>Interactive Skill Gap Analyzer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/companies"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition shadow-sm active:scale-95"
            >
              <Building2 className="w-3.5 h-3.5 text-violet-600" />
              <span>Browse Company Radars</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                selectedCategory === 'All'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              All Roles ({CAREER_ROLES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('Technical')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                selectedCategory === 'Technical'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Technical ({techCount})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('Non-Technical')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                selectedCategory === 'Non-Technical'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Non-Technical ({nonTechCount})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, skill (e.g. SQL, Python), company..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition shadow-sm"
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
                  ? 'bg-violet-50 text-violet-700 border border-violet-200 font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-200/70'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-900">{filteredRoles.length}</span> career profiles
          </div>
          {(searchQuery || selectedCategory !== 'All' || selectedSkillFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSkillFilter('All');
              }}
              className="text-violet-600 hover:text-violet-700 hover:underline font-medium"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredRoles.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center space-y-3 border border-slate-200 shadow-sm">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No matching career paths found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any roles matching &quot;{searchQuery}&quot;. Try adjusting your keywords or clearing the skill filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSkillFilter('All');
              }}
              className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition"
            >
              View All 15 Roles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <RoleCard key={role.slug} role={role} />
            ))}
          </div>
        )}
      </div>

      {/* Side-by-Side Comparison Section: Technical vs Non-Technical */}
      <section className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-violet-600" />
            <span>Career Pathways Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Technical vs. Non-Technical: What&apos;s the Difference?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            A key focus of Career Compass is demystifying what separates engineering tracks from business and consulting roles so you can prepare intentionally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Technical Track Card */}
          <div className="p-6 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Technical Career Track</h3>
                  <div className="text-[11px] text-emerald-700 font-medium">SDE, Data, AI, Cloud, Cyber</div>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                Code & Systems Focus
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Core Skills:</strong> Programming languages (C++, Java, Python), Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and System Design.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Interview Process:</strong> Online Coding Assessment (OA) on LeetCode/HackerEarth, 2-3 Live Coding Rounds, System Design, and Behavioral HR.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Eligibility:</strong> Usually B.Tech / B.E (CSE, IT, ECE common; many firms open to all branches). High emphasis on coding test score over college tier.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Typical Freshers CTC:</strong> ₹6 - 45+ LPA (Service firms: ₹3.6 - 9 LPA; Product firms: ₹18 - 45+ LPA).</span>
              </li>
            </ul>
          </div>

          {/* Non-Technical Track Card */}
          <div className="p-6 rounded-2xl bg-purple-50/40 border border-purple-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Non-Technical & Business Track</h3>
                  <div className="text-[11px] text-purple-700 font-medium">PM, Consulting, Analytics, Sales, Ops</div>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-purple-100 text-purple-800 border border-purple-200">
                Strategy & Execution Focus
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>Core Skills:</strong> Quantitative aptitude, logical reasoning, structured case analysis (MECE), data interpretation, storytelling, and high EQ communication.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>Interview Process:</strong> Aptitude Assessment, Group Discussions (GD), Live Case Interviews (Guesstimates, Profitability trees), and Leadership Fit rounds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>Eligibility:</strong> Open to ALL branches and degrees (Engineering, BBA, B.Com, Sciences). Prior club leadership, events, and PORs (Positions of Responsibility) count heavily.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>Typical Freshers CTC:</strong> ₹5 - 32+ LPA (Consulting/APM: ₹12 - 32 LPA; Tech Sales: Base + Uncapped Commissions).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Tool Teaser Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-violet-50 via-purple-50 to-slate-50 border border-violet-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Interactive Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Which roles do your current skills match?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Select the languages, frameworks, and tools you already know. Our engine calculates your readiness percentage for all 15 career paths and identifies your highest-impact skill gaps.
          </p>
        </div>

        <Link
          href="/skills"
          className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-violet-500/20 active:scale-95"
        >
          <span>Open Skill Gap Analyzer</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
