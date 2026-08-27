'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { CheckSquare, CheckCircle2, Circle, Trash2, Plus, Sparkles, Building2, ExternalLink, ArrowRight, ShieldCheck, LogIn } from 'lucide-react';
import { TAG_COLORS } from '@/lib/constants';

interface ChecklistItem {
  id: string;
  company_id: string;
  tag: string;
  is_done: boolean;
  company?: {
    id: string;
    name: string;
    logo_url?: string | null;
    industry?: string | null;
  };
}

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [newTagInput, setNewTagInput] = useState<{ [companyId: string]: string }>({});

  const supabase = createClient();

  useEffect(() => {
    async function loadChecklist() {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // Fetch from Supabase
          const { data, error } = await supabase
            .from('user_checklists')
            .select(`
              id,
              user_id,
              company_id,
              tag,
              is_done,
              company:companies(id, name, logo_url, industry)
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            setItems(data as any);
            setLoading(false);
            return;
          }
        }

        // Check local storage fallback (guest mode or pre-populated demo)
        const local = localStorage.getItem('placement_radar_checklist');
        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setItems(parsed);
              setLoading(false);
              return;
            }
          } catch (e) {}
        }

        // Default initial items if completely empty
        const defaultInitial: ChecklistItem[] = [
          {
            id: 'init-g-1',
            company_id: 'comp-google',
            tag: 'DP',
            is_done: true,
            company: { id: 'comp-google', name: 'Google', industry: 'Technology' },
          },
          {
            id: 'init-g-2',
            company_id: 'comp-google',
            tag: 'Graphs',
            is_done: false,
            company: { id: 'comp-google', name: 'Google', industry: 'Technology' },
          },
          {
            id: 'init-g-3',
            company_id: 'comp-google',
            tag: 'Trees',
            is_done: false,
            company: { id: 'comp-google', name: 'Google', industry: 'Technology' },
          },
          {
            id: 'init-g-4',
            company_id: 'comp-google',
            tag: 'System Design',
            is_done: false,
            company: { id: 'comp-google', name: 'Google', industry: 'Technology' },
          },
          {
            id: 'init-a-1',
            company_id: 'comp-amazon',
            tag: 'Arrays & Strings',
            is_done: true,
            company: { id: 'comp-amazon', name: 'Amazon', industry: 'E-Commerce & Cloud' },
          },
          {
            id: 'init-a-2',
            company_id: 'comp-amazon',
            tag: 'OOP',
            is_done: false,
            company: { id: 'comp-amazon', name: 'Amazon', industry: 'E-Commerce & Cloud' },
          },
          {
            id: 'init-a-3',
            company_id: 'comp-amazon',
            tag: 'System Design',
            is_done: false,
            company: { id: 'comp-amazon', name: 'Amazon', industry: 'E-Commerce & Cloud' },
          },
        ];

        setItems(defaultInitial);
        localStorage.setItem('placement_radar_checklist', JSON.stringify(defaultInitial));
      } catch (err) {
        console.error('Error loading checklist:', err);
      } finally {
        setLoading(false);
      }
    }

    loadChecklist();
  }, [supabase]);

  // Toggle item done
  const handleToggleDone = async (item: ChecklistItem) => {
    const newStatus = !item.is_done;
    const updated = items.map(i => i.id === item.id ? { ...i, is_done: newStatus } : i);
    setItems(updated);
    localStorage.setItem('placement_radar_checklist', JSON.stringify(updated));

    if (user && !item.id.startsWith('init-') && !item.id.startsWith('local-')) {
      try {
        await supabase
          .from('user_checklists')
          .update({ is_done: newStatus })
          .eq('id', item.id);
      } catch (e) {}
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId: string) => {
    const updated = items.filter(i => i.id !== itemId);
    setItems(updated);
    localStorage.setItem('placement_radar_checklist', JSON.stringify(updated));

    if (user && !itemId.startsWith('init-') && !itemId.startsWith('local-')) {
      try {
        await supabase.from('user_checklists').delete().eq('id', itemId);
      } catch (e) {}
    }
  };

  // Add custom tag for a company
  const handleAddCustomTag = async (companyId: string, companyName: string) => {
    const inputVal = (newTagInput[companyId] || '').trim();
    if (!inputVal) return;

    const newItem: ChecklistItem = {
      id: `local-${companyId}-${inputVal}-${Date.now()}`,
      company_id: companyId,
      tag: inputVal,
      is_done: false,
      company: { id: companyId, name: companyName },
    };

    const updated = [...items, newItem];
    setItems(updated);
    localStorage.setItem('placement_radar_checklist', JSON.stringify(updated));
    setNewTagInput({ ...newTagInput, [companyId]: '' });

    if (user) {
      try {
        await supabase.from('user_checklists').insert({
          user_id: user.id,
          company_id: companyId,
          tag: inputVal,
          is_done: false,
        });
      } catch (e) {}
    }
  };

  // Group items by company
  const groupedByCompany = items.reduce((acc, item) => {
    const cId = item.company_id || 'unknown';
    const cName = item.company?.name || 'Company';
    if (!acc[cId]) {
      acc[cId] = { companyId: cId, companyName: cName, items: [] };
    }
    acc[cId].items.push(item);
    return acc;
  }, {} as Record<string, { companyId: string; companyName: string; items: ChecklistItem[] }>);

  // Overall Stats
  const totalItems = items.length;
  const completedItems = items.filter(i => i.is_done).length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-400">Loading your preparation checklist...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Target Tracker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Personalized <span className="text-blue-400">Prep Checklist</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Track your mastery across the highest-frequency topics tested by your target companies.
          </p>
        </div>

        <Link
          href="/companies"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition"
        >
          <Plus className="w-3.5 h-3.5 text-blue-400" />
          <span>Add More Companies</span>
        </Link>
      </div>

      {/* Progress Bar Card */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-semibold text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Overall Preparation Progress
          </span>
          <span className="font-bold text-emerald-400">
            {completedItems} of {totalItems} completed ({completionPercentage}%)
          </span>
        </div>

        {/* Bar */}
        <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Guest Mode Notice */}
      {!user && (
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-indigo-300">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              Your checklist is saved in local browser storage. Sign in with Google to sync across all your devices via Supabase.
            </span>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium whitespace-nowrap transition"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In to Sync</span>
          </Link>
        </div>
      )}

      {/* Grouped Checklist Content */}
      {Object.keys(groupedByCompany).length > 0 ? (
        <div className="space-y-6">
          {Object.values(groupedByCompany).map(({ companyId, companyName, items: companyItems }) => {
            const compDone = companyItems.filter(i => i.is_done).length;
            const compTotal = companyItems.length;
            const compPct = compTotal > 0 ? Math.round((compDone / compTotal) * 100) : 0;

            return (
              <div
                key={companyId}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4"
              >
                {/* Company Group Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-white text-sm shadow-inner">
                      {companyName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span>{companyName}</span>
                        <Link
                          href={`/companies/${companyId}`}
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-0.5 font-normal"
                        >
                          <span>Radar</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-400">
                        {compDone}/{compTotal} topics ready ({compPct}%)
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 self-start sm:self-auto">
                    {compPct === 100 ? '🎉 Ready for Interview' : `${100 - compPct}% remaining`}
                  </span>
                </div>

                {/* Items List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {companyItems.map((item) => {
                    const tagStyle = TAG_COLORS[item.tag] || TAG_COLORS['Uncategorized'];

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleToggleDone(item)}
                        className={`group flex items-center justify-between p-3 rounded-xl border transition cursor-pointer select-none ${
                          item.is_done
                            ? 'bg-emerald-950/20 border-emerald-500/30'
                            : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="text-slate-400 group-hover:text-white transition"
                            aria-label={item.is_done ? 'Mark incomplete' : 'Mark complete'}
                          >
                            {item.is_done ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500 group-hover:text-blue-400" />
                            )}
                          </button>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs sm:text-sm font-medium ${
                                item.is_done ? 'text-slate-400 line-through' : 'text-slate-200'
                              }`}
                            >
                              Master {item.tag}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}
                            >
                              {item.tag}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(item.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Add Custom Tag for this Company */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={newTagInput[companyId] || ''}
                    onChange={(e) => setNewTagInput({ ...newTagInput, [companyId]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCustomTag(companyId, companyName);
                      }
                    }}
                    placeholder={`Add custom topic for ${companyName} (e.g. Trie, Concurrency)...`}
                    className="flex-1 px-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleAddCustomTag(companyId, companyName)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center space-y-4 border border-slate-800">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto text-blue-400">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Your checklist is empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Visit any company page and click &quot;Generate My Prep Checklist&quot; to automatically pull their top 5 tested topics.
            </p>
          </div>
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-lg shadow-blue-500/20"
          >
            <span>Explore Companies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
