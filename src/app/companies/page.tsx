import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { MOCK_COMPANIES } from '@/lib/mockData';
import CompanyListClient from './CompanyListClient';
import { Compass, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Tech Companies — PlacementPrep Radar',
  description: 'Explore interview trends, topic breakdowns, and round distributions across top tech companies.',
};

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  let companies = MOCK_COMPANIES;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
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

    if (!error && data && data.length > 0) {
      companies = data.map((c: any) => ({
        id: c.id,
        name: c.name,
        logo_url: c.logo_url,
        industry: c.industry,
        created_at: c.created_at,
        experience_count: c.experiences ? c.experiences.length : 0,
      }));
    }
  } catch (err) {
    // Fallback to local mock companies
  }

  const initialSearch = searchParams?.search || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Company Database</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Company <span className="text-blue-400">Trend Radars</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Select any company to view its topic breakdown, round distributions, year-over-year shifts, and generate a customized prep checklist.
        </p>
      </div>

      {/* Interactive Client Component with Filtering */}
      <CompanyListClient
        initialCompanies={companies}
        initialSearch={initialSearch}
      />
    </div>
  );
}
