export type SkillCategory = 
  | 'Programming'
  | 'DSA & Problem Solving'
  | 'Core CS & Development'
  | 'Aptitude & Analytical'
  | 'Domain & Cloud'
  | 'Soft Skills & Communication';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  importanceLevel: 'Critical' | 'High' | 'Moderate';
  relatedRoles: string[]; // Role slugs from careerPathsData
  linkedGuideSlug?: string;
  tags: string[];
}

export const SKILLS_DATABASE: SkillItem[] = [
  // 1. Programming Languages
  {
    id: 'cpp',
    name: 'C++ & STL',
    category: 'Programming',
    description: 'Fast, typed language dominating competitive programming and high-performance engineering rounds.',
    importanceLevel: 'Critical',
    relatedRoles: ['software-developer', 'ai-ml-engineer'],
    linkedGuideSlug: 'arrays-strings',
    tags: ['OOP', 'Memory Management', 'STL', 'Pointers']
  },
  {
    id: 'java',
    name: 'Java & Collections',
    category: 'Programming',
    description: 'The enterprise standard in backend microservices, Spring Boot, and IT services campus interviews.',
    importanceLevel: 'Critical',
    relatedRoles: ['software-developer', 'cloud-engineer'],
    linkedGuideSlug: 'oop-design-patterns',
    tags: ['OOP', 'JVM', 'Collections', 'Spring']
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    description: 'The undisputed language of Data Science, AI/ML, automation scripting, and rapid problem solving.',
    importanceLevel: 'Critical',
    relatedRoles: ['software-developer', 'data-analyst', 'data-scientist', 'ai-ml-engineer', 'devops-engineer'],
    linkedGuideSlug: 'arrays-strings',
    tags: ['Scripting', 'Pandas', 'PyTorch', 'Automation']
  },
  {
    id: 'javascript-ts',
    name: 'JavaScript / TypeScript',
    category: 'Programming',
    description: 'The foundation of the modern interactive web, full-stack development, and Node.js APIs.',
    importanceLevel: 'High',
    relatedRoles: ['product-engineer', 'software-developer'],
    tags: ['Async', 'DOM', 'Types', 'ES6+']
  },
  {
    id: 'sql',
    name: 'SQL (Structured Query Language)',
    category: 'Programming',
    description: 'The lingua franca of databases, essential for queries, aggregations, window functions, and analytics.',
    importanceLevel: 'Critical',
    relatedRoles: ['data-analyst', 'data-scientist', 'software-developer', 'business-analyst', 'product-management'],
    linkedGuideSlug: 'dbms',
    tags: ['Queries', 'Joins', 'Aggregation', 'Window Functions']
  },

  // 2. DSA & Problem Solving
  {
    id: 'dsa-arrays-strings',
    name: 'Arrays, Strings & Pointers',
    category: 'DSA & Problem Solving',
    description: 'Two-pointer, sliding window, prefix sums, and string matching foundations.',
    importanceLevel: 'Critical',
    relatedRoles: ['software-developer', 'product-engineer', 'ai-ml-engineer'],
    linkedGuideSlug: 'arrays-strings',
    tags: ['Sliding Window', 'Two Pointers', 'Binary Search']
  },
  {
    id: 'dsa-trees-graphs',
    name: 'Trees & Graphs',
    category: 'DSA & Problem Solving',
    description: 'Binary trees, BSTs, BFS, DFS, Dijkstra, Topo Sort, and Disjoint Set Union (DSU).',
    importanceLevel: 'Critical',
    relatedRoles: ['software-developer', 'ai-ml-engineer', 'data-scientist'],
    linkedGuideSlug: 'graphs',
    tags: ['BFS', 'DFS', 'Dijkstra', 'Recursion']
  },
  {
    id: 'dsa-dp',
    name: 'Dynamic Programming (DP)',
    category: 'DSA & Problem Solving',
    description: 'Memoization, tabulation, knapsack, and grid transitions tested in top-tier company rounds.',
    importanceLevel: 'Critical',
    relatedRoles: ['software-developer', 'ai-ml-engineer'],
    linkedGuideSlug: 'dynamic-programming',
    tags: ['State Transition', 'Memoization', 'Optimization']
  },

  // 3. Core CS & Development
  {
    id: 'oop-concepts',
    name: 'Object-Oriented Programming (OOP)',
    category: 'Core CS & Development',
    description: 'Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID principles, and design patterns.',
    importanceLevel: 'Critical',
    relatedRoles: ['software-developer', 'product-engineer', 'cloud-engineer'],
    linkedGuideSlug: 'oop-design-patterns',
    tags: ['SOLID', 'Design Patterns', 'Inheritance']
  },
  {
    id: 'dbms-core',
    name: 'DBMS & Relational Architecture',
    category: 'Core CS & Development',
    description: 'ACID properties, Normalization (1NF-BCNF), Indexing (B-Trees), and Transactions.',
    importanceLevel: 'Critical',
    relatedRoles: ['software-developer', 'data-analyst', 'data-scientist', 'business-analyst', 'product-engineer'],
    linkedGuideSlug: 'dbms',
    tags: ['ACID', 'Indexing', 'Transactions', 'Normalization']
  },
  {
    id: 'os-concurrency',
    name: 'Operating Systems & Concurrency',
    category: 'Core CS & Development',
    description: 'Processes vs Threads, CPU Scheduling, Deadlocks, Virtual Memory, and Paging.',
    importanceLevel: 'High',
    relatedRoles: ['software-developer', 'devops-engineer', 'cloud-engineer', 'cybersecurity-analyst'],
    linkedGuideSlug: 'operating-systems',
    tags: ['Deadlocks', 'Paging', 'Multithreading']
  },
  {
    id: 'computer-networks',
    name: 'Computer Networks (CN)',
    category: 'Core CS & Development',
    description: 'OSI 7-layer model, TCP/IP, UDP, HTTP/HTTPS, DNS, Subnetting, and Routing.',
    importanceLevel: 'High',
    relatedRoles: ['cloud-engineer', 'devops-engineer', 'cybersecurity-analyst', 'software-developer'],
    linkedGuideSlug: 'computer-networks',
    tags: ['TCP/IP', 'DNS', 'HTTP/S', 'Subnetting']
  },
  {
    id: 'system-design',
    name: 'System Design (LLD & HLD)',
    category: 'Core CS & Development',
    description: 'Microservices, Caching (Redis), Load Balancing, Sharding, Message Queues (Kafka).',
    importanceLevel: 'High',
    relatedRoles: ['software-developer', 'product-engineer', 'devops-engineer', 'cloud-engineer'],
    linkedGuideSlug: 'system-design',
    tags: ['Microservices', 'Redis', 'Kafka', 'Scalability']
  },
  {
    id: 'web-development',
    name: 'Full Stack / Web Development',
    category: 'Core CS & Development',
    description: 'Building responsive apps with Next.js, React, Node.js, REST APIs, and modern CSS.',
    importanceLevel: 'High',
    relatedRoles: ['product-engineer', 'software-developer'],
    tags: ['React', 'Next.js', 'REST APIs', 'Node.js']
  },

  // 4. Aptitude & Analytical
  {
    id: 'quantitative-aptitude',
    name: 'Quantitative Aptitude',
    category: 'Aptitude & Analytical',
    description: 'Percentages, Profit & Loss, Time & Work, Speed Distance Time, and Number Systems.',
    importanceLevel: 'Critical',
    relatedRoles: ['consulting', 'business-analyst', 'tech-sales', 'operations-management', 'data-analyst', 'human-resources'],
    linkedGuideSlug: 'aptitude-reasoning',
    tags: ['Speed Math', 'Percentages', 'Ratios']
  },
  {
    id: 'logical-reasoning',
    name: 'Logical Reasoning & Puzzles',
    category: 'Aptitude & Analytical',
    description: 'Syllogisms, Blood Relations, Seating Arrangements, Coding-Decoding, and Logic Grids.',
    importanceLevel: 'Critical',
    relatedRoles: ['consulting', 'business-analyst', 'software-developer', 'operations-management'],
    linkedGuideSlug: 'aptitude-reasoning',
    tags: ['Syllogisms', 'Deductive Logic', 'Arrangements']
  },
  {
    id: 'verbal-ability',
    name: 'Verbal Ability & Reading Comprehension',
    category: 'Aptitude & Analytical',
    description: 'Grammar, vocabulary, critical reasoning, error spotting, and passage comprehension.',
    importanceLevel: 'High',
    relatedRoles: ['consulting', 'human-resources', 'marketing-growth', 'tech-sales', 'business-analyst'],
    linkedGuideSlug: 'aptitude-reasoning',
    tags: ['Comprehension', 'Grammar', 'Critical Reading']
  },
  {
    id: 'data-interpretation',
    name: 'Data Interpretation (DI)',
    category: 'Aptitude & Analytical',
    description: 'Interpreting complex charts, tables, histograms, bar graphs, and pie charts under time pressure.',
    importanceLevel: 'Critical',
    relatedRoles: ['data-analyst', 'consulting', 'business-analyst', 'operations-management', 'marketing-growth'],
    linkedGuideSlug: 'aptitude-reasoning',
    tags: ['Charts', 'Tables', 'Trends', 'Ratios']
  },
  {
    id: 'guesstimates-structuring',
    name: 'Guesstimates & Case Structuring',
    category: 'Aptitude & Analytical',
    description: 'MECE breakdown, population estimation, market sizing, and structured hypothesis trees.',
    importanceLevel: 'High',
    relatedRoles: ['consulting', 'product-management'],
    tags: ['MECE', 'Market Sizing', 'Hypothesis Testing']
  },

  // 5. Domain & Cloud
  {
    id: 'cloud-computing',
    name: 'Cloud Infrastructure (AWS / Azure / GCP)',
    category: 'Domain & Cloud',
    description: 'EC2, S3, IAM, VPC, Lambda, and CloudWatch setup and management.',
    importanceLevel: 'High',
    relatedRoles: ['cloud-engineer', 'devops-engineer', 'software-developer'],
    tags: ['AWS', 'VPC', 'Serverless', 'IAM']
  },
  {
    id: 'docker-kubernetes',
    name: 'Docker, Containers & Kubernetes',
    category: 'Domain & Cloud',
    description: 'Containerization, multi-stage builds, pods, deployments, and cluster management.',
    importanceLevel: 'High',
    relatedRoles: ['devops-engineer', 'cloud-engineer', 'ai-ml-engineer'],
    tags: ['Docker', 'K8s', 'Containers', 'Helm']
  },
  {
    id: 'ci-cd-automation',
    name: 'CI/CD & DevOps Automation',
    category: 'Domain & Cloud',
    description: 'Automated testing and continuous delivery pipelines with GitHub Actions and Jenkins.',
    importanceLevel: 'High',
    relatedRoles: ['devops-engineer', 'cloud-engineer', 'software-developer'],
    tags: ['GitHub Actions', 'Jenkins', 'Pipelines']
  },
  {
    id: 'cybersecurity-vapt',
    name: 'Cybersecurity & OWASP Defense',
    category: 'Domain & Cloud',
    description: 'Vulnerability assessment, Wireshark packet analysis, cryptography, and web app firewalls.',
    importanceLevel: 'High',
    relatedRoles: ['cybersecurity-analyst'],
    tags: ['OWASP', 'Penetration Testing', 'Wireshark', 'Cryptography']
  },
  {
    id: 'machine-learning-core',
    name: 'Machine Learning & Scikit-Learn',
    category: 'Domain & Cloud',
    description: 'Supervised/Unsupervised models, regression, decision trees, random forests, and metrics.',
    importanceLevel: 'High',
    relatedRoles: ['data-scientist', 'ai-ml-engineer'],
    tags: ['Regression', 'Classification', 'Feature Engineering']
  },
  {
    id: 'deep-learning-llms',
    name: 'Deep Learning, PyTorch & LLMs (RAG)',
    category: 'Domain & Cloud',
    description: 'Neural networks, Transformers, vector databases, LangChain, and RAG architectures.',
    importanceLevel: 'High',
    relatedRoles: ['ai-ml-engineer', 'data-scientist'],
    tags: ['Transformers', 'RAG', 'Vector DB', 'PyTorch']
  },
  {
    id: 'bi-powerbi-tableau',
    name: 'Business Intelligence (Power BI / Tableau)',
    category: 'Domain & Cloud',
    description: 'Interactive dashboard creation, DAX queries, metric cards, and executive reports.',
    importanceLevel: 'High',
    relatedRoles: ['data-analyst', 'business-analyst', 'operations-management'],
    tags: ['Dashboards', 'Power BI', 'Tableau', 'DAX']
  },
  {
    id: 'performance-marketing',
    name: 'Performance Marketing & SEO',
    category: 'Domain & Cloud',
    description: 'Meta Ads, Google Search Ads, keyword strategy, and web analytics (GA4).',
    importanceLevel: 'High',
    relatedRoles: ['marketing-growth'],
    tags: ['Google Ads', 'Meta Ads', 'SEO', 'GA4']
  },
  {
    id: 'supply-chain-ops',
    name: 'Supply Chain & Operations Modeling',
    category: 'Domain & Cloud',
    description: 'Inventory turn, safety stock, warehousing flows, and logistics optimization.',
    importanceLevel: 'High',
    relatedRoles: ['operations-management'],
    tags: ['Inventory', 'Logistics', 'Fulfillment', 'JIT']
  },
  {
    id: 'product-sense-wireframing',
    name: 'Product Sense, PRDs & Figma',
    category: 'Domain & Cloud',
    description: 'User personas, empathy mapping, PRD writing, and interactive wireframing.',
    importanceLevel: 'High',
    relatedRoles: ['product-management', 'product-engineer'],
    tags: ['PRDs', 'Figma', 'User Journeys', 'AARRR']
  },

  // 6. Soft Skills & Communication
  {
    id: 'soft-communication',
    name: 'Executive Communication & Pitching',
    category: 'Soft Skills & Communication',
    description: 'Clear, concise verbal articulation, active listening, and persuasive presentation skills.',
    importanceLevel: 'Critical',
    relatedRoles: ['consulting', 'product-management', 'tech-sales', 'human-resources', 'business-analyst'],
    linkedGuideSlug: 'behavioral-hr',
    tags: ['Pitching', 'Public Speaking', 'Clarity']
  },
  {
    id: 'soft-problem-solving',
    name: 'Structured Problem Solving & STAR Method',
    category: 'Soft Skills & Communication',
    description: 'Breaking open-ended challenges down and narrating situational impact using Situation-Task-Action-Result.',
    importanceLevel: 'Critical',
    relatedRoles: ['software-developer', 'consulting', 'product-management', 'business-analyst', 'human-resources'],
    linkedGuideSlug: 'behavioral-hr',
    tags: ['STAR', 'Behavioral', 'Root Cause']
  },
  {
    id: 'soft-teamwork',
    name: 'Cross-Functional Collaboration & Teamwork',
    category: 'Soft Skills & Communication',
    description: 'Aligning with peers across engineering, business, and design without conflict.',
    importanceLevel: 'Critical',
    relatedRoles: ['product-management', 'software-developer', 'consulting', 'human-resources'],
    linkedGuideSlug: 'behavioral-hr',
    tags: ['Empathy', 'Collaboration', 'Diplomacy']
  },
  {
    id: 'soft-negotiation',
    name: 'Negotiation & Objection Handling',
    category: 'Soft Skills & Communication',
    description: 'Handling pushback, client reluctance, salary offers, and commercial contracts.',
    importanceLevel: 'High',
    relatedRoles: ['tech-sales', 'consulting', 'human-resources'],
    tags: ['B2B', 'Contracts', 'Persuasion']
  }
];

