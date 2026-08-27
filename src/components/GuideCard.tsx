import React from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Network, 
  GitBranch, 
  Code, 
  Layers, 
  Database, 
  Terminal, 
  Globe, 
  Box, 
  Users, 
  Calculator, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Target,
  Sparkles,
  Building2
} from 'lucide-react';
import { PrepGuide } from '@/lib/guidesData';
import { TAG_COLORS } from '@/lib/constants';

interface GuideCardProps {
  guide: PrepGuide;
  completedProblemsCount?: number;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Network,
  GitBranch,
  Code,
  Layers,
  Database,
  Terminal,
  Globe,
  Box,
  Users,
  Calculator,
};

export default function GuideCard({ guide, completedProblemsCount = 0 }: GuideCardProps) {
  const IconComponent = ICON_MAP[guide.iconName] || BookOpen;
  const tagStyle = TAG_COLORS[guide.tag] || TAG_COLORS['Uncategorized'];

  const difficultyColors = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Advanced: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  const categoryBadges = {
    'DSA': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'CS Fundamentals': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'System Design': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Soft Skills': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  return (
    <div className="glass-card-hover rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full group border border-slate-800 relative overflow-hidden transition-all duration-300">
      {/* Glow background on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 group-hover:bg-blue-600/15 rounded-full blur-2xl pointer-events-none transition duration-500" />

      <div className="space-y-4">
        {/* Top Badges Header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${categoryBadges[guide.category]}`}>
            {guide.category}
          </span>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${difficultyColors[guide.difficulty]}`}>
            {guide.difficulty}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3.5 pt-1">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-inner ${tagStyle.bg} ${tagStyle.border} ${tagStyle.text}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition line-clamp-1">
              {guide.title}
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] text-blue-400 font-medium">
              <Sparkles className="w-3 h-3" />
              {guide.importanceWeight}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {guide.shortDescription}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Target className="w-3.5 h-3.5 text-blue-400" />
            <span><strong className="text-white font-semibold">{guide.problems.length}</strong> Must-Solve Problems</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span><strong className="text-white font-semibold">~{guide.estimatedHours}h</strong> Study Path</span>
          </div>
        </div>

        {/* Top Tested Companies Tags */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            Tested heavily at:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {guide.testedCompanies.slice(0, 4).map((comp) => (
              <span
                key={comp}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                {comp}
              </span>
            ))}
            {guide.testedCompanies.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md text-slate-500">
                +{guide.testedCompanies.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action CTA Link */}
      <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {guide.concepts.length} key concepts
        </span>
        <Link
          href={`/guides/${guide.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition"
        >
          <span>Open Guide & Problems</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </div>
  );
}
