'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Sparkles, 
  Trophy, 
  Flame, 
  CheckSquare, 
  BookOpen, 
  Clock, 
  Building2, 
  ArrowRight, 
  Award, 
  Zap, 
  Layers, 
  Compass, 
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Code2,
  AlertTriangle,
  Plus,
  X,
  Target,
  ChevronRight,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { useDomain } from '@/lib/DomainContext';
import { PREP_GUIDES } from '@/lib/guidesData';
import { ECE_PREP_GUIDES } from '@/lib/eceGuidesData';
import { ALL_COMPANIES, getMockCompanyTrends, getCompaniesByDomain } from '@/lib/mockData';
import { getUserStats, checkNewAchievements, ACHIEVEMENTS, UserStats, getUserLevel } from '@/lib/achievements';
import ActivityHeatmap from '@/components/ActivityHeatmap';
import ReadinessRadar from '@/components/ReadinessRadar';
import AchievementBadge from '@/components/AchievementBadge';
import AchievementToast from '@/components/AchievementToast';
import { Company } from '@/types/database';

const TARGET_COMPANIES_STORAGE_KEY = 'placementprep_target_companies';

export default function DashboardPage() {
  const { domain, setDomain } = useDomain();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Target dream companies state (IDs)
  const [targetCompanyIds, setTargetCompanyIds] = useState<string[]>([]);
  const [isCompanySelectorOpen, setIsCompanySelectorOpen] = useState(false);

  // Combine IT and ECE guide slugs so stats calculate across both tracks
  const allGuideSlugs = useMemo(() => {
    return [
      ...PREP_GUIDES.map(g => g.slug),
      ...ECE_PREP_GUIDES.map(g => g.slug)
    ];
  }, []);

  // Initialize stats and target companies
  useEffect(() => {
    setMounted(true);

    // Load target companies
    try {
      const storedTargets = localStorage.getItem(TARGET_COMPANIES_STORAGE_KEY);
      if (storedTargets) {
        setTargetCompanyIds(JSON.parse(storedTargets));
      } else {
        // Defaults based on domain
        const defaultTargets = domain === 'ece' 
          ? ['comp-nvidia', 'comp-qualcomm', 'comp-ti']
          : ['comp-google', 'comp-amazon', 'comp-microsoft'];
        setTargetCompanyIds(defaultTargets);
        localStorage.setItem(TARGET_COMPANIES_STORAGE_KEY, JSON.stringify(defaultTargets));
      }
    } catch {
      setTargetCompanyIds(['comp-google', 'comp-amazon', 'comp-microsoft']);
    }

    const currentStats = getUserStats(allGuideSlugs);
    setStats(currentStats);

    const { allUnlocked } = checkNewAchievements(currentStats);
    setUnlockedIds(allUnlocked);

    const handleUpdate = () => {
      const updated = getUserStats(allGuideSlugs);
      setStats(updated);
      const res = checkNewAchievements(updated);
      setUnlockedIds(res.allUnlocked);
    };

    window.addEventListener('activity_updated', handleUpdate);
    window.addEventListener('bookmarks_updated', handleUpdate);
    return () => {
      window.removeEventListener('activity_updated', handleUpdate);
      window.removeEventListener('bookmarks_updated', handleUpdate);
    };
  }, [allGuideSlugs, domain]);

  const saveTargetCompanies = (newIds: string[]) => {
    setTargetCompanyIds(newIds);
    try {
      localStorage.setItem(TARGET_COMPANIES_STORAGE_KEY, JSON.stringify(newIds));
    } catch {}
  };

  const toggleTargetCompany = (id: string) => {
    if (targetCompanyIds.includes(id)) {
      if (targetCompanyIds.length > 1) {
        saveTargetCompanies(targetCompanyIds.filter(cId => cId !== id));
      }
    } else {
      if (targetCompanyIds.length < 5) {
        saveTargetCompanies([...targetCompanyIds, id]);
      }
    }
  };

  // Resolved Target Company Objects
  const targetCompanies = useMemo(() => {
    return targetCompanyIds
      .map(id => ALL_COMPANIES.find(c => c.id === id))
      .filter((c): c is Company => Boolean(c));
  }, [targetCompanyIds]);

  // Compute Domain-Aware Topic Radar Data
  const radarData = useMemo(() => {
    if (!stats) return [];

    if (domain === 'ece') {
      const eceTopics: Record<string, number> = {
        'Digital Electronics': 6,
        'Verilog & SystemVerilog': 6,
        'STA & Timing Analysis': 6,
        'Computer Architecture & RISC-V': 5,
        'Embedded C & RTOS': 6,
        'Microcontrollers & Protocols': 5,
        'Analog Electronics & Op-Amps': 5,
        'VLSI Physical Design': 4,
        'DFT & Testing': 4,
      };

      return Object.entries(eceTopics).map(([subject, total]) => {
        const solved = stats.solvedByTopic[subject] || 0;
        const pct = Math.min(100, Math.round((solved / total) * 100));
        return { subject, A: pct, fullMark: 100 };
      });
    }

    // IT / CS Topics
    const itTopics: Record<string, number> = {
      'DP': 10,
      'Graphs': 8,
      'Trees': 7,
      'Arrays & Strings': 6,
      'System Design': 4,
      'DBMS': 3,
      'OS': 3,
      'CN': 2,
      'OOP': 2,
      'Behavioral': 3,
      'Aptitude': 2,
    };

    return Object.entries(itTopics).map(([subject, total]) => {
      const solved = stats.solvedByTopic[subject] || 0;
      const pct = Math.min(100, Math.round((solved / total) * 100));
      return { subject, A: pct, fullMark: 100 };
    });
  }, [stats, domain]);

  // Overall Placement Readiness Score (0 to 100%)
  const { readinessScore, rankTitle, rankColor } = useMemo(() => {
    if (!stats) return { readinessScore: 0, rankTitle: 'Novice Prep', rankColor: 'text-slate-500' };

    const problemScore = Math.min(50, stats.totalSolvedProblems * 2.0);
    const checklistRatio = stats.totalChecklistItems > 0 ? (stats.totalChecklistDone / stats.totalChecklistItems) : 0;
    const checklistScore = Math.round(checklistRatio * 30);
    const streakScore = Math.min(20, stats.currentStreakDays * 4);

    const total = Math.min(100, Math.round(problemScore + checklistScore + streakScore));

    let title = 'Placement Aspirant';
    let color = 'text-slate-600';

    if (total >= 80) {
      title = '🔥 Placement Ready (Tier-1)';
      color = 'text-emerald-600';
    } else if (total >= 50) {
      title = '⚡ Interview Competent';
      color = 'text-violet-600';
    } else if (total >= 25) {
      title = '🚀 Foundations Built';
      color = 'text-indigo-600';
    }

    return { readinessScore: total, rankTitle: title, rankColor: color };
  }, [stats]);

  // Target Company Readiness Analysis & Weak Spot Detection
  const { companyReadinessList, criticalWeakTopics } = useMemo(() => {
    if (!stats || targetCompanies.length === 0) {
      return { companyReadinessList: [], criticalWeakTopics: [] };
    }

    const weakTopicCounts: Record<string, { count: number; companies: string[] }> = {};

    const readinessList = targetCompanies.map(company => {
      const insights = getMockCompanyTrends(company.id);
      const topTags = insights.topTags.slice(0, 4);

      let totalPoints = 0;
      let earnedPoints = 0;

      topTags.forEach((tag, idx) => {
        const weight = 4 - idx; // Earlier tags are higher frequency
        totalPoints += weight;

        const solvedCount = stats.solvedByTopic[tag] || 0;
        const topicCompletionRate = Math.min(1, solvedCount / 3);
        earnedPoints += weight * topicCompletionRate;

        // Track weak topics (< 40% mastery)
        if (topicCompletionRate < 0.4) {
          if (!weakTopicCounts[tag]) {
            weakTopicCounts[tag] = { count: 0, companies: [] };
          }
          weakTopicCounts[tag].count++;
          weakTopicCounts[tag].companies.push(company.name);
        }
      });

      const readinessPct = totalPoints > 0 
        ? Math.min(100, Math.max(15, Math.round((earnedPoints / totalPoints) * 100))) 
        : 30;

      return {
        company,
        topTags,
        readinessPct
      };
    });

    const weakList = Object.entries(weakTopicCounts)
      .map(([topic, data]) => ({
        topic,
        frequency: data.count,
        companies: data.companies
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 3);

    return { companyReadinessList: readinessList, criticalWeakTopics: weakList };
  }, [stats, targetCompanies]);

  // Total XP from unlocked achievements
  const totalXp = useMemo(() => {
    return ACHIEVEMENTS.reduce(
      (acc, ach) => (unlockedIds.includes(ach.id) ? acc + ach.points : acc),
      0
    );
  }, [unlockedIds]);

  const userLevel = useMemo(() => getUserLevel(totalXp), [totalXp]);

  if (!mounted || !stats) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Loading your preparation analytics dashboard...</p>
      </div>
    );
  }

  const isEce = domain === 'ece';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <AchievementToast />

      {/* Header Banner with Track Switcher */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold">
              <BarChart3 className="w-3.5 h-3.5 text-violet-600" />
              <span>Personal Placement Analytics</span>
            </div>

            {/* Quick Track Switcher Pill */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setDomain('it')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition ${
                  domain === 'it' 
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3 h-3" />
                Software / IT
              </button>
              <button
                onClick={() => setDomain('ece')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition ${
                  domain === 'ece' 
                    ? 'bg-cyan-600 text-white shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cpu className="w-3 h-3" />
                Semiconductor / ECE
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Preparation <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">Command Center</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Live intelligence for your target placement companies. Track high-frequency topics, radar preparedness, weak spots, and consistent problem-solving streaks.
          </p>
        </div>

        {/* Readiness Score Gauge */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 text-center min-w-[210px] space-y-1 shadow-sm shrink-0">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Overall Readiness Score
          </div>
          <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
            {readinessScore}%
          </div>
          <div className={`text-xs font-bold ${rankColor}`}>
            {rankTitle}
          </div>
          <div className="text-[11px] text-slate-400 pt-0.5">
            Based on problems + checklist + streak
          </div>
        </div>
      </div>

      {/* Target Dream Companies Tracker Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isEce ? 'bg-cyan-50 text-cyan-600 border border-cyan-200' : 'bg-violet-50 text-violet-600 border border-violet-200'
            }`}>
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                Target Companies Tracker
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                  {targetCompanies.length} Active
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Track radar alignment, top tested topics, and readiness match for your dream recruiters
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCompanySelectorOpen(!isCompanySelectorOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-violet-400 text-slate-700 hover:text-violet-700 bg-slate-50 hover:bg-violet-50 text-xs font-semibold transition self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            {isCompanySelectorOpen ? 'Done Customizing' : 'Customize Target Companies'}
          </button>
        </div>

        {/* Company Selection Drawer (when opened) */}
        {isCompanySelectorOpen && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Select 1 to 5 dream companies to pin to your radar:</span>
              <span className="font-semibold text-slate-900">{targetCompanyIds.length} / 5 selected</span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
              {ALL_COMPANIES.map(comp => {
                const isSelected = targetCompanyIds.includes(comp.id);
                return (
                  <button
                    key={comp.id}
                    onClick={() => toggleTargetCompany(comp.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{comp.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Target Companies Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companyReadinessList.map(({ company, topTags, readinessPct }) => {
            const isSemicon = company.domain === 'ece';
            return (
              <div
                key={company.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base">{company.name}</h3>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                          isSemicon 
                            ? 'text-cyan-700 bg-cyan-50 border-cyan-200' 
                            : 'text-indigo-700 bg-indigo-50 border-indigo-200'
                        }`}>
                          {isSemicon ? 'ECE' : 'IT'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{company.industry}</p>
                    </div>

                    {/* Company Match Metric */}
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900">{readinessPct}%</div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase">Match</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        readinessPct >= 70 
                          ? 'bg-emerald-500' 
                          : readinessPct >= 40 
                          ? 'bg-violet-500' 
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${readinessPct}%` }}
                    />
                  </div>

                  {/* Top Tags for this company */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Most Tested Topics:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {topTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white text-slate-700 border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <Link
                    href={`/companies/${company.id}`}
                    className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 group"
                  >
                    <span>View Company Radar</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </Link>

                  <Link
                    href={`/questions?q=${encodeURIComponent(company.name)}`}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <span>Questions</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Critical Weak Spots Alert Banner */}
        {criticalWeakTopics.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 text-xs sm:text-sm font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Placement Alert: High-Frequency Weak Spots Detected</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Your target companies frequently test these topics, but you currently have fewer than 2 problems solved or checklist items completed for them:
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {criticalWeakTopics.map(({ topic, companies }) => (
                <div
                  key={topic}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white border border-amber-300 text-xs shadow-sm"
                >
                  <span className="font-semibold text-slate-900">{topic}</span>
                  <span className="text-[11px] text-amber-700">({companies.join(', ')})</span>
                  <Link
                    href={`/questions`}
                    className="text-[11px] font-semibold text-violet-600 hover:text-violet-800 ml-1"
                  >
                    Practice →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200 bg-white shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Problems Solved</span>
            <BookOpen className="w-4 h-4 text-violet-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {stats.totalSolvedProblems}
          </div>
          <div className="text-[11px] text-slate-500">across IT & ECE guides</div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200 bg-white shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Checklist Topics</span>
            <CheckSquare className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {stats.totalChecklistDone}/{stats.totalChecklistItems}
          </div>
          <div className="text-[11px] text-slate-500">
            {stats.companiesCompleted} companies 100% ready
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200 bg-white shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Active Streak</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-600">
            {stats.currentStreakDays} <span className="text-sm font-semibold text-slate-500">days</span>
          </div>
          <div className="text-[11px] text-slate-500">Best: {stats.longestStreakDays} consecutive days</div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200 bg-white shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Level {userLevel.level} • Placement XP</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">
              {totalXp}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              / {userLevel.nextLevelXp} XP
            </span>
          </div>
          <div className="text-[11px] font-bold text-violet-700 truncate">
            {userLevel.title}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${userLevel.progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Spider Radar & Quick Target Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Spider Chart */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isEce ? 'bg-cyan-50 text-cyan-600 border border-cyan-200' : 'bg-violet-50 text-violet-600 border border-violet-200'
              }`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {isEce ? 'Hardware & VLSI Mastery Radar' : 'Topic Mastery Spider Radar'}
                </h3>
                <p className="text-xs text-slate-500">
                  Percentage of must-solve problems solved per category ({domain.toUpperCase()})
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <ReadinessRadar data={radarData} />
          </div>
        </div>

        {/* High-Yield Suggested Actions */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Recommended High-Yield Action
                </h3>
                <p className="text-xs text-slate-500">
                  Targeted study suggestions based on current weak points
                </p>
              </div>
            </div>

            {/* Quick Action List */}
            <div className="space-y-3">
              <Link
                href="/questions"
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-violet-50/60 border border-slate-200 hover:border-violet-300 flex items-center justify-between transition group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition">
                    Browse Question Bank ({domain === 'ece' ? 'STA, FSM, Protocols' : 'DSA & System Design'})
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Step-by-step interview outlines and code snippets
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href={isEce ? "/guides/sta-timing-analysis" : "/guides/dynamic-programming"}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-violet-50/60 border border-slate-200 hover:border-violet-300 flex items-center justify-between transition group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition">
                    {isEce 
                      ? 'Master Setup/Hold Slack & Clock Domain Crossing' 
                      : 'Solve 0/1 Knapsack & 2D LCS Dynamic Programming'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isEce 
                      ? 'Tested in 90% of NVIDIA, AMD, Qualcomm & Intel rounds' 
                      : 'Tested in 85% of Google, Infosys SP & Amazon technical rounds'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/compare"
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-violet-50/60 border border-slate-200 hover:border-violet-300 flex items-center justify-between transition group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition">
                    Compare Radar Trends Across 3 Companies
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isEce ? 'Unify preparation for NVIDIA vs Qualcomm vs Intel' : 'Unify preparation for TCS vs Infosys vs Capgemini'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 text-xs text-violet-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-violet-600 shrink-0" />
            <span>Progress automatically syncs to your local browser storage in real-time.</span>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <ActivityHeatmap
        activityHistory={stats.activityHistory}
        currentStreak={stats.currentStreakDays}
        longestStreak={stats.longestStreakDays}
      />

      {/* Achievements & Badges Hall of Fame */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Milestones & Badges ({unlockedIds.length}/{ACHIEVEMENTS.length} Unlocked)
              </h2>
              <p className="text-xs text-slate-500">
                Unlock badges by solving problems, maintaining consistency, and mastering company radars
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-600 self-start sm:self-auto">
            {totalXp} Total XP Earned
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((achievement) => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              isUnlocked={unlockedIds.includes(achievement.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
