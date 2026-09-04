'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  GitCompare, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  CheckSquare, 
  Plus, 
  X, 
  Layers, 
  Target, 
  CheckCircle2,
  BarChart3,
  PieChart as PieIcon,
  Zap
} from 'lucide-react';
import { MOCK_COMPANIES, getMockCompanyTrends } from '@/lib/mockData';
import { TAG_COLORS } from '@/lib/constants';
import ChartWrapper from '@/components/ChartWrapper';
import TopicBarChart from '@/components/TopicBarChart';
import RoundTypePieChart from '@/components/RoundTypePieChart';
import { recordActivity } from '@/lib/achievements';

const PRESET_COMPARISONS = [
  {
    title: 'Top Tech Titans',
    subtitle: 'Google vs Amazon vs Microsoft',
    ids: ['comp-google', 'comp-amazon', 'comp-microsoft'],
  },
  {
    title: 'Mass Recruiters / IT Services',
    subtitle: 'TCS vs Infosys vs Capgemini',
    ids: ['comp-tcs', 'comp-infosys', 'comp-capgemini'],
  },
  {
    title: 'Product & High Packages',
    subtitle: 'Google vs Flipkart vs Uber',
    ids: ['comp-google', 'comp-flipkart', 'comp-uber'],
  },
  {
    title: 'Fintech & Investment Banking',
    subtitle: 'Goldman Sachs vs JP Morgan vs Morgan Stanley',
    ids: ['comp-goldman-sachs', 'comp-jpmorgan', 'comp-morgan-stanley'],
  },
];

