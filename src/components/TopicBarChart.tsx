'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TopicFrequency } from '@/types/database';
import { TAG_COLORS } from '@/lib/constants';

interface TopicBarChartProps {
  data: TopicFrequency[];
}

export default function TopicBarChart({ data }: TopicBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 text-sm">
        No topic data available
      </div>
    );
  }

  // Top 8 topics for clean visualization
  const chartData = data.slice(0, 8).map(d => ({
    ...d,
    fillColor: TAG_COLORS[d.tag]?.bar || '#8b5cf6',
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <div className="font-semibold text-slate-900 flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: item.fillColor }}
            />
            {item.tag}
          </div>
          <div className="text-slate-600">
            Frequency: <span className="font-semibold text-violet-700">{item.count}</span> mentions
          </div>
          <div className="text-slate-500">
            Share: <span className="font-semibold text-emerald-700">{item.percentage}%</span> of interview rounds
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
        >
          <XAxis
            type="number"
            domain={[0, 'dataMax + 5']}
            tickFormatter={(val) => `${val}%`}
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="tag"
            stroke="#334155"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }} />
          <Bar
            dataKey="percentage"
            radius={[0, 6, 6, 0]}
            barSize={18}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fillColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
