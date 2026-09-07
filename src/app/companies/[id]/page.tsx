import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Building2, BarChart2, PieChart as PieIcon, TrendingUp, Sparkles, Layers, ListCollapse, ExternalLink } from 'lucide-react';
import ChartWrapper from '@/components/ChartWrapper';
import TopicBarChart from '@/components/TopicBarChart';
import RoundTypePieChart from '@/components/RoundTypePieChart';
import ChecklistButton from '@/components/ChecklistButton';
import ExperienceCard from '@/components/ExperienceCard';
import BookmarkButton from '@/components/BookmarkButton';
import { getMockCompanyTrends, MOCK_COMPANIES } from '@/lib/mockData';
import { createClient } from '@/lib/supabase/server';
import { CompanyTrendInsights } from '@/types/database';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const company = MOCK_COMPANIES.find(c => c.id === params.id || c.name.toLowerCase() === params.id.toLowerCase());
  const name = company ? company.name : 'Company';
  return {
    title: `${name} Interview Radar — Topics, Rounds & Prep Checklist`,
    description: `Real interview insights for ${name}: topic frequency breakdown, round distribution, and preparation checklist.`,
  };
}

async function getCompanyData(id: string): Promise<CompanyTrendInsights> {
  try {
    const supabase = createClient();
    const companyPromise = supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();

    const timeoutPromise = new Promise<{ data: null; error: any }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: 'timeout' }), 1000)
    );

    const { data: company } = await Promise.race([companyPromise, timeoutPromise]);

    if (company) {
      const expPromise = supabase
        .from('experiences')
        .select(`
          id,
          company_id,
          role,
          year,
          source_platform,
          source_url,
          raw_text,
          submitted_by,
          created_at,
          rounds:experience_rounds(
            id,
            round_number,
            round_type,
            round_text,
            tags:round_tags(id, tag)
          )
        `)
        .eq('company_id', company.id)
        .order('year', { ascending: false });

      const { data: experiences } = await Promise.race([expPromise, timeoutPromise]);

      if (experiences && experiences.length > 0) {
        const tagCounts: Record<string, number> = {};
        const roundCounts: Record<string, number> = {};
        let totalTags = 0;
        let totalRounds = 0;

        experiences.forEach((exp: any) => {
          (exp.rounds || []).forEach((round: any) => {
            totalRounds++;
            const rtype = round.round_type || 'Technical';
            roundCounts[rtype] = (roundCounts[rtype] || 0) + 1;

            (round.tags || []).forEach((t: any) => {
              totalTags++;
              tagCounts[t.tag] = (tagCounts[t.tag] || 0) + 1;
            });
          });
        });

        const topicBreakdown = Object.entries(tagCounts)
          .map(([tag, count]) => ({
            tag,
            count,
            percentage: totalTags > 0 ? Math.round((count / totalTags) * 100) : 0,
          }))
          .sort((a, b) => b.count - a.count);

        const roundTypeBreakdown = Object.entries(roundCounts)
          .map(([round_type, count]) => ({
            round_type,
            count,
            percentage: totalRounds > 0 ? Math.round((count / totalRounds) * 100) : 0,
          }))
          .sort((a, b) => b.count - a.count);

        return {
          company,
          totalExperiences: experiences.length,
          totalRounds,
          topicBreakdown,
          roundTypeBreakdown,
          trendingShifts: topicBreakdown.slice(0, 4).map(t => ({
            tag: t.tag,
            recentCount: t.count,
            previousCount: 0,
            trend: 'up',
            percentChange: 100,
          })),
          recentExperiences: experiences as any,
          topTags: topicBreakdown.slice(0, 5).map(t => t.tag),
        };
      }
    }
  } catch (err) {
    // Fallback to local curated mock data
  }

  return getMockCompanyTrends(id);
}

export default async function CompanyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getCompanyData(params.id);

  if (!data || !data.company) {
    notFound();
  }

  const { company, totalExperiences, totalRounds, topicBreakdown, roundTypeBreakdown, trendingShifts, recentExperiences, topTags } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all companies</span>
        </Link>
      </div>

      {/* Company Header Hero Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 text-2xl sm:text-3xl font-extrabold shadow-sm">
            {company.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200 text-xs font-medium">
              <Building2 className="w-3 h-3" />
              <span>{company.industry || 'Technology'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              {company.name} <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Interview Radar</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 pt-1">
              <span>{totalExperiences} verified experience posts</span>
              <span>•</span>
              <span>{totalRounds} interview rounds analyzed</span>
            </p>
          </div>
        </div>

        {/* 1-Click Checklist Generator Action & Bookmark */}
        <div className="w-full md:w-auto flex flex-wrap items-center gap-3">
          <BookmarkButton
            id={company.id}
            type="company"
            title={`${company.name} Interview Radar`}
            subtitle={company.industry || 'Technology'}
            url={`/companies/${company.id}`}
            tag={topTags[0]}
            size="md"
          />
          <Link
            href={`/compare`}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition shadow-sm"
          >
            <span>Compare</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <ChecklistButton
            companyId={company.id}
            companyName={company.name}
            topTags={topTags}
          />
        </div>
      </div>

      {/* Visual Charts Grid (Topic Breakdown + Round Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Breakdown Bar Chart */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Topic Frequency Breakdown
                </h3>
                <p className="text-xs text-slate-500">
                  Percentage of tagged rounds mentioning each topic
                </p>
              </div>
            </div>
          </div>

          <ChartWrapper height={300}>
            <TopicBarChart data={topicBreakdown} />
          </ChartWrapper>
        </div>

        {/* Round Distribution Donut Chart */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
                <PieIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Round Type Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Proportion of OA vs Technical vs System Design vs HR rounds
                </p>
              </div>
            </div>
          </div>

          <ChartWrapper height={300}>
            <RoundTypePieChart data={roundTypeBreakdown} />
          </ChartWrapper>
        </div>
      </div>

      {/* Year-over-Year Trending Shifts */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Trending Topic Shifts
            </h3>
            <p className="text-xs text-slate-500">
              Topics gaining increased frequency in recent hiring cycles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {trendingShifts.map((shift) => (
            <div
              key={shift.tag}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
            >
              <div className="text-xs font-semibold text-slate-900">{shift.tag}</div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Recent: {shift.recentCount} mentions</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  +{shift.percentChange}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Round Experience Summaries */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <ListCollapse className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Individual Interview Experiences ({recentExperiences.length})
              </h3>
              <p className="text-xs text-slate-500">
                Segmented round-by-round breakdown with tagged concepts
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {recentExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </div>
    </div>
  );
}
