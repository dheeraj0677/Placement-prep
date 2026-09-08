export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Domain = 'it' | 'ece';

export interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  industry: string | null;
  domain?: Domain;
  created_at?: string;
  // Computed / aggregated fields for UI
  experience_count?: number;
  top_tags?: string[];
}

export interface InterviewQuestion {
  id: string;
  title: string;
  company_ids: string[];
  company_names: string[];
  domain: Domain;
  category: string;
  subtopic?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  frequency: 'High' | 'Medium' | 'Low';
  round_type: 'OA' | 'Technical' | 'HR';
  question_text: string;
  answer_outline: string;
  code_snippet?: string;
  key_concepts: string[];
  practice_url?: string;
}

export interface Experience {
  id: string;
  company_id: string;
  role: string | null;
  year: number | null;
  source_platform: 'GeeksforGeeks' | 'LeetCode Discuss' | 'User Submitted' | string | null;
  source_url: string | null;
  raw_text: string | null;
  submitted_by: string | null;
  created_at?: string;
  company?: Company;
  rounds?: ExperienceRound[];
}

export interface ExperienceRound {
  id: string;
  experience_id: string;
  round_number: number;
  round_type: string | null; // e.g. 'Online Assessment', 'Technical', 'HR', 'System Design'
  round_text: string | null;
  created_at?: string;
  tags?: RoundTag[];
}

export interface RoundTag {
  id: string;
  round_id: string;
  tag: string; // 'DP', 'Graphs', 'System Design', 'HR', 'DBMS', etc.
  created_at?: string;
}

export interface UserChecklist {
  id: string;
  user_id: string;
  company_id: string;
  tag: string;
  is_done: boolean;
  created_at?: string;
  company?: Company;
}

// Aggregation & Trend Insights Types
export interface TopicFrequency {
  tag: string;
  count: number;
  percentage: number;
  color?: string;
}

export interface RoundTypeBreakdown {
  round_type: string;
  count: number;
  percentage: number;
  color?: string;
}

export interface YearTrendShift {
  tag: string;
  recentCount: number; // Last 12-24 months
  previousCount: number; // Prior
  trend: 'up' | 'down' | 'neutral';
  percentChange: number;
}

export interface CompanyTrendInsights {
  company: Company;
  totalExperiences: number;
  totalRounds: number;
  topicBreakdown: TopicFrequency[];
  roundTypeBreakdown: RoundTypeBreakdown[];
  trendingShifts: YearTrendShift[];
  recentExperiences: Experience[];
  topTags: string[];
}
