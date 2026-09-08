import { Company, CompanyTrendInsights, Experience, ExperienceRound, RoundTag } from '@/types/database';
import { TOPIC_KEYWORDS } from './constants';
import { ECE_COMPANIES, ECE_EXPERIENCES, getEceCompanyTrendInsights } from './eceData';

export const MOCK_COMPANIES: Company[] = [
  {
    id: "comp-google",
    name: "Google",
    industry: "Technology",
    logo_url: "https://logo.clearbit.com/google.com",
    experience_count: 3,
    top_tags: ["DP", "Graphs", "Trees", "Arrays & Strings", "System Design"]
  },
  {
    id: "comp-amazon",
    name: "Amazon",
    industry: "E-Commerce & Cloud",
    logo_url: "https://logo.clearbit.com/amazon.com",
    experience_count: 3,
    top_tags: ["Arrays & Strings", "DP", "Trees", "System Design", "OOP"]
  },
  {
    id: "comp-microsoft",
    name: "Microsoft",
    industry: "Technology",
    logo_url: "https://logo.clearbit.com/microsoft.com",
    experience_count: 2,
    top_tags: ["Graphs", "Trees", "DP", "OS", "DBMS"]
  },
  {
    id: "comp-tcs",
    name: "TCS",
    industry: "IT Services & Consulting",
    logo_url: "https://logo.clearbit.com/tcs.com",
    experience_count: 3,
    top_tags: ["Aptitude", "Arrays & Strings", "OOP", "DBMS", "HR"]
  },
  {
    id: "comp-infosys",
    name: "Infosys",
    industry: "IT Services & Consulting",
    logo_url: "https://logo.clearbit.com/infosys.com",
    experience_count: 3,
    top_tags: ["DP", "Trees", "Arrays & Strings", "DBMS", "Aptitude"]
  },
  {
    id: "comp-capgemini",
    name: "Capgemini",
    industry: "IT Services & Consulting",
    logo_url: "https://logo.clearbit.com/capgemini.com",
    experience_count: 2,
    top_tags: ["Aptitude", "OOP", "DBMS", "Arrays & Strings", "HR"]
  },
  {
    id: "comp-wipro",
    name: "Wipro",
    industry: "IT Services & Consulting",
    logo_url: "https://logo.clearbit.com/wipro.com",
    experience_count: 2,
    top_tags: ["Aptitude", "Arrays & Strings", "CN", "OOP", "HR"]
  },
  {
    id: "comp-cognizant",
    name: "Cognizant",
    industry: "IT Services & Consulting",
    logo_url: "https://logo.clearbit.com/cognizant.com",
    experience_count: 2,
    top_tags: ["Aptitude", "DBMS", "OOP", "Arrays & Strings", "Behavioral"]
  },
  {
    id: "comp-accenture",
    name: "Accenture",
    industry: "IT & Strategy Consulting",
    logo_url: "https://logo.clearbit.com/accenture.com",
    experience_count: 2,
    top_tags: ["Aptitude", "Arrays & Strings", "CN", "DBMS", "HR"]
  },
  {
    id: "comp-flipkart",
    name: "Flipkart",
    industry: "E-Commerce",
    logo_url: "https://logo.clearbit.com/flipkart.com",
    experience_count: 2,
    top_tags: ["System Design", "DP", "Graphs", "OOP", "Aptitude"]
  },
  {
    id: "comp-goldman-sachs",
    name: "Goldman Sachs",
    industry: "Financial Services",
    logo_url: "https://logo.clearbit.com/goldmansachs.com",
    experience_count: 2,
    top_tags: ["Aptitude", "Arrays & Strings", "DBMS", "DP", "OS"]
  },
  {
    id: "comp-uber",
    name: "Uber",
    industry: "Technology",
    logo_url: "https://logo.clearbit.com/uber.com",
    experience_count: 2,
    top_tags: ["System Design", "Graphs", "DP", "OS", "DBMS"]
  },
  {
    id: "comp-meta",
    name: "Meta",
    industry: "Technology",
    logo_url: "https://logo.clearbit.com/meta.com",
    experience_count: 1,
    top_tags: ["System Design", "Arrays & Strings", "Graphs", "Trees", "Behavioral"]
  },
  {
    id: "comp-adobe",
    name: "Adobe",
    industry: "Technology",
    logo_url: "https://logo.clearbit.com/adobe.com",
    experience_count: 1,
    top_tags: ["Trees", "OOP", "Graphs", "DP", "OS"]
  },
  {
    id: "comp-oracle",
    name: "Oracle",
    industry: "Enterprise Software",
    logo_url: "https://logo.clearbit.com/oracle.com",
    experience_count: 2,
    top_tags: ["DBMS", "OS", "Graphs", "CN", "Arrays & Strings"]
  },
  {
    id: "comp-salesforce",
    name: "Salesforce",
    industry: "Enterprise Cloud",
    logo_url: "https://logo.clearbit.com/salesforce.com",
    experience_count: 1,
    top_tags: ["System Design", "OOP", "DP", "Trees", "Behavioral"]
  },
  {
    id: "comp-atlassian",
    name: "Atlassian",
    industry: "Enterprise Software",
    logo_url: "https://logo.clearbit.com/atlassian.com",
    experience_count: 1,
    top_tags: ["System Design", "OOP", "Graphs", "CN", "Behavioral"]
  },
  {
    id: "comp-morgan-stanley",
    name: "Morgan Stanley",
    industry: "Financial Services",
    logo_url: "https://logo.clearbit.com/morganstanley.com",
    experience_count: 1,
    top_tags: ["DBMS", "OOP", "Aptitude", "DP", "Trees"]
  },
  {
    id: "comp-walmart",
    name: "Walmart Global Tech",
    industry: "Retail Technology",
    logo_url: "https://logo.clearbit.com/walmart.com",
    experience_count: 2,
    top_tags: ["DP", "Trees", "System Design", "Arrays & Strings", "DBMS"]
  },
  {
    id: "comp-samsung",
    name: "Samsung R&D",
    industry: "Hardware & Software",
    logo_url: "https://logo.clearbit.com/samsung.com",
    experience_count: 2,
    top_tags: ["Graphs", "DP", "Trees", "OS", "Arrays & Strings"]
  },
  {
    id: "comp-jpmorgan",
    name: "JP Morgan Chase",
    industry: "Financial Services",
    logo_url: "https://logo.clearbit.com/jpmorganchase.com",
    experience_count: 2,
    top_tags: ["Arrays & Strings", "OOP", "DBMS", "Behavioral", "Aptitude"]
  },
  {
    id: "comp-paypal",
    name: "PayPal",
    industry: "Fintech & Payments",
    logo_url: "https://logo.clearbit.com/paypal.com",
    experience_count: 1,
    top_tags: ["System Design", "DP", "Arrays & Strings", "DBMS", "OOP"]
  },
  {
    id: "comp-cisco",
    name: "Cisco",
    industry: "Networking & Security",
    logo_url: "https://logo.clearbit.com/cisco.com",
    experience_count: 2,
    top_tags: ["CN", "OS", "Arrays & Strings", "Trees", "OOP"]
  },
  {
    id: "comp-ibm",
    name: "IBM",
    industry: "Technology & Cloud",
    logo_url: "https://logo.clearbit.com/ibm.com",
    experience_count: 2,
    top_tags: ["Aptitude", "OOP", "DBMS", "OS", "Arrays & Strings"]
  },
  {
    id: "comp-zomato",
    name: "Zomato",
    industry: "Consumer Tech",
    logo_url: "https://logo.clearbit.com/zomato.com",
    experience_count: 1,
    top_tags: ["System Design", "DP", "Graphs", "DBMS", "OOP"]
  },
  {
    id: "comp-swiggy",
    name: "Swiggy",
    industry: "Consumer Tech",
    logo_url: "https://logo.clearbit.com/swiggy.com",
    experience_count: 1,
    top_tags: ["System Design", "OOP", "Graphs", "DP", "Arrays & Strings"]
  },
  {
    id: "comp-jio",
    name: "Jio Platforms",
    industry: "Telecommunications & Tech",
    logo_url: "https://logo.clearbit.com/jio.com",
    experience_count: 2,
    top_tags: ["Aptitude", "OOP", "CN", "DBMS", "Arrays & Strings"]
  }
];

