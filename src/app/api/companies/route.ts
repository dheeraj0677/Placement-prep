import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { MOCK_COMPANIES } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const industry = searchParams.get('industry')?.toLowerCase() || '';

  try {
    const supabase = createClient();
    
    // Attempt Supabase query if credentials are active
    const { data: companies, error } = await supabase
      .from('companies')
      .select(`
        id,
        name,
        logo_url,
        industry,
        created_at,
        experiences:experiences(id)
      `)
      .order('name');

    if (!error && companies && companies.length > 0) {
      let filtered = companies.map((c: any) => ({
        id: c.id,
        name: c.name,
        logo_url: c.logo_url,
        industry: c.industry,
        created_at: c.created_at,
        experience_count: c.experiences ? c.experiences.length : 0,
      }));

      if (search) {
        filtered = filtered.filter((c: any) =>
          c.name.toLowerCase().includes(search) || (c.industry && c.industry.toLowerCase().includes(search))
        );
      }
      if (industry && industry !== 'all') {
        filtered = filtered.filter((c: any) => c.industry && c.industry.toLowerCase() === industry);
      }

      return NextResponse.json({ companies: filtered, source: 'supabase' });
    }
  } catch (err) {
    // Graceful fallback to rich mock data
  }

  // Fallback to local curated mock data
  let filteredMock = [...MOCK_COMPANIES];
  if (search) {
    filteredMock = filteredMock.filter(c =>
      c.name.toLowerCase().includes(search) || (c.industry && c.industry.toLowerCase().includes(search))
    );
  }
  if (industry && industry !== 'all') {
    filteredMock = filteredMock.filter(c => c.industry && c.industry.toLowerCase() === industry);
  }

  return NextResponse.json({ companies: filteredMock, source: 'fallback' });
}
