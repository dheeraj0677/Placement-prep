'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Radar, 
  Compass, 
  BookOpen, 
  BarChart3, 
  Menu, 
  X,
  Building2, 
  Cpu, 
  Code, 
  HelpCircle, 
  ChevronDown,
  Calendar,
  Layers,
  Sparkles,
  GitCompare,
  Bookmark
} from 'lucide-react';
import AuthButton from './AuthButton';
import { useDomain } from '@/lib/DomainContext';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { domain, setDomain } = useDomain();

  const isEce = domain === 'ece';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryLinks = [
    { name: isEce ? 'ECE Compass' : 'Career Compass', href: '/career-paths', icon: Compass },
    { name: isEce ? 'Chipmakers' : 'Companies', href: '/companies', icon: Building2 },
    { name: 'Questions', href: '/questions', icon: HelpCircle },
    { name: 'Prep Guides', href: '/guides', icon: BookOpen },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  ];

  const secondaryTools = [
    { name: '30-Day Battle Plan', desc: 'Daily milestone syllabus', href: '/study-plan', icon: Calendar },
    { name: 'Core vs IT Strategy', desc: 'Placement bandwidth advisor', href: '/path-advisor', icon: Layers },
    { name: 'Skill Matrix', desc: 'Readiness gap analyzer', href: '/skills', icon: Sparkles },
    { name: 'Compare Radar', desc: 'Multi-company radar analysis', href: '/compare', icon: GitCompare },
    { name: 'Saved Bookmarks', desc: 'Your saved notes & questions', href: '/bookmarks', icon: Bookmark },
  ];

  const isToolActive = secondaryTools.some(tool => pathname === tool.href || pathname.startsWith(tool.href));

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-300 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className={`relative flex items-center justify-center w-9 h-9 rounded-xl border shadow-md transition duration-300 ${
              isEce
                ? 'bg-gradient-to-tr from-blue-600 via-cyan-600 to-teal-500 border-cyan-400/40 shadow-cyan-500/20'
                : 'bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 border-violet-400/40 shadow-violet-500/20'
            }`}>
              {isEce ? (
                <Cpu className="w-4.5 h-4.5 text-white" />
              ) : (
                <Radar className="w-4.5 h-4.5 text-white" />
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1 whitespace-nowrap">
                <span>PlacementPrep</span>
                <span className={`bg-clip-text text-transparent ${
                  isEce
                    ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600'
                    : 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600'
                }`}>
                  {isEce ? 'Silicon' : 'Radar'}
                </span>
              </span>
              <span className="text-[10px] text-slate-500 -mt-0.5 tracking-wider font-semibold whitespace-nowrap flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isEce ? 'bg-cyan-500' : 'bg-violet-500'}`} />
                {isEce ? 'Semiconductor & ECE' : 'Software & IT'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Clean, Spacious, No Text Wrapping) */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition duration-150 ${
                    isActive
                      ? isEce
                        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-sm'
                        : 'bg-violet-50 text-violet-700 font-bold border border-violet-200 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${
                    isActive ? (isEce ? 'text-blue-600' : 'text-violet-600') : 'text-slate-400'
                  }`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition duration-150 ${
                  isToolActive || toolsDropdownOpen
                    ? isEce
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-violet-50 text-violet-700 border border-violet-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition duration-200 ${
                  toolsDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu */}
              {toolsDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 p-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[70] space-y-1 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Preparation Tools
                  </div>
                  {secondaryTools.map((tool) => {
                    const ToolIcon = tool.icon;
                    const isActive = pathname === tool.href;
                    return (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl transition ${
                          isActive
                            ? 'bg-violet-50 text-violet-800'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <ToolIcon className="w-4 h-4 mt-0.5 text-violet-600 shrink-0" />
                        <div>
                          <div className="text-xs font-bold leading-tight">{tool.name}</div>
                          <div className="text-[11px] text-slate-500 leading-tight">{tool.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Clean Branch Switcher & Sign In */}
          <div className="flex items-center gap-3">
            {/* Minimalist Switcher Pill */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => setDomain('it')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition duration-200 ${
                  domain === 'it'
                    ? 'bg-white text-violet-700 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Software & IT Placement Track"
              >
                <Code className="w-3.5 h-3.5 text-violet-600" />
                <span>IT</span>
              </button>
              <button
                type="button"
                onClick={() => setDomain('ece')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition duration-200 ${
                  domain === 'ece'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Semiconductor & ECE Placement Track"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                <span>ECE</span>
              </button>
            </div>

            <AuthButton />

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          {/* Mobile Track Switcher */}
          <div className="p-1 rounded-xl bg-slate-100 flex items-center gap-1 border border-slate-200">
            <button
              type="button"
              onClick={() => { setDomain('it'); setMobileMenuOpen(false); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition ${
                domain === 'it' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Software & IT</span>
            </button>
            <button
              type="button"
              onClick={() => { setDomain('ece'); setMobileMenuOpen(false); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition ${
                domain === 'ece' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Semiconductor (ECE)</span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase">Core Navigation</div>
            {primaryLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? isEce
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-violet-50 text-violet-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isEce ? 'text-blue-600' : 'text-violet-600'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="px-2 pt-3 pb-1 text-[11px] font-bold text-slate-400 uppercase">Tools & Blueprints</div>
            {secondaryTools.map((tool) => {
              const ToolIcon = tool.icon;
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition ${
                    isActive ? 'bg-violet-50 text-violet-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ToolIcon className="w-4 h-4 text-slate-500" />
                  <span>{tool.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
