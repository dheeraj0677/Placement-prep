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
    Solving: 'from-violet-50 to-purple-50 text-violet-700 border-violet-200',
    Mastery: 'from-purple-50 to-pink-50 text-purple-700 border-purple-200',
    Consistency: 'from-amber-50 to-orange-50 text-amber-700 border-amber-200',
    Exploration: 'from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200',
  };

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
        isUnlocked
          ? 'glass-card border-slate-200 hover:border-violet-300 hover:scale-[1.02] shadow-sm'
          : 'bg-slate-100/60 border-slate-200 opacity-60 grayscale'
      }`}
    >
      {/* Glow on unlocked */}
      {isUnlocked && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-500/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
      )}

      <div className="space-y-3">
        {/* Header with Icon & Points */}
        <div className="flex items-center justify-between">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm ${
              isUnlocked
                ? `bg-gradient-to-br ${categoryColors[achievement.category]}`
                : 'bg-slate-100 border-slate-200 text-slate-400'
            }`}
          >
            {isUnlocked ? (
              <IconComponent className="w-5 h-5" />
            ) : (
              <Lock className="w-4 h-4 text-slate-400" />
            )}
          </div>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              isUnlocked
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            +{achievement.points} XP
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h4
            className={`text-sm font-bold truncate ${
              isUnlocked ? 'text-slate-900' : 'text-slate-500'
            }`}
          >
            {achievement.title}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {achievement.description}
          </p>
        </div>
      </div>

      {/* Footer Category Badge */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
        <span className="text-slate-500 font-medium">{achievement.category}</span>
        <span
          className={`font-semibold ${
            isUnlocked ? 'text-emerald-700 flex items-center gap-1' : 'text-slate-400'
          }`}
        >
          {isUnlocked ? '✓ Unlocked' : 'Locked'}
        </span>
      </div>
    </div>
  );
}
