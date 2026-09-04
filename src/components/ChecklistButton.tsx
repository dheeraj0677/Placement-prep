'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckSquare, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface ChecklistButtonProps {
  companyId: string;
  companyName: string;
  topTags: string[];
}

export default function ChecklistButton({ companyId, companyName, topTags }: ChecklistButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGenerateChecklist = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId,
          tags: topTags.slice(0, 5),
        }),
      });

      const data = await res.json();

      // If in guest mode, save to localStorage as well
      if (data.guestMode && typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('placement_radar_checklist') || '[]');
        const newItems = data.items.filter(
          (item: any) => !stored.some((s: any) => s.company_id === item.company_id && s.tag === item.tag)
        );
        localStorage.setItem('placement_radar_checklist', JSON.stringify([...stored, ...newItems]));
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/checklist');
      }, 1200);
    } catch (err) {
      console.error('Checklist generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <button
        onClick={handleGenerateChecklist}
        disabled={loading || success}
        className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-lg ${
          success
            ? 'bg-emerald-600 text-white shadow-emerald-500/20'
            : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-violet-500/25 active:scale-98'
        } disabled:opacity-75`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Adding to Checklist...</span>
          </>
        ) : success ? (
          <>
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Checklist Generated! Redirecting...</span>
          </>
        ) : (
          <>
            <CheckSquare className="w-4 h-4" />
            <span>Generate My Prep Checklist</span>
          </>
        )}
      </button>

      {success && (
        <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium animate-fade-in">
          <span>5 top topics added for {companyName}</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      )}
    </div>
  );
}
