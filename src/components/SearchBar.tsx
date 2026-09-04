'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  onSearchChange?: (query: string) => void;
  placeholder?: string;
  autoNavigate?: boolean;
}

export default function SearchBar({
  initialQuery = '',
  onSearchChange,
  placeholder = 'Search companies (e.g. Google, Amazon, Flipkart)...',
  autoNavigate = false,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && autoNavigate) {
      router.push(`/companies?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition shadow-inner backdrop-blur-md"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3.5 p-1 text-slate-400 hover:text-white rounded-md transition"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
