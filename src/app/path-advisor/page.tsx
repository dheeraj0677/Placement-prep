'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Sparkles, 
  Cpu, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  TrendingUp,
  Award,
  ChevronRight,
  ExternalLink,
  Target
} from 'lucide-react';
import { useDomain } from '@/lib/DomainContext';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    coreScore: number;
    itScore: number;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'college_tier',
    title: '1. What is your college placement track record for hardware?',
    subtitle: 'Campus visit reality dictates placement probability more than anything else.',
    options: [
      {
        label: 'Tier-1 (IITs, NITs, BITS, IIITs)',
        description: '10+ semiconductor firms visit regularly (NVIDIA, Intel, Qualcomm, AMD, TI, Broadcom).',
        coreScore: 35,
        itScore: 20
      },
      {
        label: 'Tier-2 (Top State/Private Tech Universities)',
        description: '3 to 6 core semiconductor firms visit; strong IT and product software recruitment.',
        coreScore: 20,
        itScore: 25
      },
      {
        label: 'Tier-3 / Affiliated Engineering Colleges',
        description: 'Rarely or never see core semiconductor visits; 95% offers are IT services and product tech.',
        coreScore: 5,
        itScore: 35
      }
    ]
  },
  {
    id: 'cgpa',
    title: '2. What is your current academic CGPA / Percentage?',
    subtitle: 'Semiconductor firms maintain strict CGPA cutoffs (often 8.0+ or 8.5+ with zero backlogs).',
    options: [
      {
        label: '8.5+ CGPA (First Class with Distinction)',
        description: 'Eligible for 100% of core semiconductor screening criteria and super-dream roles.',
        coreScore: 25,
        itScore: 15
      },
      {
        label: '7.5 to 8.4 CGPA',
        description: 'Eligible for all IT roles, and ~60% of core semiconductor firms.',
        coreScore: 15,
        itScore: 20
      },
      {
        label: 'Below 7.5 CGPA',
        description: 'Many core firms filter by 8.0+ cutoff. IT companies offer significantly more open OA avenues.',
        coreScore: 5,
        itScore: 30
      }
    ]
  },
  {
    id: 'dsa_status',
    title: '3. What is your current coding & DSA proficiency?',
    subtitle: 'How confident are you with algorithmic problem solving right now?',
    options: [
      {
        label: 'Proficient (100+ LeetCode problems solved)',
        description: 'Comfortable with Trees, Graphs, Two Pointers, and recursion in C++ or Java.',
        coreScore: 10,
        itScore: 35
      },
      {
        label: 'Intermediate (50-100 basic problems)',
        description: 'Know basic arrays, strings, and OOP, but struggle with DP or hard graph problems.',
        coreScore: 20,
        itScore: 20
      },
      {
        label: 'Beginner / Zero DSA preparation',
        description: 'Haven’t started LeetCode, feel intimidated by algorithmic competitive coding.',
        coreScore: 30,
        itScore: 5
      }
    ]
  },
  {
    id: 'hardware_interest',
    title: '4. How much do you genuinely enjoy circuit and low-level hardware design?',
    subtitle: 'Digital electronics, Verilog coding, STA timing calculations, or embedded C registers.',
    options: [
      {
        label: 'High (Love digital logic, microcontrollers, or VLSI)',
        description: 'Enjoy understanding silicon, clock cycles, hardware timing, or building breadboard systems.',
        coreScore: 35,
        itScore: 5
      },
      {
        label: 'Moderate (Neutral as long as the package is high)',
        description: 'Willing to study whatever delivers the best career launch and compensation.',
        coreScore: 15,
        itScore: 20
      },
      {
        label: 'Low (Prefer pure software, web, apps, or data science)',
        description: 'Hardware schematics and timing equations feel dry and painful to study.',
        coreScore: 0,
        itScore: 35
      }
    ]
  },
  {
    id: 'timeline',
    title: '5. What is your runway before placement recruitment begins?',
    subtitle: 'Time available to build depth versus breadth.',
    options: [
      {
        label: 'Less than 60 Days (Urgent Placement Season)',
        description: 'Need a focused, high-probability strategy immediately with zero wasted hours.',
        coreScore: 10,
        itScore: 25
      },
      {
        label: '3 to 6 Months (Adequate Runway)',
        description: 'Enough time to build solid mastery in one field, or split bandwidth strategically.',
        coreScore: 20,
        itScore: 20
      },
      {
        label: '6+ Months (Pre-Final Year / Long Runway)',
        description: 'Ample runway to master both Core Semiconductor and DSA if desired.',
        coreScore: 25,
        itScore: 25
      }
    ]
  }
];

interface StrategyRecommendation {
  archetype: string;
  tagline: string;
  bandwidthSplit: { core: number; it: number };
  badgeColor: string;
  description: string;
  weeklyTimetable: { days: string; focus: string; hours: string }[];
  targetCompanies: string[];
  safetyPlan: string;
}

