'use client';

import React from 'react';
import Link from 'next/link';
import { Company } from '@/types/database';
import { Building2, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { TAG_COLORS } from '@/lib/constants';
import BookmarkButton from './BookmarkButton';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const topTags = company.top_tags || ['Arrays & Strings', 'DP', 'Graphs', 'Trees'];

  // Dynamic avatar gradient colors based on company name letter
  const avatarGradients = [
    'from-violet-600 to-purple-600 border-violet-400/40 text-white',
    'from-purple-600 to-fuchsia-600 border-purple-400/40 text-white',
    'from-emerald-600 to-teal-600 border-emerald-400/40 text-white',
    'from-amber-600 to-orange-600 border-amber-400/40 text-white',
    'from-indigo-600 to-violet-600 border-indigo-400/40 text-white',
  ];
  const charCode = company.name.charCodeAt(0) || 0;
  const gradientClass = avatarGradients[charCode % avatarGradients.length];

  return (
    <Link
      href={`/companies/${company.id}`}
      className="group glass-card-hover rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Decorative gradient corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/15 via-purple-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-violet-500/25 transition duration-500" />

      <div>
        {/* Header: Company Name, Industry & Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${gradientClass} border flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-105 transition duration-300`}>
              {company.name.charAt(0)}
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-violet-300 transition line-clamp-1">
                {company.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate max-w-[140px]">{company.industry || 'Technology'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
              <Layers className="w-3 h-3" />
              {company.experience_count || 1} {company.experience_count === 1 ? 'post' : 'posts'}
            </span>

            <BookmarkButton
              id={company.id}
              type="company"
              title={`${company.name} Interview Radar`}
              subtitle={company.industry || 'Technology'}
              url={`/companies/${company.id}`}
              tag={company.top_tags?.[0]}
              size="sm"
            />
          </div>
        </div>

        {/* Top Topic Tags */}
        <div className="mt-4 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span>High-Frequency Topics</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {topTags.slice(0, 4).map((tag) => {
              const colorInfo = TAG_COLORS[tag] || TAG_COLORS['Uncategorized'];
              return (
                <span
                  key={tag}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium border ${colorInfo.bg} ${colorInfo.text} ${colorInfo.border} shadow-sm`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-violet-400 transition">
        <span>View Live Trend Radar</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition duration-200" />
      </div>
    </Link>
  );
}
