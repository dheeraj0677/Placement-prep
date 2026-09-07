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
          <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderRadius: '8px',
              color: '#0f172a',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
            formatter={(value: any) => [`${value}% Mastery`, 'Preparedness']}
          />
          <Radar
            name="Preparedness Level"
            dataKey="A"
            stroke="#7c3aed"
            fill="#8b5cf6"
            fillOpacity={0.35}
            dot={{ r: 3, fill: '#7c3aed', stroke: '#ffffff' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
