'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, X, Award } from 'lucide-react';
import { Achievement } from '@/lib/achievements';

export default function AchievementToast() {
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleUnlock = (e: any) => {
      const detail: Achievement = e.detail;
      if (detail) {
        setActiveToast(detail);

        // Auto dismiss after 5 seconds
        setTimeout(() => {
          setActiveToast((curr) => (curr?.id === detail.id ? null : curr));
        }, 5000);
      }
    };

    window.addEventListener('achievement_unlocked', handleUnlock);
    return () => window.removeEventListener('achievement_unlocked', handleUnlock);
  }, []);

  if (!activeToast) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-bounce-in max-w-sm w-full">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/90 border border-amber-500/40 shadow-2xl shadow-amber-500/10 backdrop-blur-xl relative overflow-hidden">
        {/* Shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 animate-pulse" />

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Trophy className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Achievement Unlocked!
              </span>
              <button
                onClick={() => setActiveToast(null)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h4 className="text-sm font-bold text-white truncate">
              {activeToast.title}
            </h4>

            <p className="text-xs text-slate-300 line-clamp-2">
              {activeToast.description}
            </p>

            <div className="pt-1 text-[11px] font-semibold text-emerald-400">
              +{activeToast.points} Placement XP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
