import React from 'react';
import Link from 'next/link';
import { Radar, Terminal, Database, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400">
                <Radar className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">
                PlacementPrep <span className="text-blue-400">Radar</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Transforming unstructured interview experiences into data-driven trend insights, topic frequency radars, and personalized preparation checklists.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                Supabase Postgres
              </span>
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Python Scraper
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                RLS Protected
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Radar Home
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-blue-400 transition">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-blue-400 transition">
                  Topic Prep Guides
                </Link>
              </li>
              <li>
                <Link href="/checklist" className="hover:text-blue-400 transition">
                  My Prep Checklist
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-400 transition">
                  Supabase Auth Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Next.js 14 App Router</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>Deterministic Keyword Classifier</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Recharts Data Visualization</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Tailwind Glassmorphic UI</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PlacementPrep Radar. Built for ambitious software engineering candidates.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Aggregating real experiences with precision</span>
            <Sparkles className="w-3 h-3 text-blue-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
