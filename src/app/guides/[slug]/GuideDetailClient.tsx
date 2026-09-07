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
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
    Advanced: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative">
      <AchievementToast />
      <PracticeTimer />

      {/* Back to Guides Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
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
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}>
                {guide.tag} Guide
              </span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${difficultyColors[guide.difficulty]}`}>
                {guide.difficulty} Level
              </span>
              <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                {guide.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {guide.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {guide.overview}
            </p>
          </div>

          {/* Quick Metrics Badge on Hero */}
          <div className="flex sm:flex-col gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[110px]">
              <div className="text-xl font-bold text-violet-600">{guide.problems.length}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Must-Solve</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[110px]">
              <div className="text-xl font-bold text-indigo-600">~{guide.estimatedHours}h</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Study Time</div>
            </div>
          </div>
        </div>

        {/* Progress Bar for this Guide */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Your Solving Progress
            </span>
            <span className="font-bold text-emerald-600">
              {solvedCount} of {totalProblems} solved ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Key Concepts Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Core Concepts to Master
            </h2>
            <p className="text-xs text-slate-500">
              Essential theoretical foundations and problem patterns tested by top tech interviewers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guide.concepts.map((concept, idx) => (
            <div
              key={concept.title}
              className="glass-card rounded-xl p-4 sm:p-5 border border-slate-200 bg-white space-y-2 relative shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-violet-600 font-mono">
                  Concept #{idx + 1}
                </span>
                {concept.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {concept.badge}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {concept.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
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
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Must-Solve Problems ({guide.problems.length})
              </h2>
              <p className="text-xs text-slate-500">
                Click any problem to open directly on LeetCode/GFG, or expand for interview insights
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-500 self-start sm:self-auto font-medium">
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
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <ListOrdered className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recommended Study Sequence
              </h3>
              <p className="text-xs text-slate-500">
                Optimal progression from fundamentals to advanced patterns
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {guide.recommendedOrder.map((step, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium flex items-center gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <span>{step.replace(/^\d+\.\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real Tactical Interview Tips */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Tactical Interview Tips
              </h3>
              <p className="text-xs text-slate-500">
                What interviewers actively look for during live technical rounds
              </p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {guide.interviewTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Target Companies That Test This */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Companies With High Frequency for {guide.tag}
            </h3>
            <p className="text-xs text-slate-500">
              Explore real interview posts and round breakdowns for companies that test this topic
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {guide.testedCompanies.map((comp) => (
            <Link
              key={comp}
              href={`/companies?search=${encodeURIComponent(comp)}`}
              className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-800 border border-slate-200 hover:border-violet-300 text-xs font-semibold transition"
            >
              <span>{comp}</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-violet-600" />
            </Link>
          ))}
        </div>
      </div>

      {/* Explore Related Guides */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Continue Your Prep with Other Guides
          </h3>
          <Link
            href="/guides"
            className="text-xs font-semibold text-violet-600 hover:text-violet-800 flex items-center gap-1"
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
              className="glass-card-hover rounded-xl p-4 border border-slate-200 bg-white space-y-2 block group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-violet-600">
                  {rel.tag}
                </span>
                <span className="text-[10px] text-slate-400">
                  {rel.problems.length} problems
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-violet-700 transition line-clamp-1">
                {rel.title}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {rel.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
