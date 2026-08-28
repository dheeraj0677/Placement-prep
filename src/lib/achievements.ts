'use client';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon identifier
  category: 'Solving' | 'Mastery' | 'Consistency' | 'Exploration';
  points: number;
  condition: (stats: UserStats) => boolean;
}

export interface ActivityDay {
  date: string; // YYYY-MM-DD
  count: number; // number of solved problems / checklist items on this day
}

export interface UserStats {
  totalSolvedProblems: number;
  solvedByTopic: Record<string, number>;
  totalChecklistDone: number;
  totalChecklistItems: number;
  companiesCompleted: number;
  bookmarksCount: number;
  comparedCompaniesCount: number;
  timerUsedSeconds: number;
  currentStreakDays: number;
  longestStreakDays: number;
  activityHistory: Record<string, number>; // "YYYY-MM-DD" -> count
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-solve',
    title: 'First Step',
    description: 'Solve your very first must-solve interview problem.',
    icon: 'Sparkles',
    category: 'Solving',
    points: 50,
    condition: (s) => s.totalSolvedProblems >= 1,
  },
  {
    id: 'problem-10',
    title: 'Code Apprentice',
    description: 'Solve 10 curated placement questions across any topics.',
    icon: 'Flame',
    category: 'Solving',
    points: 100,
    condition: (s) => s.totalSolvedProblems >= 10,
  },
  {
    id: 'problem-25',
    title: 'Algorithm Warrior',
    description: 'Solve 25 must-solve interview problems.',
    icon: 'Trophy',
    category: 'Solving',
    points: 250,
    condition: (s) => s.totalSolvedProblems >= 25,
  },
  {
    id: 'dp-conqueror',
    title: 'DP Mastermind',
    description: 'Solve at least 5 Dynamic Programming problems.',
    icon: 'Cpu',
    category: 'Mastery',
    points: 150,
    condition: (s) => (s.solvedByTopic['DP'] || 0) >= 5,
  },
  {
    id: 'graph-guru',
    title: 'Graph Architect',
    description: 'Solve at least 4 Graph & Network algorithms problems.',
    icon: 'Network',
    category: 'Mastery',
    points: 150,
    condition: (s) => (s.solvedByTopic['Graphs'] || 0) >= 4,
  },
  {
    id: 'tree-whisperer',
    title: 'Tree Whisperer',
    description: 'Solve at least 4 Trees, BST & Trie problems.',
    icon: 'GitBranch',
    category: 'Mastery',
    points: 150,
    condition: (s) => (s.solvedByTopic['Trees'] || 0) >= 4,
  },
  {
    id: 'first-company-ready',
    title: 'Target Locked',
    description: 'Complete 100% of checklist topics for at least one company.',
    icon: 'CheckCircle2',
    category: 'Mastery',
    points: 200,
    condition: (s) => s.companiesCompleted >= 1,
  },
  {
    id: 'streak-3',
    title: 'On a Roll',
    description: 'Maintain a 3-day active preparation streak.',
    icon: 'Zap',
    category: 'Consistency',
    points: 100,
    condition: (s) => s.currentStreakDays >= 3,
  },
  {
    id: 'streak-7',
    title: 'Unstoppable Momentum',
    description: 'Achieve a 7-day preparation streak.',
    icon: 'Award',
    category: 'Consistency',
    points: 300,
    condition: (s) => s.currentStreakDays >= 7,
  },
  {
    id: 'curator',
    title: 'Master Curator',
    description: 'Bookmark at least 5 companies, questions, or guides with notes.',
    icon: 'Bookmark',
    category: 'Exploration',
    points: 75,
    condition: (s) => s.bookmarksCount >= 5,
  },
  {
    id: 'time-trial',
    title: 'Speed Demon',
    description: 'Practice with the DSA Countdown Timer for at least 30 minutes.',
    icon: 'Clock',
    category: 'Consistency',
    points: 125,
    condition: (s) => s.timerUsedSeconds >= 1800,
  },
  {
    id: 'company-comparer',
    title: 'Market Analyst',
    description: 'Compare interview radars of different companies side-by-side.',
    icon: 'GitCompare',
    category: 'Exploration',
    points: 50,
    condition: (s) => s.comparedCompaniesCount >= 1,
  },
];

