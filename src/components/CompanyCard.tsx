import React from 'react';
import Link from 'next/link';
import { Company } from '@/types/database';
import { Building2, ArrowRight, Layers } from 'lucide-react';
import { TAG_COLORS } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const topTags = company.top_tags || ['Arrays & Strings', 'DP', 'Graphs', 'Trees'];

  return (
    <Link
      href={`/companies/${company.id}`}
      className="group glass-card-hover rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Decorative gradient corner glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-blue-500/20 transition duration-300" />

      <div>
        {/* Header: Company Name & Industry */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-white font-bold text-base shadow-inner group-hover:border-blue-500/40 group-hover:scale-105 transition duration-300">
              {company.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">
                {company.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-500" />
                <span>{company.industry || 'Technology'}</span>
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Layers className="w-3 h-3" />
            {company.experience_count || 1} {company.experience_count === 1 ? 'post' : 'posts'}
          </span>
        </div>

        {/* Top Topic Tags */}
        <div className="mt-4">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Frequent Topics
          </div>
          <div className="flex flex-wrap gap-1.5">
            {topTags.slice(0, 4).map((tag) => {
              const colorInfo = TAG_COLORS[tag] || TAG_COLORS['Uncategorized'];
              return (
                <span
                  key={tag}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium border ${colorInfo.bg} ${colorInfo.text} ${colorInfo.border}`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-400 transition">
        <span>View Trend Radar</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
      </div>
    </Link>
  );
}
