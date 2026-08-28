'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  Target, 
  CheckCircle2, 
  BookOpen, 
  Building2, 
  Lightbulb, 
  ListOrdered, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  CheckSquare,
  Compass,
  ArrowRight
} from 'lucide-react';
import { PrepGuide, PREP_GUIDES } from '@/lib/guidesData';
import { TAG_COLORS } from '@/lib/constants';
import ProblemRow from '@/components/ProblemRow';
import PracticeTimer from '@/components/PracticeTimer';
import AchievementToast from '@/components/AchievementToast';
import BookmarkButton from '@/components/BookmarkButton';
import { recordActivity, getUserStats, checkNewAchievements } from '@/lib/achievements';

interface GuideDetailClientProps {
  guide: PrepGuide;
}

export default function GuideDetailClient({ guide }: GuideDetailClientProps) {
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load solved problems from local storage
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(`placement_prep_solved_${guide.slug}`);
      if (stored) {
        setSolvedIds(JSON.parse(stored));
      }
    } catch (e) {}
  }, [guide.slug]);

  // Toggle problem solved
  const handleToggleSolved = (problemId: string) => {
    setSolvedIds((prev) => {
      const isAlready = prev.includes(problemId);
      const next = isAlready ? prev.filter(id => id !== problemId) : [...prev, problemId];
      try {
        localStorage.setItem(`placement_prep_solved_${guide.slug}`, JSON.stringify(next));
        if (!isAlready) {
          recordActivity(1);
          // Check for achievements
          const stats = getUserStats();
          checkNewAchievements(stats);
        }
      } catch (e) {}
      return next;
    });
  };

  const tagStyle = TAG_COLORS[guide.tag] || TAG_COLORS['Uncategorized'];
  const solvedCount = solvedIds.length;
  const totalProblems = guide.problems.length;
  const progressPercent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  // Other related guides
  const relatedGuides = PREP_GUIDES.filter(g => g.slug !== guide.slug).slice(0, 3);

  const difficultyColors = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Advanced: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative">
      <AchievementToast />
      <PracticeTimer />

      {/* Back to Guides Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Prep Guides</span>
        </Link>

        <BookmarkButton
          id={guide.slug}
          type="guide"
          title={guide.title}
          subtitle={`${guide.problems.length} problems • ~${guide.estimatedHours}h`}
          url={`/guides/${guide.slug}`}
          tag={guide.tag}
          size="md"
        />
      </div>

      {/* Hero Banner Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}>
                {guide.tag} Guide
              </span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${difficultyColors[guide.difficulty]}`}>
                {guide.difficulty} Level
              </span>
              <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">
                {guide.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {guide.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {guide.overview}
            </p>
          </div>

          {/* Quick Metrics Badge on Hero */}
          <div className="flex sm:flex-col gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center min-w-[110px]">
              <div className="text-xl font-bold text-blue-400">{guide.problems.length}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Must-Solve</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center min-w-[110px]">
              <div className="text-xl font-bold text-indigo-400">~{guide.estimatedHours}h</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Study Time</div>
            </div>
          </div>
        </div>

        {/* Progress Bar for this Guide */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Your Solving Progress
            </span>
            <span className="font-bold text-emerald-400">
              {solvedCount} of {totalProblems} solved ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Key Concepts Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Core Concepts to Master
            </h2>
            <p className="text-xs text-slate-400">
              Essential theoretical foundations and problem patterns tested by top tech interviewers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guide.concepts.map((concept, idx) => (
            <div
              key={concept.title}
              className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 space-y-2 relative"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-blue-400 font-mono">
                  Concept #{idx + 1}
                </span>
                {concept.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {concept.badge}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white">
                {concept.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Must-Solve Problems Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Must-Solve Problems ({guide.problems.length})
              </h2>
              <p className="text-xs text-slate-400">
                Click any problem to open directly on LeetCode/GFG, or expand for interview insights
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-400 self-start sm:self-auto">
            {solvedCount}/{totalProblems} Checked Off
          </span>
        </div>

        <div className="space-y-3">
          {guide.problems.map((problem, idx) => (
            <ProblemRow
              key={problem.id}
              problem={problem}
              index={idx}
              isSolved={solvedIds.includes(problem.id)}
              onToggleSolved={handleToggleSolved}
            />
          ))}
        </div>
      </div>

      {/* Recommended Order & Tactical Interview Tips Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Recommended Order */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ListOrdered className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Recommended Study Sequence
              </h3>
              <p className="text-xs text-slate-400">
                Optimal progression from fundamentals to advanced patterns
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {guide.recommendedOrder.map((step, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 font-medium flex items-center gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-[11px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <span>{step.replace(/^\d+\.\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real Tactical Interview Tips */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Tactical Interview Tips
              </h3>
              <p className="text-xs text-slate-400">
                What interviewers actively look for during live technical rounds
              </p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300">
            {guide.interviewTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Target Companies That Test This */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Companies With High Frequency for {guide.tag}
            </h3>
            <p className="text-xs text-slate-400">
              Explore real interview posts and round breakdowns for companies that test this topic
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {guide.testedCompanies.map((comp) => (
            <Link
              key={comp}
              href={`/companies?search=${encodeURIComponent(comp)}`}
              className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-950/40 text-slate-200 hover:text-blue-300 border border-slate-800 hover:border-blue-500/40 text-xs font-semibold transition"
            >
              <span>{comp}</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Explore Related Guides */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white">
            Continue Your Prep with Other Guides
          </h3>
          <Link
            href="/guides"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>View all guides</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedGuides.map((rel) => (
            <Link
              key={rel.slug}
              href={`/guides/${rel.slug}`}
              className="glass-card-hover rounded-xl p-4 border border-slate-800 space-y-2 block group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-blue-400">
                  {rel.tag}
                </span>
                <span className="text-[10px] text-slate-500">
                  {rel.problems.length} problems
                </span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition line-clamp-1">
                {rel.title}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {rel.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
