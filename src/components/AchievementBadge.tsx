'use client';

import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Cpu, 
  Network, 
  GitBranch, 
  CheckCircle2, 
  Zap, 
  Award, 
  Bookmark, 
  Clock, 
  GitCompare,
  Lock,
  Star
} from 'lucide-react';
import { Achievement } from '@/lib/achievements';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Flame,
  Trophy,
  Cpu,
  Network,
  GitBranch,
  CheckCircle2,
  Zap,
  Award,
  Bookmark,
  Clock,
  GitCompare,
};

interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked: boolean;
}

export default function AchievementBadge({ achievement, isUnlocked }: AchievementBadgeProps) {
  const IconComponent = ICON_MAP[achievement.icon] || Star;

  const categoryColors = {
    Solving: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
    Mastery: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
    Consistency: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    Exploration: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
  };

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
        isUnlocked
          ? 'glass-card border-slate-700/80 hover:border-violet-500/40 hover:scale-[1.02] shadow-lg'
          : 'bg-slate-950/40 border-slate-900/80 opacity-60 grayscale'
      }`}
    >
      {/* Glow on unlocked */}
      {isUnlocked && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-500/15 via-transparent to-transparent rounded-bl-full pointer-events-none" />
      )}

      <div className="space-y-3">
        {/* Header with Icon & Points */}
        <div className="flex items-center justify-between">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner ${
              isUnlocked
                ? `bg-gradient-to-br ${categoryColors[achievement.category]}`
                : 'bg-slate-900 border-slate-800 text-slate-600'
            }`}
          >
            {isUnlocked ? (
              <IconComponent className="w-5 h-5" />
            ) : (
              <Lock className="w-4 h-4 text-slate-600" />
            )}
          </div>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              isUnlocked
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-slate-900 text-slate-600 border-slate-800'
            }`}
          >
            +{achievement.points} XP
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h4
            className={`text-sm font-bold truncate ${
              isUnlocked ? 'text-white' : 'text-slate-500'
            }`}
          >
            {achievement.title}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {achievement.description}
          </p>
        </div>
      </div>

      {/* Footer Category Badge */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
        <span className="text-slate-500 font-medium">{achievement.category}</span>
        <span
          className={`font-semibold ${
            isUnlocked ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-600'
          }`}
        >
          {isUnlocked ? '✓ Unlocked' : 'Locked'}
        </span>
      </div>
    </div>
  );
}
