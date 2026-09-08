'use client';

import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, Circle, ChevronDown, ChevronUp, Lightbulb, HelpCircle, Code2 } from 'lucide-react';
import { GuideProblem } from '@/lib/guidesData';
import BookmarkButton from './BookmarkButton';

interface ProblemRowProps {
  problem: GuideProblem;
  index: number;
  isSolved: boolean;
  onToggleSolved: (problemId: string) => void;
}

export default function ProblemRow({ problem, index, isSolved, onToggleSolved }: ProblemRowProps) {
  const [expanded, setExpanded] = useState(false);

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Hard: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const platformBadges: Record<string, string> = {
    LeetCode: 'bg-amber-50 text-amber-800 border-amber-200',
    GeeksforGeeks: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    HDLBits: 'bg-blue-50 text-blue-800 border-blue-200',
    Edaplayground: 'bg-purple-50 text-purple-800 border-purple-200',
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isSolved
          ? 'bg-emerald-50/70 border-emerald-300'
          : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-sm'
      }`}
    >
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Checkbox + Number + Title */}
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          <button
            type="button"
            onClick={() => onToggleSolved(problem.id)}
            className="mt-0.5 sm:mt-0 text-slate-400 hover:text-emerald-600 transition shrink-0"
            aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
          >
            {isSolved ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
            ) : (
              <Circle className="w-5 h-5 text-slate-400 hover:text-emerald-600" />
            )}
          </button>

          <span className="text-xs font-mono text-slate-400 shrink-0">
            #{String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 min-w-0">
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-semibold hover:text-violet-600 transition flex items-center gap-1.5 truncate ${
                isSolved ? 'text-slate-400 line-through' : 'text-slate-900'
              }`}
            >
              <span className="truncate">{problem.title}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 hover:opacity-100 text-violet-600" />
            </a>
          </div>
        </div>

        {/* Right: Badges & Pattern + Expand Trigger */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-between sm:justify-end pl-8 sm:pl-0">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>

          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${platformBadges[problem.platform] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
            {problem.platform}
          </span>

          <span className="hidden md:inline-block text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 max-w-[180px] truncate font-medium">
            {problem.pattern}
          </span>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-violet-700 hover:text-violet-800 font-medium px-2.5 py-1 rounded-lg bg-violet-50 border border-violet-200 transition shrink-0"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{expanded ? 'Hide Insights' : 'Why & Approach'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <BookmarkButton
            id={problem.id}
            type="problem"
            title={problem.title}
            subtitle={`${problem.difficulty} • ${problem.platform} (${problem.pattern})`}
            url={problem.url}
            size="sm"
          />
        </div>
      </div>

      {/* Expandable Interview Note Drawer */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-200 bg-slate-50/80 rounded-b-xl space-y-2.5 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-indigo-700">Why Interviewers Ask This: </span>
              <span className="text-slate-600">{problem.whyAsked}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-700">
            <Code2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-emerald-700">Key Pattern & Takeaway: </span>
              <span className="text-slate-800 font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200">
                {problem.keyTakeaway}
              </span>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Pattern Technique: <strong className="text-slate-800">{problem.pattern}</strong></span>
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 hover:text-violet-800 underline flex items-center gap-1 font-medium"
            >
              Solve on {problem.platform} &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
