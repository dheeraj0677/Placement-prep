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
  Sparkles,
  Building2,
  Cpu,
  Code,
  HelpCircle,
  Calendar,
  Layers
} from 'lucide-react';
import AuthButton from './AuthButton';
import { useDomain } from '@/lib/DomainContext';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { domain, setDomain, openBranchModal } = useDomain();

  const isEce = domain === 'ece';

  const navLinks = [
    { name: isEce ? 'ECE Compass' : 'Career Compass', href: '/career-paths', icon: Compass, badge: isEce ? '11 Roles' : undefined },
    { name: isEce ? 'Chipmakers' : 'Companies', href: '/companies', icon: Building2 },
    { name: 'Questions', href: '/questions', icon: HelpCircle, badge: 'Curated' },
    { name: 'Skill Matrix', href: '/skills', icon: Sparkles },
    { name: 'Prep Guides', href: '/guides', icon: BookOpen },
    { name: '30-Day Plan', href: '/study-plan', icon: Calendar },
    { name: 'Strategy', href: '/path-advisor', icon: Layers },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, badge: 'Pro' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl border shadow-lg group-hover:scale-105 transition duration-300 ${
              isEce
                ? 'bg-gradient-to-tr from-blue-600 via-cyan-600 to-teal-500 border-cyan-400/40 shadow-cyan-500/25'
                : 'bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 border-violet-400/40 shadow-violet-500/25'
            }`}>
              {isEce ? (
                <Cpu className="w-5 h-5 text-white animate-pulse" />
              ) : (
                <Radar className="w-5 h-5 text-white animate-spin-slow" />
              )}
              <div className={`absolute inset-0 rounded-xl animate-ping opacity-60 pointer-events-none ${
                isEce ? 'bg-cyan-400/20' : 'bg-violet-400/20'
              }`} style={{ animationDuration: '3s' }} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
                <span>PlacementPrep</span>
                <span className={`bg-clip-text text-transparent ${
                  isEce
                    ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600'
                    : 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600'
                }`}>
                  {isEce ? 'Silicon' : 'Radar'}
                </span>
              </span>
              <span className="text-[10px] text-slate-500 -mt-0.5 tracking-wider uppercase flex items-center gap-1 font-semibold">
                <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${
                  isEce ? 'bg-cyan-500' : 'bg-emerald-500'
                }`} />
                {isEce ? 'Semiconductor & ECE' : 'Software & IT Radar'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition duration-200 ${
                    isActive
                      ? isEce
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'bg-violet-50 text-violet-700 border border-violet-200 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${
                    isActive ? (isEce ? 'text-blue-600' : 'text-violet-600') : 'text-slate-400'
                  }`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`ml-0.5 px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded-md text-white shadow-sm ${
                      isEce
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600'
                        : 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Branch Switcher, Auth & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Branch Track Switcher Pill */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-inner">
              <button
                onClick={() => setDomain('it')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition duration-200 ${
                  domain === 'it'
                    ? 'bg-white text-violet-700 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch to Software & IT Placement Track"
              >
                <Code className="w-3.5 h-3.5 text-violet-600" />
                <span className="hidden sm:inline">IT</span>
              </button>
              <button
                onClick={() => setDomain('ece')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition duration-200 ${
                  domain === 'ece'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch to ECE & Semiconductor Placement Track"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">ECE</span>
              </button>
            </div>

            <AuthButton />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 xl:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-bounce-in shadow-xl">
          {/* Mobile Domain Switcher */}
          <div className="p-2 rounded-2xl bg-slate-100 flex items-center gap-2">
            <button
              onClick={() => { setDomain('it'); setMobileMenuOpen(false); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition ${
                domain === 'it' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Software (IT)</span>
            </button>
            <button
              onClick={() => { setDomain('ece'); setMobileMenuOpen(false); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition ${
                domain === 'ece' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Semiconductor (ECE)</span>
            </button>
          </div>

          <div className="space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? isEce
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'bg-violet-50 text-violet-700 border border-violet-200 shadow-sm'
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isEce ? 'text-blue-600' : 'text-violet-600'}`} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md text-white ${
                      isEce
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600'
                        : 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