export default function CompanyComparePage() {
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([
    'comp-google',
    'comp-amazon',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Track compare activity
  useEffect(() => {
    try {
      const raw = localStorage.getItem('placement_radar_compare_count_v1');
      const count = raw ? parseInt(raw, 10) : 0;
      localStorage.setItem('placement_radar_compare_count_v1', String(count + 1));
      recordActivity(1);
    } catch (e) {}
  }, []);

  const selectedTrends = useMemo(() => {
    return selectedCompanyIds.map((id) => getMockCompanyTrends(id));
  }, [selectedCompanyIds]);

  const toggleCompany = (id: string) => {
    if (selectedCompanyIds.includes(id)) {
      if (selectedCompanyIds.length > 1) {
        setSelectedCompanyIds(selectedCompanyIds.filter((c) => c !== id));
      }
    } else {
      if (selectedCompanyIds.length < 3) {
        setSelectedCompanyIds([...selectedCompanyIds, id]);
      } else {
        // Replace last
        setSelectedCompanyIds([selectedCompanyIds[0], selectedCompanyIds[1], id]);
      }
    }
  };

  // Compute common overlapping topics & unique topics
  const { commonTopics, uniquePerCompany, mergedAllTopTopics } = useMemo(() => {
    if (selectedTrends.length === 0) {
      return { commonTopics: [], uniquePerCompany: {}, mergedAllTopTopics: [] };
    }

    const topicOccurrences: Record<string, string[]> = {};
    const uniqueMap: Record<string, string[]> = {};
    const allSet = new Set<string>();

    selectedTrends.forEach((trend) => {
      const cName = trend.company.name;
      trend.topTags.forEach((tag) => {
        allSet.add(tag);
        if (!topicOccurrences[tag]) topicOccurrences[tag] = [];
        topicOccurrences[tag].push(cName);
      });
    });

    const common: string[] = [];
    Object.entries(topicOccurrences).forEach(([tag, companies]) => {
      if (companies.length === selectedTrends.length) {
        common.push(tag);
      }
    });

    selectedTrends.forEach((trend) => {
      const cName = trend.company.name;
      uniqueMap[cName] = trend.topTags.filter(
        (t) => (topicOccurrences[t] || []).length === 1
      );
    });

    return {
      commonTopics: common,
      uniquePerCompany: uniqueMap,
      mergedAllTopTopics: Array.from(allSet),
    };
  }, [selectedTrends]);

  // Generate combined prep checklist
  const handleGenerateMergedChecklist = () => {
    try {
      const raw = localStorage.getItem('placement_radar_checklist');
      const existing: any[] = raw ? JSON.parse(raw) : [];

      const newItems: any[] = [];
      selectedTrends.forEach((trend) => {
        trend.topTags.slice(0, 4).forEach((tag) => {
          const id = `compare-${trend.company.id}-${tag}`;
          if (!existing.some((i) => i.company_id === trend.company.id && i.tag === tag)) {
            newItems.push({
              id,
              company_id: trend.company.id,
              tag,
              is_done: false,
              company: {
                id: trend.company.id,
                name: trend.company.name,
                industry: trend.company.industry,
              },
            });
          }
        });
      });

      const updated = [...newItems, ...existing];
      localStorage.setItem('placement_radar_checklist', JSON.stringify(updated));
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.industry || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold shadow-inner">
          <GitCompare className="w-3.5 h-3.5 text-violet-400" />
          <span>Cross-Company Trend Analysis</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Side-by-Side <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">Company Radar Comparison</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Select up to 3 target companies to discover shared high-frequency topics, identify unique interview requirements, and build a unified master preparation checklist.
        </p>
      </div>

      {/* Preset Quick Picks */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Popular Comparison Bundles:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_COMPARISONS.map((preset) => (
            <button
              key={preset.title}
              onClick={() => setSelectedCompanyIds(preset.ids)}
              className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-violet-500/40 text-left transition group space-y-1 shadow-sm"
            >
              <div className="text-xs font-bold text-white group-hover:text-violet-300 transition">
                {preset.title}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {preset.subtitle}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Company Pills & Company Selector */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Active Target Companies ({selectedCompanyIds.length}/3)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Click any company below to add or remove from this comparison radar
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Selected Companies Badge Row */}
        <div className="flex flex-wrap items-center gap-3">
          {selectedTrends.map((trend) => (
            <div
              key={trend.company.id}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-violet-600/15 border border-violet-500/30 text-white shadow-sm"
            >
              <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center text-xs font-bold">
                {trend.company.name.charAt(0)}
              </div>
              <span className="text-xs font-bold">{trend.company.name}</span>
              <button
                onClick={() => toggleCompany(trend.company.id)}
                disabled={selectedCompanyIds.length <= 1}
                className="text-slate-400 hover:text-red-400 disabled:opacity-30 transition p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Available Companies Carousel/Grid */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
            {filteredCompanies.map((c) => {
              const isSelected = selectedCompanyIds.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCompany(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-violet-600 text-white border-violet-400/50 shadow-sm'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
                  }`}
                >
                  <span>{c.name}</span>
                  {isSelected && <CheckCircle2 className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overlap & Unique Topics Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Shared Topics */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Universal Overlapping Topics ({commonTopics.length})
              </h3>
              <p className="text-xs text-slate-400">
                Topics tested heavily across <strong>ALL</strong> selected companies
              </p>
            </div>
          </div>

          {commonTopics.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {commonTopics.map((tag) => {
                const colorInfo = TAG_COLORS[tag] || TAG_COLORS['Uncategorized'];
                return (
                  <span
                    key={tag}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl border ${colorInfo.bg} ${colorInfo.text} ${colorInfo.border} flex items-center gap-1.5 shadow-sm`}
                  >
                    <Sparkles className="w-3 h-3" />
                    {tag} (100% Shared)
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              No single topic was in the top 5 of all selected companies. Review individual breakdowns below.
            </p>
          )}
        </div>

        {/* Unified Checklist CTA Box */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between space-y-4 bg-gradient-to-br from-indigo-950/20 to-slate-900/60">
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-violet-400" />
              Unified Multi-Target Preparation Plan
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Auto-generate a combined checklist of top tested topics for{' '}
              {selectedTrends.map((t) => t.company.name).join(', ')} directly into your tracker.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleGenerateMergedChecklist}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs transition shadow-lg shadow-violet-500/25 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              {addedSuccess ? '✓ Added to Checklist!' : 'Merge into My Checklist'}
            </button>
            <Link
              href="/checklist"
              className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
            >
              <span>View Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Side-by-Side Topic Frequency Breakdown Charts */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Topic Frequency Radar Breakdown
            </h2>
            <p className="text-xs text-slate-400">
              Comparative percentage of interview rounds testing each concept
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${selectedTrends.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
          {selectedTrends.map((trend) => (
            <div
              key={trend.company.id}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-white text-xs">
                      {trend.company.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {trend.company.name}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {trend.totalExperiences} verified posts • {trend.totalRounds} rounds
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/companies/${trend.company.id}`}
                    className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-0.5"
                  >
                    <span>Full Radar</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <ChartWrapper height={260}>
                  <TopicBarChart data={trend.topicBreakdown.slice(0, 6)} />
                </ChartWrapper>
              </div>

              {/* Unique topic callout */}
              <div className="pt-3 border-t border-slate-800/80 text-[11px]">
                <span className="text-slate-400">Company Unique Focus: </span>
                <span className="text-slate-200 font-semibold">
                  {(uniquePerCompany[trend.company.name] || []).slice(0, 2).join(', ') || 'High DSA Overlap'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Round Distribution Donut Comparison */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Hiring Pipeline Round Distribution
            </h2>
            <p className="text-xs text-slate-400">
              Ratio of Online Assessment vs Technical Coding vs System Design vs Behavioral rounds
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${selectedTrends.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
          {selectedTrends.map((trend) => (
            <div
              key={`round-${trend.company.id}`}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-xs font-bold text-white">{trend.company.name} Rounds</span>
                <span className="text-[11px] text-slate-400">{trend.totalRounds} rounds classified</span>
              </div>

              <ChartWrapper height={240}>
                <RoundTypePieChart data={trend.roundTypeBreakdown} />
              </ChartWrapper>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
