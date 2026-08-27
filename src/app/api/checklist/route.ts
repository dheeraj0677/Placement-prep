import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getMockCompanyTrends } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();

    if (!authErr && user) {
      const { data: items, error } = await supabase
        .from('user_checklists')
        .select(`
          id,
          user_id,
          company_id,
          tag,
          is_done,
          created_at,
          company:companies(id, name, logo_url, industry)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && items) {
        return NextResponse.json({ items, authenticated: true });
      }
    }
  } catch (err) {
    // Return empty/demo list
  }

  return NextResponse.json({
    items: [],
    authenticated: false,
    message: 'Please sign in to persist your checklist to Supabase, or use local storage.'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyId, tags } = body;

    if (!companyId) {
      return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
    }

    const supabase = createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();

    // Determine tags to add (either provided or top 5 from trends)
    let tagsToAdd: string[] = tags;
    if (!tagsToAdd || tagsToAdd.length === 0) {
      const trends = getMockCompanyTrends(companyId);
      tagsToAdd = trends.topTags.slice(0, 5);
    }

    if (!authErr && user) {
      // Upsert rows into user_checklists
      const checklistRows = tagsToAdd.map((tag: string) => ({
        user_id: user.id,
        company_id: companyId,
        tag,
        is_done: false,
      }));

      const { data, error } = await supabase
        .from('user_checklists')
        .upsert(checklistRows, { onConflict: 'user_id,company_id,tag' })
        .select(`
          id,
          user_id,
          company_id,
          tag,
          is_done,
          company:companies(id, name, logo_url)
        `);

      if (!error) {
        return NextResponse.json({ success: true, items: data, addedCount: tagsToAdd.length });
      }
    }

    // Unauthenticated response (returns mock checklist items for local state persistence)
    const trends = getMockCompanyTrends(companyId);
    const mockItems = tagsToAdd.map((tag: string, index: number) => ({
      id: `local-${companyId}-${tag}-${index}`,
      user_id: 'guest',
      company_id: companyId,
      tag,
      is_done: false,
      company: trends.company,
    }));

    return NextResponse.json({
      success: true,
      items: mockItems,
      addedCount: mockItems.length,
      guestMode: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to generate checklist' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_done } = body;

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user && !id.startsWith('local-')) {
      const { data, error } = await supabase
        .from('user_checklists')
        .update({ is_done })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (!error) {
        return NextResponse.json({ success: true, item: data });
      }
    }

    return NextResponse.json({ success: true, updatedLocally: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update checklist' }, { status: 500 });
  }
}
