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
  CheckCircle2
} from 'lucide-react';
import { PREP_GUIDES } from '@/lib/guidesData';
import { MOCK_COMPANIES } from '@/lib/mockData';
import { getUserStats, checkNewAchievements, ACHIEVEMENTS, UserStats } from '@/lib/achievements';
import ActivityHeatmap from '@/components/ActivityHeatmap';
import ReadinessRadar from '@/components/ReadinessRadar';
import AchievementBadge from '@/components/AchievementBadge';
import AchievementToast from '@/components/AchievementToast';

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const guideSlugs = useMemo(() => PREP_GUIDES.map((g) => g.slug), []);

  useEffect(() => {
    setMounted(true);
    const currentStats = getUserStats(guideSlugs);
    setStats(currentStats);

    const { allUnlocked } = checkNewAchievements(currentStats);
    setUnlockedIds(allUnlocked);

    const handleUpdate = () => {
      const updated = getUserStats(guideSlugs);
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
  }, [guideSlugs]);

  // Compute Topic Radar Data
  const radarData = useMemo(() => {
    if (!stats) return [];

    const topicProblemTotals: Record<string, number> = {
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

    return Object.entries(topicProblemTotals).map(([subject, total]) => {
      const solved = stats.solvedByTopic[subject] || 0;
      const pct = Math.min(100, Math.round((solved / total) * 100));
      return {
        subject,
        A: pct,
        fullMark: 100,
      };
    });
  }, [stats]);

  // Overall Placement Readiness Score (0 to 100%)
  const { readinessScore, rankTitle, rankColor } = useMemo(() => {
    if (!stats) return { readinessScore: 0, rankTitle: 'Novice Prep', rankColor: 'text-slate-400' };

    // Total problems in all guides = ~50
    const problemScore = Math.min(50, stats.totalSolvedProblems * 1.5);
    // Checklist score = up to 30
    const checklistRatio = stats.totalChecklistItems > 0 ? (stats.totalChecklistDone / stats.totalChecklistItems) : 0;
    const checklistScore = Math.round(checklistRatio * 30);
    // Consistency score = up to 20
    const streakScore = Math.min(20, stats.currentStreakDays * 4);

    const total = Math.min(100, Math.round(problemScore + checklistScore + streakScore));

    let title = 'Placement Aspirant';
    let color = 'text-slate-300';

    if (total >= 80) {
      title = '🔥 Placement Ready (Tier-1)';
      color = 'text-emerald-400';
    } else if (total >= 50) {
      title = '⚡ Interview Competent';
      color = 'text-blue-400';
    } else if (total >= 25) {
      title = '🚀 Algorithm Apprentice';
      color = 'text-indigo-400';
    }

    return { readinessScore: total, rankTitle: title, rankColor: color };
  }, [stats]);

  // Total XP from unlocked achievements
  const totalXp = useMemo(() => {
    return ACHIEVEMENTS.filter((a) => unlockedIds.includes(a.id)).reduce(
      (sum, a) => sum + a.points,
      0
    );
  }, [unlockedIds]);

  if (!mounted || !stats) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-400">Loading your preparation analytics dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <AchievementToast />

      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Personal Placement Analytics</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Preparation <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">Command Center</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            Real-time tracking of topic mastery, consistency streaks, solved problems, and target company readiness.
          </p>
        </div>

        {/* Readiness Score Gauge */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-center min-w-[200px] space-y-1 shadow-inner shrink-0">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Readiness Score
          </div>
          <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            {readinessScore}%
          </div>
          <div className={`text-xs font-bold ${rankColor}`}>
            {rankTitle}
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Problems Solved</span>
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {stats.totalSolvedProblems}
          </div>
          <div className="text-[11px] text-slate-400">across all curated guides</div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Checklist Topics</span>
            <CheckSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {stats.totalChecklistDone}/{stats.totalChecklistItems}
          </div>
          <div className="text-[11px] text-slate-400">
            {stats.companiesCompleted} companies 100% ready
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Streak</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-400">
            {stats.currentStreakDays} <span className="text-sm font-semibold text-slate-400">days</span>
          </div>
          <div className="text-[11px] text-slate-400">Best: {stats.longestStreakDays} consecutive days</div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Placement XP</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
            {totalXp}
          </div>
          <div className="text-[11px] text-slate-400">
            {unlockedIds.length} of {ACHIEVEMENTS.length} badges unlocked
          </div>
        </div>
      </div>

      {/* Spider Radar & Quick Target Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Spider Chart */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Topic Mastery Spider Radar
                </h3>
                <p className="text-xs text-slate-400">
                  Percentage of must-solve problems solved per category
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <ReadinessRadar data={radarData} />
          </div>
        </div>

        {/* Target Action Next Steps */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Recommended High-Yield Action
                </h3>
                <p className="text-xs text-slate-400">
                  Targeted study suggestions based on current weak points
                </p>
              </div>
            </div>

            {/* Quick Action List */}
            <div className="space-y-3">
              <Link
                href="/guides/dynamic-programming"
                className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 flex items-center justify-between transition group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                    Solve 0/1 Knapsack & 2D LCS Dynamic Programming
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Tested in 85% of Google, Infosys SP & Amazon technical rounds
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/compare"
                className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 flex items-center justify-between transition group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                    Compare Radar Trends Across 3 Companies
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Unify preparation for TCS vs Infosys vs Capgemini
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/checklist"
                className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 flex items-center justify-between transition group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                    Review Remaining Checklist Topics ({stats.totalChecklistItems - stats.totalChecklistDone} left)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Mark off mastered concepts to raise your readiness index
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
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
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Milestones & Badges ({unlockedIds.length}/{ACHIEVEMENTS.length} Unlocked)
              </h2>
              <p className="text-xs text-slate-400">
                Unlock badges by solving problems, maintaining consistency, and mastering company radars
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-400 self-start sm:self-auto">
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
