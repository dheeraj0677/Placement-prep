'use client';

import React from 'react';
import Link from 'next/link';
import { Radar, Heart, Sparkles, ArrowRight, Github, ExternalLink, GitCompare, BarChart3, Bookmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-24 relative overflow-hidden">
      {/* Decorative gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 via-fuchsia-500/25 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-40 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 border border-violet-400/30 text-white shadow-lg shadow-violet-500/20">
                <Radar className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900">
                PlacementPrep <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Radar</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Transforming unstructured interview experiences across <strong>GeeksforGeeks, LeetCode, AmbitionBox, Naukri Code360, and HDLBits</strong> into data-driven trend radars, must-solve preparation roadmaps, and Career Compass workshop blueprints.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sources:</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-2xs">GeeksforGeeks</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-2xs">LeetCode</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-2xs">AmbitionBox</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-2xs">Naukri Code360</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-2xs">HDLBits</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link href="/" className="hover:text-violet-600 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Home Radar</span>
                </Link>
              </li>
              <li>
                <Link href="/career-paths" className="hover:text-violet-700 transition flex items-center gap-1.5 text-violet-600 font-semibold">
                  <ArrowRight className="w-3 h-3 text-violet-500" />
                  <span>Career Compass (Workshop)</span>
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-emerald-700 transition flex items-center gap-1.5 text-emerald-600 font-medium">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>Skill Gap Analyzer</span>
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-violet-600 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Browse Companies</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-violet-600 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Company Compare</span>
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-violet-600 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Prep Guides & Timer</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-violet-600 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Readiness Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/questions" className="hover:text-violet-600 transition flex items-center gap-1.5 text-violet-600 font-semibold">
                  <ArrowRight className="w-3 h-3 text-violet-500" />
                  <span>Question Bank (Curated)</span>
                </Link>
              </li>
              <li>
                <Link href="/study-plan" className="hover:text-cyan-600 transition flex items-center gap-1.5 text-cyan-700 font-medium">
                  <ArrowRight className="w-3 h-3 text-cyan-600" />
                  <span>30-Day Placement Plan</span>
                </Link>
              </li>
              <li>
                <Link href="/path-advisor" className="hover:text-violet-600 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Core vs IT Strategy Advisor</span>
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-violet-600 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Saved Notes & Bookmarks</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              System Design
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <span>Next.js 14 App Router</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                <span>Deterministic Keyword Tagging</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Recharts Visual Intelligence</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span>Tailwind Clean Modern UI</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Gamification & Streaks Engine</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PlacementPrep Radar • Verified for 2025–2026 Batch Placements.</p>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>Engineered for peak placement performance</span>
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
