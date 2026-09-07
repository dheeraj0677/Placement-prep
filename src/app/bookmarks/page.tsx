'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Bookmark, 
  Search, 
  Trash2, 
  FileText, 
  ExternalLink, 
  Building2, 
  BookOpen, 
  Code2, 
  UserCheck, 
  Sparkles, 
  ArrowRight,
  Edit2,
  Check,
  X
} from 'lucide-react';
import { useBookmarks, BookmarkType, BookmarkItem } from '@/lib/useBookmarks';
import { TAG_COLORS } from '@/lib/constants';

export default function BookmarksPage() {
  const { bookmarks, isMounted, removeBookmark, updateNote } = useBookmarks();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((item) => {
      const matchesType = selectedType === 'All' || item.type === selectedType.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.note || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [bookmarks, selectedType, searchQuery]);

  const handleStartEdit = (item: BookmarkItem) => {
    setEditingNoteId(item.id);
    setNoteInput(item.note || '');
  };

  const handleSaveEdit = (id: string) => {
    updateNote(id, noteInput);
    setEditingNoteId(null);
  };

  const typeIcons: Record<BookmarkType, React.ElementType> = {
    company: Building2,
    guide: BookOpen,
    problem: Code2,
    experience: UserCheck,
  };

  const typeLabels: Record<BookmarkType, string> = {
    company: 'Company Radar',
    guide: 'Prep Guide',
    problem: 'Must-Solve Question',
    experience: 'Interview Experience',
  };

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Loading your saved bookmarks & revision notes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 text-xs font-semibold">
            <Bookmark className="w-3.5 h-3.5 fill-fuchsia-600 text-fuchsia-600" />
            <span>Revision Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Saved <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Bookmarks & Notes</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Your personal collection of bookmarked companies, must-solve questions, guides, and annotations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 shadow-sm">
          <span>{bookmarks.length} Total Saved Items</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within saved bookmarks & personal notes..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-300 focus:border-violet-500 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 px-2 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Company', 'Guide', 'Problem', 'Experience'].map((type) => {
            const isSelected = selectedType.toLowerCase() === type.toLowerCase();
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/20 border border-violet-500'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                {type === 'All' ? 'All Items' : `${type}s`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookmarks.map((item) => {
            const IconComponent = typeIcons[item.type] || Bookmark;
            const tagStyle = item.tag ? TAG_COLORS[item.tag] || TAG_COLORS['Uncategorized'] : null;

            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition relative"
              >
                <div className="space-y-3">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-violet-600 shadow-sm">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                          {typeLabels[item.type]}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => removeBookmark(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtitle / Tag */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.subtitle && (
                      <span className="text-xs text-slate-600">{item.subtitle}</span>
                    )}
                    {tagStyle && item.tag && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Note Section */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-700 font-semibold flex items-center gap-1">
                        <FileText className="w-3 h-3 text-amber-600" />
                        Personal Note
                      </span>
                      {editingNoteId !== item.id && (
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="text-slate-500 hover:text-slate-900 flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>{item.note ? 'Edit' : 'Add Note'}</span>
                        </button>
                      )}
                    </div>

                    {editingNoteId === item.id ? (
                      <div className="space-y-2 pt-1">
                        <textarea
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          placeholder="Add revision tip, edge cases, or interview reminder..."
                          rows={2}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 resize-none shadow-sm"
                          autoFocus
                        />
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="px-2 py-0.5 text-slate-500 hover:text-slate-800 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="px-2.5 py-1 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-md flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3 h-3" />
                            Save
                          </button>
                        </div>
                      </div>
                    ) : item.note ? (
                      <p className="text-slate-700 leading-relaxed italic">
                        &quot;{item.note}&quot;
                      </p>
                    ) : (
                      <p className="text-slate-400 italic">No notes added yet.</p>
                    )}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Saved {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  {item.url.startsWith('http') ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600 hover:text-violet-800 font-semibold flex items-center gap-1"
                    >
                      <span>Open External Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={item.url}
                      className="text-violet-600 hover:text-violet-800 font-semibold flex items-center gap-1"
                    >
                      <span>Open in Radar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center space-y-4 border border-slate-200 bg-white shadow-sm max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-fuchsia-50 flex items-center justify-center mx-auto text-fuchsia-600">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No saved bookmarks yet</h3>
            <p className="text-xs text-slate-500">
              Click the bookmark icon on any company radar, question, or guide to build your personalized revision repository.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/companies"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-semibold transition shadow-md shadow-violet-500/20"
            >
              <span>Explore Companies</span>
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
            >
              <span>Browse Guides</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