export const MOCK_EXPERIENCES: Record<string, Experience[]> = {
  "comp-google": [
    {
      id: "exp-g-1",
      company_id: "comp-google",
      role: "SDE-1 (Full Time)",
      year: 2024,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/google-interview-experience-sde1-2024-1",
      raw_text: "Google on-campus SDE-1 hiring experience with 4 rounds covering BFS, dynamic programming, and autocomplete Trie design.",
      submitted_by: null,
      rounds: [
        {
          id: "r-g-1",
          experience_id: "exp-g-1",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "Online Assessment on Google platform with 2 problems: 1. Graph traversal using BFS to find minimum steps in a grid with obstacles. 2. Array sliding window and two pointer technique to maximize subarray sum with conditions.",
          tags: [{ id: "t1", round_id: "r-g-1", tag: "Graphs" }, { id: "t2", round_id: "r-g-1", tag: "Arrays & Strings" }]
        },
        {
          id: "r-g-2",
          experience_id: "exp-g-1",
          round_number: 2,
          round_type: "Technical",
          round_text: "Round 1 Technical: Problem on Dynamic Programming with memoization on a tree structure (Maximum independent set). Discussed time and space complexity O(V+E).",
          tags: [{ id: "t3", round_id: "r-g-2", tag: "DP" }, { id: "t4", round_id: "r-g-2", tag: "Trees" }]
        },
        {
          id: "r-g-3",
          experience_id: "exp-g-1",
          round_number: 3,
          round_type: "Technical",
          round_text: "Round 2 Technical: Advanced Trie implementation for autocomplete search query suggestions with frequency ranking. Follow up: Handle concurrency with mutex locks in memory.",
          tags: [{ id: "t5", round_id: "r-g-3", tag: "Trees" }, { id: "t6", round_id: "r-g-3", tag: "OS" }]
        },
        {
          id: "r-g-4",
          experience_id: "exp-g-1",
          round_number: 4,
          round_type: "HR",
          round_text: "Googleyness & Leadership: Tell me about yourself. A time when you had a disagreement with a team member and how you resolved the conflict using data.",
          tags: [{ id: "t7", round_id: "r-g-4", tag: "HR" }, { id: "t8", round_id: "r-g-4", tag: "Behavioral" }]
        }
      ]
    },
    {
      id: "exp-g-2",
      company_id: "comp-google",
      role: "SDE Intern",
      year: 2025,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/google-interview-experience-sde-intern-2025",
      raw_text: "Summer internship experience focusing on LCA, Dijkstra graphs, and 3-string LCS dynamic programming.",
      submitted_by: null,
      rounds: [
        {
          id: "r-g-5",
          experience_id: "exp-g-2",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "Google OA: 2 coding questions. Q1: Binary search on answer. Q2: Graph shortest path using Dijkstra with modified edge weights.",
          tags: [{ id: "t9", round_id: "r-g-5", tag: "Graphs" }, { id: "t10", round_id: "r-g-5", tag: "Arrays & Strings" }]
        },
        {
          id: "r-g-6",
          experience_id: "exp-g-2",
          round_number: 2,
          round_type: "Technical",
          round_text: "Technical Interview 1: Binary tree lowest common ancestor (LCA) and converting a binary search tree (BST) to a balanced AVL tree.",
          tags: [{ id: "t11", round_id: "r-g-6", tag: "Trees" }]
        },
        {
          id: "r-g-7",
          experience_id: "exp-g-2",
          round_number: 3,
          round_type: "Technical",
          round_text: "Technical Interview 2: Dynamic programming (DP on strings - Longest Common Subsequence LCS with 3 strings). Follow up on space optimization.",
          tags: [{ id: "t12", round_id: "r-g-7", tag: "DP" }]
        },
        {
          id: "r-g-8",
          experience_id: "exp-g-2",
          round_number: 4,
          round_type: "HR",
          round_text: "Behavioral & Fitment: Tell me about your most challenging project. What would you do if your project deadline was cut in half?",
          tags: [{ id: "t13", round_id: "r-g-8", tag: "Behavioral" }]
        }
      ]
    }
  ],
  "comp-tcs": [
    {
      id: "exp-tcs-1",
      company_id: "comp-tcs",
      role: "TCS Digital / Prime SDE",
      year: 2024,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/tcs-digital-interview-experience-2024",
      raw_text: "TCS NQT Digital hiring round covering advanced quantitative aptitude, array manipulation, SQL Joins, and OOP.",
      submitted_by: null,
      rounds: [
        {
          id: "r-tcs-1",
          experience_id: "exp-tcs-1",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "TCS National Qualifier Test (NQT): Section 1: Quantitative Aptitude (Time & Work, Permutations, Probability). Section 2: Reasoning. Section 3: Advanced Coding (Two coding problems on arrays & string hashing).",
          tags: [{ id: "tcs1", round_id: "r-tcs-1", tag: "Aptitude" }, { id: "tcs2", round_id: "r-tcs-1", tag: "Arrays & Strings" }]
        },
        {
          id: "r-tcs-2",
          experience_id: "exp-tcs-1",
          round_number: 2,
          round_type: "Technical",
          round_text: "Technical Interview: Asked to explain OOP 4 pillars with code in Java/C++. Wrote SQL queries on Employee department tables using INNER JOIN and GROUP BY.",
          tags: [{ id: "tcs3", round_id: "r-tcs-2", tag: "OOP" }, { id: "tcs4", round_id: "r-tcs-2", tag: "DBMS" }]
        },
        {
          id: "r-tcs-3",
          experience_id: "exp-tcs-1",
          round_number: 3,
          round_type: "HR",
          round_text: "Managerial & HR Round: Willingness to relocate, project discussion, how you handle deadlines, and why TCS.",
          tags: [{ id: "tcs5", round_id: "r-tcs-3", tag: "HR" }, { id: "tcs6", round_id: "r-tcs-3", tag: "Behavioral" }]
        }
      ]
    },
    {
      id: "exp-tcs-2",
      company_id: "comp-tcs",
      role: "TCS Ninja / Developer",
      year: 2025,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/tcs-ninja-interview-experience-2025",
      raw_text: "TCS on-campus placement experience covering cognitive aptitude, string palindromes, and basics of relational databases.",
      submitted_by: null,
      rounds: [
        {
          id: "r-tcs-4",
          experience_id: "exp-tcs-2",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "NQT Aptitude round and basic array coding (finding second largest element, matrix rotation).",
          tags: [{ id: "tcs7", round_id: "r-tcs-4", tag: "Aptitude" }, { id: "tcs8", round_id: "r-tcs-4", tag: "Arrays & Strings" }]
        },
        {
          id: "r-tcs-5",
          experience_id: "exp-tcs-2",
          round_number: 2,
          round_type: "Technical",
          round_text: "Basics of DBMS, Normalization (1NF, 2NF, 3NF), and Method Overloading vs Overriding.",
          tags: [{ id: "tcs9", round_id: "r-tcs-5", tag: "DBMS" }, { id: "tcs10", round_id: "r-tcs-5", tag: "OOP" }]
        }
      ]
    }
  ],
  "comp-infosys": [
    {
      id: "exp-inf-1",
      company_id: "comp-infosys",
      role: "Specialist Programmer (Power Programmer)",
      year: 2024,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/infosys-specialist-programmer-interview-2024",
      raw_text: "Infosys HackWithInfy / SP selection: 3 hard algorithmic problems on DP, Segment Trees, and Graph BFS.",
      submitted_by: null,
      rounds: [
        {
          id: "r-inf-1",
          experience_id: "exp-inf-1",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "HackWithInfy Coding Round: 3 complex problems. Q1: Dynamic programming on grid with bitmask. Q2: Tree lowest common ancestor with path queries. Q3: Binary search on answer space.",
          tags: [{ id: "inf1", round_id: "r-inf-1", tag: "DP" }, { id: "inf2", round_id: "r-inf-1", tag: "Trees" }, { id: "inf3", round_id: "r-inf-1", tag: "Arrays & Strings" }]
        },
        {
          id: "r-inf-2",
          experience_id: "exp-inf-1",
          round_number: 2,
          round_type: "Technical",
          round_text: "Technical Round: In-depth code walkthrough of resume projects, graph cycle detection, and indexing in SQL databases.",
          tags: [{ id: "inf4", round_id: "r-inf-2", tag: "Graphs" }, { id: "inf5", round_id: "r-inf-2", tag: "DBMS" }]
        }
      ]
    },
    {
      id: "exp-inf-2",
      company_id: "comp-infosys",
      role: "Digital Specialist Engineer (DSE)",
      year: 2025,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/infosys-dse-interview-2025",
      raw_text: "Infosys DSE hiring round covering DP knapsack, recursion, and core computer science fundamentals.",
      submitted_by: null,
      rounds: [
        {
          id: "r-inf-3",
          experience_id: "exp-inf-2",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "Infosys OA: 2 medium coding questions on 0/1 knapsack variation and array sliding window.",
          tags: [{ id: "inf6", round_id: "r-inf-3", tag: "DP" }, { id: "inf7", round_id: "r-inf-3", tag: "Arrays & Strings" }]
        },
        {
          id: "r-inf-4",
          experience_id: "exp-inf-2",
          round_number: 2,
          round_type: "Technical",
          round_text: "Binary Search Tree validation, SQL Window functions (ROW_NUMBER), and Operating System page faults.",
          tags: [{ id: "inf8", round_id: "r-inf-4", tag: "Trees" }, { id: "inf9", round_id: "r-inf-4", tag: "DBMS" }, { id: "inf10", round_id: "r-inf-4", tag: "OS" }]
        }
      ]
    }
  ],
  "comp-capgemini": [
    {
      id: "exp-cap-1",
      company_id: "comp-capgemini",
      role: "Senior Analyst / Analyst",
      year: 2024,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/capgemini-interview-experience-2024",
      raw_text: "Capgemini campus drive with pseudocode analysis, game-based aptitude test, and technical OOP/SQL interview.",
      submitted_by: null,
      rounds: [
        {
          id: "r-cap-1",
          experience_id: "exp-cap-1",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "Pseudocode round (identifying output of loops/recursion), English ability, Game-based aptitude assessment, and 1 Coding question on string anagrams.",
          tags: [{ id: "cap1", round_id: "r-cap-1", tag: "Aptitude" }, { id: "cap2", round_id: "r-cap-1", tag: "Arrays & Strings" }]
        },
        {
          id: "r-cap-2",
          experience_id: "exp-cap-1",
          round_number: 2,
          round_type: "Technical",
          round_text: "Technical interview on OOP principles (Inheritance, Polymorphism), Java Collections (ArrayList vs LinkedList), and writing SQL queries for finding duplicate records.",
          tags: [{ id: "cap3", round_id: "r-cap-2", tag: "OOP" }, { id: "cap4", round_id: "r-cap-2", tag: "DBMS" }]
        },
        {
          id: "r-cap-3",
          experience_id: "exp-cap-1",
          round_number: 3,
          round_type: "HR",
          round_text: "HR interview: Tell me about yourself, strengths/weaknesses, teamwork experience, and shifts flexibility.",
          tags: [{ id: "cap5", round_id: "r-cap-3", tag: "HR" }, { id: "cap6", round_id: "r-cap-3", tag: "Behavioral" }]
        }
      ]
    }
  ],
  "comp-wipro": [
    {
      id: "exp-wip-1",
      company_id: "comp-wipro",
      role: "Wipro Turbo / Elite Developer",
      year: 2024,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/wipro-elite-nlth-interview-experience-2024",
      raw_text: "Wipro NLTH national talent test covering logical aptitude, essay writing, coding on string rotations, and networking fundamentals.",
      submitted_by: null,
      rounds: [
        {
          id: "r-wip-1",
          experience_id: "exp-wip-1",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "Aptitude test (Quantitative, Logical, Verbal), Essay Writing, and 2 Coding questions (String reverse words, Array target sum).",
          tags: [{ id: "wip1", round_id: "r-wip-1", tag: "Aptitude" }, { id: "wip2", round_id: "r-wip-1", tag: "Arrays & Strings" }]
        },
        {
          id: "r-wip-2",
          experience_id: "exp-wip-1",
          round_number: 2,
          round_type: "Technical",
          round_text: "Technical interview on OSI model layers, TCP vs UDP, abstract classes vs interfaces in Java, and Database Primary/Foreign keys.",
          tags: [{ id: "wip3", round_id: "r-wip-2", tag: "CN" }, { id: "wip4", round_id: "r-wip-2", tag: "OOP" }, { id: "wip5", round_id: "r-wip-2", tag: "DBMS" }]
        }
      ]
    }
  ],
  "comp-cognizant": [
    {
      id: "exp-cts-1",
      company_id: "comp-cognizant",
      role: "GenC Next / GenC Pro Developer",
      year: 2024,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/cognizant-genc-next-interview-2024",
      raw_text: "Cognizant GenC Next hiring with 2 programming challenges, DBMS joins, and object oriented architecture.",
      submitted_by: null,
      rounds: [
        {
          id: "r-cts-1",
          experience_id: "exp-cts-1",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "GenC Next Skill Assessment: 2 advanced coding questions on Subarray sums and Binary Search.",
          tags: [{ id: "cts1", round_id: "r-cts-1", tag: "Arrays & Strings" }, { id: "cts2", round_id: "r-cts-1", tag: "Aptitude" }]
        },
        {
          id: "r-cts-2",
          experience_id: "exp-cts-1",
          round_number: 2,
          round_type: "Technical",
          round_text: "Discussion on SQL ACID properties, DDL vs DML commands, and OOP design of a bank management system.",
          tags: [{ id: "cts3", round_id: "r-cts-2", tag: "DBMS" }, { id: "cts4", round_id: "r-cts-2", tag: "OOP" }]
        }
      ]
    }
  ],
  "comp-accenture": [
    {
      id: "exp-acc-1",
      company_id: "comp-accenture",
      role: "Associate Software Engineer (ASE)",
      year: 2024,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/accenture-interview-experience-2024",
      raw_text: "Accenture on-campus drive with Cognitive assessment, Technical assessment (Networking, Cloud, MS Office), and Coding.",
      submitted_by: null,
      rounds: [
        {
          id: "r-acc-1",
          experience_id: "exp-acc-1",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "Cognitive & Technical Assessment: Critical reasoning, Pseudocode debugging, Cloud fundamentals, and 2 Coding problems.",
          tags: [{ id: "acc1", round_id: "r-acc-1", tag: "Aptitude" }, { id: "acc2", round_id: "r-acc-1", tag: "CN" }, { id: "acc3", round_id: "r-acc-1", tag: "Arrays & Strings" }]
        },
        {
          id: "r-acc-2",
          experience_id: "exp-acc-1",
          round_number: 2,
          round_type: "Technical",
          round_text: "Virtual interview on final year project, database normalization, and behavioral scenario questions.",
          tags: [{ id: "acc4", round_id: "r-acc-2", tag: "DBMS" }, { id: "acc5", round_id: "r-acc-2", tag: "Behavioral" }]
        }
      ]
    }
  ],
  "comp-samsung": [
    {
      id: "exp-sam-1",
      company_id: "comp-samsung",
      role: "Software Engineer (Samsung R&D)",
      year: 2024,
      source_platform: "GeeksforGeeks",
      source_url: "https://www.geeksforgeeks.org/samsung-rnd-interview-experience-2024",
      raw_text: "Samsung R&D 3-hour advanced coding competency test focusing on backtracking, graphs, and bit manipulation.",
      submitted_by: null,
      rounds: [
        {
          id: "r-sam-1",
          experience_id: "exp-sam-1",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "Samsung Software Competency Test: 1 problem, 3 hours, 50 test cases, 0 errors allowed. Problem on Graph BFS / Backtracking with pipe networks.",
          tags: [{ id: "sam1", round_id: "r-sam-1", tag: "Graphs" }, { id: "sam2", round_id: "r-sam-1", tag: "DP" }]
        },
        {
          id: "r-sam-2",
          experience_id: "exp-sam-1",
          round_number: 2,
          round_type: "Technical",
          round_text: "Technical Interview: Asked to explain the exact logic written in the competency test. OS concepts: Virtual memory, Semaphores, and Mutex.",
          tags: [{ id: "sam3", round_id: "r-sam-2", tag: "OS" }, { id: "sam4", round_id: "r-sam-2", tag: "Trees" }]
        }
      ]
    }
  ],
  "comp-walmart": [
    {
      id: "exp-wal-1",
      company_id: "comp-walmart",
      role: "Software Engineer 1 (Walmart Global Tech)",
      year: 2024,
      source_platform: "LeetCode Discuss",
      source_url: "https://leetcode.com/discuss/interview-experience/walmart-global-tech-sde1-2024",
      raw_text: "Walmart SDE-1 hiring through Walmart CodeHers / campus drive with DP, Binary Trees, and low level design.",
      submitted_by: null,
      rounds: [
        {
          id: "r-wal-1",
          experience_id: "exp-wal-1",
          round_number: 1,
          round_type: "Online Assessment",
          round_text: "Online Coding Test: 2 problems on Dynamic Programming (Coin Change variant) and Tree path sums.",
          tags: [{ id: "wal1", round_id: "r-wal-1", tag: "DP" }, { id: "wal2", round_id: "r-wal-1", tag: "Trees" }]
        },
        {
          id: "r-wal-2",
          experience_id: "exp-wal-1",
          round_number: 2,
          round_type: "Technical",
          round_text: "Technical Round 1: Two pointers, Sliding window maximum, and High level design basics of an inventory management service.",
          tags: [{ id: "wal3", round_id: "r-wal-2", tag: "Arrays & Strings" }, { id: "wal4", round_id: "r-wal-2", tag: "System Design" }]
        },
        {
          id: "r-wal-3",
          experience_id: "exp-wal-1",
          round_number: 3,
          round_type: "Technical",
          round_text: "Technical Round 2: Database indexing (B+Trees), SQL queries with DENSE_RANK, and Java multi-threading.",
          tags: [{ id: "wal5", round_id: "r-wal-3", tag: "DBMS" }, { id: "wal6", round_id: "r-wal-3", tag: "OS" }]
        }
      ]
    }
  ]
};