export interface RoleReadinessScore {
  roleSlug: string;
  roleTitle: string;
  category: 'Technical' | 'Non-Technical';
  salaryRange: string;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendedNextSkill: string | null;
}

export function calculateRoleReadiness(
  selectedSkillIds: string[],
  allRoles: { slug: string; title: string; category: 'Technical' | 'Non-Technical'; salaryRange: string }[]
): RoleReadinessScore[] {
  const selectedSet = new Set(selectedSkillIds);

  return allRoles.map((role) => {
    // Find all skills associated with this role in SKILLS_DATABASE
    const roleSkills = SKILLS_DATABASE.filter((skill) =>
      skill.relatedRoles.includes(role.slug)
    );

    if (roleSkills.length === 0) {
      return {
        roleSlug: role.slug,
        roleTitle: role.title,
        category: role.category,
        salaryRange: role.salaryRange,
        matchPercentage: 0,
        matchedSkills: [],
        missingSkills: [],
        recommendedNextSkill: null
      };
    }

    // Weight critical skills 2x, high 1.5x, moderate 1x
    let totalWeight = 0;
    let achievedWeight = 0;
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    roleSkills.forEach((skill) => {
      const weight = skill.importanceLevel === 'Critical' ? 2 : skill.importanceLevel === 'High' ? 1.5 : 1;
      totalWeight += weight;

      if (selectedSet.has(skill.id)) {
        achievedWeight += weight;
        matchedSkills.push(skill.name);
      } else {
        missingSkills.push(skill.name);
      }
    });

    const matchPercentage = Math.min(100, Math.round((achievedWeight / totalWeight) * 100));

    // Recommend the highest importance missing skill
    const criticalMissing = roleSkills.find(
      (s) => !selectedSet.has(s.id) && s.importanceLevel === 'Critical'
    );
    const recommendedNextSkill = criticalMissing ? criticalMissing.name : (missingSkills[0] || null);

    return {
      roleSlug: role.slug,
      roleTitle: role.title,
      category: role.category,
      salaryRange: role.salaryRange,
      matchPercentage,
      matchedSkills,
      missingSkills,
      recommendedNextSkill
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}
