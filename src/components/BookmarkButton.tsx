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
            ? 'text-pink-600 bg-pink-50 hover:bg-pink-100 border border-pink-200'
            : 'text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200'
        }`}
      >
        {bookmarked ? (
          <BookmarkCheck className={isSmall ? 'w-3.5 h-3.5 fill-pink-600' : 'w-4 h-4 fill-pink-600'} />
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
              ? 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'
              : 'text-slate-500 hover:text-amber-600 bg-slate-100 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <FileText className={isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        </button>
      )}

      {/* Note modal/popover */}
      {isNoteOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-72 p-3 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-xl z-50 space-y-2 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
            <span className="flex items-center gap-1.5 text-amber-600">
              <FileText className="w-3.5 h-3.5" />
              Personal Note
            </span>
            <button
              onClick={() => setIsNoteOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="e.g. Remember to handle negative subarray sums with hash map prefix logic..."
            rows={3}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 resize-none"
            autoFocus
          />

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 truncate max-w-[140px]">{title}</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsNoteOpen(false)}
                className="px-2 py-1 text-slate-500 hover:text-slate-800 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNote}
                className="px-2.5 py-1 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-md flex items-center gap-1 shadow-sm"
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