export const ALL_COMPANIES: Company[] = [
  ...MOCK_COMPANIES.map(c => ({ ...c, domain: 'it' as const })),
  ...ECE_COMPANIES
];

export function getCompaniesByDomain(domain?: 'it' | 'ece' | 'all'): Company[] {
  if (!domain || domain === 'all') return ALL_COMPANIES;
  return ALL_COMPANIES.filter(c => c.domain === domain);
}

export function getMockCompanyTrends(companyIdOrName: string): CompanyTrendInsights {
  // Check if it's an ECE company first
  const eceComp = ECE_COMPANIES.find(
    c => c.id === companyIdOrName || c.name.toLowerCase() === companyIdOrName.toLowerCase()
  );
  if (eceComp) {
    const eceInsights = getEceCompanyTrendInsights(eceComp.id);
    if (eceInsights) return eceInsights;
  }

  const company = ALL_COMPANIES.find(
    c => c.id === companyIdOrName || c.name.toLowerCase() === companyIdOrName.toLowerCase()
  ) || MOCK_COMPANIES[0];

  const experiences = MOCK_EXPERIENCES[company.id] || [
    {
      id: `exp-${company.id}-1`,
      company_id: company.id,
      role: "Software Development Engineer",
      year: 2024,
      source_platform: "GeeksforGeeks",
      source_url: `https://www.geeksforgeeks.org/${company.name.toLowerCase().replace(/\s+/g, '-')}-interview-experience-2024`,
      raw_text: `Comprehensive interview experience at ${company.name} across DSA, fundamentals, and behavioral rounds.`,
      submitted_by: null,
      rounds: [
        {
          id: `r-${company.id}-1`,
          experience_id: `exp-${company.id}-1`,
          round_number: 1,
          round_type: "Online Assessment",
          round_text: `Online assessment for ${company.name} testing ${company.top_tags?.[0] || 'Arrays & Strings'} and ${company.top_tags?.[1] || 'Aptitude'}.`,
          tags: [
            { id: "t1", round_id: `r-${company.id}-1`, tag: company.top_tags?.[0] || "Arrays & Strings" },
            { id: "t2", round_id: `r-${company.id}-1`, tag: company.top_tags?.[1] || "DP" }
          ]
        },
        {
          id: `r-${company.id}-2`,
          experience_id: `exp-${company.id}-1`,
          round_number: 2,
          round_type: "Technical",
          round_text: `Technical round covering ${company.top_tags?.[2] || 'Trees'}, problem solving, and architecture.`,
          tags: [
            { id: "t3", round_id: `r-${company.id}-2`, tag: company.top_tags?.[2] || "Trees" },
            { id: "t4", round_id: `r-${company.id}-2`, tag: company.top_tags?.[3] || "OOP" }
          ]
        },
        {
          id: `r-${company.id}-3`,
          experience_id: `exp-${company.id}-1`,
          round_number: 3,
          round_type: "Technical",
          round_text: `Core CS fundamentals interview on ${company.top_tags?.[4] || 'DBMS'}, transactions, and project deep-dive.`,
          tags: [
            { id: "t5", round_id: `r-${company.id}-3`, tag: company.top_tags?.[4] || "DBMS" },
            { id: "t6", round_id: `r-${company.id}-3`, tag: "Behavioral" }
          ]
        },
        {
          id: `r-${company.id}-4`,
          experience_id: `exp-${company.id}-1`,
          round_number: 4,
          round_type: "HR",
          round_text: "HR & Leadership: Background discussion, conflict resolution, and role alignment.",
          tags: [{ id: "t7", round_id: `r-${company.id}-4`, tag: "HR" }, { id: "t8", round_id: `r-${company.id}-4`, tag: "Behavioral" }]
        }
      ]
    }
  ];

  // Calculate topic breakdown
  const tagCounts: Record<string, number> = {};
  let totalTags = 0;
  const roundCounts: Record<string, number> = {};
  let totalRounds = 0;

  experiences.forEach(exp => {
    (exp.rounds || []).forEach(round => {
      totalRounds++;
      const rtype = round.round_type || "Technical";
      roundCounts[rtype] = (roundCounts[rtype] || 0) + 1;

      (round.tags || []).forEach(t => {
        totalTags++;
        tagCounts[t.tag] = (tagCounts[t.tag] || 0) + 1;
      });
    });
  });

  // Ensure default tags if needed
  if (totalTags === 0) {
    (company.top_tags || ["Arrays & Strings", "DP", "Graphs", "Trees", "System Design"]).forEach((t, i) => {
      const count = 5 - i;
      tagCounts[t] = count;
      totalTags += count;
    });
  }

  const topicBreakdown = Object.entries(tagCounts)
    .map(([tag, count]) => ({
      tag,
      count,
      percentage: Math.round((count / totalTags) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  const roundTypeBreakdown = Object.entries(roundCounts).length > 0
    ? Object.entries(roundCounts).map(([round_type, count]) => ({
        round_type,
        count,
        percentage: Math.round((count / totalRounds) * 100)
      }))
    : [
        { round_type: "Technical", count: 5, percentage: 45 },
        { round_type: "Online Assessment", count: 3, percentage: 27 },
        { round_type: "System Design", count: 2, percentage: 18 },
        { round_type: "HR", count: 1, percentage: 10 },
      ];

  const trendingShifts = topicBreakdown.slice(0, 4).map((t, idx) => ({
    tag: t.tag,
    recentCount: t.count + (4 - idx),
    previousCount: Math.max(1, t.count - 1),
    trend: (idx === 3 ? "neutral" : "up") as "up" | "down" | "neutral",
    percentChange: idx === 0 ? 150 : idx === 1 ? 80 : 40
  }));

  return {
    company,
    totalExperiences: experiences.length,
    totalRounds: Math.max(totalRounds, 4),
    topicBreakdown,
    roundTypeBreakdown,
    trendingShifts,
    recentExperiences: experiences,
    topTags: topicBreakdown.slice(0, 5).map(t => t.tag)
  };
}
