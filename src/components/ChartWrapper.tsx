'use client';

import React, { useEffect, useState } from 'react';

interface ChartWrapperProps {
  children: React.ReactNode;
  height?: number | string;
}

export default function ChartWrapper({ children, height = 300 }: ChartWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="w-full flex items-center justify-center bg-slate-100/70 rounded-xl border border-slate-200 animate-pulse"
        style={{ height }}
      >
        <div className="flex flex-col items-center gap-2 text-slate-500 text-sm">
          <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading radar visualization...</span>
        </div>
      </div>
    );
  }

  return <div className="w-full" style={{ height }}>{children}</div>;
}
