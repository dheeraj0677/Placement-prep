'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Cpu, 
  Code2, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Copy, 
  Check, 
  Flame, 
  Sparkles, 
  BookOpen, 
  HelpCircle,
  Building2,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useDomain } from '@/lib/DomainContext';
import { INTERVIEW_QUESTIONS } from '@/lib/questionsData';
import BookmarkButton from '@/components/BookmarkButton';
import { InterviewQuestion } from '@/types/database';

export default function QuestionsBankPage() {
  const { domain } = useDomain();
  const trackLabel = domain === 'ece' ? 'Semiconductor & ECE' : 'Software & IT';
  
  // Track filter can be 'all' or match domain
  const [trackFilter, setTrackFilter] = useState<'all' | 'it' | 'ece'>(domain);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [selectedRound, setSelectedRound] = useState<'All' | 'Technical' | 'OA' | 'HR'>('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const handleTrackChange = (newTrack: 'all' | 'it' | 'ece') => {
    setTrackFilter(newTrack);
    setSelectedCategory('All');
  };

  // Derive available categories based on selected track
  const availableCategories = useMemo(() => {
    const questions = trackFilter === 'all' 
      ? INTERVIEW_QUESTIONS 
      : INTERVIEW_QUESTIONS.filter(q => q.domain === trackFilter);
    const cats = Array.from(new Set(questions.map(q => q.category))).sort();
    return ['All', ...cats];
  }, [trackFilter]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter(q => {
      // Track filter
      if (trackFilter !== 'all' && q.domain !== trackFilter) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && q.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      // Round type filter
      if (selectedRound !== 'All' && q.round_type !== selectedRound) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = q.title.toLowerCase().includes(query);
        const matchesText = q.question_text.toLowerCase().includes(query);
        const matchesCategory = q.category.toLowerCase().includes(query);
        const matchesSubtopic = q.subtopic?.toLowerCase().includes(query) ?? false;
        const matchesCompanies = q.company_names.some(c => c.toLowerCase().includes(query));
        const matchesConcepts = q.key_concepts?.some(k => k.toLowerCase().includes(query)) ?? false;
        return matchesTitle || matchesText || matchesCategory || matchesSubtopic || matchesCompanies || matchesConcepts;
      }
      return true;
    });
  }, [trackFilter, selectedCategory, selectedDifficulty, selectedRound, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedQuestionId(prev => (prev === id ? null : id));
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => {
      setCopiedSnippetId(null);
    }, 2000);
  };

  const totalEceCount = INTERVIEW_QUESTIONS.filter(q => q.domain === 'ece').length;
  const totalItCount = INTERVIEW_QUESTIONS.filter(q => q.domain === 'it').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Breadcrumb & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <span className="text-violet-600 font-semibold">Question Bank</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
            domain === 'ece' 
              ? 'bg-cyan-50 border-cyan-200 text-cyan-800' 
              : 'bg-violet-50 border-violet-200 text-violet-800'
          }`}>
            Active Track: {trackLabel}
          </span>
        </div>
      </div>

      {/* Hero Header Banner (Clean White Card) */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 bg-white shadow-sm relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Verified Placement Intelligence • 2025–2026 Batch</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Campus Interview <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600">Questions Bank</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Master the actual recurring technical problems, timing calculations, Verilog snippets, system designs, and algorithmic challenges asked during campus placements at top tech and semiconductor firms.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
              <HelpCircle className="w-4 h-4 text-violet-600" />
              <span><strong>{INTERVIEW_QUESTIONS.length}</strong> Curated Questions</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 shadow-sm">
              <Cpu className="w-4 h-4 text-cyan-600" />
              <span><strong>{totalEceCount}</strong> Semiconductor / ECE</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-800 shadow-sm">
              <Code2 className="w-4 h-4 text-violet-600" />
              <span><strong>{totalItCount}</strong> Software & IT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Track Switcher Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
          <button
            onClick={() => handleTrackChange('all')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              trackFilter === 'all'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            All Tracks ({INTERVIEW_QUESTIONS.length})
          </button>

          <button
            onClick={() => handleTrackChange('ece')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              trackFilter === 'ece'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-cyan-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Semiconductor & ECE ({totalEceCount})
          </button>

          <button
            onClick={() => handleTrackChange('it')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              trackFilter === 'it'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-indigo-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Software & IT ({totalItCount})
          </button>
        </div>

        <div className="text-xs text-slate-500">
          Showing <strong className="text-slate-900">{filteredQuestions.length}</strong> matching questions
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, question, topic (e.g. STA, FSM, Rate Limiter), or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 shadow-sm transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 px-1.5 py-0.5 rounded bg-slate-100"
            >
              Clear
            </button>
          )}
        </div>

        {/* Difficulty Dropdown */}
        <div>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-violet-500 shadow-sm transition"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Round Type Dropdown */}
        <div>
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value as any)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-violet-500 shadow-sm transition"
          >
            <option value="All">All Interview Rounds</option>
            <option value="Technical">Technical Rounds</option>
            <option value="OA">Online Assessment (OA)</option>
            <option value="HR">HR & Managerial</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
        <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1 pl-1 pr-1 font-medium">
          <Tag className="w-3 h-3" /> Categories:
        </span>
        {availableCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Question Cards List */}
      {filteredQuestions.length === 0 ? (
        <div className="glass-card rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching questions found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords, difficulty filter, or track selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSelectedRound('All');
              setTrackFilter('all');
            }}
            className="px-4 py-2 bg-violet-600 text-white text-xs font-semibold rounded-xl hover:bg-violet-700 transition shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            const isEce = q.domain === 'ece';
            
            const diffBadgeColor = 
              q.difficulty === 'Easy'
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : q.difficulty === 'Medium'
                ? 'text-amber-700 bg-amber-50 border-amber-200'
                : 'text-rose-700 bg-rose-50 border-rose-200';

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all duration-200 bg-white ${
                  isExpanded 
                    ? 'border-violet-300 shadow-md ring-1 ring-violet-200' 
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Card Header */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Metadata badges & Title */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Domain Pill */}
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border flex items-center gap-1 ${
                          isEce
                            ? 'text-cyan-700 bg-cyan-50 border-cyan-200'
                            : 'text-indigo-700 bg-indigo-50 border-indigo-200'
                        }`}>
                          {isEce ? <Cpu className="w-3 h-3" /> : <Code2 className="w-3 h-3" />}
                          {isEce ? 'Semiconductor' : 'Software/IT'}
                        </span>

                        {/* Difficulty Pill */}
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${diffBadgeColor}`}>
                          {q.difficulty}
                        </span>

                        {/* Category Pill */}
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {q.category}
                        </span>

                        {/* Frequency Pill */}
                        {q.frequency === 'High' && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                            High Frequency
                          </span>
                        )}

                        {q.round_type && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] text-slate-500 bg-slate-50 border border-slate-200">
                            {q.round_type}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-violet-700 transition">
                        {q.title}
                      </h2>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex items-center gap-2">
                      <BookmarkButton
                        id={q.id}
                        type="question"
                        title={q.title}
                        subtitle={`${q.category} • ${q.difficulty}`}
                        url={`/questions?q=${q.id}`}
                        tag={q.domain}
                        size="md"
                      />
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm">
                    {q.question_text}
                  </div>

                  {/* Companies that asked this */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="text-slate-500 flex items-center gap-1 font-semibold">
                      <Building2 className="w-3.5 h-3.5" /> Asked at:
                    </span>
                    {q.company_names.map((company, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 font-medium shadow-sm"
                      >
                        {company}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action / Toggle Answer */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-violet-700 hover:text-violet-800 transition py-1"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Hide Answer Outline & Code
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          View Answer Outline & Key Concepts
                        </>
                      )}
                    </button>

                    {q.practice_url && (
                      <a
                        href={q.practice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-cyan-700 hover:text-cyan-800 font-medium transition"
                      >
                        <span>Solve Online</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Collapsible Answer & Key Concepts Drawer */}
                {isExpanded && (
                  <div className="border-t border-slate-200 bg-slate-50/80 p-5 sm:p-6 space-y-5 rounded-b-2xl animate-in fade-in duration-150">
                    
                    {/* Key Concepts Tags */}
                    {q.key_concepts && q.key_concepts.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Crucial Interview Talking Points
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {q.key_concepts.map((concept, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-violet-50 text-violet-800 border border-violet-200"
                            >
                              ✓ {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Answer Outline */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Structured Answer Outline
                      </span>
                      <div className="text-sm text-slate-900 leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-slate-200 shadow-sm font-sans">
                        {q.answer_outline}
                      </div>
                    </div>

                    {/* Code Snippet (if available) */}
                    {q.code_snippet && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Implementation / Circuit Code
                          </span>
                          <button
                            onClick={() => handleCopyCode(q.id, q.code_snippet!)}
                            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-lg transition shadow-sm font-medium"
                          >
                            {copiedSnippetId === q.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-500" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto text-xs text-cyan-300 font-mono leading-relaxed">
                          <code>{q.code_snippet}</code>
                        </pre>
                      </div>
                    )}

                    {/* Related Prep Guides Callout */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-violet-50 border border-violet-200">
                      <div className="flex items-center gap-2 text-xs text-violet-900">
                        <BookOpen className="w-4 h-4 text-violet-600" />
                        <span>Need deep revision on <strong>{q.category}</strong>?</span>
                      </div>
                      <Link
                        href={`/guides`}
                        className="text-xs font-bold text-violet-700 hover:text-violet-800 flex items-center gap-1"
                      >
                        Explore Guides <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
