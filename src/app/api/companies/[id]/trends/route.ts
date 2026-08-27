import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getMockCompanyTrends, MOCK_COMPANIES } from '@/lib/mockData';
import { CompanyTrendInsights } from '@/types/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const supabase = createClient();

    // 1. Fetch company
    const { data: company, error: compErr } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();

    if (!compErr && company) {
      // 2. Fetch all experiences for this company with rounds and tags
      const { data: experiences, error: expErr } = await supabase
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

      if (!expErr && experiences && experiences.length > 0) {
        // Aggregate topics and round types in SQL / in-memory aggregation
        const tagCounts: Record<string, number> = {};
        const roundCounts: Record<string, number> = {};
        let totalTags = 0;
        let totalRounds = 0;

        const currentYear = new Date().getFullYear();
        const recentTagCounts: Record<string, number> = {};
        const priorTagCounts: Record<string, number> = {};

        experiences.forEach((exp: any) => {
          const isRecent = (exp.year || currentYear) >= currentYear - 1;

          (exp.rounds || []).forEach((round: any) => {
            totalRounds++;
            const rtype = round.round_type || 'Technical';
            roundCounts[rtype] = (roundCounts[rtype] || 0) + 1;

            (round.tags || []).forEach((t: any) => {
              totalTags++;
              tagCounts[t.tag] = (tagCounts[t.tag] || 0) + 1;

              if (isRecent) {
                recentTagCounts[t.tag] = (recentTagCounts[t.tag] || 0) + 1;
              } else {
                priorTagCounts[t.tag] = (priorTagCounts[t.tag] || 0) + 1;
              }
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

        const trendingShifts = topicBreakdown.slice(0, 5).map(({ tag }) => {
          const recent = recentTagCounts[tag] || 0;
          const prior = priorTagCounts[tag] || 0;
          const diff = recent - prior;
          return {
            tag,
            recentCount: recent,
            previousCount: prior,
            trend: diff > 0 ? ('up' as const) : diff < 0 ? ('down' as const) : ('neutral' as const),
            percentChange: prior > 0 ? Math.round(((recent - prior) / prior) * 100) : recent > 0 ? 100 : 0,
          };
        });

        const result: CompanyTrendInsights = {
          company,
          totalExperiences: experiences.length,
          totalRounds,
          topicBreakdown,
          roundTypeBreakdown,
          trendingShifts,
          recentExperiences: experiences as any,
          topTags: topicBreakdown.slice(0, 5).map(t => t.tag),
        };

        return NextResponse.json(result);
      }
    }
  } catch (err) {
    // Fallback to local mock trend data
  }

  const fallback = getMockCompanyTrends(id);
  return NextResponse.json(fallback);
}
