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

  // Sync trackFilter if domain changes from navbar and user hasn't explicitly set 'all'
  // but let user toggle freely on page
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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Breadcrumb & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-slate-200 transition">Home</Link>
            <span>/</span>
            <span className="text-violet-400 font-medium">Question Bank</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
              domain === 'ece' 
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' 
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
            }`}>
              Active Session: {trackLabel}
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Placement Intelligence • 2024-2026 Batch
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Campus Interview <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400">Questions Bank</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Master the actual recurring technical problems, timing calculations, Verilog snippets, system designs, and algorithmic challenges asked during campus placements at top tech and semiconductor firms.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <HelpCircle className="w-4 h-4 text-violet-400" />
                <span><strong>{INTERVIEW_QUESTIONS.length}</strong> Curated Questions</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-cyan-300">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span><strong>{totalEceCount}</strong> Semiconductor / ECE</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-indigo-300">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span><strong>{totalItCount}</strong> Software & IT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Track Switcher Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
            <button
              onClick={() => handleTrackChange('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                trackFilter === 'all'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              All Tracks ({INTERVIEW_QUESTIONS.length})
            </button>

            <button
              onClick={() => handleTrackChange('ece')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                trackFilter === 'ece'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-cyan-400'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-300" />
              Semiconductor & ECE ({totalEceCount})
            </button>

            <button
              onClick={() => handleTrackChange('it')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                trackFilter === 'it'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-indigo-400'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-300" />
              Software & IT ({totalItCount})
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Showing <strong className="text-slate-200">{filteredQuestions.length}</strong> matching questions
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, question, topic (e.g. STA, FSM, Rate Limiter), or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200 px-1.5 py-0.5 rounded bg-slate-800"
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
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition"
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
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition"
            >
              <option value="All">All Interview Rounds</option>
              <option value="Technical">Technical Rounds</option>
              <option value="OA">Online Assessment (OA)</option>
              <option value="HR">HR & Managerial</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1 pl-1 pr-2">
            <Tag className="w-3 h-3" /> Categories:
          </span>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Question Cards List */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">No matching questions found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
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
              className="px-4 py-2 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-500 transition"
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
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : q.difficulty === 'Medium'
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                  : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isExpanded 
                      ? 'bg-slate-900/90 border-slate-700 shadow-xl' 
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
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
                              ? 'text-cyan-300 bg-cyan-950/40 border-cyan-800/50'
                              : 'text-indigo-300 bg-indigo-950/40 border-indigo-800/50'
                          }`}>
                            {isEce ? <Cpu className="w-3 h-3" /> : <Code2 className="w-3 h-3" />}
                            {isEce ? 'Semiconductor' : 'Software/IT'}
                          </span>

                          {/* Difficulty Pill */}
                          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${diffBadgeColor}`}>
                            {q.difficulty}
                          </span>

                          {/* Category Pill */}
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                            {q.category}
                          </span>

                          {/* Frequency Pill */}
                          {q.frequency === 'High' && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                              <Flame className="w-3 h-3 fill-amber-400" />
                              High Frequency
                            </span>
                          )}

                          {q.round_type && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] text-slate-400 bg-slate-800/50 border border-slate-700/50">
                              {q.round_type}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-violet-400 transition">
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
                    <div className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/70 font-mono text-xs sm:text-sm">
                      {q.question_text}
                    </div>

                    {/* Companies that asked this */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <Building2 className="w-3.5 h-3.5" /> Asked at:
                      </span>
                      {q.company_names.map((company, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700 font-medium"
                        >
                          {company}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Action / Toggle Answer */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                      <button
                        onClick={() => toggleExpand(q.id)}
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-violet-400 hover:text-violet-300 transition py-1"
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
                          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition"
                        >
                          <span>Solve Online</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Collapsible Answer & Key Concepts Drawer */}
                  {isExpanded && (
                    <div className="border-t border-slate-800 bg-slate-950/70 p-5 sm:p-6 space-y-5 rounded-b-2xl animate-in fade-in duration-200">
                      
                      {/* Key Concepts Tags */}
                      {q.key_concepts && q.key_concepts.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Crucial Interview Points
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {q.key_concepts.map((concept, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-violet-950/40 text-violet-300 border border-violet-800/40"
                              >
                                ✓ {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Answer Outline */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Structured Answer Outline
                        </span>
                        <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                          {q.answer_outline}
                        </div>
                      </div>

                      {/* Code Snippet (if available) */}
                      {q.code_snippet && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                              Implementation / Circuit Code
                            </span>
                            <button
                              onClick={() => handleCopyCode(q.id, q.code_snippet!)}
                              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded transition"
                            >
                              {copiedSnippetId === q.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400 font-medium">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Code</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto text-xs text-cyan-300 font-mono leading-relaxed">
                            <code>{q.code_snippet}</code>
                          </pre>
                        </div>
                      )}

                      {/* Related Prep Guides Callout */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-violet-950/30 to-slate-900 border border-violet-900/30">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <BookOpen className="w-4 h-4 text-violet-400" />
                          <span>Need deep revision on <strong>{q.category}</strong>?</span>
                        </div>
                        <Link
                          href={`/guides`}
                          className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
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
    </div>
  );
}
