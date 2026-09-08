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
  Building2,
  Cpu
} from 'lucide-react';
import { 
  SKILLS_DATABASE, 
  SkillCategory, 
  calculateRoleReadiness, 
  SkillItem 
} from '@/lib/skillsData';
import { ECE_SKILLS_DATABASE } from '@/lib/eceSkillsData';
import { CAREER_ROLES } from '@/lib/careerPathsData';
import { ECE_CAREER_ROLES } from '@/lib/eceCareerPathsData';
import { useDomain } from '@/lib/DomainContext';

export default function SkillsMatrixPage() {
  const { domain } = useDomain();
  const [trackFilter, setTrackFilter] = useState<'all' | 'it' | 'ece'>(domain || 'all');
  
  // Default skills based on domain
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(() => {
    if (domain === 'ece') {
      return ['digital-logic-kmaps', 'verilog-rtl', 'embedded-c-pointers', 'sta-timing-slack'];
    }
    return ['cpp', 'dsa-arrays-strings', 'oop-concepts', 'quantitative-aptitude'];
  });

  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle single skill
  const toggleSkill = (id: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Preset button handlers
  const applyPreset = (preset: 'cs' | 'vlsi' | 'embedded' | 'data' | 'business' | 'clear') => {
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
    if (preset === 'vlsi') {
      setSelectedSkillIds([
        'digital-logic-kmaps',
        'sequential-circuits-fsm',
        'verilog-rtl',
        'systemverilog-oop',
        'sta-timing-slack',
        'cdc-metastability',
        'computer-architecture-riscv'
      ]);
    }
    if (preset === 'embedded') {
      setSelectedSkillIds([
        'embedded-c-pointers',
        'interrupts-isr-rules',
        'rtos-freertos-multithreading',
        'comm-buses-spi-i2c-uart',
        'automotive-can-bus',
        'arm-cortex-microcontrollers',
        'lab-oscilloscope-debugging'
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
    'VLSI & Semiconductor',
    'Embedded & Hardware',
    'Aptitude & Analytical',
    'Domain & Cloud',
    'Soft Skills & Communication'
  ];

  // Active pool of skills
  const activeSkillsPool = useMemo(() => {
    if (trackFilter === 'it') return SKILLS_DATABASE;
    if (trackFilter === 'ece') return ECE_SKILLS_DATABASE;
    return [...SKILLS_DATABASE, ...ECE_SKILLS_DATABASE];
  }, [trackFilter]);

  // Combined roles pool
  const activeRolesPool = useMemo(() => {
    if (trackFilter === 'it') return CAREER_ROLES;
    if (trackFilter === 'ece') return ECE_CAREER_ROLES;
    return [...CAREER_ROLES, ...ECE_CAREER_ROLES];
  }, [trackFilter]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return activeSkillsPool.filter((skill) => {
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
  }, [activeSkillsPool, activeCategory, searchQuery]);

  // Compute live role readiness scores
  const roleScores = useMemo(() => {
    const allSkills = [...SKILLS_DATABASE, ...ECE_SKILLS_DATABASE];
    return calculateRoleReadiness(selectedSkillIds, activeRolesPool, allSkills);
  }, [selectedSkillIds, activeRolesPool]);

  const topMatch = roleScores[0];

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Interactive Career Tool</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Dual-Track Skill Matrix & Readiness Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Skill Matrix &{' '}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
            Role Gap Analyzer
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Select the programming languages, hardware concepts (Verilog, STA, RTOS), algorithms, and tools you know. Our engine calculates your real-time readiness percentage for 26 Software and Hardware job roles and identifies your highest-impact missing skill.
        </p>
      </div>

      {/* Track Switcher & Presets Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
        {/* Track Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200">
          <button
            onClick={() => setTrackFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              trackFilter === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Disciplines
          </button>
          <button
            onClick={() => setTrackFilter('it')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              trackFilter === 'it' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Software (IT)</span>
          </button>
          <button
            onClick={() => setTrackFilter('ece')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              trackFilter === 'ece' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Semiconductor (ECE)</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('cs')}
            className="px-2.5 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 text-xs font-semibold transition active:scale-95"
          >
            💻 SDE / CS
          </button>
          <button
            onClick={() => applyPreset('vlsi')}
            className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition active:scale-95"
          >
            ⚡ VLSI / Silicon
          </button>
          <button
            onClick={() => applyPreset('embedded')}
            className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-semibold transition active:scale-95"
          >
            🔌 Embedded / RTOS
          </button>
          <button
            onClick={() => applyPreset('data')}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition active:scale-95"
          >
            📊 Data & AI
          </button>
          <button
            onClick={() => applyPreset('clear')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Interactive Skill Checklist vs Live Readiness Leaderboard */}
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
                  Checked: <span className="text-violet-600 font-bold">{selectedSkillIds.length}</span> of {activeSkillsPool.length} skills in view
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
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition ${
                  activeCategory === 'All'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition ${
                    activeCategory === cat
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkillIds.includes(skill.id);
                return (
                  <div
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                      isSelected
                        ? 'border-violet-500 bg-violet-50/50 shadow-sm ring-1 ring-violet-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isSelected ? 'text-violet-900' : 'text-slate-900'}`}>
                            {skill.name}
                          </span>
                          {skill.importanceLevel === 'Critical' && (
                            <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase rounded bg-rose-100 text-rose-700">
                              Core
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                          {skill.description}
                        </p>
                      </div>

                      <div className="shrink-0 mt-0.5">
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-violet-600 fill-violet-50" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-slate-100">
                      {skill.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Readiness Leaderboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Top Recommendation Spotlight */}
          {topMatch && topMatch.matchPercentage > 0 && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-600 text-white shadow-xl shadow-violet-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider">
                  Top Matched Career
                </span>
                <span className="text-2xl font-black font-mono">{topMatch.matchPercentage}%</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{topMatch.roleTitle}</h3>
                <p className="text-xs text-violet-100 mt-0.5">Package Band: {topMatch.salaryRange}</p>
              </div>
              {topMatch.recommendedNextSkill && (
                <div className="p-3 rounded-xl bg-black/20 border border-white/10 text-xs">
                  <span className="text-violet-200 block text-[10px] font-semibold uppercase">Highest-Impact Next Skill:</span>
                  <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{topMatch.recommendedNextSkill}</span>
                  </span>
                </div>
              )}
              <Link
                href={`/career-paths/${topMatch.roleSlug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-violet-200 transition"
              >
                <span>View Full Role Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Leaderboard Card */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Role Readiness Rankings</span>
              </h3>
              <span className="text-xs text-slate-500 font-semibold">{roleScores.length} roles</span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {roleScores.map((score, index) => (
                <div
                  key={score.roleSlug}
                  className="p-3 rounded-xl border border-slate-200 hover:border-violet-200 bg-slate-50/50 hover:bg-violet-50/30 transition space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-mono text-[10px] flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <Link
                        href={`/career-paths/${score.roleSlug}`}
                        className="font-bold text-slate-900 hover:text-violet-700 transition"
                      >
                        {score.roleTitle}
                      </Link>
                    </div>
                    <span className="font-black font-mono text-sm text-slate-900">{score.matchPercentage}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        score.matchPercentage >= 70
                          ? 'bg-emerald-500'
                          : score.matchPercentage >= 40
                          ? 'bg-violet-600'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${score.matchPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{score.matchedSkills.length} of {score.matchedSkills.length + score.missingSkills.length} skills matched</span>
                    <span>{score.salaryRange}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
