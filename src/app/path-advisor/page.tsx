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
        badgeColor: 'text-cyan-800 bg-cyan-50 border-cyan-200',
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
        badgeColor: 'text-violet-800 bg-violet-50 border-violet-200',
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
        badgeColor: 'text-indigo-800 bg-indigo-50 border-indigo-200',
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <span className="text-violet-600 font-semibold">Placement Strategy Advisor</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold">
          <Sparkles className="w-3 h-3 text-violet-600" />
          <span>AI-Driven Placement Diagnostics</span>
        </div>
      </div>

      {/* Hero Banner (Clean White Card) */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 bg-white shadow-sm relative overflow-hidden space-y-3">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold tracking-wide">
            <Compass className="w-3.5 h-3.5 text-violet-600" />
            <span>Strategic Career Decision Tool</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Core ECE vs Software IT <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600">Strategy Advisor</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Answer 5 diagnostic questions about your college tier, CGPA, coding background, and placement timeline to receive an optimal bandwidth allocation split and personalized study timetable.
          </p>
        </div>
      </div>

      {/* Quiz Flow or Result Display */}
      {!recommendation ? (
        <div className="glass-card rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Step Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Diagnostic Step {currentStep + 1} of {QUESTIONS.length}</span>
              <span className="text-violet-600">{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-violet-600 to-cyan-500 h-full rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {QUESTIONS[currentStep].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
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
                        ? 'bg-violet-50 border-violet-500 text-slate-900 shadow-sm ring-1 ring-violet-400'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70 text-slate-800'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-violet-700 transition">
                        {opt.label}
                      </div>
                      <div className="text-xs text-slate-600 leading-relaxed">
                        {opt.description}
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 shrink-0 transition ${
                      isSelected
                        ? 'border-violet-600 bg-violet-600 text-white'
                        : 'border-slate-300 group-hover:border-slate-400'
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
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
              >
                ← Previous Question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Recommendation Output Panel */
        <div className="glass-card rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-8 shadow-sm animate-in fade-in duration-200">
          
          {/* Header Archetype */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${recommendation.badgeColor}`}>
                Recommended Strategy Archetype
              </span>
              <button
                onClick={restartQuiz}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Diagnostic</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              {recommendation.archetype}
            </h2>

            <p className="text-sm sm:text-base text-violet-700 font-bold">
              {recommendation.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {recommendation.description}
            </p>
          </div>

          {/* Bandwidth Split Visualizer */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-2 text-cyan-700">
                <Cpu className="w-4 h-4" />
                Core Semiconductor: {recommendation.bandwidthSplit.core}%
              </span>
              <span className="flex items-center gap-2 text-indigo-700">
                <Code2 className="w-4 h-4" />
                Software & IT: {recommendation.bandwidthSplit.it}%
              </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden flex p-0.5 border border-slate-300">
              <div 
                className="bg-cyan-500 h-full rounded-l-full transition-all duration-700"
                style={{ width: `${recommendation.bandwidthSplit.core}%` }}
              />
              <div 
                className="bg-indigo-600 h-full rounded-r-full transition-all duration-700"
                style={{ width: `${recommendation.bandwidthSplit.it}%` }}
              />
            </div>
          </div>

          {/* Weekly Timetable Blueprint */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Recommended Weekly Schedule Blueprint</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendation.weeklyTimetable.map((slot, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{slot.days}</span>
                    <span className="text-violet-700 font-bold">{slot.hours}</span>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed font-medium">
                    {slot.focus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Recruiters Shortlist */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              <span>Primary Target Recruiters for this Strategy</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recommendation.targetCompanies.map((comp, idx) => (
                <Link
                  key={idx}
                  href={`/companies`}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold transition shadow-sm"
                >
                  {comp} Radar →
                </Link>
              ))}
            </div>
          </div>

          {/* Risk Mitigation Safety Plan */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-xs text-amber-900">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Risk Mitigation & Safety Net</span>
            </div>
            <p className="leading-relaxed text-amber-900">
              {recommendation.safetyPlan}
            </p>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/study-plan"
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-1.5"
            >
              <span>Launch 30-Day Battle Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/questions"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 border border-slate-200 shadow-sm"
            >
              <span>Browse Questions Bank</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
