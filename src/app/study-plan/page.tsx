'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Clock, 
  Cpu, 
  Code2, 
  Layers, 
  ChevronRight, 
  ExternalLink, 
  BookOpen, 
  HelpCircle, 
  RotateCcw, 
  Trophy, 
  Flame, 
  Printer, 
  Filter, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useDomain } from '@/lib/DomainContext';

interface DayPlan {
  day: number;
  week: number;
  title: string;
  focusTopic: string;
  guideSlug?: string;
  guideTitle?: string;
  practiceTasks: string[];
  estimatedHours: number;
  questionQuery?: string;
}

const ECE_30_DAY_PLAN: DayPlan[] = [
  // Week 1: Digital Electronics & Verilog RTL Foundations
  { day: 1, week: 1, title: 'Boolean Minimization & Hazard-Free Logic', focusTopic: 'Digital Electronics', guideSlug: 'digital-electronics-vlsi', guideTitle: 'Digital Electronics & FSM Guide', practiceTasks: ['Solve 4-variable K-maps with don’t cares', 'Identify static-1 and static-0 hazards', 'Add consensus product terms'], estimatedHours: 3, questionQuery: 'K-Map' },
  { day: 2, week: 1, title: 'Flip-Flops & Conversions', focusTopic: 'Digital Electronics', guideSlug: 'digital-electronics-vlsi', guideTitle: 'Digital Electronics & FSM Guide', practiceTasks: ['Derive excitation tables (JK to D, T to D)', 'Analyze race-around condition in JK latch', 'Master master-slave pulse triggering'], estimatedHours: 2.5, questionQuery: 'Flip-Flop' },
  { day: 3, week: 1, title: 'Synchronous Counters & Shift Registers', focusTopic: 'Digital Electronics', practiceTasks: ['Design Mod-6 synchronous up-counter', 'Implement 4-bit Ring and Johnson counter', 'Calculate cycle count and unused state recovery'], estimatedHours: 3, questionQuery: 'Counter' },
  { day: 4, week: 1, title: 'FSM Design: Mealy vs Moore', focusTopic: 'Digital Electronics', guideSlug: 'digital-electronics-vlsi', guideTitle: 'Digital Electronics & FSM Guide', practiceTasks: ['Design 1011 overlapping sequence detector', 'Draw state transition table and bubble diagram', 'Understand output glitching in Mealy FSM'], estimatedHours: 3.5, questionQuery: 'FSM' },
  { day: 5, week: 1, title: 'Verilog Syntax & Blocking vs Non-Blocking', focusTopic: 'Verilog & SystemVerilog', guideSlug: 'verilog-systemverilog-rtl', guideTitle: 'Synthesizable Verilog & RTL Blueprint', practiceTasks: ['Review NBA event queue mechanics', 'Write synthesizable shift register with <=', 'Avoid simulation race conditions with ='], estimatedHours: 3, questionQuery: 'Blocking' },
  { day: 6, week: 1, title: 'FSM in Synthesizable Verilog', focusTopic: 'Verilog & SystemVerilog', guideSlug: 'verilog-systemverilog-rtl', guideTitle: 'Synthesizable Verilog & RTL Blueprint', practiceTasks: ['Implement 3-always block FSM coding style', 'Handle asynchronous reset safely', 'Verify on EDA Playground or HDLBits'], estimatedHours: 3.5, questionQuery: 'Verilog' },
  { day: 7, week: 1, title: 'Week 1 Review & HDLBits Practice', focusTopic: 'Verilog & Digital Review', practiceTasks: ['Solve 5 sequential circuits on HDLBits', 'Practice 10 multiple-choice screening problems', 'Verify state machine synthesis netlist'], estimatedHours: 2, questionQuery: 'Digital' },

  // Week 2: STA, CDC & FIFO Architecture
  { day: 8, week: 2, title: 'Setup Time, Hold Time & Slack Equations', focusTopic: 'STA & Timing Analysis', guideSlug: 'sta-timing-analysis', guideTitle: 'Static Timing Analysis (STA) Guide', practiceTasks: ['Derive T_cq + T_comb <= T_clk - T_setup', 'Calculate positive and negative slack with skew', 'Understand why lowering clock fixes setup only'], estimatedHours: 3.5, questionQuery: 'Slack' },
  { day: 9, week: 2, title: 'Clock Skew, Jitter & Max Operating Frequency', focusTopic: 'STA & Timing Analysis', guideSlug: 'sta-timing-analysis', guideTitle: 'Static Timing Analysis (STA) Guide', practiceTasks: ['Analyze positive vs negative clock skew impact', 'Derive F_max formula with margin', 'Fix hold violation by inserting buffer delays'], estimatedHours: 3, questionQuery: 'Skew' },
  { day: 10, week: 2, title: 'Metastability & 2-Flip-Flop Synchronizer', focusTopic: 'STA & Timing Analysis', guideSlug: 'sta-timing-analysis', guideTitle: 'Static Timing Analysis (STA) Guide', practiceTasks: ['Calculate MTBF equation variables', 'Understand single-bit CDC crossing', 'Analyze multi-bit bus skew hazards'], estimatedHours: 3, questionQuery: 'Metastability' },
  { day: 11, week: 2, title: 'Gray Codes & Multi-Bit CDC Handshake', focusTopic: 'STA & Timing Analysis', guideSlug: 'sta-timing-analysis', guideTitle: 'Static Timing Analysis (STA) Guide', practiceTasks: ['Write Binary to Gray code converter in Verilog', 'Implement 4-phase Req-Ack handshake', 'Study level synchronizer vs pulse synchronizer'], estimatedHours: 3.5, questionQuery: 'CDC' },
  { day: 12, week: 2, title: 'Asynchronous FIFO Depth Calculation', focusTopic: 'STA & Timing Analysis', guideSlug: 'sta-timing-analysis', guideTitle: 'Static Timing Analysis (STA) Guide', practiceTasks: ['Master burst read/write depth equation', 'Derive worst-case burst arrival timing', 'Understand full/empty pointer synchronization'], estimatedHours: 4, questionQuery: 'FIFO' },
  { day: 13, week: 2, title: 'SystemVerilog OOP & UVM Fundamentals', focusTopic: 'UVM & Verification', practiceTasks: ['Understand interfaces, virtual interfaces, and modports', 'Study UVM testbench phases (build vs connect)', 'Difference between mailbox, semaphore and event'], estimatedHours: 3.5, questionQuery: 'UVM' },
  { day: 14, week: 2, title: 'Week 2 STA Mock Test & Review', focusTopic: 'STA & CDC Review', practiceTasks: ['Solve 5 timing calculation problems from NVIDIA/AMD', 'Review STA timing path false-paths and multicycles', 'Complete Week 2 checklist in dashboard'], estimatedHours: 2.5, questionQuery: 'STA' },

  // Week 3: Computer Architecture, RISC-V & Embedded C
  { day: 15, week: 3, title: '5-Stage Pipelining & RAW Hazards', focusTopic: 'Computer Architecture & RISC-V', guideSlug: 'computer-architecture-riscv', guideTitle: 'Computer Architecture & RISC-V', practiceTasks: ['Understand IF, ID, EX, MEM, WB pipeline stages', 'Analyze Read-After-Write (RAW) data dependencies', 'Calculate CPI and speedup with pipelining'], estimatedHours: 3.5, questionQuery: 'Pipeline' },
  { day: 16, week: 3, title: 'Operand Forwarding & Branch Prediction', focusTopic: 'Computer Architecture & RISC-V', guideSlug: 'computer-architecture-riscv', guideTitle: 'Computer Architecture & RISC-V', practiceTasks: ['Design forwarding multiplexers in Verilog', 'Analyze unavoidable load-use hazard bubble', 'Study 1-bit and 2-bit branch history tables'], estimatedHours: 3, questionQuery: 'Forwarding' },
  { day: 17, week: 3, title: 'Cache Architecture & Associativity', focusTopic: 'Computer Architecture & RISC-V', guideSlug: 'computer-architecture-riscv', guideTitle: 'Computer Architecture & RISC-V', practiceTasks: ['Direct-mapped vs N-way set associative cache', 'Calculate Tag, Index, and Offset bit widths', 'Write-through vs Write-back policy comparison'], estimatedHours: 3, questionQuery: 'Cache' },
  { day: 18, week: 3, title: 'Embedded C: Volatile, Const & Bitwise Hacks', focusTopic: 'Embedded C & RTOS', guideSlug: 'embedded-c-rtos', guideTitle: 'Embedded C & RTOS Guide', practiceTasks: ['Write macros to set, clear, toggle, and read bit', 'Understand why volatile is required for memory-mapped I/O', 'Implement lock-free circular ring buffer'], estimatedHours: 3.5, questionQuery: 'Volatile' },
  { day: 19, week: 3, title: 'Interrupt Service Routines (ISRs) & Callbacks', focusTopic: 'Embedded C & RTOS', guideSlug: 'embedded-c-rtos', guideTitle: 'Embedded C & RTOS Guide', practiceTasks: ['Why floating point and printf are banned in ISRs', 'Understand interrupt latency and nested vectored interrupts', 'Pass data safely between ISR and main loop'], estimatedHours: 3, questionQuery: 'ISR' },
  { day: 20, week: 3, title: 'RTOS Concurrency & Priority Inversion', focusTopic: 'Embedded C & RTOS', guideSlug: 'embedded-c-rtos', guideTitle: 'Embedded C & RTOS Guide', practiceTasks: ['Study Binary Semaphore vs Mutex ownership', 'Simulate Priority Inversion scenario', 'Understand Priority Inheritance Protocol solution'], estimatedHours: 3.5, questionQuery: 'Priority' },
  { day: 21, week: 3, title: 'Protocols: UART, SPI & I2C Deep Dive', focusTopic: 'Microcontrollers & Protocols', guideSlug: 'microcontrollers-protocols', guideTitle: 'Serial Protocols Blueprint', practiceTasks: ['Explain I2C open-drain and clock stretching', 'Compare SPI 4 clock modes (CPOL, CPHA)', 'Calculate UART baud rate error margins'], estimatedHours: 3.5, questionQuery: 'I2C' },

  // Week 4: Automotive CAN, Analog Basics, Mock Rounds & Company Radar
  { day: 22, week: 4, title: 'CAN Bus Protocol & Bitwise Arbitration', focusTopic: 'Microcontrollers & Protocols', guideSlug: 'microcontrollers-protocols', guideTitle: 'Serial Protocols Blueprint', practiceTasks: ['Study dominant (0) vs recessive (1) differential logic', 'Understand non-destructive bitwise arbitration', 'Explain bit stuffing and 15-bit CRC calculation'], estimatedHours: 3, questionQuery: 'CAN' },
  { day: 23, week: 4, title: 'MOSFET Small Signal & Common Source Amplifier', focusTopic: 'Analog Electronics & Op-Amps', guideSlug: 'analog-electronics-opamps', guideTitle: 'Analog Electronics Guide', practiceTasks: ['Derive NMOS small signal gain with source degeneration', 'Identify cutoff, triode, and saturation regions', 'Calculate Miller capacitance and pole frequencies'], estimatedHours: 3.5, questionQuery: 'Small-Signal' },
  { day: 24, week: 4, title: 'Op-Amp Characteristics & Active Filters', focusTopic: 'Analog Electronics & Op-Amps', guideSlug: 'analog-electronics-opamps', guideTitle: 'Analog Electronics Guide', practiceTasks: ['Virtual ground and infinite input impedance concept', 'Calculate non-inverting amplifier closed-loop gain', 'Design active low-pass Sallen-Key filter'], estimatedHours: 3, questionQuery: 'Op-Amp' },
  { day: 25, week: 4, title: 'DFT Basics: Scan Chains & Stuck-At Faults', focusTopic: 'VLSI Physical Design & DFT', practiceTasks: ['Understand Scan Flip-Flop multiplexer architecture', 'Controllability and observability in sequential logic', 'Explain ATPG algorithm and stuck-at 0/1 coverage'], estimatedHours: 2.5, questionQuery: 'Scan' },
  { day: 26, week: 4, title: 'Top Company Radar: NVIDIA & Qualcomm Target Focus', focusTopic: 'Company Prep', practiceTasks: ['Review NVIDIA top tested topics from Company Radar', 'Practice 5 Qualcomm embedded and timing questions', 'Check off company-specific checklist items'], estimatedHours: 3, questionQuery: 'NVIDIA' },
  { day: 27, week: 4, title: 'Top Company Radar: AMD, Intel & TI Focus', focusTopic: 'Company Prep', practiceTasks: ['Review AMD and Intel hardware verification interview formats', 'Revise Texas Instruments analog & circuit concepts', 'Bookmark critical revision notes'], estimatedHours: 3, questionQuery: 'Intel' },
  { day: 28, week: 4, title: 'Core Project Deep-Dive Defense', focusTopic: 'Interview Defense', practiceTasks: ['Formulate STAR responses for your college B.Tech thesis', 'Prepare circuit schematic explanations and trade-offs', 'Practice explaining RTL verification bugs you encountered'], estimatedHours: 3 },
  { day: 29, week: 4, title: 'Full 90-Minute Hardware Mock Interview', focusTopic: 'Mock Assessment', practiceTasks: ['Simulate 45-min digital/timing screening test', 'Simulate 45-min live whiteboarding (FSM + Verilog)', 'Analyze gaps and review weak questions'], estimatedHours: 3 },
  { day: 30, week: 4, title: 'HR Round & Final Placement Readiness Check', focusTopic: 'HR & Final Polish', practiceTasks: ['Practice "Why Semiconductor/Core over Software?" answer', 'Formulate leadership & team conflict resolution answers', 'Verify 100% readiness score on Student Dashboard'], estimatedHours: 2 }
];

