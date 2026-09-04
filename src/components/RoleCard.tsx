'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Code, 
  BarChart3, 
  Database, 
  Cpu, 
  Cloud, 
  Terminal, 
  Shield, 
  Layers, 
  Compass, 
  Briefcase, 
  TrendingUp, 
  Target, 
  Zap, 
  Workflow, 
  Users, 
  ArrowRight,
  Building2,
  CheckCircle2,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { CareerRole } from '@/lib/careerPathsData';

interface RoleCardProps {
  role: CareerRole;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  BarChart3,
  Database,
  Cpu,
  Cloud,
  Terminal,
  Shield,
  Layers,
  Compass,
  Briefcase,
  TrendingUp,
  Target,
  Zap,
  Workflow,
  Users
};

export default function RoleCard({ role }: RoleCardProps) {
  const IconComponent = ICON_MAP[role.iconName] || Briefcase;
  const isTech = role.category === 'Technical';

  return (
    <div className="glass-card-hover rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full group border border-slate-800 relative overflow-hidden transition-all duration-300">
      {/* Background Accent Glow */}
      <div 
        className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none transition duration-500 ${
          isTech 
            ? 'bg-emerald-600/10 group-hover:bg-emerald-600/20' 
            : 'bg-violet-600/10 group-hover:bg-violet-600/20'
        }`} 
      />

      <div className="space-y-4">
        {/* Header Badges & Category */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg uppercase tracking-wider border ${
                isTech
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-violet-500/15 text-violet-300 border-violet-500/30'
              }`}
            >
              {role.category}
            </span>

            {role.badge && (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>{role.badge}</span>
              </span>
            )}
          </div>

          {/* Salary Badge */}
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-0.5 justify-end">
              <span>{role.salaryRange}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Avg: {role.averageCTC}</div>
          </div>
        </div>

        {/* Role Icon & Title */}
        <div className="flex items-start gap-3.5 pt-1">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-105 shadow-md ${
              isTech
                ? 'bg-emerald-600/15 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10'
                : 'bg-violet-600/15 text-violet-400 border-violet-500/30 shadow-violet-500/10'
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div>
            <Link
              href={`/career-paths/${role.slug}`}
              className="text-lg font-bold text-white group-hover:text-violet-300 transition line-clamp-1"
            >
              {role.title}
            </Link>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
              {role.tagline}
            </p>
          </div>
        </div>

        {/* Essential Skills Pills */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Key Skills Required:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {role.coreSkills.slice(0, 4).map((skill) => (
              <span
                key={skill.name}
                className="px-2 py-0.5 text-[11px] rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium"
              >
                {skill.name}
              </span>
            ))}
            {role.coreSkills.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                +{role.coreSkills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Top Hiring Companies Sample */}
        <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Building2 className="w-3 h-3 text-slate-500" />
            <span>Top Recruiters:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {role.hiringCompanies.slice(0, 4).map((c) => (
              <span
                key={c.name}
                className="px-2 py-0.5 text-[10px] rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 font-semibold"
              >
                {c.name}
              </span>
            ))}
            {role.hiringCompanies.length > 4 && (
              <span className="text-[10px] text-slate-500 self-center">
                +{role.hiringCompanies.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-5 mt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">{role.interviewRounds.length}</span> interview rounds
        </div>

        <Link
          href={`/career-paths/${role.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-violet-400 group-hover:text-violet-200 transition group-hover:translate-x-0.5 duration-200"
        >
          <span>Role Blueprint</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
