'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface TopicScore {
  subject: string;
  A: number; // User Mastery % (0 - 100)
  fullMark: number; // 100
}

interface ReadinessRadarProps {
  data: TopicScore[];
}

export default function ReadinessRadar({ data }: ReadinessRadarProps) {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#334155" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 10 }}
            axisLine={{ stroke: '#334155' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            formatter={(value: any) => [`${value}% Mastery`, 'Preparedness']}
          />
          <Radar
            name="Preparedness Level"
            dataKey="A"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.45}
            dot={{ r: 3, fill: '#a78bfa', stroke: '#6d28d9' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
