'use client';

import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, Circle, ChevronDown, ChevronUp, Lightbulb, HelpCircle, Code2 } from 'lucide-react';
import { GuideProblem } from '@/lib/guidesData';

interface ProblemRowProps {
  problem: GuideProblem;
  index: number;
  isSolved: boolean;
  onToggleSolved: (problemId: string) => void;
}

export default function ProblemRow({ problem, index, isSolved, onToggleSolved }: ProblemRowProps) {
  const [expanded, setExpanded] = useState(false);

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  const platformBadges = {
    LeetCode: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    GeeksforGeeks: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isSolved
          ? 'bg-emerald-950/20 border-emerald-500/30'
          : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800/80'
      }`}
    >
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Checkbox + Number + Title */}
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          <button
            type="button"
            onClick={() => onToggleSolved(problem.id)}
            className="mt-0.5 sm:mt-0 text-slate-400 hover:text-emerald-400 transition shrink-0"
            aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
          >
            {isSolved ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
            ) : (
              <Circle className="w-5 h-5 text-slate-500 hover:text-emerald-400" />
            )}
          </button>

          <span className="text-xs font-mono text-slate-500 shrink-0">
            #{String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 min-w-0">
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-semibold hover:text-blue-400 transition flex items-center gap-1.5 truncate ${
                isSolved ? 'text-slate-400 line-through' : 'text-slate-100'
              }`}
            >
              <span className="truncate">{problem.title}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70 hover:opacity-100 text-blue-400" />
            </a>
          </div>
        </div>

        {/* Right: Badges & Pattern + Expand Trigger */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-between sm:justify-end pl-8 sm:pl-0">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>

          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${platformBadges[problem.platform]}`}>
            {problem.platform}
          </span>

          <span className="hidden md:inline-block text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 max-w-[180px] truncate">
            {problem.pattern}
          </span>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 transition shrink-0"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{expanded ? 'Hide Insights' : 'Why & Approach'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expandable Interview Note Drawer */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 rounded-b-xl space-y-2.5 text-xs">
          <div className="flex items-start gap-2 text-slate-300">
            <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-indigo-300">Why Interviewers Ask This: </span>
              <span className="text-slate-300">{problem.whyAsked}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-300">
            <Code2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-emerald-300">Key Pattern & Takeaway: </span>
              <span className="text-slate-300 font-mono text-[11px] bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
                {problem.keyTakeaway}
              </span>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Pattern Technique: <strong className="text-slate-200">{problem.pattern}</strong></span>
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
            >
              Solve on {problem.platform} &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