const ACTIVITY_STORAGE_KEY = 'placement_radar_activity_v1';
const TIMER_STORAGE_KEY = 'placement_radar_timer_seconds_v1';
const UNLOCKED_STORAGE_KEY = 'placement_radar_unlocked_achievements_v1';

// Format YYYY-MM-DD in local time
export function getTodayKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function recordActivity(count = 1) {
  if (typeof window === 'undefined') return;
  try {
    const today = getTodayKey();
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    const history: Record<string, number> = raw ? JSON.parse(raw) : {};
    history[today] = (history[today] || 0) + count;
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(history));
    window.dispatchEvent(new Event('activity_updated'));
  } catch (e) {
    console.error('Failed to record activity', e);
  }
}

export function addTimerSeconds(seconds: number) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(TIMER_STORAGE_KEY);
    const current = raw ? parseInt(raw, 10) : 0;
    localStorage.setItem(TIMER_STORAGE_KEY, String(current + seconds));
    window.dispatchEvent(new Event('activity_updated'));
  } catch (e) {
    console.error('Failed to add timer seconds', e);
  }
}

export function computeStreaks(history: Record<string, number>): { current: number; longest: number } {
  const dates = Object.keys(history).filter(d => (history[d] || 0) > 0).sort();
  if (dates.length === 0) return { current: 0, longest: 0 };

  const todayStr = getTodayKey();
  const todayDate = new Date(todayStr);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let prevDate: Date | null = null;

  for (const dateStr of dates) {
    const currentDate = new Date(dateStr);
    if (!prevDate) {
      tempStreak = 1;
    } else {
      const diffTime = currentDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    prevDate = currentDate;
  }

  // Calculate current streak relative to today / yesterday
  const lastActiveStr = dates[dates.length - 1];
  const lastActiveDate = new Date(lastActiveStr);
  const diffFromToday = Math.round((todayDate.getTime() - lastActiveDate.getTime()) / (1000 * 3600 * 24));

  if (diffFromToday === 0 || diffFromToday === 1) {
    // Current streak is valid
    let running = 0;
    let checkDate = new Date(lastActiveDate);
    while (true) {
      const k = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      if (history[k] && history[k] > 0) {
        running++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    currentStreak = running;
  } else {
    currentStreak = 0;
  }

  return { current: currentStreak, longest: Math.max(longestStreak, currentStreak) };
}

export function getUserStats(allGuideSlugs: string[] = []): UserStats {
  if (typeof window === 'undefined') {
    return {
      totalSolvedProblems: 0,
      solvedByTopic: {},
      totalChecklistDone: 0,
      totalChecklistItems: 0,
      companiesCompleted: 0,
      bookmarksCount: 0,
      comparedCompaniesCount: 0,
      timerUsedSeconds: 0,
      currentStreakDays: 0,
      longestStreakDays: 0,
      activityHistory: {},
    };
  }

  // 1. Solved problems across all guides
  const solvedByTopic: Record<string, number> = {};
  let totalSolvedProblems = 0;

  const slugs = allGuideSlugs.length > 0 ? allGuideSlugs : [
    'dynamic-programming', 'graphs', 'trees', 'arrays-strings',
    'system-design', 'dbms', 'operating-systems', 'computer-networks',
    'oop-design-patterns', 'behavioral-hr', 'aptitude-reasoning'
  ];

  const slugToTagMap: Record<string, string> = {
    'dynamic-programming': 'DP',
    'graphs': 'Graphs',
    'trees': 'Trees',
    'arrays-strings': 'Arrays & Strings',
    'system-design': 'System Design',
    'dbms': 'DBMS',
    'operating-systems': 'OS',
    'computer-networks': 'CN',
    'oop-design-patterns': 'OOP',
    'behavioral-hr': 'Behavioral',
    'aptitude-reasoning': 'Aptitude'
  };

  slugs.forEach(slug => {
    try {
      const raw = localStorage.getItem(`placement_prep_solved_${slug}`);
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        const count = Array.isArray(ids) ? ids.length : 0;
        const tag = slugToTagMap[slug] || slug;
        solvedByTopic[tag] = (solvedByTopic[tag] || 0) + count;
        totalSolvedProblems += count;
      }
    } catch (e) {}
  });

  // 2. Checklist stats
  let totalChecklistDone = 0;
  let totalChecklistItems = 0;
  let companiesCompleted = 0;

  try {
    const rawChecklist = localStorage.getItem('placement_radar_checklist');
    if (rawChecklist) {
      const items: any[] = JSON.parse(rawChecklist);
      if (Array.isArray(items)) {
        totalChecklistItems = items.length;
        totalChecklistDone = items.filter(i => i.is_done).length;

        // Group by company
        const byComp: Record<string, { total: number; done: number }> = {};
        items.forEach(i => {
          const cId = i.company_id || 'default';
          if (!byComp[cId]) byComp[cId] = { total: 0, done: 0 };
          byComp[cId].total++;
          if (i.is_done) byComp[cId].done++;
        });

        Object.values(byComp).forEach(val => {
          if (val.total > 0 && val.done === val.total) {
            companiesCompleted++;
          }
        });
      }
    }
  } catch (e) {}

  // 3. Bookmarks
  let bookmarksCount = 0;
  try {
    const rawBm = localStorage.getItem('placement_radar_bookmarks_v1');
    if (rawBm) {
      const arr = JSON.parse(rawBm);
      bookmarksCount = Array.isArray(arr) ? arr.length : 0;
    }
  } catch (e) {}

  // 4. Timer usage
  let timerUsedSeconds = 0;
  try {
    const rawTimer = localStorage.getItem(TIMER_STORAGE_KEY);
    timerUsedSeconds = rawTimer ? parseInt(rawTimer, 10) : 0;
  } catch (e) {}

  // 5. Compared companies count
  let comparedCompaniesCount = 0;
  try {
    const rawCompare = localStorage.getItem('placement_radar_compare_count_v1');
    comparedCompaniesCount = rawCompare ? parseInt(rawCompare, 10) : 0;
  } catch (e) {}

  // 6. Activity & Streaks
  let activityHistory: Record<string, number> = {};
  try {
    const rawAct = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (rawAct) {
      activityHistory = JSON.parse(rawAct);
    }
  } catch (e) {}

  const { current: currentStreakDays, longest: longestStreakDays } = computeStreaks(activityHistory);

  return {
    totalSolvedProblems,
    solvedByTopic,
    totalChecklistDone,
    totalChecklistItems,
    companiesCompleted,
    bookmarksCount,
    comparedCompaniesCount,
    timerUsedSeconds,
    currentStreakDays,
    longestStreakDays,
    activityHistory,
  };
}

export function checkNewAchievements(stats: UserStats): { newlyUnlocked: Achievement[]; allUnlocked: string[] } {
  if (typeof window === 'undefined') return { newlyUnlocked: [], allUnlocked: [] };

  try {
    const raw = localStorage.getItem(UNLOCKED_STORAGE_KEY);
    const existingUnlocked: string[] = raw ? JSON.parse(raw) : [];

    const newlyUnlocked: Achievement[] = [];
    const updatedUnlocked = [...existingUnlocked];

    ACHIEVEMENTS.forEach(achievement => {
      if (!existingUnlocked.includes(achievement.id)) {
        if (achievement.condition(stats)) {
          newlyUnlocked.push(achievement);
          updatedUnlocked.push(achievement.id);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      localStorage.setItem(UNLOCKED_STORAGE_KEY, JSON.stringify(updatedUnlocked));
      // Dispatch toast trigger
      newlyUnlocked.forEach(ach => {
        window.dispatchEvent(new CustomEvent('achievement_unlocked', { detail: ach }));
      });
    }

    return { newlyUnlocked, allUnlocked: updatedUnlocked };
  } catch (e) {
    console.error('Failed to check achievements', e);
    return { newlyUnlocked: [], allUnlocked: [] };
  }
}
