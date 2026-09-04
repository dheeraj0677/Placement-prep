'use client';

import React, { useState, useMemo } from 'react';
import { Company } from '@/types/database';
import CompanyCard from '@/components/CompanyCard';
import SearchBar from '@/components/SearchBar';
import { Building2, Filter, SearchX } from 'lucide-react';

interface CompanyListClientProps {
  initialCompanies: Company[];
  initialSearch?: string;
}

export default function CompanyListClient({
  initialCompanies,
  initialSearch = '',
}: CompanyListClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  // Extract unique industries
  const industries = useMemo(() => {
    const set = new Set<string>();
    initialCompanies.forEach(c => {
      if (c.industry) set.add(c.industry);
    });
    return ['All', ...Array.from(set)];
  }, [initialCompanies]);

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return initialCompanies.filter(c => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.industry && c.industry.toLowerCase().includes(search.toLowerCase())) ||
        (c.top_tags && c.top_tags.some(t => t.toLowerCase().includes(search.toLowerCase())));

      const matchesIndustry =
        selectedIndustry === 'All' || c.industry === selectedIndustry;

      return matchesSearch && matchesIndustry;
    });
  }, [initialCompanies, search, selectedIndustry]);

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search & Industry Pills */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="max-w-md">
          <SearchBar
            initialQuery={search}
            onSearchChange={setSearch}
            placeholder="Search by company name, industry, or topic tag..."
          />
        </div>

        {/* Industry Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
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
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {ind}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong className="text-white">{filteredCompanies.length}</strong> of{' '}
          {initialCompanies.length} companies
        </span>
        {search && (
          <span>
            Filtering by: &quot;<span className="text-violet-400">{search}</span>&quot;
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
        <div className="glass-card rounded-2xl p-12 text-center space-y-4 border border-slate-800">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <SearchX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No companies matched your search</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search query or reset the industry filter.
            </p>
          </div>
          <button
            onClick={() => {
              setSearch('');
              setSelectedIndustry('All');
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-semibold transition shadow-md shadow-violet-500/20"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
