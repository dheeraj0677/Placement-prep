'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Search, 
  BookOpen, 
  Briefcase, 
  Layers, 
  Code, 
  BarChart3, 
  Terminal, 
  Shield, 
  Zap, 
  HelpCircle,
  RotateCcw,
  CheckSquare,
  Compass,
  Building2
} from 'lucide-react';
import { 
  SKILLS_DATABASE, 
  SkillCategory, 
  calculateRoleReadiness, 
  SkillItem 
} from '@/lib/skillsData';
import { CAREER_ROLES } from '@/lib/careerPathsData';

export default function SkillsMatrixPage() {
  // Pre-selected default skills (e.g. common college starting point: C++, Arrays, Aptitude)
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([
    'cpp',
    'dsa-arrays-strings',
    'oop-concepts',
    'quantitative-aptitude'
  ]);

  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle single skill
  const toggleSkill = (id: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Preset button handlers
  const applyPreset = (preset: 'cs' | 'data' | 'business' | 'clear') => {
    if (preset === 'clear') {
      setSelectedSkillIds([]);
      return;
    }
    if (preset === 'cs') {
      setSelectedSkillIds([
        'cpp',
        'java',
        'dsa-arrays-strings',
        'dsa-trees-graphs',
        'dsa-dp',
        'oop-concepts',
        'dbms-core',
        'os-concurrency',
        'computer-networks',
        'quantitative-aptitude'
      ]);
    }
    if (preset === 'data') {
      setSelectedSkillIds([
        'python',
        'sql',
        'dbms-core',
        'quantitative-aptitude',
        'data-interpretation',
        'bi-powerbi-tableau',
        'machine-learning-core'
      ]);
    }
    if (preset === 'business') {
      setSelectedSkillIds([
        'quantitative-aptitude',
        'logical-reasoning',
        'verbal-ability',
        'data-interpretation',
        'guesstimates-structuring',
        'soft-communication',
        'soft-problem-solving',
        'soft-teamwork'
      ]);
    }
  };

  // Categories list
  const categories: SkillCategory[] = [
    'Programming',
    'DSA & Problem Solving',
    'Core CS & Development',
    'Aptitude & Analytical',
    'Domain & Cloud',
    'Soft Skills & Communication'
  ];

  // Filter skills
  const filteredSkills = useMemo(() => {
    return SKILLS_DATABASE.filter((skill) => {
      if (activeCategory !== 'All' && skill.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = skill.name.toLowerCase().includes(query);
        const matchesDesc = skill.description.toLowerCase().includes(query);
        const matchesTags = skill.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  // Compute live role readiness scores
  const roleScores = useMemo(() => {
    return calculateRoleReadiness(selectedSkillIds, CAREER_ROLES);
  }, [selectedSkillIds]);

  const topMatch = roleScores[0];

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Interactive Career Tool</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Skills Matrix & Readiness Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Skill Matrix &{' '}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-600 bg-clip-text text-transparent">
            Role Gap Analyzer
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Select the programming languages, algorithms, analytical concepts, and soft skills you currently have. Our engine calculates your real-time readiness percentage for 15 technical and non-technical job roles and suggests your highest-impact next skill.
        </p>
      </div>

      {/* Quick Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-900">Quick Presets:</span>
          <span className="text-slate-500 text-[11px] hidden sm:inline">Try pre-filling typical student profiles</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('cs')}
            className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 text-xs font-semibold transition active:scale-95"
          >
            💻 CS / Coding Student
          </button>
          <button
            onClick={() => applyPreset('data')}
            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition active:scale-95"
          >
            📊 Data & Analytics Track
          </button>
          <button
            onClick={() => applyPreset('business')}
            className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold transition active:scale-95"
          >
            💼 Business & Consulting Track
          </button>
          <button
            onClick={() => applyPreset('clear')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Interactive Skill Checklist (7 cols) vs Live Readiness Leaderboard (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Skill Selector Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-violet-600" />
                  <span>Select Skills You Know</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Checked: <span className="text-violet-600 font-bold">{selectedSkillIds.length}</span> of {SKILLS_DATABASE.length} skills
                </p>
              </div>

              {/* Search box */}
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter skills..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 shadow-sm"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeCategory === 'All'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                All ({SKILLS_DATABASE.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    activeCategory === cat
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills Checkbox List */}
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredSkills.map((skill) => {
                const isChecked = selectedSkillIds.includes(skill.id);
                return (
                  <div
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-violet-50/80 border-violet-300 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-violet-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{skill.name}</span>
                          {skill.importanceLevel === 'Critical' && (
                            <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-rose-50 text-rose-700 border border-rose-200 uppercase">
                              Core
                            </span>
                          )}
                        </div>

                        {skill.linkedGuideSlug && (
                          <Link
                            href={`/guides/${skill.linkedGuideSlug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[11px] text-fuchsia-600 hover:underline flex items-center gap-0.5 shrink-0 font-medium"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span className="hidden sm:inline">Guide</span>
                          </Link>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {skill.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-1 pt-0.5">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.2 text-[10px] rounded bg-slate-100 text-slate-600 border border-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Readiness Leaderboard (5 cols, sticky) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Top Match Spotlight */}
          {topMatch && topMatch.matchPercentage > 0 && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 via-purple-50 to-white border border-violet-200 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md bg-violet-100 text-violet-800 border border-violet-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-fuchsia-600" />
                  <span>Top Role Match</span>
                </span>
                <span className="text-2xl font-black font-mono text-emerald-600">
                  {topMatch.matchPercentage}%
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {topMatch.roleTitle}
                </h3>
                <div className="text-xs text-slate-600 mt-0.5">
                  Typical Starting CTC: <span className="font-mono text-emerald-700 font-bold">{topMatch.salaryRange}</span>
                </div>
              </div>

              {topMatch.recommendedNextSkill && (
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1 shadow-sm">
                  <div className="font-bold text-amber-700 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Highest-Impact Skill Gap:</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Learn <span className="text-slate-900 font-bold">{topMatch.recommendedNextSkill}</span> to maximize your interview conversion rate for this role.
                  </p>
                </div>
              )}

              <Link
                href={`/career-paths/${topMatch.roleSlug}`}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs transition shadow-md shadow-violet-500/20 active:scale-95"
              >
                <span>View {topMatch.roleTitle} Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Role Readiness Scoreboard */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white shadow-sm space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>All Roles Readiness Match</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculated dynamically based on your checked skills.
              </p>
            </div>

            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {roleScores.map((score) => {
                const isTech = score.category === 'Technical';
                const barColor = 
                  score.matchPercentage >= 75 ? 'bg-emerald-500' :
                  score.matchPercentage >= 45 ? 'bg-violet-500' :
                  score.matchPercentage >= 20 ? 'bg-amber-500' : 'bg-slate-300';

                return (
                  <Link
                    key={score.roleSlug}
                    href={`/career-paths/${score.roleSlug}`}
                    className="block p-3 rounded-xl bg-slate-50 hover:bg-violet-50/50 border border-slate-200 hover:border-violet-300 transition group space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition flex items-center gap-1.5">
                          <span>{score.roleTitle}</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {score.category} • {score.salaryRange}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold font-mono text-slate-900">
                          {score.matchPercentage}%
                        </span>
                      </div>
                    </div>

                    {/* Match Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${score.matchPercentage}%` }}
                      />
                    </div>

                    {/* Matched vs Missing details */}
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                      <span>{score.matchedSkills.length} skills matched</span>
                      {score.missingSkills.length > 0 && (
                        <span className="text-slate-500 font-medium">
                          Need: {score.missingSkills[0]}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