const IT_30_DAY_PLAN: DayPlan[] = [
  // Week 1: Data Structures: Arrays, Strings, Two Pointers & Hashing
  { day: 1, week: 1, title: 'Two Pointers & Sliding Window Mastery', focusTopic: 'Arrays & Strings', guideSlug: 'arrays-two-pointers', guideTitle: 'Arrays & Two Pointers Blueprint', practiceTasks: ['Solve 3Sum in O(N^2) time and O(1) space', 'Minimum Size Subarray Sum (Variable window)', 'Trapping Rain Water with two pointers'], estimatedHours: 3, questionQuery: 'Two Pointers' },
  { day: 2, week: 1, title: 'Prefix Sums, Kadane & Matrix Traversal', focusTopic: 'Arrays & Strings', guideSlug: 'arrays-two-pointers', guideTitle: 'Arrays & Two Pointers Blueprint', practiceTasks: ['Maximum Subarray Sum (Kadane algorithm)', 'Subarray Sum Equals K with Hash Map prefix', 'Spiral Matrix & Rotate Image in-place'], estimatedHours: 3, questionQuery: 'Array' },
  { day: 3, week: 1, title: 'String Algorithms & Palindromes', focusTopic: 'Arrays & Strings', guideSlug: 'arrays-two-pointers', guideTitle: 'Arrays & Two Pointers Blueprint', practiceTasks: ['Longest Palindromic Substring (Expand around center)', 'Group Anagrams using frequency counting', 'Longest Substring Without Repeating Characters'], estimatedHours: 3, questionQuery: 'String' },
  { day: 4, week: 1, title: 'Binary Search on Value Range', focusTopic: 'Arrays & Strings', guideSlug: 'arrays-two-pointers', guideTitle: 'Arrays & Two Pointers Blueprint', practiceTasks: ['Search in Rotated Sorted Array', 'Find Peak Element in O(log N)', 'Allocate Minimum Pages / Koko Eating Bananas'], estimatedHours: 3.5, questionQuery: 'Binary Search' },
  { day: 5, week: 1, title: 'Linked Lists & Fast/Slow Pointers', focusTopic: 'Arrays & Strings', practiceTasks: ['Reverse a Singly Linked List (Iterative & Recursive)', 'Detect Cycle & find entry node (Floyd Tortoise)', 'LRU Cache Design using DLL + Hash Map'], estimatedHours: 3, questionQuery: 'LRU' },
  { day: 6, week: 1, title: 'Stacks, Queues & Monotonic Stack', focusTopic: 'Arrays & Strings', practiceTasks: ['Next Greater Element with Monotonic Stack', 'Largest Rectangle in Histogram', 'Implement Queue using Stacks in O(1) amortized'], estimatedHours: 3, questionQuery: 'Stack' },
  { day: 7, week: 1, title: 'Week 1 Review & Speed Contest', focusTopic: 'DSA Review', practiceTasks: ['Solve 4 medium LeetCode problems in timed mode', 'Review time and space complexity O(N) constraints', 'Verify Week 1 checklist in dashboard'], estimatedHours: 2.5 },

  // Week 2: Trees, BST, Graphs & Backtracking
  { day: 8, week: 2, title: 'Binary Tree Traversals & Depth', focusTopic: 'Trees', guideSlug: 'binary-trees-bst', guideTitle: 'Binary Trees & BST Master Guide', practiceTasks: ['Level Order Traversal with BFS queue', 'Maximum Path Sum in Binary Tree', 'Diameter of Binary Tree in O(N)'], estimatedHours: 3, questionQuery: 'Tree' },
  { day: 9, week: 2, title: 'BST Properties & Lowest Common Ancestor', focusTopic: 'Trees', guideSlug: 'binary-trees-bst', guideTitle: 'Binary Trees & BST Master Guide', practiceTasks: ['Validate Binary Search Tree', 'Lowest Common Ancestor in BST and Binary Tree', 'Construct Binary Tree from Preorder & Inorder'], estimatedHours: 3, questionQuery: 'LCA' },
  { day: 10, week: 2, title: 'Trie & Priority Queue (Heaps)', focusTopic: 'Trees', guideSlug: 'binary-trees-bst', guideTitle: 'Binary Trees & BST Master Guide', practiceTasks: ['Implement Trie (Prefix Tree) with insert/search', 'Kth Largest Element in an Array (Min-Heap)', 'Merge K Sorted Lists using Priority Queue'], estimatedHours: 3.5, questionQuery: 'Trie' },
  { day: 11, week: 2, title: 'Graph BFS, DFS & Connected Components', focusTopic: 'Graphs', guideSlug: 'graph-algorithms', guideTitle: 'Graph Algorithms Blueprint', practiceTasks: ['Number of Islands (Grid BFS/DFS)', 'Rotting Oranges (Multi-source BFS)', 'Clone Graph using Hash Map visit tracker'], estimatedHours: 3.5, questionQuery: 'Graph' },
  { day: 12, week: 2, title: 'Topological Sort & Cycle Detection', focusTopic: 'Graphs', guideSlug: 'graph-algorithms', guideTitle: 'Graph Algorithms Blueprint', practiceTasks: ['Course Schedule I & II (Kahn algorithm BFS)', 'Alien Dictionary using Directed Graph', 'Cycle detection in directed vs undirected graph'], estimatedHours: 3.5, questionQuery: 'Course Schedule' },
  { day: 13, week: 2, title: 'Shortest Paths & Disjoint Set Union', focusTopic: 'Graphs', guideSlug: 'graph-algorithms', guideTitle: 'Graph Algorithms Blueprint', practiceTasks: ['Dijkstra algorithm with Min-Heap', 'Redundant Connection (Union-Find with rank)', 'Minimum Spanning Tree (Kruskal algorithm)'], estimatedHours: 3.5, questionQuery: 'Dijkstra' },
  { day: 14, week: 2, title: 'Backtracking & Recursion', focusTopic: 'DSA Review', practiceTasks: ['Subsets & Permutations generation', 'Word Search in 2D grid', 'N-Queens problem with row/diagonal safety check'], estimatedHours: 3 },

  // Week 3: Dynamic Programming, Core CS & Concurrency
  { day: 15, week: 3, title: '1D Dynamic Programming Foundations', focusTopic: 'DP', guideSlug: 'dynamic-programming', guideTitle: 'Dynamic Programming Master Guide', practiceTasks: ['Climbing Stairs & House Robber I & II', 'Coin Change (Minimum coins to make target)', 'Longest Increasing Subsequence in O(N log N)'], estimatedHours: 3.5, questionQuery: 'DP' },
  { day: 16, week: 3, title: '2D DP & Knapsack Patterns', focusTopic: 'DP', guideSlug: 'dynamic-programming', guideTitle: 'Dynamic Programming Master Guide', practiceTasks: ['0/1 Knapsack with space optimization', 'Partition Equal Subset Sum', 'Target Sum with memoization'], estimatedHours: 3.5, questionQuery: 'Knapsack' },
  { day: 17, week: 3, title: 'String DP & Grid Paths', focusTopic: 'DP', guideSlug: 'dynamic-programming', guideTitle: 'Dynamic Programming Master Guide', practiceTasks: ['Longest Common Subsequence (LCS)', 'Edit Distance between two strings', 'Unique Paths in Grid with obstacles'], estimatedHours: 3.5, questionQuery: 'LCS' },
  { day: 18, week: 3, title: 'Operating Systems: Processes, Threads & Deadlock', focusTopic: 'OS', guideSlug: 'operating-systems', guideTitle: 'Operating Systems Guide', practiceTasks: ['Process memory layout (Text, Data, Heap, Stack)', 'Deadlock 4 Coffman conditions & Banker algorithm', 'Virtual Memory, Paging & Page Replacement algorithms'], estimatedHours: 3, questionQuery: 'OS' },
  { day: 19, week: 3, title: 'DBMS: ACID, Normalization & SQL Queries', focusTopic: 'DBMS', guideSlug: 'dbms-sql-internals', guideTitle: 'DBMS & SQL Internals', practiceTasks: ['Write 5 complex SQL queries with GROUP BY & HAVING', 'B+ Tree indexing vs Hash indexing trade-offs', 'Transaction isolation levels & Dirty Reads'], estimatedHours: 3, questionQuery: 'ACID' },
  { day: 20, week: 3, title: 'Computer Networks: TCP, UDP & HTTP/HTTPS', focusTopic: 'CN', practiceTasks: ['TCP 3-way handshake and 4-way FIN teardown', 'Why TIME_WAIT state exists (2*MSL)', 'DNS resolution flow and HTTPS TLS handshake'], estimatedHours: 3, questionQuery: 'TCP' },
  { day: 21, week: 3, title: 'OOP & Low-Level Design Patterns', focusTopic: 'OOP', practiceTasks: ['SOLID principles with concrete refactoring example', 'Factory Method and Singleton (Thread-safe Double Check)', 'Design Parking Lot or Snake & Ladder game'], estimatedHours: 3.5, questionQuery: 'OOP' },

  // Week 4: System Design, Mock Rounds, Company Radars & HR
  { day: 22, week: 4, title: 'High-Level System Design: Rate Limiter', focusTopic: 'System Design', guideSlug: 'system-design', guideTitle: 'System Design Master Blueprint', practiceTasks: ['Token Bucket vs Sliding Window Counter', 'Distributed Redis cache synchronization', 'Consistent Hashing and server partitioning'], estimatedHours: 3.5, questionQuery: 'Rate Limiter' },
  { day: 23, week: 4, title: 'System Design: Scalable URL Shortener', focusTopic: 'System Design', guideSlug: 'system-design', guideTitle: 'System Design Master Blueprint', practiceTasks: ['Base62 unique encoding vs Hash collision', 'Database schema for 100M URLs/month', 'Redis Cache-Aside and 301 vs 302 HTTP redirects'], estimatedHours: 3, questionQuery: 'TinyURL' },
  { day: 24, week: 4, title: 'Target Company Radar: Google, Amazon & Microsoft', focusTopic: 'Company Prep', practiceTasks: ['Review top tags on Company Radar pages', 'Practice Amazon Leadership Principles with STAR stories', 'Solve 2 Google-tagged graph and DP questions'], estimatedHours: 3.5, questionQuery: 'Google' },
  { day: 25, week: 4, title: 'Target Company Radar: TCS, Infosys & Capgemini', focusTopic: 'Company Prep', practiceTasks: ['Practice Aptitude and pseudo-code questions', 'Revise Core Java/C++ output prediction questions', 'Check off Mass Recruiter checklist in dashboard'], estimatedHours: 2.5, questionQuery: 'TCS' },
  { day: 26, week: 4, title: 'Resume Project Deep-Dive Defense', focusTopic: 'Resume Defense', practiceTasks: ['Prepare 5-minute technical walkthrough of your main project', 'Identify bottlenecks and scalability flaws in your architecture', 'Defend database choice (SQL vs NoSQL)'], estimatedHours: 3 },
  { day: 27, week: 4, title: 'Full 90-Minute SDE Mock Online Assessment', focusTopic: 'Mock Assessment', practiceTasks: ['Simulate 90-min test: 1 Easy, 1 Medium, 1 Hard problem', 'Strict timed conditions without looking at hints', 'Analyze edge cases and test suite passes'], estimatedHours: 3 },
  { day: 28, week: 4, title: 'Live Coding Mock Interview (Peer/Self)', focusTopic: 'Mock Interview', practiceTasks: ['Practice thinking out loud and clarifying problem constraints', 'Write clean, modular code with descriptive variable names', 'State time and space complexities immediately'], estimatedHours: 3 },
  { day: 29, week: 4, title: 'HR, Behavioral & Situational Questions', focusTopic: 'HR & Behavioral', practiceTasks: ['Prepare "Tell me about a time you failed" using STAR', 'Answer "Why should we hire you over others?"', 'Formulate thoughtful questions to ask the interviewer'], estimatedHours: 2.5 },
  { day: 30, week: 4, title: 'Final Placement Readiness & Confidence Check', focusTopic: 'Final Polish', practiceTasks: ['Verify 100% completed items on Student Dashboard', 'Bookmark your personal notes for last-day revision', 'Rest, sleep well, and walk into placement season ready!'], estimatedHours: 1.5 }
];

