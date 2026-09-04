'use client';

import React, { useState } from 'react';
import { Experience } from '@/types/database';
import { ExternalLink, ChevronDown, ChevronUp, Calendar, UserCheck } from 'lucide-react';
import { TAG_COLORS, ROUND_TYPE_COLORS } from '@/lib/constants';
import BookmarkButton from './BookmarkButton';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(true);
  const rounds = experience.rounds || [];

  return (
    <div className="glass-card rounded-xl border border-slate-800 overflow-hidden transition">
      {/* Header */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-semibold text-sm">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">
              {experience.role || 'Software Development Engineer'}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                {experience.year || 2024}
              </span>
              <span>•</span>
              <span className="text-slate-400">
                {experience.source_platform || 'GeeksforGeeks'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {experience.source_url && (
            <a
              href={experience.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 transition"
            >
              <span>Original Post</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <BookmarkButton
            id={experience.id}
            type="experience"
            title={`${experience.role || 'SDE'} Experience (${experience.year || 2024})`}
            subtitle={`${experience.source_platform || 'GeeksforGeeks'} • ${rounds.length} rounds`}
            url={experience.source_url || `/companies/${experience.company_id}`}
            size="sm"
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 text-slate-400 hover:text-white rounded-md bg-slate-800/80 transition"
            aria-label="Toggle rounds"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Rounds List */}
      {expanded && (
        <div className="p-4 sm:p-5 space-y-4 bg-slate-950/40">
          {rounds.map((round) => {
            const rType = round.round_type || 'Technical';
            const color = ROUND_TYPE_COLORS[rType] || '#71717a';

            return (
              <div
                key={round.id || round.round_number}
                className="rounded-lg p-3.5 bg-slate-900/80 border border-slate-800/80 space-y-2.5"
              >
                {/* Round Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">
                      Round {round.round_number}
                    </span>
                    <span
                      className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${color}20`, color: color }}
                    >
                      {rType}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {(round.tags || []).map((t) => {
                      const tagStyle = TAG_COLORS[t.tag] || TAG_COLORS['Uncategorized'];
                      return (
                        <span
                          key={t.id || t.tag}
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}
                        >
                          {t.tag}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Round Content */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {round.round_text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
