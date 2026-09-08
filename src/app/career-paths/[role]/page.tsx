import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  getCareerRoleBySlug, 
  CAREER_ROLES, 
  CareerRole 
} from '@/lib/careerPathsData';
import { 
  ECE_CAREER_ROLES, 
  getEceCareerRoleBySlug 
} from '@/lib/eceCareerPathsData';
import { 
  Code, 
  BarChart3, 
  Database, 
  Cpu, 
  Cloud, 
  Terminal, 
  Shield, 
  Layers, 
  Compass, 
  Briefcase, 
  TrendingUp, 
  Target, 
  Zap, 
  Workflow, 
  Users, 
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Building2,
  Sparkles,
  DollarSign,
  GraduationCap,
  Clock,
  BookOpen,
  Calendar,
  AlertCircle
} from 'lucide-react';
import ChartWrapper from '@/components/ChartWrapper';
import ReadinessRadar from '@/components/ReadinessRadar';

interface PageProps {
  params: {
    role: string;
  };
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  BarChart3,
  Database,
  Cpu,
  Cloud,
  Terminal,
  Shield,
  Layers,
  Compass,
  Briefcase,
  TrendingUp,
  Target,
  Zap,
  Workflow,
  Users
};

export async function generateStaticParams() {
  const allRoles = [...CAREER_ROLES, ...ECE_CAREER_ROLES];
  return allRoles.map((role) => ({
    role: role.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const role = getCareerRoleBySlug(params.role) || getEceCareerRoleBySlug(params.role);
  if (!role) {
    return {
      title: 'Career Role Not Found — PlacementPrep Radar',
    };
  }

  return {
    title: `${role.title} Career Guide & Skill Blueprint — PlacementPrep Radar`,
    description: `Complete guide to ${role.title}: Salary, eligibility, required skills, interview rounds, hiring companies, and prep roadmap.`,
  };
}

export default function CareerRoleDetailPage({ params }: PageProps) {
  const role = getCareerRoleBySlug(params.role) || getEceCareerRoleBySlug(params.role);

  if (!role) {
    notFound();
  }

  const IconComponent = ICON_MAP[role.iconName] || Briefcase;
  const isTech = role.category === 'Technical';

  // Format radar data for ReadinessRadar component
  const radarData = role.radarSkills.map((r) => ({
    subject: r.subject,
    A: r.score,
    fullMark: r.fullMark,
  }));

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
        <span>/</span>
        <Link href="/career-paths" className="hover:text-slate-900 transition">Career Compass</Link>
        <span>/</span>
        <span className="text-violet-600 font-semibold truncate">{role.title}</span>
      </div>

      {/* Back to all roles button */}
      <div>
        <Link
          href="/career-paths"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Career Paths</span>
        </Link>
      </div>

      {/* Hero Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 relative overflow-hidden shadow-xl bg-white">
        {/* Background Ambient Glow */}
        <div 
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 ${
            isTech ? 'bg-emerald-100/60' : 'bg-violet-100/60'
          }`} 
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider border ${
                  isTech
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-violet-50 text-violet-700 border-violet-200'
                }`}
              >
                {role.category} Track
              </span>

              {role.badge && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{role.badge}</span>
                </span>
              )}

              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                Difficulty: <span className="font-bold text-slate-900">{role.difficultyLevel}</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border shadow-md ${
                  isTech
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-emerald-100'
                    : 'bg-violet-50 text-violet-600 border-violet-200 shadow-violet-100'
                }`}
              >
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {role.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1 leading-relaxed">
                  {role.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Compensation Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shrink-0 lg:min-w-[260px] text-center lg:text-right space-y-1 shadow-sm">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Entry-Level Compensation
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">
              {role.salaryRange}
            </div>
            <div className="text-xs text-slate-500">
              National Average: <span className="text-slate-900 font-bold">{role.averageCTC}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Responsibilities, Eligibility, Roadmap, Ladder (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Overview & Day in the Life */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 bg-white space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-violet-600" />
              <span>Role Overview</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {role.overview}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-xs font-bold text-violet-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-violet-600" />
                <span>A Day in the Life</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;{role.dayInTheLife}&rdquo;
              </p>
            </div>
          </div>

          {/* Key Responsibilities */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 bg-white space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Day-to-Day Responsibilities</span>
            </h2>
            <ul className="space-y-3">
              {role.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility Requirements */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 bg-white space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              <span>Eligibility & Academic Criteria</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500 font-semibold uppercase">Eligible Degrees</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  {role.eligibility.degrees.join(', ')}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500 font-semibold uppercase">Min. CGPA Cutoff</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  {role.eligibility.minCGPA}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs text-slate-500 font-semibold uppercase">Branch Criteria</div>
              <div className="text-xs sm:text-sm text-slate-700 font-medium">
                {role.eligibility.branchEligibility}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="text-xs text-slate-500 font-semibold uppercase">Key Prerequisites:</div>
              <ul className="space-y-1.5">
                {role.eligibility.keyPrerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interview Rounds Breakdown */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 bg-white space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-violet-600" />
              <span>Typical Interview Evaluation Rounds</span>
            </h2>

            <div className="space-y-3">
              {role.interviewRounds.map((round, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-violet-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {round.roundName}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-200 text-slate-700">
                      {round.duration}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {round.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Roadmap */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 bg-white space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-600" />
              <span>Step-by-Step Preparation Roadmap</span>
            </h2>

            <div className="space-y-4">
              {role.prepRoadmap.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-violet-100 text-violet-800 border border-violet-200">
                        {stage.phase}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">({stage.timeline})</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-900">{stage.focus}</span>
                  </div>

                  <ul className="space-y-1.5 pl-1">
                    {stage.actionItems.map((action, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Career Ladder Progression */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 bg-white space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Career Progression Ladder</span>
            </h2>

            <div className="space-y-3">
              {role.careerLadder.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <div className="px-2 py-1 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[11px] font-bold shrink-0">
                    {step.years}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-slate-900">{step.title}</div>
                    <div className="text-xs text-slate-600 leading-relaxed">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Skills Radar, Core Skills, Companies, Guides (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Radar Skill Profile Visualization */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span>Skills Radar Evaluation Profile</span>
              </h2>
            </div>
            <p className="text-[11px] text-slate-500">
              Visual weight of competencies tested during campus interview evaluations.
            </p>

            <div className="pt-2">
              <ChartWrapper height={320}>
                <ReadinessRadar data={radarData} />
              </ChartWrapper>
            </div>
          </div>

          {/* Core Technical / Domain Skills Required */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-600" />
              <span>Technical & Domain Skills</span>
            </h2>

            <div className="space-y-2.5">
              {role.coreSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{skill.name}</div>
                    <div className="text-[10px] text-slate-500">{skill.category}</div>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider border ${
                      skill.level === 'Essential'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : skill.level === 'Important'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-violet-50 text-violet-700 border-violet-200'
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills Required */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Essential Soft Skills</span>
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {role.softSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Top Companies Hiring for This Role */}
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>Top Recruiters For This Role</span>
            </h2>

            <div className="space-y-2.5">
              {role.hiringCompanies.map((comp) => (
                <div
                  key={comp.name}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-violet-300 transition group"
                >
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-violet-700 transition">
                      {comp.name}
                    </div>
                    <div className="text-[10px] text-slate-500">{comp.hiringType}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-600">
                      {comp.typicalPackage}
                    </div>
                    {comp.companyId ? (
                      <Link
                        href={`/companies/${comp.companyId}`}
                        className="text-[10px] text-violet-600 hover:underline flex items-center gap-0.5 justify-end font-semibold"
                      >
                        <span>View Radar</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    ) : (
                      <Link
                        href={`/companies?search=${encodeURIComponent(comp.name)}`}
                        className="text-[10px] text-violet-600 hover:underline flex items-center gap-0.5 justify-end font-semibold"
                      >
                        <span>Search</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Preparation Guides */}
          {role.recommendedGuideSlugs.length > 0 && (
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white space-y-4">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-600" />
                <span>Recommended Prep Guides</span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Curated study roadmaps with must-solve practice questions for this profile.
              </p>

              <div className="space-y-2">
                {role.recommendedGuideSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/guides/${slug}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-violet-50/60 border border-slate-200 hover:border-violet-300 text-xs font-semibold text-slate-800 hover:text-violet-900 transition group"
                  >
                    <span className="capitalize">{slug.replace(/-/g, ' ')} Master Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-violet-600 group-hover:translate-x-0.5 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
