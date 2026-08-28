'use client';

import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, FileText, Check, X } from 'lucide-react';
import { useBookmarks, BookmarkType } from '@/lib/useBookmarks';

interface BookmarkButtonProps {
  id: string;
  type: BookmarkType;
  title: string;
  subtitle?: string;
  url: string;
  tag?: string;
  size?: 'sm' | 'md';
  showNoteButton?: boolean;
}

export default function BookmarkButton({
  id,
  type,
  title,
  subtitle,
  url,
  tag,
  size = 'md',
  showNoteButton = true,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, getBookmarkNote, updateNote } = useBookmarks();
  const bookmarked = isBookmarked(id);
  const existingNote = getBookmarkNote(id);

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState(existingNote);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark({ id, type, title, subtitle, url, tag, note: existingNote });
  };

  const handleOpenNote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNoteText(existingNote);
    setIsNoteOpen(true);
  };

  const handleSaveNote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!bookmarked) {
      toggleBookmark({ id, type, title, subtitle, url, tag, note: noteText });
    } else {
      updateNote(id, noteText);
    }
    setIsNoteOpen(false);
  };

  const isSmall = size === 'sm';

  return (
    <div className="relative inline-flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={handleToggle}
        title={bookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
        className={`rounded-lg transition flex items-center justify-center ${
          isSmall ? 'p-1' : 'p-1.5'
        } ${
          bookmarked
            ? 'text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30'
            : 'text-slate-400 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700/60'
        }`}
      >
        {bookmarked ? (
          <BookmarkCheck className={isSmall ? 'w-3.5 h-3.5 fill-pink-400' : 'w-4 h-4 fill-pink-400'} />
        ) : (
          <Bookmark className={isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        )}
      </button>

      {/* Note indicator / trigger */}
      {showNoteButton && bookmarked && (
        <button
          type="button"
          onClick={handleOpenNote}
          title={existingNote ? `Note: "${existingNote}"` : 'Add personal note'}
          className={`rounded-lg transition flex items-center justify-center ${
            isSmall ? 'p-1' : 'p-1.5'
          } ${
            existingNote
              ? 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
              : 'text-slate-400 hover:text-amber-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/50'
          }`}
        >
          <FileText className={isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        </button>
      )}

      {/* Note modal/popover */}
      {isNoteOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-72 p-3 bg-slate-950/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl z-50 space-y-2 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <span className="flex items-center gap-1.5 text-amber-400">
              <FileText className="w-3.5 h-3.5" />
              Personal Note
            </span>
            <button
              onClick={() => setIsNoteOpen(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="e.g. Remember to handle negative subarray sums with hash map prefix logic..."
            rows={3}
            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            autoFocus
          />

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 truncate max-w-[140px]">{title}</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsNoteOpen(false)}
                className="px-2 py-1 text-slate-400 hover:text-white rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNote}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3 h-3" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
