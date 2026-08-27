import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { MOCK_COMPANIES } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const supabase = createClient();
    const { data: company, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && company) {
      return NextResponse.json({ company });
    }
  } catch (err) {
    // Fallback
  }

  const mockCompany = MOCK_COMPANIES.find(c => c.id === id || c.name.toLowerCase() === id.toLowerCase());
  if (mockCompany) {
    return NextResponse.json({ company: mockCompany });
  }

  return NextResponse.json({ error: 'Company not found' }, { status: 404 });
}
