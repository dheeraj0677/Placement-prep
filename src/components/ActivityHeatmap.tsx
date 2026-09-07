'use client';

import React, { useMemo } from 'react';
import { Flame, Calendar, Sparkles } from 'lucide-react';

interface ActivityHeatmapProps {
  activityHistory: Record<string, number>;
  currentStreak: number;
  longestStreak: number;
}

export default function ActivityHeatmap({
  activityHistory,
  currentStreak,
  longestStreak,
}: ActivityHeatmapProps) {
  // Generate the past 16 weeks of days (112 days)
  const calendarData = useMemo(() => {
    const days: { date: string; count: number; dayOfWeek: number; month: string }[] = [];
    const today = new Date();
    
    // Total days to display (16 weeks = 112 days)
    const TOTAL_DAYS = 112;

    for (let i = TOTAL_DAYS - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const count = activityHistory[dateStr] || 0;
      const dayOfWeek = d.getDay(); // 0 (Sun) to 6 (Sat)
      const month = d.toLocaleString('default', { month: 'short' });

      days.push({
        date: dateStr,
        count,
        dayOfWeek,
        month,
      });
    }

    return days;
  }, [activityHistory]);

  const totalActivityCount = useMemo(() => {
    return Object.values(activityHistory).reduce((a, b) => a + b, 0);
  }, [activityHistory]);

  // Color mapper based on count
  const getColor = (count: number) => {
    if (count === 0) return 'bg-slate-100 border-slate-200';
    if (count <= 2) return 'bg-emerald-100 border-emerald-300';
    if (count <= 5) return 'bg-emerald-300 border-emerald-400';
    return 'bg-emerald-500 border-emerald-600 shadow-sm shadow-emerald-500/20';
  };

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-5">
      {/* Header with Streaks */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Preparation Consistency Calendar</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-normal">
                Past 16 Weeks
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {totalActivityCount} total prep activities recorded
            </p>
          </div>
        </div>

        {/* Streak Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <div className="text-xs">
              <span className="font-extrabold text-orange-700">{currentStreak} day</span>
              <span className="text-slate-500 ml-1 font-medium">current streak</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <div className="text-xs">
              <span className="font-extrabold text-indigo-700">{longestStreak} day</span>
              <span className="text-slate-500 ml-1 font-medium">longest streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5">
            {calendarData.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} activities`}
                className={`w-3.5 h-3.5 rounded-[4px] border transition duration-200 hover:scale-125 cursor-pointer ${getColor(
                  day.count
                )}`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-4">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-3 h-3 rounded-[3px] bg-slate-100 border border-slate-200" />
              <div className="w-3 h-3 rounded-[3px] bg-emerald-100 border border-emerald-300" />
              <div className="w-3 h-3 rounded-[3px] bg-emerald-300 border border-emerald-400" />
              <div className="w-3 h-3 rounded-[3px] bg-emerald-500 border border-emerald-600" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