const STORAGE_KEY = 'placementprep_study_plan_completed_days';

export default function StudyPlanPage() {
  const { domain, setDomain } = useDomain();
  const [selectedTrack, setSelectedTrack] = useState<'ece' | 'it'>(domain);
  const [selectedWeek, setSelectedWeek] = useState<number>(0); // 0 = all weeks
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSelectedTrack(domain);
  }, [domain]);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${selectedTrack}`);
      if (stored) {
        setCompletedDays(JSON.parse(stored));
      } else {
        setCompletedDays([]);
      }
    } catch {
      setCompletedDays([]);
    }
  }, [selectedTrack]);

  const toggleDayCompletion = (day: number) => {
    const updated = completedDays.includes(day)
      ? completedDays.filter(d => d !== day)
      : [...completedDays, day];
    
    setCompletedDays(updated);
    try {
      localStorage.setItem(`${STORAGE_KEY}_${selectedTrack}`, JSON.stringify(updated));
    } catch {}
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset your progress for this 30-day plan?')) {
      setCompletedDays([]);
      try {
        localStorage.removeItem(`${STORAGE_KEY}_${selectedTrack}`);
      } catch {}
    }
  };

  const currentPlan = selectedTrack === 'ece' ? ECE_30_DAY_PLAN : IT_30_DAY_PLAN;

  const filteredDays = useMemo(() => {
    if (selectedWeek === 0) return currentPlan;
    return currentPlan.filter(d => d.week === selectedWeek);
  }, [currentPlan, selectedWeek]);

  const completionPercentage = Math.round((completedDays.length / 30) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumbs */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-200 transition">Home</Link>
            <span>/</span>
            <span className="text-violet-400 font-medium">30-Day Placement Plan</span>
          </div>

          <button
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
              <Calendar className="w-3.5 h-3.5" />
              Day-by-Day Milestone Roadmap
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              30-Day Campus Placement <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400">Battle Plan</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Eliminate preparation anxiety with a structured, step-by-step daily syllabus. Every single day gives you exact topics to study, curated problem sets to solve, and verification milestones.
            </p>

            {/* Overall Progress Gauge Bar */}
            <div className="pt-3 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-300">
                  Sprint Completion: {completedDays.length} of 30 Days Finished
                </span>
                <span className="font-bold text-violet-400">
                  {completionPercentage}% Complete
                </span>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Track Switcher & Week Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          {/* Branch Track Switcher */}
          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                setSelectedTrack('ece');
                setDomain('ece');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedTrack === 'ece'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-cyan-400'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-300" />
              Semiconductor & ECE Track
            </button>

            <button
              onClick={() => {
                setSelectedTrack('it');
                setDomain('it');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedTrack === 'it'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-indigo-400'
              }`}
            >
              <Code2 className="w-4 h-4 text-indigo-300" />
              Software & IT Track
            </button>
          </div>

          {/* Reset button */}
          {completedDays.length > 0 && (
            <button
              onClick={resetProgress}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-400 transition self-start sm:self-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Plan Progress</span>
            </button>
          )}
        </div>

        {/* Week Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          <span className="text-xs text-slate-500 whitespace-nowrap pl-1 pr-2">Filter Week:</span>
          {[
            { id: 0, label: 'All 30 Days' },
            { id: 1, label: 'Week 1: Core Fundamentals' },
            { id: 2, label: 'Week 2: Advanced Technical' },
            { id: 3, label: 'Week 3: Systems & Protocols' },
            { id: 4, label: 'Week 4: Radar Mocks & HR' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedWeek(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedWeek === tab.id
                  ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Day Cards Timeline */}
        <div className="space-y-4">
          {filteredDays.map((item) => {
            const isDone = completedDays.includes(item.day);
            const isEce = selectedTrack === 'ece';

            return (
              <div
                key={item.day}
                className={`rounded-2xl border transition-all duration-200 ${
                  isDone
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-md'
                }`}
              >
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    {/* Checkbox & Day Header */}
                    <div className="flex items-start gap-3.5 flex-1">
                      <button
                        onClick={() => toggleDayCompletion(item.day)}
                        className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition shrink-0 ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-slate-800 border-slate-700 text-transparent hover:border-violet-500'
                        }`}
                        title={isDone ? 'Mark day incomplete' : 'Mark day completed'}
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                            isDone 
                              ? 'bg-slate-800 text-slate-400' 
                              : isEce
                              ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-300'
                              : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300'
                          }`}>
                            Day {item.day} • Week {item.week}
                          </span>

                          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                            {item.focusTopic}
                          </span>

                          <span className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="w-3 h-3 text-slate-500" />
                            ~{item.estimatedHours} Hours
                          </span>
                        </div>

                        <h3 className={`text-base sm:text-lg font-bold transition ${
                          isDone ? 'line-through text-slate-400' : 'text-white'
                        }`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Status indicator */}
                    {isDone && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shrink-0">
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Daily Tasks Checklist */}
                  <div className="pl-9 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Target Action Items for Today:
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                      {item.practiceTasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                          <span className="text-violet-400 font-bold mt-0.5">•</span>
                          <span className={isDone ? 'line-through text-slate-500' : 'text-slate-300'}>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resource Links Bar */}
                  <div className="pl-9 pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4">
                      {item.guideSlug && (
                        <Link
                          href={`/guides/${item.guideSlug}`}
                          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-medium transition"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Study Blueprint: {item.guideTitle}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}

                      {item.questionQuery && (
                        <Link
                          href={`/questions?q=${encodeURIComponent(item.questionQuery)}`}
                          className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Solve {item.questionQuery} in Question Bank</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    <button
                      onClick={() => toggleDayCompletion(item.day)}
                      className={`text-xs font-semibold px-3 py-1 rounded-lg transition ${
                        isDone
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      {isDone ? 'Mark Incomplete' : 'Mark Day Done'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
