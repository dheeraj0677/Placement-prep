'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Radar, 
  Compass, 
  CheckSquare, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Database, 
  BarChart3, 
  Terminal, 
  TrendingUp, 
  Layers, 
  GitCompare,
  CheckCircle2,
  Flame,
  Clock,
  Target,
  Search,
  ExternalLink,
  Building2,
  Zap,
  Star,
  Code,
  Sliders,
  HelpCircle,
  Calendar
} from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import CompanyCard from '@/components/CompanyCard';
import GuideCard from '@/components/GuideCard';
import RoleCard from '@/components/RoleCard';
import { MOCK_COMPANIES } from '@/lib/mockData';
import { ECE_COMPANIES } from '@/lib/eceData';
import { PREP_GUIDES } from '@/lib/guidesData';
import { ECE_PREP_GUIDES } from '@/lib/eceGuidesData';
import { CAREER_ROLES } from '@/lib/careerPathsData';
import { ECE_CAREER_ROLES } from '@/lib/eceCareerPathsData';
import { useDomain } from '@/lib/DomainContext';

export default function HomePage() {
  const { domain, setDomain, openBranchModal } = useDomain();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const isEce = domain === 'ece';

  // Active companies pool based on domain
  const currentCompaniesPool = isEce ? ECE_COMPANIES : MOCK_COMPANIES;

  // Filter companies based on category tabs
  const filteredCompanies = currentCompaniesPool.filter((comp) => {
    if (activeCategoryFilter === 'All') return true;
    if (isEce) {
      if (activeCategoryFilter === 'Semiconductor & GPU') {
        return ['Semiconductor & GPU', 'Semiconductor & Silicon'].includes(comp.industry || '');
      }
      if (activeCategoryFilter === 'Fabless & Wireless') {
        return ['Fabless Semiconductor & Wireless'].includes(comp.industry || '');
      }
      if (activeCategoryFilter === 'Embedded & Automotive') {
        return ['Embedded Systems & Automotive', 'Automotive & Power Semiconductor'].includes(comp.industry || '');
      }
      if (activeCategoryFilter === 'Analog & Mixed Signal') {
        return ['Analog & Mixed Signal'].includes(comp.industry || '');
      }
    } else {
      if (activeCategoryFilter === 'Product') {
        return ['Technology', 'E-Commerce & Cloud', 'E-Commerce', 'Consumer Tech', 'Enterprise Software'].includes(comp.industry || '');
      }
      if (activeCategoryFilter === 'Services') {
        return ['IT Services & Consulting', 'IT & Strategy Consulting', 'Telecommunications & Tech'].includes(comp.industry || '');
      }
      if (activeCategoryFilter === 'Fintech') {
        return ['Financial Services', 'Fintech & Payments'].includes(comp.industry || '');
      }
    }
    return true;
  }).slice(0, 6);

  // Dynamic guides and roles
  const featuredGuides = (isEce ? ECE_PREP_GUIDES : PREP_GUIDES).slice(0, 3);
  const featuredRoles = (isEce ? ECE_CAREER_ROLES : CAREER_ROLES).slice(0, 3);

  const quickJumpCompanies = isEce
    ? ['NVIDIA', 'AMD', 'Intel', 'Qualcomm', 'Texas Instruments', 'Broadcom', 'Micron Technology', 'Bosch Global Software']
    : ['Google', 'TCS', 'Infosys', 'Amazon', 'Capgemini', 'Microsoft', 'Flipkart', 'Goldman Sachs'];

  const filterTabs = isEce
    ? ['All', 'Semiconductor & GPU', 'Fabless & Wireless', 'Embedded & Automotive', 'Analog & Mixed Signal']
    : ['All', 'Product', 'Services', 'Fintech'];

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Ambient Mesh Gradients */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] blur-3xl pointer-events-none -z-10 ${
        isEce 
          ? 'bg-gradient-to-b from-blue-500/10 via-cyan-500/5 to-transparent' 
          : 'bg-gradient-to-b from-violet-500/10 via-purple-500/5 to-transparent'
      }`} />
      <div className={`absolute top-40 right-4 sm:right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow ${
        isEce ? 'bg-cyan-500/10' : 'bg-purple-500/10'
      }`} />
      <div className={`absolute top-80 left-4 sm:left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow ${
        isEce ? 'bg-blue-500/10' : 'bg-emerald-500/10'
      }`} />

      {/* Hero Section */}
      <section className="pt-6 sm:pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Ticker Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold shadow-sm backdrop-blur-md ${
              isEce
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-violet-50 border-violet-200 text-violet-700'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${isEce ? 'bg-cyan-500' : 'bg-emerald-500'}`} />
              <span className="font-bold">
                {isEce ? 'PlacementPrep Silicon v2.5' : 'PlacementPrep Radar v2.0'}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">
                {isEce ? '18 Top Semiconductor & Core Recruiters' : 'Live 2024–2025 Hiring Shift Analysis'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              {isEce ? (
                <>
                  Stop guessing hardware rounds.{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    Target what chipmakers actually test.
                  </span>
                </>
              ) : (
                <>
                  Stop scrolling endless posts.{' '}
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Target what companies actually test.
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isEce ? (
                <>
                  Ingesting real interview experiences from <strong>NVIDIA, Intel, Qualcomm, AMD, TI & Bosch</strong>. We break down Digital Electronics, Verilog, STA, Computer Architecture, and Embedded C into deterministic preparation checklists.
                </>
              ) : (
                <>
                  We ingest real interview experiences from GeeksforGeeks, AmbitionBox, and LeetCode, classify rounds into deterministic topic frequencies, and generate actionable roadmaps.
                </>
              )}
            </p>

            {/* Hero Search Box */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <SearchBar 
                autoNavigate 
                placeholder={
                  isEce 
                    ? "Search semiconductor company (e.g. NVIDIA, Qualcomm, Intel, TI, AMD)..." 
                    : "Search target company (e.g. Google, TCS, Infosys, Amazon, Capgemini)..."
                } 
              />
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-slate-500">
                <span className="text-slate-400 font-medium">Quick Jump:</span>
                {quickJumpCompanies.map((comp) => (
                  <Link
                    key={comp}
                    href={`/companies?search=${encodeURIComponent(comp)}`}
                    className="px-2.5 py-0.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 transition font-medium shadow-sm"
                  >
                    {comp}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <Link
                href="/career-paths"
                className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition shadow-lg active:scale-95 border ${
                  isEce
                    ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 shadow-blue-500/25 border-cyan-400/30'
                    : 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-violet-500/25 border-violet-400/30'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>{isEce ? 'ECE Roles Compass' : 'Career Compass'}</span>
                <span className="px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded bg-white/20 text-white">
                  {isEce ? '11 Blueprints' : 'Workshop'}
                </span>
              </Link>

              <Link
                href="/questions"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-900 font-semibold text-sm border border-slate-200 transition shadow-sm active:scale-95"
              >
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Questions Bank</span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-emerald-100 text-emerald-800 rounded">100+</span>
              </Link>
              
              <Link
                href="/companies"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-900 font-semibold text-sm border border-slate-200 transition shadow-sm active:scale-95"
              >
                <Building2 className={`w-4 h-4 ${isEce ? 'text-blue-600' : 'text-violet-600'}`} />
                <span>{isEce ? 'Chipmakers' : 'Company Radars'}</span>
              </Link>

              <Link
                href="/study-plan"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-sm border border-amber-200 transition shadow-sm active:scale-95"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>30-Day Plan</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Radar Scope Visual (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 max-w-full flex items-center justify-center">
              {/* Outer Radar Rings */}
              <div className={`absolute inset-0 rounded-full border animate-pulse-glow ${
                isEce ? 'border-cyan-500/20' : 'border-violet-500/20'
              }`} />
              <div className={`absolute inset-6 rounded-full border ${
                isEce ? 'border-blue-500/20' : 'border-purple-500/20'
              }`} />
              <div className="absolute inset-14 rounded-full border border-emerald-500/15" />
              <div className="absolute inset-24 rounded-full border border-slate-200" />
              
              {/* Crosshair lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-full h-px bg-gradient-to-r from-transparent to-transparent ${
                  isEce ? 'via-cyan-400/30' : 'via-violet-400/25'
                }`} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`h-full w-px bg-gradient-to-b from-transparent to-transparent ${
                  isEce ? 'via-cyan-400/30' : 'via-violet-400/25'
                }`} />
              </div>

              {/* Rotating Radar Sweep Cone */}
              <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="w-full h-full animate-radar origin-center"
                  style={{
                    background: isEce
                      ? 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(6, 182, 212, 0.25) 360deg)'
                      : 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(168, 85, 247, 0.25) 360deg)',
                  }}
                />
              </div>

              {/* Central Glowing Radar Core */}
              <div className={`relative z-10 w-16 h-16 rounded-2xl border flex items-center justify-center text-white shadow-xl animate-pulse ${
                isEce
                  ? 'bg-gradient-to-tr from-blue-600 to-cyan-600 border-cyan-400/50 shadow-cyan-500/30'
                  : 'bg-gradient-to-tr from-violet-600 to-fuchsia-600 border-violet-400/50 shadow-violet-500/30'
              }`}>
                {isEce ? <Cpu className="w-8 h-8 text-white" /> : <Radar className="w-8 h-8 text-white" />}
              </div>

              {/* Dynamic Radar Blips */}
              {isEce ? (
                <>
                  <Link
                    href="/companies/comp-nvidia"
                    title="NVIDIA Radar (Verilog / STA / Architecture)"
                    className="absolute top-10 right-10 z-20 group"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-[11px] font-bold text-emerald-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                      <span>NVIDIA</span>
                    </div>
                  </Link>

                  <Link
                    href="/companies/comp-qualcomm"
                    title="Qualcomm Radar (Embedded C / Protocols / RTOS)"
                    className="absolute bottom-12 left-6 z-20 group"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-[11px] font-bold text-blue-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                      <span>Qualcomm</span>
                    </div>
                  </Link>

                  <Link
                    href="/companies/comp-ti"
                    title="Texas Instruments Radar (Analog / Op-Amps / ADC)"
                    className="absolute bottom-8 right-12 z-20 group"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-[11px] font-bold text-rose-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                      <span>TI</span>
                    </div>
                  </Link>

                  <Link
                    href="/companies/comp-amd"
                    title="AMD Radar (Physical Design / CTS / STA)"
                    className="absolute top-16 left-8 z-20 group"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-[11px] font-bold text-purple-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                      <span>AMD</span>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/companies/comp-google"
                    title="Google Radar (High DP / Graphs)"
                    className="absolute top-10 right-10 z-20 group"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-white border border-violet-200 text-[11px] font-bold text-violet-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-ping" />
                      <span>Google</span>
                    </div>
                  </Link>

                  <Link
                    href="/companies/comp-amazon"
                    title="Amazon Radar (Arrays / OOP / System Design)"
                    className="absolute bottom-12 left-6 z-20 group"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-[11px] font-bold text-amber-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      <span>Amazon</span>
                    </div>
                  </Link>

                  <Link
                    href="/companies/comp-tcs"
                    title="TCS Radar (Aptitude / DBMS / OOP)"
                    className="absolute bottom-8 right-12 z-20 group"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-[11px] font-bold text-emerald-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>TCS</span>
                    </div>
                  </Link>

                  <Link
                    href="/companies/comp-microsoft"
                    title="Microsoft Radar (Trees / Graphs / OS)"
                    className="absolute top-16 left-8 z-20 group"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-[11px] font-bold text-purple-700 shadow-md flex items-center gap-1 group-hover:scale-110 transition">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                      <span>Microsoft</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-slate-300 transition shadow-sm">
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono ${isEce ? 'text-blue-600' : 'text-violet-600'}`}>
              {currentCompaniesPool.length}+
            </div>
            <div className="text-xs text-slate-800 font-semibold uppercase tracking-wider">
              {isEce ? 'Semiconductor Firms' : 'Top Tech Companies'}
            </div>
            <p className="text-[11px] text-slate-500">
              {isEce ? 'VLSI, GPU, Silicon & Auto' : 'FAANG, Unicorns & Services'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-slate-300 transition shadow-sm">
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono ${isEce ? 'text-cyan-600' : 'text-fuchsia-600'}`}>
              100+
            </div>
            <div className="text-xs text-slate-800 font-semibold uppercase tracking-wider">
              {isEce ? 'Hardware Rounds' : 'Rounds Analyzed'}
            </div>
            <p className="text-[11px] text-slate-500">
              {isEce ? 'STA, RTL, Protocols & Lab' : 'OA, Technical & System Design'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-slate-300 transition shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">
              100+
            </div>
            <div className="text-xs text-slate-800 font-semibold uppercase tracking-wider">
              Curated Questions
            </div>
            <p className="text-[11px] text-slate-500">
              {isEce ? 'Detailed Hardware Solutions' : 'Direct LeetCode & GFG Links'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1 hover:border-slate-300 transition shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 font-mono">
              1-Click
            </div>
            <div className="text-xs text-slate-800 font-semibold uppercase tracking-wider">
              Personal Checklists
            </div>
            <p className="text-[11px] text-slate-500">With readiness & streak tracking</p>
          </div>
        </div>
      </section>

      {/* Featured Companies Section with Category Filter Tabs */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
              isEce ? 'text-blue-600' : 'text-violet-600'
            }`}>
              {isEce ? <Cpu className="w-4 h-4" /> : <Radar className="w-4 h-4 animate-spin-slow" />}
              <span>{isEce ? 'Semiconductor Radar' : 'Target Analysis'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isEce ? 'Top Semiconductor & Hardware Radars' : 'Featured Company Radars'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isEce
                ? 'Topic breakdowns across Digital Electronics, STA, Verilog, and Embedded C from verified interviews.'
                : 'Live topic frequency breakdown and round distribution calculated from authentic interview posts.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            {filterTabs.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeCategoryFilter === cat
                    ? isEce
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                      : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat === 'All' ? (isEce ? 'All Chipmakers' : 'All Companies') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {/* View All Companies Footer CTA */}
        <div className="text-center pt-2">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold transition shadow-sm"
          >
            <span>Explore All {currentCompaniesPool.length}+ {isEce ? 'Hardware' : 'Company'} Radars</span>
            <ArrowRight className={`w-4 h-4 ${isEce ? 'text-blue-600' : 'text-violet-600'}`} />
          </Link>
        </div>
      </section>

      {/* Career Compass Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${
              isEce
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-violet-50 border-violet-200 text-violet-700'
            }`}>
              <Compass className={`w-3.5 h-3.5 ${isEce ? 'text-blue-600' : 'text-violet-600'}`} />
              <span>Career Roadmap</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">{isEce ? 'ECE Blueprint Hub' : 'Career Compass'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isEce ? 'Explore ECE & Semiconductor Career Paths' : 'Explore Career Paths, Roles & Skills'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              {isEce
                ? 'Detailed role requirements, CTC packages, core radar metrics, and interview round breakdowns across Embedded, VLSI, Physical Design, and Firmware.'
                : 'Break down the exact technical (SDE, Data, AI, Cloud, Cyber) and non-technical (PM, Consulting, Analytics) roles companies hire for on-campus.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/career-paths"
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition ${
                isEce ? 'text-blue-600 hover:text-blue-700' : 'text-violet-600 hover:text-violet-700'
              }`}
            >
              <span>Explore all {isEce ? ECE_CAREER_ROLES.length : CAREER_ROLES.length} role blueprints</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredRoles.map((role) => (
            <RoleCard key={role.slug} role={role} />
          ))}
        </div>

        {/* Core vs IT Strategy Banner */}
        <div className={`rounded-2xl p-5 sm:p-6 border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm ${
          isEce
            ? 'bg-gradient-to-r from-slate-50 via-blue-50/60 to-slate-50 border-blue-200'
            : 'bg-gradient-to-r from-slate-50 via-violet-50/60 to-slate-50 border-violet-200'
        }`}>
          <div className="space-y-1 text-center sm:text-left">
            <div className={`text-xs font-bold flex items-center justify-center sm:justify-start gap-1.5 ${
              isEce ? 'text-blue-900' : 'text-violet-900'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Confused between choosing IT Software vs Core ECE / Hardware?</span>
            </div>
            <p className="text-xs text-slate-600">
              Use our Strategy Advisor to calculate your dual-prep bandwidth, CTC projections, and balanced weekly study routine.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/path-advisor"
              className={`px-4 py-2 rounded-xl text-white text-xs font-bold transition shadow-md active:scale-95 ${
                isEce
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-500/20'
                  : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-violet-500/20'
              }`}
            >
              Open Core vs IT Advisor →
            </Link>
          </div>
        </div>
      </section>

      {/* Preparation Guides Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
              isEce ? 'text-cyan-600' : 'text-purple-600'
            }`}>
              <BookOpen className="w-4 h-4" />
              <span>Study Blueprints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isEce ? 'ECE Topic-Wise Study Guides & Blueprints' : 'Topic-Wise Preparation Guides & Roadmaps'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isEce
                ? 'Curated guides for STA Slack, FSM Design, Verilog RTL, Embedded C, and Hardware Protocols.'
                : 'Curated roadmaps with must-solve LeetCode/GFG questions and live practice countdown timer.'}
            </p>
          </div>

          <Link
            href="/guides"
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition shrink-0 ${
              isEce ? 'text-blue-600 hover:text-blue-700' : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            <span>Explore all {isEce ? ECE_PREP_GUIDES.length : PREP_GUIDES.length} study guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      {/* Modern Stack Bento Grid */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 relative overflow-hidden space-y-8 shadow-sm">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-cyan-600" />
              <span>Dual-Track Intelligence Engine</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Why PlacementPrep Radar gives you the edge
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Raw interview posts across the web are unstructured and noisy. We parse, classify, and turn them into actionable readiness signals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Multi-Source Ingestion</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Asynchronous scrapers parsing GeeksforGeeks, AmbitionBox, and Naukri Code360 into structured round-by-round segments (OA, Technical, System Design, HR).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Deterministic Taxonomies</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Independent keyword taxonomies for Software (DP, Graphs, System Design) and Hardware (STA, Verilog, RISC-V, Embedded C) with zero hallucinations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Readiness Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Relational aggregation calculating real-time company readiness scores, 30-day customized calendars, and personalized interview checklists.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
