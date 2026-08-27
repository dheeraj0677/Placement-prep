'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { RoundTypeBreakdown } from '@/types/database';
import { ROUND_TYPE_COLORS } from '@/lib/constants';

interface RoundTypePieChartProps {
  data: RoundTypeBreakdown[];
}

export default function RoundTypePieChart({ data }: RoundTypePieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 text-sm">
        No round data available
      </div>
    );
  }

  const chartData = data.map(d => ({
    name: d.round_type,
    value: d.count,
    percentage: d.percentage,
    color: ROUND_TYPE_COLORS[d.round_type] || '#71717a',
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700/80 p-2.5 rounded-lg shadow-xl text-xs space-y-1">
          <div className="font-semibold text-white flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </div>
          <div className="text-slate-300">
            Total Rounds: <span className="font-semibold text-blue-400">{item.value}</span>
          </div>
          <div className="text-slate-400">
            Percentage: <span className="font-semibold text-emerald-400">{item.percentage}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72 flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="#0f172a"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-xs text-slate-300 ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