export default function PathAdvisorPage() {
  const { setDomain } = useDomain();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [recommendation, setRecommendation] = useState<StrategyRecommendation | null>(null);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = { ...answers, [questionIndex]: optionIndex };
    setAnswers(updatedAnswers);

    if (questionIndex < QUESTIONS.length - 1) {
      setCurrentStep(questionIndex + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    let totalCore = 0;
    let totalIt = 0;

    QUESTIONS.forEach((q, qIdx) => {
      const selectedOptionIdx = finalAnswers[qIdx] ?? 0;
      const opt = q.options[selectedOptionIdx];
      totalCore += opt.coreScore;
      totalIt += opt.itScore;
    });

    const sum = totalCore + totalIt;
    const corePercentage = Math.round((totalCore / sum) * 100);

    let rec: StrategyRecommendation;

    if (corePercentage >= 65) {
      rec = {
        archetype: 'Pure Core Semiconductor Pioneer',
        tagline: 'Double down on Silicon, VLSI & Embedded Systems for high-package Core roles',
        bandwidthSplit: { core: 80, it: 20 },
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        description: 'Your profile, CGPA, and college placement history strongly favor a dedicated Core Semiconductor career path. Tier-1 semiconductor firms (NVIDIA, Qualcomm, Intel, AMD, TI) offer comparable or higher packages than software firms, with substantially higher long-term job security.',
        weeklyTimetable: [
          { days: 'Monday – Wednesday', focus: 'Digital Electronics, FSM Synthesis, Verilog RTL & STA Slack Timing', hours: '4 hrs/day' },
          { days: 'Thursday – Friday', focus: 'Computer Architecture (RISC-V Pipelining) & Embedded C (ISRs, RTOS)', hours: '3.5 hrs/day' },
          { days: 'Saturday', focus: 'Essential DSA Safety Net (Arrays, Two Pointers, Strings for written screening)', hours: '3 hrs/day' },
          { days: 'Sunday', focus: 'B.Tech Project defense preparation & Company Radar mock tests', hours: '2.5 hrs/day' }
        ],
        targetCompanies: ['NVIDIA', 'Qualcomm', 'Intel', 'AMD', 'Texas Instruments', 'Broadcom'],
        safetyPlan: 'Keep a 20% DSA safety net for basic online assessments so you can clear screening rounds if a hybrid embedded/systems role opens up.'
      };
    } else if (corePercentage >= 45) {
      rec = {
        archetype: 'Strategic Dual-Track Specialist',
        tagline: 'Balance high-ceiling Core ECE with high-volume Software IT opportunities',
        bandwidthSplit: { core: 60, it: 40 },
        badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
        description: 'You are in the sweet spot to exploit both worlds. By mastering Digital Electronics + Verilog while maintaining medium-level DSA competency, you qualify for high-paying Core hardware roles as well as SDE / Embedded Software roles without locking yourself out of either market.',
        weeklyTimetable: [
          { days: 'Monday – Tuesday', focus: 'Core Silicon: STA Timing Analysis, Setup/Hold Slack, K-Maps, FSMs', hours: '3.5 hrs/day' },
          { days: 'Wednesday – Thursday', focus: 'Core Software: Two Pointers, Sliding Window, Binary Search, Trees', hours: '3.5 hrs/day' },
          { days: 'Friday', focus: 'Embedded C, RTOS Concurrency & Serial Protocols (UART, SPI, I2C)', hours: '3 hrs/day' },
          { days: 'Saturday – Sunday', focus: 'System Design / Low-Level Design & Timed Mock Online Assessments', hours: '3 hrs/day' }
        ],
        targetCompanies: ['Qualcomm', 'Bosch Global Software', 'Amazon', 'Intel', 'Microsoft', 'NXP'],
        safetyPlan: 'Prioritize Core companies when they visit first on day 0/1. If unplaced by mid-season, smoothly pivot 100% of your remaining study hours to IT SDE problem solving.'
      };
    } else {
      rec = {
        archetype: 'High-Velocity Software & IT Maximizer',
        tagline: 'Focus 85% on DSA, CS Fundamentals & System Design for maximum offer volume',
        bandwidthSplit: { core: 15, it: 85 },
        badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
        description: 'Given your placement timeline, recruiter landscape, or personal coding interests, maximizing your Software / IT readiness gives you the highest mathematical probability of securing multiple 12-45 LPA campus placement offers.',
        weeklyTimetable: [
          { days: 'Monday – Wednesday', focus: 'DSA Heavyweights: Graphs, Dynamic Programming, Trees & BST', hours: '4 hrs/day' },
          { days: 'Thursday – Friday', focus: 'Core CS Foundations: OS Concurrency, DBMS SQL, ACID & Networks', hours: '3.5 hrs/day' },
          { days: 'Saturday', focus: 'System Design (Rate Limiter, TinyURL) & Low-Level Design (OOP)', hours: '3 hrs/day' },
          { days: 'Sunday', focus: 'Resume Project Deep-Dive, HR STAR framework & Timed LeetCode contests', hours: '2.5 hrs/day' }
        ],
        targetCompanies: ['Google', 'Amazon', 'Microsoft', 'Uber', 'Flipkart', 'Goldman Sachs'],
        safetyPlan: 'Focus on 150 curated high-frequency LeetCode questions rather than doing 600 random problems. Use the Question Bank to cover high-probability recurring questions.'
      };
    }

    setRecommendation(rec);
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setRecommendation(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Breadcrumbs */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-200 transition">Home</Link>
            <span>/</span>
            <span className="text-violet-400 font-medium">Placement Strategy Advisor</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs">
            <Sparkles className="w-3 h-3" />
            <span>AI-Driven Placement Diagnostics</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 shadow-2xl text-center sm:text-left">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
              <Compass className="w-3.5 h-3.5" />
              Strategic Career Decision Tool
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Core ECE vs Software IT <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400">Strategy Advisor</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Answer 5 diagnostic questions about your college tier, CGPA, coding background, and placement timeline to receive an optimal bandwidth allocation split and personalized study timetable.
            </p>
          </div>
        </div>

        {/* Quiz Flow or Result Display */}
        {!recommendation ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Step Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Diagnostic Step {currentStep + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {QUESTIONS[currentStep].title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  {QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {QUESTIONS[currentStep].options.map((opt, idx) => {
                  const isSelected = answers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentStep, idx)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-150 flex items-start justify-between gap-4 group ${
                        isSelected
                          ? 'bg-violet-950/40 border-violet-500 text-white shadow-lg'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-200'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="text-sm sm:text-base font-semibold group-hover:text-violet-400 transition">
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {opt.description}
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 shrink-0 transition ${
                        isSelected
                          ? 'border-violet-400 bg-violet-600 text-white'
                          : 'border-slate-700 group-hover:border-slate-500'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Navigation Back */}
            {currentStep > 0 && (
              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="text-xs text-slate-400 hover:text-slate-200 transition"
                >
                  ← Previous Question
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Recommendation Output Panel */
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-8 shadow-2xl animate-in fade-in duration-300">
            
            {/* Header Archetype */}
            <div className="space-y-3 border-b border-slate-800 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className={`px-3 py-1 rounded-xl text-xs font-semibold border ${recommendation.badgeColor}`}>
                  Recommended Archetype
                </span>
                <button
                  onClick={restartQuiz}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake Diagnostic</span>
                </button>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {recommendation.archetype}
              </h2>

              <p className="text-sm sm:text-base text-violet-300 font-medium">
                {recommendation.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {recommendation.description}
              </p>
            </div>

            {/* Bandwidth Split Visualizer */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className="flex items-center gap-2 text-cyan-400">
                  <Cpu className="w-4 h-4" />
                  Core Semiconductor Bandwidth: {recommendation.bandwidthSplit.core}%
                </span>
                <span className="flex items-center gap-2 text-indigo-400">
                  <Code2 className="w-4 h-4" />
                  Software / IT Bandwidth: {recommendation.bandwidthSplit.it}%
                </span>
              </div>

              <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden flex p-0.5 border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-l-full transition-all duration-700"
                  style={{ width: `${recommendation.bandwidthSplit.core}%` }}
                />
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-r-full transition-all duration-700"
                  style={{ width: `${recommendation.bandwidthSplit.it}%` }}
                />
              </div>
            </div>

            {/* Weekly Timetable Blueprint */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Recommended Weekly Schedule Blueprint</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendation.weeklyTimetable.map((slot, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{slot.days}</span>
                      <span className="text-violet-400 font-semibold">{slot.hours}</span>
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      {slot.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Recruiters Shortlist */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                <span>Primary Target Recruiters for this Strategy</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendation.targetCompanies.map((comp, idx) => (
                  <Link
                    key={idx}
                    href={`/companies`}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 font-semibold transition"
                  >
                    {comp} Radar →
                  </Link>
                ))}
              </div>
            </div>

            {/* Risk Mitigation Safety Plan */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1 text-xs text-amber-200">
              <div className="font-bold flex items-center gap-1.5 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Risk Mitigation & Safety Net</span>
              </div>
              <p className="leading-relaxed text-amber-200/90">
                {recommendation.safetyPlan}
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/study-plan"
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-violet-600/30 transition flex items-center gap-1.5"
              >
                <span>Launch 30-Day Battle Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/questions"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 border border-slate-700"
              >
                <span>Browse Questions Bank</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
