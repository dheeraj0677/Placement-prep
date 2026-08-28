'use client';

import { useState, useEffect, useCallback } from 'react';

export type BookmarkType = 'company' | 'guide' | 'problem' | 'experience';

export interface BookmarkItem {
  id: string; // e.g. "comp-google", "dp-1", "dynamic-programming", "exp-g-1"
  type: BookmarkType;
  title: string;
  subtitle?: string;
  url: string;
  tag?: string;
  note?: string;
  createdAt: number;
}

const STORAGE_KEY = 'placement_radar_bookmarks_v1';

export function getStoredBookmarks(): BookmarkItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse bookmarks from storage', e);
    return [];
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setBookmarks(getStoredBookmarks());
    setMounted(true);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setBookmarks(getStoredBookmarks());
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const saveBookmarks = (items: BookmarkItem[]) => {
    setBookmarks(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      // Dispatch custom event for same-tab sync
      window.dispatchEvent(new Event('bookmarks_updated'));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  };

  useEffect(() => {
    const handleCustom = () => {
      setBookmarks(getStoredBookmarks());
    };
    window.addEventListener('bookmarks_updated', handleCustom);
    return () => window.removeEventListener('bookmarks_updated', handleCustom);
  }, []);

  const addBookmark = useCallback((item: Omit<BookmarkItem, 'createdAt'>) => {
    const current = getStoredBookmarks();
    const existingIndex = current.findIndex(b => b.id === item.id);
    let updated: BookmarkItem[];
    if (existingIndex >= 0) {
      updated = current.map((b, i) => i === existingIndex ? { ...b, ...item, createdAt: b.createdAt } : b);
    } else {
      updated = [{ ...item, createdAt: Date.now() }, ...current];
    }
    saveBookmarks(updated);
  }, []);

  const removeBookmark = useCallback((id: string) => {
    const current = getStoredBookmarks();
    const updated = current.filter(b => b.id !== id);
    saveBookmarks(updated);
  }, []);

  const toggleBookmark = useCallback((item: Omit<BookmarkItem, 'createdAt'>) => {
    const current = getStoredBookmarks();
    const exists = current.some(b => b.id === item.id);
    if (exists) {
      removeBookmark(item.id);
    } else {
      addBookmark(item);
    }
  }, [addBookmark, removeBookmark]);

  const updateNote = useCallback((id: string, note: string) => {
    const current = getStoredBookmarks();
    const updated = current.map(b => b.id === id ? { ...b, note } : b);
    saveBookmarks(updated);
  }, []);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.some(b => b.id === id);
  }, [bookmarks]);

  const getBookmarkNote = useCallback((id: string) => {
    return bookmarks.find(b => b.id === id)?.note || '';
  }, [bookmarks]);

  return {
    bookmarks,
    isMounted: mounted,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    updateNote,
    isBookmarked,
    getBookmarkNote,
  };
}
