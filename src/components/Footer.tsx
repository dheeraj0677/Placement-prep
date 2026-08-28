'use client';

import React from 'react';
import Link from 'next/link';
import { Radar, Terminal, Database, ShieldCheck, Heart, Sparkles, ArrowRight, Github, ExternalLink, GitCompare, BarChart3, Bookmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 mt-24 relative overflow-hidden">
      {/* Decorative gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 via-indigo-500/40 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-blue-400/30 text-white shadow-lg shadow-blue-500/20">
                <Radar className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">
                PlacementPrep <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Radar</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Transforming unstructured tech interview experiences from GeeksforGeeks & LeetCode into data-driven trend radars and must-solve preparation roadmaps.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                Supabase Postgres
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Python Scraper
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                RLS Protected
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Home Radar</span>
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Browse Companies</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Company Compare</span>
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Prep Guides & Timer</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Readiness Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Saved Notes & Bookmarks</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              System Design
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Next.js 14 App Router</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>Deterministic Keyword Tagging</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Recharts Visual Intelligence</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Tailwind Glassmorphic Dark UI</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                <span>Gamification & Streaks Engine</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PlacementPrep Radar. Built for ambitious software engineering candidates.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Engineered for peak placement performance</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
