'use client';

import React, { useState, useMemo } from 'react';
import { Company, Domain } from '@/types/database';
import CompanyCard from '@/components/CompanyCard';
import SearchBar from '@/components/SearchBar';
import { Building2, Filter, SearchX, Cpu, Code, Layers } from 'lucide-react';
import { useDomain } from '@/lib/DomainContext';

interface CompanyListClientProps {
  initialCompanies: Company[];
  initialSearch?: string;
}

export default function CompanyListClient({
  initialCompanies,
  initialSearch = '',
}: CompanyListClientProps) {
  const { domain: userDomain } = useDomain();
  const [search, setSearch] = useState(initialSearch);
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>(userDomain || 'all');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  // Filtered by domain first
  const domainCompanies = useMemo(() => {
    if (selectedDomain === 'all') return initialCompanies;
    return initialCompanies.filter((c) => {
      if (selectedDomain === 'ece') {
        return c.domain === 'ece' || c.id.startsWith('comp-nv') || c.id.startsWith('comp-amd') || c.id.startsWith('comp-intel') || c.id.startsWith('comp-ti') || c.id.startsWith('comp-qc');
      }
      return c.domain === 'it' || (!c.domain && !c.id.startsWith('comp-nv') && !c.id.startsWith('comp-amd'));
    });
  }, [initialCompanies, selectedDomain]);

  // Extract unique industries for current domain selection
  const industries = useMemo(() => {
    const set = new Set<string>();
    domainCompanies.forEach(c => {
      if (c.industry) set.add(c.industry);
    });
    return ['All', ...Array.from(set)];
  }, [domainCompanies]);

  // Filtered companies based on search, domain, and industry
  const filteredCompanies = useMemo(() => {
    return domainCompanies.filter(c => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.industry && c.industry.toLowerCase().includes(search.toLowerCase())) ||
        (c.top_tags && c.top_tags.some(t => t.toLowerCase().includes(search.toLowerCase())));

      const matchesIndustry =
        selectedIndustry === 'All' || c.industry === selectedIndustry;

      return matchesSearch && matchesIndustry;
    });
  }, [domainCompanies, search, selectedIndustry]);

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="glass-card rounded-2xl p-5 border border-slate-200 space-y-4 shadow-sm">
        
        {/* Top Controls: Search and Domain Track Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-md w-full">
            <SearchBar
              initialQuery={search}
              onSearchChange={setSearch}
              placeholder="Search company, industry, or key topic tag..."
            />
          </div>

          {/* Domain Track Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => { setSelectedDomain('all'); setSelectedIndustry('All'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedDomain === 'all'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Tracks ({initialCompanies.length})</span>
            </button>
            <button
              onClick={() => { setSelectedDomain('it'); setSelectedIndustry('All'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedDomain === 'it'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Software (IT)</span>
            </button>
            <button
              onClick={() => { setSelectedDomain('ece'); setSelectedIndustry('All'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedDomain === 'ece'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Semiconductor (ECE)</span>
            </button>
          </div>
        </div>

        {/* Industry Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1 text-slate-500 font-semibold uppercase tracking-wider pr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {industries.map((ind) => {
            const isSelected = selectedIndustry === ind;
            return (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                  isSelected
                    ? selectedDomain === 'ece'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-violet-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {ind}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900 font-bold">{filteredCompanies.length}</strong> of{' '}
          {domainCompanies.length} companies in track
        </span>
        {search && (
          <span>
            Filtering by: &quot;<span className="text-violet-700 font-semibold">{search}</span>&quot;
          </span>
        )}
      </div>

      {/* Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center space-y-4 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
            <SearchX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No companies matched your search</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query, clearing track filters, or resetting the industry filter.
            </p>
          </div>
          <button
            onClick={() => {
              setSearch('');
              setSelectedIndustry('All');
              setSelectedDomain('all');
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-semibold transition shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
