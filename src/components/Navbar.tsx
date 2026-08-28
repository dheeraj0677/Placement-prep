'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Radar, 
  Compass, 
  CheckSquare, 
  BookOpen, 
  GitCompare, 
  BarChart3, 
  Bookmark, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import AuthButton from './AuthButton';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Explore Companies', href: '/companies', icon: Compass },
    { name: 'Compare', href: '/compare', icon: GitCompare, badge: 'New' },
    { name: 'Prep Guides', href: '/guides', icon: BookOpen },
    { name: 'Checklist', href: '/checklist', icon: CheckSquare },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, badge: 'Pro' },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 border border-blue-400/40 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition duration-300">
              <Radar className="w-5 h-5 text-white animate-spin-slow" />
              <div className="absolute inset-0 rounded-xl bg-blue-400/20 animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '3s' }} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                <span>PlacementPrep</span>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">Radar</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-0.5 tracking-wider uppercase flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Live Trend Engine
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition duration-200 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm shadow-blue-500/15'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Auth & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <AuthButton />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl border border-slate-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-bounce-in shadow-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-md bg-indigo-600 text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
