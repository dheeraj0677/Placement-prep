'use client';

import React from 'react';
import { useDomain } from '@/lib/DomainContext';
import { 
  Cpu, 
  Code, 
  Sparkles, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Building2, 
  Compass,
  Wrench,
  Briefcase
} from 'lucide-react';

export default function BranchSelector() {
  const { domain, setDomain, isBranchModalOpen, closeBranchModal } = useDomain();

  if (!isBranchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeBranchModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 pb-4 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Tailor Your Preparation Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            What domain are you preparing for?
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Select your placement track to customize target companies, topic radars, interview questions, and prep guides. You can switch tracks anytime!
          </p>
        </div>

        {/* Branch Cards */}
        <div className="p-6 sm:p-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Software / IT */}
          <div
            onClick={() => setDomain('it')}
            className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 text-left flex flex-col justify-between ${
              domain === 'it'
                ? 'border-violet-600 bg-violet-50/50 shadow-lg shadow-violet-500/15'
                : 'border-slate-200 bg-white hover:border-violet-300 hover:shadow-md'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:scale-105 transition">
                  <Code className="w-6 h-6" />
                </div>
                {domain === 'it' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-violet-700 bg-violet-100 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active Track
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium group-hover:text-violet-600 transition">Select Track</span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>Software & IT Track</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Target SDE, Full-Stack, AI/ML, Data Science, Cloud, and IT Consulting campus placements.
                </p>
              </div>

              {/* Tag Highlights */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['DSA & LeetCode', 'System Design', 'DBMS / SQL', 'OS & Networks', 'OOP Patterns'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Companies Highlight */}
              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200/60">
                <span className="font-semibold text-slate-700">Top Recruiters:</span> Google, Amazon, Microsoft, TCS, Infosys, Flipkart, Atlassian
              </div>
            </div>

            <button
              onClick={() => setDomain('it')}
              className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                domain === 'it'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                  : 'bg-slate-100 group-hover:bg-violet-600 group-hover:text-white text-slate-700'
              }`}
            >
              <span>{domain === 'it' ? 'Selected • Continue' : 'Explore Software Track'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: ECE / Semiconductor */}
          <div
            onClick={() => setDomain('ece')}
            className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 text-left flex flex-col justify-between ${
              domain === 'ece'
                ? 'border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-500/15'
                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
                  <Cpu className="w-6 h-6" />
                </div>
                {domain === 'ece' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active Track
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium group-hover:text-blue-600 transition">Select Track</span>
                )}
              </div>

              <div>
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 mb-1">
                  NEW • Semiconductor Hub
                </div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>ECE & Semiconductor Track</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Target VLSI, ASIC Design, Physical Design, STA, Embedded Systems, Firmware, and Analog IC placements.
                </p>
              </div>

              {/* Tag Highlights */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Digital & FSM', 'Verilog / UVM', 'STA & Timing', 'Embedded C & RTOS', 'RISC-V Arch', 'CAN / SPI / I2C'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Companies Highlight */}
              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200/60">
                <span className="font-semibold text-slate-700">Top Recruiters:</span> NVIDIA, AMD, Intel, Qualcomm, Texas Instruments, Broadcom, Bosch
              </div>
            </div>

            <button
              onClick={() => setDomain('ece')}
              className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                domain === 'ece'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700'
              }`}
            >
              <span>{domain === 'ece' ? 'Selected • Continue' : 'Explore ECE & Core Track'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Coming Soon Tracks Row */}
        <div className="px-6 sm:px-8 pb-6 pt-0 border-t border-slate-100">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4 text-center">
            Upcoming Disciplines
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between opacity-75">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">Mechanical & EV Robotics</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                Coming Soon
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between opacity-75">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">Business & Tech Consulting</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
