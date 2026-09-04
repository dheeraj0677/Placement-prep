export interface SkillRequirement {
  name: string;
  level: 'Essential' | 'Important' | 'Bonus';
  category: 'Programming' | 'DSA' | 'Development' | 'Aptitude' | 'Domain' | 'Soft Skills' | 'Tools';
}

export interface RadarMetric {
  subject: string;
  score: number;
  fullMark: number;
}

export interface CareerLadderStep {
  stage: string;
  years: string;
  title: string;
  description: string;
}

export interface InterviewRoundOverview {
  roundName: string;
  roundType: 'OA' | 'Technical' | 'Case Study' | 'Managerial' | 'HR';
  focus: string;
  duration: string;
}

export interface HiringCompanyRef {
  name: string;
  companyId?: string; // Links to /companies/[id] if available in MOCK_COMPANIES
  hiringType: string;
  typicalPackage: string;
}

export interface CareerRole {
  slug: string;
  title: string;
  category: 'Technical' | 'Non-Technical';
  tagline: string;
  badge?: string;
  iconName: string;
  difficultyLevel: 'Beginner' | 'Moderate' | 'High' | 'Very High';
  salaryRange: string;
  averageCTC: string;
  overview: string;
  dayInTheLife: string;
  responsibilities: string[];
  eligibility: {
    degrees: string[];
    minCGPA: string;
    branchEligibility: string;
    keyPrerequisites: string[];
  };
  coreSkills: SkillRequirement[];
  softSkills: string[];
  radarSkills: RadarMetric[];
  hiringCompanies: HiringCompanyRef[];
  interviewRounds: InterviewRoundOverview[];
  careerLadder: CareerLadderStep[];
  recommendedGuideSlugs: string[];
  prepRoadmap: {
    phase: string;
    timeline: string;
    focus: string;
    actionItems: string[];
  }[];
}

export const CAREER_ROLES: CareerRole[] = [
  // ==========================================
  // TECHNICAL ROLES
  // ==========================================
  {
    slug: 'software-developer',
    title: 'Software Development Engineer (SDE)',
    category: 'Technical',
    tagline: 'Design, write, test, and ship scalable software systems and enterprise applications.',
    badge: 'Highest Hiring Volume',
    iconName: 'Code',
    difficultyLevel: 'High',
    salaryRange: '₹6 - 45+ LPA',
    averageCTC: '₹14 LPA',
    overview: 'Software Engineers build the digital backbone of consumer and enterprise products. In campus placements, SDEs are tested intensively on Data Structures & Algorithms, Clean Coding, Object-Oriented Design, and System Architecture.',
    dayInTheLife: 'You will design microservices, review PRs from teammates, optimize database queries, debug production incidents, and write clean, maintainable unit & integration tests.',
    responsibilities: [
      'Architect and develop high-throughput backend APIs or responsive user interfaces.',
      'Solve complex algorithmic problems with optimal time and space complexities.',
      'Design modular schemas and interface with SQL/NoSQL databases.',
      'Write robust unit tests, automated CI/CD pipelines, and monitor distributed systems.',
      'Collaborate across product managers, QA testers, and DevOps engineers to ship features.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E', 'M.Tech / M.E', 'MCA', 'Dual Degree B.Tech+M.Tech'],
      minCGPA: '6.5 - 7.5+ (Varies by company; 8.0+ recommended for Top Tier)',
      branchEligibility: 'CSE, IT, ECE, EEE (All engineering branches welcome in 70%+ companies)',
      keyPrerequisites: ['Proficiency in at least one OOP language (Java, C++, or Python)', 'Strong foundational grasp of DSA']
    },
    coreSkills: [
      { name: 'Data Structures & Algorithms', level: 'Essential', category: 'DSA' },
      { name: 'C++ / Java / Python', level: 'Essential', category: 'Programming' },
      { name: 'Object-Oriented Programming (OOP)', level: 'Essential', category: 'Domain' },
      { name: 'Database Management (SQL & DBMS)', level: 'Essential', category: 'Domain' },
      { name: 'Operating Systems & Concurrency', level: 'Important', category: 'Domain' },
      { name: 'System Design (LLD & HLD)', level: 'Important', category: 'Domain' },
      { name: 'Git & Version Control', level: 'Important', category: 'Tools' },
      { name: 'Web / App Frameworks (React, Node, Spring)', level: 'Bonus', category: 'Development' }
    ],
    softSkills: ['Problem Solving', 'Structured Communication', 'Code Explainability', 'Collaborative Teamwork'],
    radarSkills: [
      { subject: 'DSA & Algorithms', score: 95, fullMark: 100 },
      { subject: 'CS Fundamentals (OS/DBMS)', score: 85, fullMark: 100 },
      { subject: 'Development / Projects', score: 75, fullMark: 100 },
      { subject: 'System Design', score: 70, fullMark: 100 },
      { subject: 'Analytical Aptitude', score: 80, fullMark: 100 },
      { subject: 'Soft Skills & HR', score: 65, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Google', companyId: 'comp-google', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹30 - 45+ LPA' },
      { name: 'Amazon', companyId: 'comp-amazon', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹28 - 44 LPA' },
      { name: 'Microsoft', companyId: 'comp-microsoft', hiringType: 'On-Campus', typicalPackage: '₹25 - 42 LPA' },
      { name: 'Flipkart', companyId: 'comp-flipkart', hiringType: 'On-Campus', typicalPackage: '₹22 - 32 LPA' },
      { name: 'TCS', companyId: 'comp-tcs', hiringType: 'Mass & Prime Hiring', typicalPackage: '₹3.6 - 9 LPA' },
      { name: 'Infosys', companyId: 'comp-infosys', hiringType: 'Mass & Specialist Programmer', typicalPackage: '₹3.6 - 9.5 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Online Assessment (OA)', roundType: 'OA', focus: '2-3 DSA problems + CS MCQs (Time: 60-90 mins)', duration: '90 mins' },
      { roundName: 'Round 2: Technical Interview 1', roundType: 'Technical', focus: 'Data structures (Trees, Graphs, DP) + Live Code execution', duration: '60 mins' },
      { roundName: 'Round 3: Technical Interview 2', roundType: 'Technical', focus: 'CS Fundamentals (DBMS, OS, OOP) + Project Deep-Dive', duration: '60 mins' },
      { roundName: 'Round 4: Managerial / HR Round', roundType: 'HR', focus: 'Cultural fit, behavioral questions, scenario handling', duration: '30-45 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Associate Software Engineer / SDE-1', description: 'Implements targeted modules, fixes bugs, writes tests, gains system familiarity.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Software Engineer II / SDE-2', description: 'Owns end-to-end features, designs services, mentors junior engineers, conducts reviews.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Senior SDE / Tech Lead', description: 'Drives architecture for entire products, cross-functional scoping, sets engineering standards.' },
      { stage: 'Staff/Exec', years: '8+ yrs', title: 'Staff Engineer / Engineering Manager', description: 'Technical visionary across orgs or managing team delivery & career growth.' }
    ],
    recommendedGuideSlugs: ['dynamic-programming', 'graphs', 'trees', 'arrays-strings', 'system-design', 'dbms', 'operating-systems'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1-2', focus: 'Language Mastery & Basic DSA', actionItems: ['Master C++ STL or Java Collections', 'Complete 50 basic problems in Arrays, Strings, Sorting & Searching', 'Review OOP pillars with practical code examples'] },
      { phase: 'Phase 2', timeline: 'Month 3-4', focus: 'Core DSA & Algorithms', actionItems: ['Master Binary Trees, BSTs, Heaps & Recursion', 'Practice Graphs (BFS, DFS, Dijkstra, Topo Sort) and DP patterns', 'Solve 100+ LeetCode Mediums under timed conditions'] },
      { phase: 'Phase 3', timeline: 'Month 5', focus: 'CS Fundamentals & Projects', actionItems: ['Revise DBMS (ACID, Normalization, SQL Joins, Indexing)', 'Revise OS (Processes vs Threads, Deadlocks, Paging)', 'Polish 2 production-grade web/mobile projects with live demo links'] },
      { phase: 'Phase 4', timeline: 'Month 6', focus: 'Mock Interviews & OA Drills', actionItems: ['Simulate timed company-specific assessments', 'Practice explaining your thought process out loud', 'Prepare STAR method stories for behavioral rounds'] }
    ]
  },
  {
    slug: 'data-analyst',
    title: 'Data Analyst',
    category: 'Technical',
    tagline: 'Transform raw, messy data into actionable business intelligence and dashboards.',
    badge: 'High Industry Demand',
    iconName: 'BarChart3',
    difficultyLevel: 'Moderate',
    salaryRange: '₹5 - 18 LPA',
    averageCTC: '₹8.5 LPA',
    overview: 'Data Analysts bridge the gap between technical datasets and executive decision-making. You will extract insights using advanced SQL queries, clean data with Python/R, and build interactive dashboards in PowerBI/Tableau.',
    dayInTheLife: 'Writing complex SQL queries to pull metrics, investigating anomalies in business KPIs, updating executive dashboards, and presenting findings to sales, product, and leadership teams.',
    responsibilities: [
      'Formulate complex SQL queries using Window functions, Common Table Expressions (CTEs), and Joins.',
      'Build and maintain executive-facing dashboards in Tableau, Power BI, or Looker.',
      'Perform exploratory data analysis (EDA) using Python (Pandas, NumPy, Matplotlib) or Excel.',
      'Detect trends, retention drops, customer cohorts, and financial performance signals.',
      'Translate technical statistical findings into clear executive summaries and business recommendations.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches)', 'BCA / MCA', 'B.Sc / M.Sc Statistics/Maths/CS', 'BBA / B.Com (with analytics focus)'],
      minCGPA: '6.0 - 7.0+',
      branchEligibility: 'Completely Open across All Engineering & Science Branches',
      keyPrerequisites: ['Relational database knowledge & SQL proficiency', 'Analytical mindset and quantitative aptitude']
    },
    coreSkills: [
      { name: 'Advanced SQL (Window Functions, Joins, Aggregates)', level: 'Essential', category: 'Domain' },
      { name: 'Python for Data Analysis (Pandas, NumPy)', level: 'Essential', category: 'Programming' },
      { name: 'BI Tools (Power BI / Tableau)', level: 'Essential', category: 'Tools' },
      { name: 'Advanced Excel & Spreadsheets', level: 'Essential', category: 'Tools' },
      { name: 'Descriptive & Inferential Statistics', level: 'Important', category: 'Domain' },
      { name: 'Data Visualization & Storytelling', level: 'Important', category: 'Soft Skills' },
      { name: 'Business Acumen & KPI Tracking', level: 'Important', category: 'Domain' },
      { name: 'Machine Learning Basics', level: 'Bonus', category: 'Domain' }
    ],
    softSkills: ['Data Storytelling', 'Critical Thinking', 'Business Curiosity', 'Stakeholder Communication'],
    radarSkills: [
      { subject: 'SQL & Data Wrangling', score: 95, fullMark: 100 },
      { subject: 'BI Tools & Excel', score: 90, fullMark: 100 },
      { subject: 'Statistics & Math', score: 80, fullMark: 100 },
      { subject: 'Python Scripting', score: 75, fullMark: 100 },
      { subject: 'Business Sense', score: 85, fullMark: 100 },
      { subject: 'DSA & Algorithms', score: 35, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Walmart Global Tech', companyId: 'comp-walmart', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹12 - 20 LPA' },
      { name: 'Goldman Sachs', companyId: 'comp-goldman-sachs', hiringType: 'On-Campus', typicalPackage: '₹14 - 24 LPA' },
      { name: 'Accenture', companyId: 'comp-accenture', hiringType: 'On-Campus', typicalPackage: '₹5 - 9 LPA' },
      { name: 'Swiggy', companyId: 'comp-swiggy', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹10 - 16 LPA' },
      { name: 'Cognizant', companyId: 'comp-cognizant', hiringType: 'On-Campus', typicalPackage: '₹4.5 - 7 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Aptitude & SQL Assessment', roundType: 'OA', focus: 'Quantitative aptitude, logical reasoning + hands-on SQL query tests', duration: '60-75 mins' },
      { roundName: 'Round 2: Technical SQL & Case Drill', roundType: 'Technical', focus: 'Live SQL writing, database schemas, data cleaning scenario in Python', duration: '45-60 mins' },
      { roundName: 'Round 3: Business Analytics Case Study', roundType: 'Case Study', focus: 'Metrics definition (e.g. churn, CAC, LTV), dashboard interpretation', duration: '45 mins' },
      { roundName: 'Round 4: Fitment & HR Round', roundType: 'HR', focus: 'Communication clarity, past analytics projects, teamwork', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Junior Data Analyst / Business Analyst', description: 'Handles report generation, ad-hoc queries, maintains ETL pipelines, builds dashboards.' },
      { stage: 'Mid', years: '2 - 4 yrs', title: 'Senior Data Analyst', description: 'Owns key business domain metrics, conducts deep-dive root-cause analytics, advises VPs.' },
      { stage: 'Lead', years: '4 - 7 yrs', title: 'Lead Analyst / Analytics Manager', description: 'Leads analytics squad, defines company-wide data reporting standards.' },
      { stage: 'Executive', years: '7+ yrs', title: 'Director of Business Intelligence / CDO', description: 'Sets enterprise data strategy, governance, and AI/BI infrastructure.' }
    ],
    recommendedGuideSlugs: ['dbms', 'aptitude-reasoning', 'behavioral-hr'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'SQL Foundations to Advanced', actionItems: ['Master GROUP BY, HAVING, subqueries, and window functions (RANK, DENSE_RANK, LEAD, LAG)', 'Solve 50+ LeetCode Database SQL problems (Easy to Hard)', 'Practice on real datasets from Kaggle'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'Python Data Stack & Visualization', actionItems: ['Learn Pandas dataframe manipulation and NumPy array operations', 'Create clean charts with Seaborn and Matplotlib', 'Learn Tableau or PowerBI and build 2 public dashboard portfolios'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Business Case Studies & Metrics', actionItems: ['Learn SaaS and E-commerce metrics: Churn, Retention, CAC, LTV, GMV', 'Practice solving business case study breakdowns (e.g. Swiggy delivery drop-off analysis)', 'Prepare 2 resume projects with measurable business impact'] }
    ]
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    category: 'Technical',
    tagline: 'Leverage predictive modeling, statistics, and machine learning to unlock deep insights.',
    badge: 'Prestigious & High Impact',
    iconName: 'Database',
    difficultyLevel: 'Very High',
    salaryRange: '₹9 - 35+ LPA',
    averageCTC: '₹16 LPA',
    overview: 'Data Scientists combine scientific rigor, statistical theory, and machine learning algorithms to build predictive models, recommendation engines, fraud detection mechanisms, and causal inference experiments.',
    dayInTheLife: 'Formulating hypotheses, cleaning training datasets, feature engineering, training ML models, running A/B tests, tuning hyperparameters, and deploying inference pipelines.',
    responsibilities: [
      'Formulate business problems into machine learning and predictive modeling problems.',
      'Design, train, validate, and benchmark supervised and unsupervised ML models.',
      'Conduct rigorous statistical hypothesis testing, A/B experimentation, and power analysis.',
      'Perform advanced feature engineering and dimensionality reduction (PCA, t-SNE).',
      'Collaborate with MLOps engineers to deploy scalable model inference endpoints.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (CSE, IT, ECE, Data Science, AI/ML)', 'M.Tech / M.S / Ph.D', 'M.Sc Statistics/Mathematics'],
      minCGPA: '7.0 - 8.0+ preferred',
      branchEligibility: 'Quantitative backgrounds favored (CS, Math, Stats, Electrical)',
      keyPrerequisites: ['Strong linear algebra, calculus, and probability foundations', 'Proficiency in Python and Scikit-Learn']
    },
    coreSkills: [
      { name: 'Probability & Applied Statistics', level: 'Essential', category: 'Domain' },
      { name: 'Python (NumPy, Pandas, Scikit-Learn)', level: 'Essential', category: 'Programming' },
      { name: 'Machine Learning Algorithms (Trees, SVM, Clustering)', level: 'Essential', category: 'Domain' },
      { name: 'Deep Learning Basics (PyTorch / TensorFlow)', level: 'Important', category: 'Domain' },
      { name: 'SQL & Big Data (Spark, Hive)', level: 'Important', category: 'Tools' },
      { name: 'A/B Testing & Causal Inference', level: 'Important', category: 'Domain' },
      { name: 'Data Structures & Algorithms', level: 'Important', category: 'DSA' }
    ],
    softSkills: ['Scientific Rigor', 'Hypothesis-Driven Thinking', 'Communication of Complex Math', 'Intellectual Curiosity'],
    radarSkills: [
      { subject: 'Statistics & Math', score: 95, fullMark: 100 },
      { subject: 'Machine Learning', score: 90, fullMark: 100 },
      { subject: 'Python & Data Stack', score: 85, fullMark: 100 },
      { subject: 'SQL & Data Pipeline', score: 80, fullMark: 100 },
      { subject: 'DSA & Algorithms', score: 65, fullMark: 100 },
      { subject: 'Business & Soft Skills', score: 70, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Amazon', companyId: 'comp-amazon', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹22 - 38 LPA' },
      { name: 'Microsoft', companyId: 'comp-microsoft', hiringType: 'On-Campus', typicalPackage: '₹24 - 40 LPA' },
      { name: 'Goldman Sachs', companyId: 'comp-goldman-sachs', hiringType: 'On-Campus', typicalPackage: '₹18 - 30 LPA' },
      { name: 'Uber', companyId: 'comp-uber', hiringType: 'Off-Campus & On-Campus', typicalPackage: '₹28 - 45 LPA' },
      { name: 'Flipkart', companyId: 'comp-flipkart', hiringType: 'On-Campus', typicalPackage: '₹18 - 30 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Coding & Math Assessment', roundType: 'OA', focus: 'Python coding, probability/statistics questions, ML concepts', duration: '90 mins' },
      { roundName: 'Round 2: Machine Learning Technical', roundType: 'Technical', focus: 'Under-the-hood derivation of algorithms (Loss functions, Gradient Descent, Overfitting mitigation)', duration: '60 mins' },
      { roundName: 'Round 3: Applied Case & Research Project', roundType: 'Case Study', focus: 'Walkthrough of resume ML projects, metrics choice, trade-offs (Precision vs Recall)', duration: '60 mins' },
      { roundName: 'Round 4: Fitment / Behavioral', roundType: 'HR', focus: 'Collaboration with software teams, business impact evaluation', duration: '30-45 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Associate Data Scientist', description: 'Implements baseline models, performs data cleaning, runs offline experiments.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Data Scientist II', description: 'Designs custom algorithms, owns A/B tests on key product features, mentors juniors.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Senior Data Scientist', description: 'Architects enterprise predictive engines, influences product strategy with data.' },
      { stage: 'Principal', years: '8+ yrs', title: 'Principal Data Scientist / Head of AI', description: 'Sets corporate ML vision, drives patent/research strategy, establishes ethical AI guidelines.' }
    ],
    recommendedGuideSlugs: ['dbms', 'arrays-strings', 'aptitude-reasoning', 'system-design'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1-2', focus: 'Mathematics & Statistical Core', actionItems: ['Review Probability distributions, Bayes Theorem, Central Limit Theorem, Hypothesis Testing', 'Linear algebra: Matrix operations, eigenvalues, singular value decomposition', 'Implement Linear & Logistic Regression from scratch in pure NumPy'] },
      { phase: 'Phase 2', timeline: 'Month 3-4', focus: 'Classical ML Algorithms & Kaggle', actionItems: ['Master Decision Trees, Random Forests, XGBoost, and LightGBM', 'Understand Bias-Variance tradeoff, Cross-validation, and Regularization (L1/L2)', 'Complete 2 Kaggle competitions and write detailed EDA and modeling notebooks'] },
      { phase: 'Phase 3', timeline: 'Month 5-6', focus: 'Deep Learning & Production Systems', actionItems: ['Learn PyTorch basics and simple Neural Networks', 'Understand ML deployment concepts (Docker, FastAPI, Model registries)', 'Practice explaining model performance to non-technical stakeholders'] }
    ]
  },
  {
    slug: 'ai-ml-engineer',
    title: 'AI / Machine Learning Engineer',
    category: 'Technical',
    tagline: 'Build, optimize, and deploy LLMs, neural networks, and scalable AI infrastructure.',
    badge: 'Hyper-Growth Frontier',
    iconName: 'Cpu',
    difficultyLevel: 'Very High',
    salaryRange: '₹10 - 50+ LPA',
    averageCTC: '₹18 LPA',
    overview: 'AI/ML Engineers sit at the intersection of Software Engineering and Artificial Intelligence. Rather than just researching models, they write high-performance C++/Python code to scale model training, build LLM pipelines (RAG), and deploy low-latency inference services.',
    dayInTheLife: 'Fine-tuning open-source LLMs, building Retrieval-Augmented Generation (RAG) vector pipelines, optimizing GPU memory consumption, and building containerized inference microservices.',
    responsibilities: [
      'Implement and fine-tune modern Transformer models, LLMs, and computer vision architectures.',
      'Build end-to-end RAG systems using Vector Databases (Pinecone, Milvus, Chroma).',
      'Optimize model inference latency using TensorRT, ONNX, and quantization (AWQ, GGUF).',
      'Deploy production ML pipelines with Docker, Kubernetes, and Ray.',
      'Maintain continuous data validation and model monitoring for drift and hallucinations.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (CSE, IT, ECE, AI/ML)', 'M.Tech / M.S in AI or CS'],
      minCGPA: '7.0+ recommended',
      branchEligibility: 'CSE, IT, AI/Data Science, Electronics',
      keyPrerequisites: ['Proficiency in Python and strong C++ or systems intuition', 'Solid understanding of Deep Learning foundations']
    },
    coreSkills: [
      { name: 'Deep Learning & Neural Networks (PyTorch)', level: 'Essential', category: 'Domain' },
      { name: 'Transformers, LLMs & Prompt/RAG Pipelines', level: 'Essential', category: 'Domain' },
      { name: 'Python & High-Performance Computing', level: 'Essential', category: 'Programming' },
      { name: 'Vector Databases & Embeddings', level: 'Important', category: 'Tools' },
      { name: 'Docker, Kubernetes & MLOps', level: 'Important', category: 'Tools' },
      { name: 'Model Optimization (Quantization, ONNX)', level: 'Important', category: 'Domain' },
      { name: 'Data Structures & Algorithms', level: 'Essential', category: 'DSA' }
    ],
    softSkills: ['Rapid Tech Adaptability', 'Problem Decomposition', 'Research Paper Comprehension', 'Systems Thinking'],
    radarSkills: [
      { subject: 'Deep Learning & LLMs', score: 95, fullMark: 100 },
      { subject: 'Software Engineering & Docker', score: 85, fullMark: 100 },
      { subject: 'Python Performance', score: 90, fullMark: 100 },
      { subject: 'DSA & Coding', score: 80, fullMark: 100 },
      { subject: 'Math & Linear Algebra', score: 85, fullMark: 100 },
      { subject: 'System Design', score: 75, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Google', companyId: 'comp-google', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹35 - 55 LPA' },
      { name: 'Microsoft', companyId: 'comp-microsoft', hiringType: 'On-Campus', typicalPackage: '₹28 - 48 LPA' },
      { name: 'Adobe', companyId: 'comp-adobe', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹25 - 42 LPA' },
      { name: 'Samsung R&D', companyId: 'comp-samsung', hiringType: 'On-Campus', typicalPackage: '₹16 - 28 LPA' },
      { name: 'Zomato', companyId: 'comp-zomato', hiringType: 'Off-Campus & On-Campus', typicalPackage: '₹18 - 32 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: DSA & ML Assessment', roundType: 'OA', focus: '2 LeetCode Medium DSA problems + PyTorch / ML questions', duration: '90 mins' },
      { roundName: 'Round 2: Deep Learning Architecture', roundType: 'Technical', focus: 'Attention mechanisms, backpropagation derivations, Transformer mechanics', duration: '60 mins' },
      { roundName: 'Round 3: Applied System & LLM Project', roundType: 'Technical', focus: 'Designing a real-time recommendation or RAG pipeline with scale constraints', duration: '60 mins' },
      { roundName: 'Round 4: Culture & Engineering Fit', roundType: 'HR', focus: 'Handling rapid AI changes, ethics, engineering trade-offs', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Associate ML Engineer', description: 'Builds data pipelines, trains baseline models, writes API wrappers for inference.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Machine Learning Engineer II', description: 'Deploys distributed training, tunes LLMs, builds custom RAG architectures.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Senior ML Engineer / AI Architect', description: 'Designs end-to-end AI platform, guides hardware acceleration (GPUs, TPUs).' },
      { stage: 'Lead', years: '8+ yrs', title: 'Head of AI Engineering', description: 'Directs organization-wide generative AI adoption and core intellectual property.' }
    ],
    recommendedGuideSlugs: ['dynamic-programming', 'graphs', 'system-design', 'arrays-strings', 'operating-systems'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1-2', focus: 'Deep Learning Fundamentals', actionItems: ['Understand Feedforward, CNNs, and RNNs', 'Master PyTorch tensors, autograd, and training loops', 'Code a small Transformer from scratch to understand Attention'] },
      { phase: 'Phase 2', timeline: 'Month 3-4', focus: 'Generative AI & LLM Engineering', actionItems: ['Learn LangChain / LlamaIndex and Vector DBs (Chroma, Pinecone)', 'Build a full RAG app with document indexing and hallucination guardrails', 'Understand HuggingFace Transformers, LoRA, and QLoRA fine-tuning'] },
      { phase: 'Phase 3', timeline: 'Month 5', focus: 'Deployment & MLOps', actionItems: ['Containerize your model with Docker and serve with FastAPI or vLLM', 'Learn basic Kubernetes and model benchmarking tools', 'Brush up DSA (Graph & DP) required for Top Tier screening'] }
    ]
  },
  {
    slug: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Technical',
    tagline: 'Architect, secure, and scale elastic infrastructure on AWS, Azure, and Google Cloud.',
    badge: 'Critical Enterprise Need',
    iconName: 'Cloud',
    difficultyLevel: 'Moderate',
    salaryRange: '₹5.5 - 24 LPA',
    averageCTC: '₹10 LPA',
    overview: 'Cloud Engineers configure and maintain cloud computing environments for modern web and mobile apps. They manage virtual networks, storage buckets, serverless compute, and security groups to guarantee 99.99% uptime.',
    dayInTheLife: 'Writing Infrastructure-as-Code (Terraform), provisioning VPCs and IAM roles on AWS/Azure, monitoring cloud spend, and troubleshooting network connectivity.',
    responsibilities: [
      'Provision, configure, and maintain cloud infrastructure across AWS, Azure, or GCP.',
      'Write Infrastructure as Code (IaC) templates using Terraform or AWS CloudFormation.',
      'Implement security policies, IAM access controls, encryption, and compliance checks.',
      'Configure auto-scaling groups, load balancers, and distributed CDN caching.',
      'Monitor resource usage, logs (CloudWatch, Datadog), and optimize cloud infrastructure costs.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches)', 'BCA / MCA', 'B.Sc Computer Science / IT'],
      minCGPA: '6.0 - 7.0+',
      branchEligibility: 'Open to All Branches (CSE, IT, ECE, Mech, Civil)',
      keyPrerequisites: ['Basic Linux command-line skills', 'Foundations of Computer Networks (IP, DNS, TCP/UDP)']
    },
    coreSkills: [
      { name: 'Cloud Platform (AWS / Azure / GCP)', level: 'Essential', category: 'Domain' },
      { name: 'Linux System Administration & Shell Scripting', level: 'Essential', category: 'Programming' },
      { name: 'Computer Networking (VPC, Subnets, DNS, VPN)', level: 'Essential', category: 'Domain' },
      { name: 'Terraform / CloudFormation (IaC)', level: 'Important', category: 'Tools' },
      { name: 'Containers & Docker', level: 'Important', category: 'Tools' },
      { name: 'Security & Identity Access Management (IAM)', level: 'Important', category: 'Domain' },
      { name: 'Python Scripting (Boto3 / Automation)', level: 'Important', category: 'Programming' }
    ],
    softSkills: ['Troubleshooting Persistence', 'Security Mindset', 'Documentation Discipline', 'Clear Incident Communication'],
    radarSkills: [
      { subject: 'Cloud Services (AWS/Azure)', score: 95, fullMark: 100 },
      { subject: 'Networking & Security', score: 90, fullMark: 100 },
      { subject: 'Linux & Scripting', score: 85, fullMark: 100 },
      { subject: 'IaC (Terraform)', score: 75, fullMark: 100 },
      { subject: 'System Design', score: 70, fullMark: 100 },
      { subject: 'DSA & Algorithms', score: 35, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Amazon', companyId: 'comp-amazon', hiringType: 'AWS Cloud Support & Solutions', typicalPackage: '₹14 - 24 LPA' },
      { name: 'Microsoft', companyId: 'comp-microsoft', hiringType: 'Azure Cloud Solutions', typicalPackage: '₹15 - 25 LPA' },
      { name: 'TCS', companyId: 'comp-tcs', hiringType: 'Cloud & Infrastructure Practice', typicalPackage: '₹4 - 9 LPA' },
      { name: 'Infosys', companyId: 'comp-infosys', hiringType: 'Cobalt Cloud Division', typicalPackage: '₹4 - 9.5 LPA' },
      { name: 'Oracle', companyId: 'comp-oracle', hiringType: 'OCI Infrastructure', typicalPackage: '₹12 - 20 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Aptitude, Linux & Networking Test', roundType: 'OA', focus: 'OS commands, subnetting, TCP/IP, basic scripting and aptitude', duration: '60 mins' },
      { roundName: 'Round 2: Cloud Architecture & Scenarios', roundType: 'Technical', focus: 'Designing resilient VPCs, multi-region failover, S3 storage classes, IAM policies', duration: '50-60 mins' },
      { roundName: 'Round 3: Troubleshooting & Hands-on Lab', roundType: 'Technical', focus: 'Diagnosing broken network routes, high CPU utilization, bash scripting exercise', duration: '45 mins' },
      { roundName: 'Round 4: Behavioral & Client Interaction', roundType: 'HR', focus: 'Production incident handling, customer empathy, certification goals', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Junior Cloud Support / Cloud Associate', description: 'Monitors alerts, responds to infrastructure tickets, performs automated backups.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Cloud Engineer / Cloud SysOps', description: 'Designs cloud migration pipelines, authors Terraform modules, sets up DR environments.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Senior Cloud Architect', description: 'Designs multi-cloud enterprise solutions, oversees security compliance and cost governance.' },
      { stage: 'Executive', years: '8+ yrs', title: 'VP of Infrastructure / Enterprise Architect', description: 'Directs global data center strategy, cloud vendor negotiations, and IT resilience.' }
    ],
    recommendedGuideSlugs: ['computer-networks', 'operating-systems', 'system-design', 'aptitude-reasoning'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'Linux & Computer Networking', actionItems: ['Master 40 essential Linux commands, permissions, and bash scripting', 'Study OSI model, CIDR notation, Subnetting, TCP/IP, and DNS', 'Set up a free tier Linux VM on AWS EC2 or Oracle Cloud'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'AWS / Azure Core Services', actionItems: ['Learn AWS EC2, S3, RDS, IAM, VPC, and CloudWatch (or Azure equivalents)', 'Earn an entry-level certification (AWS Certified Solutions Architect Associate)', 'Deploy a high-availability 2-tier web application behind an Application Load Balancer'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Infrastructure as Code (Terraform)', actionItems: ['Learn Terraform syntax, state management, and modules', 'Automate provisioning of your entire cloud infrastructure from GitHub', 'Practice troubleshooting common cloud outage scenarios'] }
    ]
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps & Site Reliability Engineer (SRE)',
    category: 'Technical',
    tagline: 'Automate build pipelines, orchestrate Kubernetes clusters, and guarantee high availability.',
    badge: 'Premium Compensation',
    iconName: 'Terminal',
    difficultyLevel: 'High',
    salaryRange: '₹7 - 30+ LPA',
    averageCTC: '₹13 LPA',
    overview: 'DevOps & SRE engineers bridge the gap between software development and IT operations. They write code to automate build-test-deploy pipelines (CI/CD), manage Kubernetes clusters, and monitor systems so outages are caught before users notice.',
    dayInTheLife: 'Configuring GitHub Actions workflows, debugging a failing Kubernetes pod, tuning Prometheus alert thresholds, and automating zero-downtime canary deployments.',
    responsibilities: [
      'Design, build, and optimize automated CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI).',
      'Containerize applications with Docker and orchestrate with Kubernetes (EKS, GKE).',
      'Implement observability stacks: Prometheus, Grafana, ELK, OpenTelemetry.',
      'Enforce GitOps deployment workflows using ArgoCD or Flux.',
      'Define Service Level Indicators (SLIs), Objectives (SLOs), and conduct incident post-mortems.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (CSE, IT, ECE, All Branches)', 'MCA'],
      minCGPA: '6.5 - 7.5+',
      branchEligibility: 'All Engineering Branches with software mindset',
      keyPrerequisites: ['Comfort with Linux CLI and scripting (Bash/Python)', 'Solid understanding of software release cycles']
    },
    coreSkills: [
      { name: 'Docker & Containerization', level: 'Essential', category: 'Tools' },
      { name: 'Kubernetes Cluster Orchestration', level: 'Essential', category: 'Tools' },
      { name: 'CI/CD Pipelines (GitHub Actions / Jenkins)', level: 'Essential', category: 'Tools' },
      { name: 'Linux System Internals & Bash', level: 'Essential', category: 'Programming' },
      { name: 'Monitoring & Observability (Prometheus, Grafana)', level: 'Important', category: 'Tools' },
      { name: 'Python / Golang for Tooling', level: 'Important', category: 'Programming' },
      { name: 'Computer Networks & Security', level: 'Important', category: 'Domain' }
    ],
    softSkills: ['Calm Under Incident Pressure', 'Root-Cause Mindset', 'Automation Bias', 'Cross-Team Empathy'],
    radarSkills: [
      { subject: 'Containers & K8s', score: 95, fullMark: 100 },
      { subject: 'CI/CD & Automation', score: 95, fullMark: 100 },
      { subject: 'Linux & Scripting', score: 90, fullMark: 100 },
      { subject: 'Monitoring & Observability', score: 85, fullMark: 100 },
      { subject: 'System Design', score: 80, fullMark: 100 },
      { subject: 'DSA & Algorithms', score: 50, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Atlassian', companyId: 'comp-atlassian', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹24 - 40 LPA' },
      { name: 'Flipkart', companyId: 'comp-flipkart', hiringType: 'On-Campus', typicalPackage: '₹18 - 28 LPA' },
      { name: 'Walmart Global Tech', companyId: 'comp-walmart', hiringType: 'On-Campus', typicalPackage: '₹16 - 26 LPA' },
      { name: 'Cisco', companyId: 'comp-cisco', hiringType: 'On-Campus', typicalPackage: '₹14 - 22 LPA' },
      { name: 'Accenture', companyId: 'comp-accenture', hiringType: 'On-Campus', typicalPackage: '₹5 - 9.5 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Online Assessment (Coding + Systems)', roundType: 'OA', focus: '1-2 DSA/Scripting questions + Linux, Networking MCQs', duration: '75 mins' },
      { roundName: 'Round 2: Linux & Scripting Deep Dive', roundType: 'Technical', focus: 'Live debugging of broken processes, shell scripting, network socket inspection', duration: '60 mins' },
      { roundName: 'Round 3: CI/CD & Distributed Systems Design', roundType: 'Technical', focus: 'Designing a zero-downtime deployment pipeline for 50 microservices', duration: '60 mins' },
      { roundName: 'Round 4: SRE Incident & Cultural Fit', roundType: 'HR', focus: 'Post-mortem philosophy, blameless culture, on-call experience', duration: '45 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Associate DevOps Engineer / Junior SRE', description: 'Maintains build agents, reviews Dockerfiles, updates CI pipelines.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'DevOps Engineer / SRE II', description: 'Designs Kubernetes clusters, builds automated rollback systems, conducts chaos testing.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Senior SRE / Infrastructure Lead', description: 'Sets corporate SLI/SLO standards, designs zero-trust infrastructure, drives cost efficiency.' },
      { stage: 'Staff', years: '8+ yrs', title: 'Staff Platform Engineer / Director of DevOps', description: 'Defines engineering developer experience (DevEx) and multi-region reliability.' }
    ],
    recommendedGuideSlugs: ['operating-systems', 'computer-networks', 'system-design', 'arrays-strings'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'Linux & Docker Deep Dive', actionItems: ['Master Linux signals, systemd, process isolation, and namespaces', 'Write multi-stage Dockerfiles optimizing image layer caching and size', 'Set up Docker Compose for a microservice with database and redis'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'CI/CD & GitHub Actions', actionItems: ['Build a complete CI/CD pipeline that runs linter, tests, builds Docker image, and deploys', 'Learn secrets management, semantic versioning, and environment triggers', 'Write automation scripts in Python or Go'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Kubernetes & Observability', actionItems: ['Learn Kubernetes Pods, Deployments, Services, Ingress, and ConfigMaps', 'Install Minikube or Kind and deploy a 3-tier app with persistent volumes', 'Instrument Prometheus metrics and build a Grafana dashboard'] }
    ]
  },
  {
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Technical',
    tagline: 'Defend networks, conduct vulnerability assessments, and safeguard sensitive data.',
    badge: 'Critical Strategic Defense',
    iconName: 'Shield',
    difficultyLevel: 'Moderate',
    salaryRange: '₹5 - 22 LPA',
    averageCTC: '₹9 LPA',
    overview: 'Cybersecurity Analysts protect corporate networks, web applications, and customer data from malware, ransomware, and unauthorized intrusions. They conduct penetration testing, analyze SIEM logs, and enforce security policies.',
    dayInTheLife: 'Investigating suspicious alerts in SIEM tools (Splunk), running vulnerability scans with Nessus, analyzing phishing attempts, and reviewing firewall rule change requests.',
    responsibilities: [
      'Monitor Security Operations Center (SOC) dashboards and SIEM tools for intrusion alerts.',
      'Perform vulnerability assessments and penetration testing (VAPT) across web apps and APIs.',
      'Analyze network traffic packets (Wireshark) to detect anomalies and malware C2 traffic.',
      'Ensure compliance with industry security frameworks: ISO 27001, SOC 2, NIST, GDPR.',
      'Coordinate rapid incident response protocols during suspected security breaches.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (CSE, IT, ECE, Cyber Security)', 'BCA / MCA', 'B.Sc Cyber Security / IT'],
      minCGPA: '6.0 - 7.0+',
      branchEligibility: 'All Engineering & Computer Science Branches',
      keyPrerequisites: ['Solid understanding of Computer Networks and Operating Systems', 'Ethical mindset and curiosity about attack vectors']
    },
    coreSkills: [
      { name: 'Computer Networks & Protocols (TCP/IP, SSL/TLS, DNS)', level: 'Essential', category: 'Domain' },
      { name: 'Security Fundamentals (OWASP Top 10, Cryptography)', level: 'Essential', category: 'Domain' },
      { name: 'SIEM Tools & Log Analysis (Splunk, Wireshark)', level: 'Essential', category: 'Tools' },
      { name: 'Vulnerability Scanning (Nessus, Nmap, Burp Suite)', level: 'Important', category: 'Tools' },
      { name: 'Linux Security & Scripting (Bash / Python)', level: 'Important', category: 'Programming' },
      { name: 'Cloud Security Fundamentals', level: 'Important', category: 'Domain' },
      { name: 'Security Certifications (CompTIA Security+, CEH)', level: 'Bonus', category: 'Tools' }
    ],
    softSkills: ['Analytical Vigilance', 'Discretion & Integrity', 'Clear Crisis Communication', 'Methodical Investigation'],
    radarSkills: [
      { subject: 'Network Security', score: 95, fullMark: 100 },
      { subject: 'OWASP & Web Security', score: 90, fullMark: 100 },
      { subject: 'Log & Packet Analysis', score: 85, fullMark: 100 },
      { subject: 'OS & Scripting', score: 80, fullMark: 100 },
      { subject: 'Cryptography', score: 75, fullMark: 100 },
      { subject: 'DSA & Algorithms', score: 30, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Cisco', companyId: 'comp-cisco', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹14 - 24 LPA' },
      { name: 'Goldman Sachs', companyId: 'comp-goldman-sachs', hiringType: 'Information Security Division', typicalPackage: '₹16 - 26 LPA' },
      { name: 'TCS', companyId: 'comp-tcs', hiringType: 'Cyber Security Unit', typicalPackage: '₹4 - 9 LPA' },
      { name: 'Wipro', companyId: 'comp-wipro', hiringType: 'Cybersecurity Practice', typicalPackage: '₹4 - 8 LPA' },
      { name: 'IBM', companyId: 'comp-ibm', hiringType: 'Security Services', typicalPackage: '₹7 - 14 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Networking & Security Aptitude', roundType: 'OA', focus: 'OSI model, cryptography basics, ports, protocol attack questions', duration: '60 mins' },
      { roundName: 'Round 2: Core Technical & Scenario Analysis', roundType: 'Technical', focus: 'Explaining SQL injection, XSS, CSRF, MITM attacks, and defense countermeasures', duration: '60 mins' },
      { roundName: 'Round 3: Log Inspection & Practical Drill', roundType: 'Technical', focus: 'Analyzing sample Wireshark PCAP or Apache server logs to detect an intrusion', duration: '45 mins' },
      { roundName: 'Round 4: Behavioral & Ethics Assessment', roundType: 'HR', focus: 'Ethical adherence, NDA compliance, handling confidential security incidents', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'SOC Analyst Tier 1 / Junior Cyber Analyst', description: 'Triage security alerts, escalates true positives, documents incidents.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Security Engineer / Penetration Tester', description: 'Performs ethical hacking, fixes software vulnerabilities, reviews code security.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Lead Security Architect / Threat Hunter', description: 'Proactively hunts sophisticated persistent threats (APTs), leads red/blue team drills.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Chief Information Security Officer (CISO)', description: 'Owns enterprise cybersecurity risk, board-level compliance, and security posture.' }
    ],
    recommendedGuideSlugs: ['computer-networks', 'operating-systems', 'dbms', 'behavioral-hr'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'Computer Networks & Operating Systems', actionItems: ['Deeply study TCP handshakes, TLS/SSL, DNS amplification, ARP spoofing', 'Learn Wireshark and inspect live HTTP, DNS, and TLS traffic', 'Master Linux file permissions, sudo, and audit logs'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'OWASP Top 10 & Web Security', actionItems: ['Understand SQLi, XSS, Broken Authentication, IDOR, and SSRF', 'Solve PortSwigger Web Security Academy free labs', 'Learn Burp Suite for intercepting and modifying HTTP requests'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'SOC Operations & Threat Hunting', actionItems: ['Try out TryHackMe and HackTheBox SOC Analyst learning paths', 'Study SIEM log searching using Splunk free trial', 'Prepare clear case study presentations for your interviews'] }
    ]
  },
  {
    slug: 'product-engineer',
    title: 'Product Engineer (Full Stack)',
    category: 'Technical',
    tagline: 'End-to-end builders combining clean UI craftsmanship with robust backend architectures.',
    badge: 'High Startup & Unicorn Demand',
    iconName: 'Layers',
    difficultyLevel: 'High',
    salaryRange: '₹7 - 35+ LPA',
    averageCTC: '₹15 LPA',
    overview: 'Product Engineers do not just write code for tickets; they deeply understand user psychology and business objectives. They own features from customer discovery to React/Next.js frontend implementation, Node/Go backend services, and deployment.',
    dayInTheLife: 'Pairing with a designer on Figma, writing React components with Tailwind, building REST/GraphQL endpoints, running A/B experiments, and analyzing user session recordings.',
    responsibilities: [
      'Ship user-facing features end-to-end across frontend (Next.js/React) and backend (Node/Go/Python).',
      'Optimize Web Vitals, page rendering performance, and interactive animations.',
      'Implement state management, authentication (OAuth, JWT), and third-party integrations (Stripe, Twilio).',
      'Collaborate closely with product designers to translate Figma mockups into pixel-perfect interfaces.',
      'Measure user telemetry and iterate rapidly based on analytics.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches)', 'MCA', 'B.Sc Computer Science'],
      minCGPA: '6.5+ (Startups prioritize live project portfolio over CGPA)',
      branchEligibility: 'All Branches welcome with strong portfolio',
      keyPrerequisites: ['Demonstrated full-stack portfolio with 2+ deployed web apps', 'Comfort with TypeScript and modern web standards']
    },
    coreSkills: [
      { name: 'Modern Frontend (React, Next.js, TypeScript)', level: 'Essential', category: 'Development' },
      { name: 'Backend Engineering (Node.js, Express, Go, Python)', level: 'Essential', category: 'Development' },
      { name: 'Database Design (PostgreSQL, Supabase, Prisma)', level: 'Essential', category: 'Domain' },
      { name: 'RESTful APIs & GraphQL', level: 'Essential', category: 'Development' },
      { name: 'Tailwind CSS & Component Libraries', level: 'Important', category: 'Development' },
      { name: 'Data Structures & Algorithms', level: 'Important', category: 'DSA' },
      { name: 'UI/UX Sensitivity & Product Sense', level: 'Important', category: 'Soft Skills' }
    ],
    softSkills: ['User Empathy', 'Fast Prototyping', 'Design Aesthetic', 'Ownership Mindset'],
    radarSkills: [
      { subject: 'Full Stack Development', score: 95, fullMark: 100 },
      { subject: 'UI/UX & Frontend Polish', score: 90, fullMark: 100 },
      { subject: 'Database & Backend', score: 85, fullMark: 100 },
      { subject: 'DSA & Problem Solving', score: 70, fullMark: 100 },
      { subject: 'System Architecture', score: 75, fullMark: 100 },
      { subject: 'Product Intuition', score: 85, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Zomato', companyId: 'comp-zomato', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹16 - 28 LPA' },
      { name: 'Swiggy', companyId: 'comp-swiggy', hiringType: 'On-Campus', typicalPackage: '₹18 - 30 LPA' },
      { name: 'Flipkart', companyId: 'comp-flipkart', hiringType: 'On-Campus', typicalPackage: '₹18 - 32 LPA' },
      { name: 'PayPal', companyId: 'comp-paypal', hiringType: 'On-Campus', typicalPackage: '₹16 - 26 LPA' },
      { name: 'Uber', companyId: 'comp-uber', hiringType: 'On-Campus', typicalPackage: '₹25 - 42 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Machine Coding / Take-Home Drill', roundType: 'Technical', focus: 'Build a working interactive feature (e.g. Kanban board, Infinite scroll feed) in 90-120 mins', duration: '120 mins' },
      { roundName: 'Round 2: DSA & JavaScript Internals', roundType: 'Technical', focus: 'Event loop, closures, promises, prototypes + 1-2 Medium DSA problems', duration: '60 mins' },
      { roundName: 'Round 3: System Design & Architecture', roundType: 'Technical', focus: 'Frontend architecture, caching, state management, database schema design', duration: '60 mins' },
      { roundName: 'Round 4: Product Sense & Founder/Manager Round', roundType: 'HR', focus: 'Evaluating product decisions, trade-offs between speed and tech debt', duration: '45 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Product Engineer I', description: 'Ships frontend components and backend endpoints, owns small user flows.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Product Engineer II', description: 'Owns end-to-end product epics, collaborates directly with product managers and users.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Senior Product Engineer / Tech Lead', description: 'Architects entire user platforms, mentors engineers, drives company velocity.' },
      { stage: 'Staff/VP', years: '8+ yrs', title: 'Staff Product Engineer / VP of Product Eng', description: 'Drives technical vision and product roadmap alignment at enterprise scale.' }
    ],
    recommendedGuideSlugs: ['arrays-strings', 'system-design', 'dbms', 'oop-design-patterns'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'Modern Frontend & TypeScript', actionItems: ['Master React hooks (useEffect, useMemo, custom hooks) and TypeScript generics', 'Learn Next.js App Router, Server Components, and Server Actions', 'Build a production-grade responsive UI with Tailwind CSS'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'Backend & Relational DBs', actionItems: ['Build REST APIs with Node.js/Express or Next.js API route handlers', 'Design normalized Postgres schemas and interface with Supabase/Prisma', 'Implement authentication and authorization flows'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Machine Coding & Portfolio Polish', actionItems: ['Practice timed machine coding rounds (build search autocomplete, modal systems, drag-and-drop)', 'Deploy 2 full-stack projects to Vercel/Render with custom domains', 'Prepare DSA fundamentals for initial screening rounds'] }
    ]
  },

  // ==========================================
  // NON-TECHNICAL ROLES
  // ==========================================
  {
    slug: 'product-management',
    title: 'Associate Product Manager (APM)',
    category: 'Non-Technical',
    tagline: 'Lead cross-functional teams to define what products to build, why, and for whom.',
    badge: 'Highest Non-Tech Package',
    iconName: 'Compass',
    difficultyLevel: 'Very High',
    salaryRange: '₹10 - 32+ LPA',
    averageCTC: '₹18 LPA',
    overview: 'Product Managers are the "CEOs of the feature." They do not manage people directly; instead, they influence engineering, design, marketing, and sales teams to build features that solve customer pain points and drive business revenue.',
    dayInTheLife: 'Interviewing users, writing Product Requirement Documents (PRDs), prioritizing sprint backlogs with engineers, analyzing metric drop-offs, and demoing features to leadership.',
    responsibilities: [
      'Write comprehensive Product Requirement Documents (PRDs) and user stories.',
      'Define success metrics (North Star Metric, OKRs, acquisition, conversion, retention).',
      'Conduct customer discovery interviews and analyze qualitative/quantitative user feedback.',
      'Prioritize product roadmap features balancing business ROI against technical complexity.',
      'Facilitate sprint planning, daily standups, and retrospective meetings with developers.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches)', 'Dual Degree', 'MBA / BBA / B.Com (with tech interest)'],
      minCGPA: '7.0 - 8.0+ (Leadership positions in clubs/events strongly weighted)',
      branchEligibility: 'Completely Open to All Engineering and Non-Engineering Branches',
      keyPrerequisites: ['Strong product sense and problem breakdown ability', 'Exceptional written and oral communication skills']
    },
    coreSkills: [
      { name: 'Product Sense & User Empathy', level: 'Essential', category: 'Domain' },
      { name: 'Metric Definition & Data Analysis (SQL/Mixpanel)', level: 'Essential', category: 'Domain' },
      { name: 'Writing PRDs & Wireframing (Figma)', level: 'Essential', category: 'Tools' },
      { name: 'Agile & Scrum Methodology (Jira)', level: 'Important', category: 'Tools' },
      { name: 'Technical Literacy (APIs, System Architecture)', level: 'Important', category: 'Domain' },
      { name: 'Market Research & Competitor Benchmarking', level: 'Important', category: 'Domain' },
      { name: 'Aptitude & Critical Thinking', level: 'Essential', category: 'Aptitude' }
    ],
    softSkills: ['Stakeholder Influence without Authority', 'Executive Presentation', 'Negotiation', 'Strategic Prioritization'],
    radarSkills: [
      { subject: 'Product Sense', score: 95, fullMark: 100 },
      { subject: 'Communication & Pitching', score: 95, fullMark: 100 },
      { subject: 'Data & Metrics Analysis', score: 85, fullMark: 100 },
      { subject: 'Technical Fluency', score: 70, fullMark: 100 },
      { subject: 'Analytical Aptitude', score: 85, fullMark: 100 },
      { subject: 'Coding / DSA', score: 20, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Google', companyId: 'comp-google', hiringType: 'APM Cohort Hiring', typicalPackage: '₹28 - 40 LPA' },
      { name: 'Flipkart', companyId: 'comp-flipkart', hiringType: 'APM Program', typicalPackage: '₹20 - 30 LPA' },
      { name: 'Swiggy', companyId: 'comp-swiggy', hiringType: 'On-Campus & Off-Campus APM', typicalPackage: '₹18 - 26 LPA' },
      { name: 'Zomato', companyId: 'comp-zomato', hiringType: 'APM Program', typicalPackage: '₹16 - 24 LPA' },
      { name: 'Microsoft', companyId: 'comp-microsoft', hiringType: 'Program Manager (PM)', typicalPackage: '₹24 - 38 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Product Teardown / Assignment', roundType: 'Case Study', focus: 'Submitting a 3-page PRD or redesign of an existing consumer application', duration: 'Take-home' },
      { roundName: 'Round 2: Product Design & Sense Interview', roundType: 'Case Study', focus: '"Design an elevator for a 100-story building" or "Improve WhatsApp for elderly users"', duration: '60 mins' },
      { roundName: 'Round 3: Analytical & Metrics Drill', roundType: 'Technical', focus: '"YouTube Watch time dropped 5% in India last week. Diagnose root cause."', duration: '60 mins' },
      { roundName: 'Round 4: Leadership & Behavioral Interview', roundType: 'HR', focus: 'Handling engineer disagreements, prioritization pushback, cultural alignment', duration: '45 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Associate Product Manager (APM)', description: 'Owns individual sub-features, writes PRDs, tracks metric performance.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Product Manager (PM)', description: 'Owns end-to-end product lines, manages squad of 8-12 engineers & designers.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Senior PM / Group Product Manager (GPM)', description: 'Owns major business pillars, manages other PMs, drives multi-year strategy.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Director of Product / Chief Product Officer (CPO)', description: 'Sets corporate product vision, board reporting, M&A product integrations.' }
    ],
    recommendedGuideSlugs: ['behavioral-hr', 'aptitude-reasoning', 'system-design'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'Product Thinking & Frameworks', actionItems: ['Read "Decode and Conquer" by Lewis Lin and "Cracking the PM Interview"', 'Master CIRCLES framework for product design questions', 'Conduct 10 teardowns of apps you use daily (Swiggy, Spotify, Blinkit)'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'Metrics & Root Cause Analysis', actionItems: ['Learn the AARRR (Pirate Metrics) and HEART frameworks', 'Practice diagnosing hypothetical metric drops (Conversion, DAU, Retention)', 'Learn basic SQL to query user cohort datasets'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Mock Interviews & PRD Portfolio', actionItems: ['Write 2 polished PRDs with wireframes on Figma and publish on Notion/Medium', 'Conduct at least 10 peer mock interviews with real-time feedback', 'Prepare compelling stories of student club leadership and initiative'] }
    ]
  },
  {
    slug: 'consulting',
    title: 'Technology & Management Consultant',
    category: 'Non-Technical',
    tagline: 'Solve high-stakes business and technology dilemmas for Fortune 500 executives.',
    badge: 'High Prestige & Global Travel',
    iconName: 'Briefcase',
    difficultyLevel: 'High',
    salaryRange: '₹8 - 25+ LPA',
    averageCTC: '₹14 LPA',
    overview: 'Consultants are hired by organizations to solve critical strategic dilemmas: entering new markets, cutting operational costs, digitizing legacy systems, or choosing enterprise software architectures. The interview process is heavily centered on Case Studies and Guesstimates.',
    dayInTheLife: 'Conducting stakeholder interviews, building financial model projections in Excel, synthesizing client interview notes into structured PowerPoint decks, and presenting to CXOs.',
    responsibilities: [
      'Deconstruct ambiguous business problems into structured hypothesis trees (MECE).',
      'Conduct rigorous quantitative market analysis and financial feasibility modeling.',
      'Benchmark competitors, cost structures, and technological modernization trends.',
      'Craft persuasive, executive-ready presentations (Storylining in PPT).',
      'Guide client teams through enterprise digital transformation implementation.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches)', 'B.Sc / B.Com / BBA', 'MBA / Post-Grad'],
      minCGPA: '7.5+ preferred (High academic consistency across 10th, 12th & College)',
      branchEligibility: 'Open to All Branches (Engineering, Commerce, Sciences)',
      keyPrerequisites: ['Exceptional mental math, analytical aptitude, and poise', 'High structured thinking and problem breakdown capability']
    },
    coreSkills: [
      { name: 'Structured Problem Solving (MECE Framework)', level: 'Essential', category: 'Domain' },
      { name: 'Guesstimates & Market Sizing', level: 'Essential', category: 'Aptitude' },
      { name: 'Quantitative Aptitude & Mental Math', level: 'Essential', category: 'Aptitude' },
      { name: 'Executive Storytelling & PowerPoint Decks', level: 'Essential', category: 'Soft Skills' },
      { name: 'Advanced Financial Modeling (Excel)', level: 'Important', category: 'Tools' },
      { name: 'Technology Trends Awareness (Cloud, AI, SaaS)', level: 'Important', category: 'Domain' },
      { name: 'Business Case Structuring (Profitability, Market Entry)', level: 'Essential', category: 'Domain' }
    ],
    softSkills: ['Poise Under Grilling', 'Client Empathy', 'Persuasive Communication', 'High-Pressure Synthesis'],
    radarSkills: [
      { subject: 'Case Structuring & MECE', score: 95, fullMark: 100 },
      { subject: 'Aptitude & Mental Math', score: 90, fullMark: 100 },
      { subject: 'Presentation & Storylining', score: 95, fullMark: 100 },
      { subject: 'Business Acumen', score: 90, fullMark: 100 },
      { subject: 'Tech Awareness', score: 65, fullMark: 100 },
      { subject: 'Coding / DSA', score: 10, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Accenture', companyId: 'comp-accenture', hiringType: 'Accenture Strategy & Consulting', typicalPackage: '₹12 - 20 LPA' },
      { name: 'Goldman Sachs', companyId: 'comp-goldman-sachs', hiringType: 'Global Investment & Strategy', typicalPackage: '₹18 - 28 LPA' },
      { name: 'Capgemini', companyId: 'comp-capgemini', hiringType: 'Management Consulting Practice', typicalPackage: '₹8 - 14 LPA' },
      { name: 'Infosys', companyId: 'comp-infosys', hiringType: 'Infosys Consulting', typicalPackage: '₹8 - 15 LPA' },
      { name: 'TCS', companyId: 'comp-tcs', hiringType: 'Strategic Advisory', typicalPackage: '₹7 - 12 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Cognitive Aptitude & Math Test', roundType: 'OA', focus: 'Fast-paced quantitative aptitude, logical reasoning, data interpretation', duration: '60 mins' },
      { roundName: 'Round 2: Case Interview 1 (Guesstimate + Profitability)', roundType: 'Case Study', focus: '"Estimate daily tea cups consumed in Mumbai" + "Airline profitability dropped 20%"', duration: '45-60 mins' },
      { roundName: 'Round 3: Case Interview 2 (Market Entry / Tech Transformation)', roundType: 'Case Study', focus: '"Should an EV manufacturer enter Indian market?" + digital roadmap', duration: '45-60 mins' },
      { roundName: 'Round 4: Partner / Behavioral Interview', roundType: 'HR', focus: 'Executive presence, handling conflict, leadership track record', duration: '30-45 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Business Analyst / Associate Consultant', description: 'Gathers data, performs financial modeling, builds client presentation slides.' },
      { stage: 'Mid', years: '2 - 4 yrs', title: 'Consultant / Senior Consultant', description: 'Leads individual workstreams, manages client relationships, frames recommendations.' },
      { stage: 'Senior', years: '4 - 7 yrs', title: 'Manager / Engagement Manager', description: 'Runs multi-million dollar client engagements, mentors consultant cohorts.' },
      { stage: 'Executive', years: '7+ yrs', title: 'Associate Partner / Managing Director / Partner', description: 'Brings in new business, sells engagements, guides global client boards.' }
    ],
    recommendedGuideSlugs: ['aptitude-reasoning', 'behavioral-hr'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'Mental Math & Guesstimates', actionItems: ['Practice 5-minute mental math drills daily (percentages, fractions, speed math)', 'Solve 30 guesstimates across population, market size, and capacity sizing', 'Learn to structure calculations with clear, defensible assumptions'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'Case Study Frameworks', actionItems: ['Read "Case in Point" by Marc Cosentino and "Case Interviews Cracked"', 'Master Profitability (Revenue vs Cost trees) and Market Entry frameworks', 'Understand M&A, Pricing, and Growth strategy case structures'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Peer Mock Drills & Behavioral Polish', actionItems: ['Do at least 25 live mock case interviews with consulting club peers', 'Time yourself making structured notes in under 60 seconds', 'Prepare sharp STAR behavioral stories demonstrating leadership and conflict resolution'] }
    ]
  },
  {
    slug: 'business-analyst',
    title: 'Business Analyst (BA)',
    category: 'Non-Technical',
    tagline: 'Translate complex business requirements into clear technical specifications.',
    badge: 'Steady Corporate Demand',
    iconName: 'TrendingUp',
    difficultyLevel: 'Moderate',
    salaryRange: '₹5 - 16 LPA',
    averageCTC: '₹8 LPA',
    overview: 'Business Analysts sit squarely between business stakeholders and software development teams. They gather requirements, model workflows, define acceptance criteria, and ensure that engineering delivers exactly what the business needs.',
    dayInTheLife: 'Facilitating requirement gathering workshops with operations teams, writing user stories in Jira, validating feature test cases, and creating process flow diagrams in Lucidchart.',
    responsibilities: [
      'Elicit and document detailed business requirements from non-technical stakeholders.',
      'Create Business Requirement Documents (BRD) and Functional Specification Documents (FSD).',
      'Map business processes using flowcharts, BPMN diagrams, and UML activity diagrams.',
      'Define User Acceptance Testing (UAT) criteria and coordinate validation testing.',
      'Bridge continuous communication between business clients and software development squads.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches)', 'BBA / B.Com', 'BCA / MCA', 'MBA'],
      minCGPA: '6.0 - 7.0+',
      branchEligibility: 'All Branches Eligible',
      keyPrerequisites: ['Strong analytical problem solving', 'Clarity in written documentation and interpersonal interaction']
    },
    coreSkills: [
      { name: 'Requirement Elicitation & BRD/FSD Writing', level: 'Essential', category: 'Domain' },
      { name: 'Process Flow Mapping (BPMN / Visio / Lucidchart)', level: 'Essential', category: 'Tools' },
      { name: 'SQL & Data Querying Basics', level: 'Essential', category: 'Domain' },
      { name: 'Agile/Scrum Framework (Jira / Confluence)', level: 'Important', category: 'Tools' },
      { name: 'User Acceptance Testing (UAT)', level: 'Important', category: 'Domain' },
      { name: 'Advanced Excel & Spreadsheets', level: 'Important', category: 'Tools' },
      { name: 'Aptitude & Logical Reasoning', level: 'Essential', category: 'Aptitude' }
    ],
    softSkills: ['Active Listening', 'Conflict Resolution', 'Clear Technical Documentation', 'Cross-Functional Empathy'],
    radarSkills: [
      { subject: 'Requirement Analysis', score: 95, fullMark: 100 },
      { subject: 'Process Modeling', score: 90, fullMark: 100 },
      { subject: 'SQL & Data Basics', score: 75, fullMark: 100 },
      { subject: 'Aptitude & Logic', score: 85, fullMark: 100 },
      { subject: 'Communication', score: 90, fullMark: 100 },
      { subject: 'Coding / DSA', score: 15, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'TCS', companyId: 'comp-tcs', hiringType: 'On-Campus & Off-Campus', typicalPackage: '₹4.5 - 9 LPA' },
      { name: 'Infosys', companyId: 'comp-infosys', hiringType: 'On-Campus', typicalPackage: '₹4.5 - 9.5 LPA' },
      { name: 'Cognizant', companyId: 'comp-cognizant', hiringType: 'On-Campus', typicalPackage: '₹4.5 - 8.5 LPA' },
      { name: 'Capgemini', companyId: 'comp-capgemini', hiringType: 'On-Campus', typicalPackage: '₹5 - 9 LPA' },
      { name: 'Accenture', companyId: 'comp-accenture', hiringType: 'On-Campus', typicalPackage: '₹5.5 - 10 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Aptitude & Verbal Ability Test', roundType: 'OA', focus: 'Logical reasoning, reading comprehension, data interpretation', duration: '60 mins' },
      { roundName: 'Round 2: Business Scenario & Process Case', roundType: 'Case Study', focus: 'Given a business problem (e.g. return process in E-Commerce), draw the workflow and write user stories', duration: '45-60 mins' },
      { roundName: 'Round 3: SQL & Technical Literacy', roundType: 'Technical', focus: 'Basic SQL queries, database relationships, understanding of APIs and microservices', duration: '45 mins' },
      { roundName: 'Round 4: Fitment & HR Round', roundType: 'HR', focus: 'Handling difficult stakeholders, past teamwork examples', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Junior Business Analyst', description: 'Assists senior BAs, writes functional specifications, conducts UAT testing.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Business Analyst / Lead BA', description: 'Owns requirements for entire modules, facilitates client workshops, manages scope creep.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Senior BA / Product Owner', description: 'Owns product backlogs, interfaces with C-level business executives.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Practice Lead / Director of Business Analysis', description: 'Builds BA competence center across organizational business units.' }
    ],
    recommendedGuideSlugs: ['aptitude-reasoning', 'dbms', 'behavioral-hr'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'Core Business Analysis Concepts', actionItems: ['Learn software development lifecycles (Agile Scrum vs Waterfall)', 'Practice writing User Stories with INVEST criteria and Acceptance Criteria', 'Learn BPMN flowcharting symbols on Lucidchart'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'SQL & Data Literacy', actionItems: ['Learn SQL SELECT, JOIN, GROUP BY, and aggregations', 'Master Excel VLOOKUP, XLOOKUP, Pivot Tables, and conditional formatting', 'Analyze sample business requirement documents (BRD)'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Mock Interviews & Case Studies', actionItems: ['Practice mapping workflows for real apps (Swiggy food delivery, Netflix signup)', 'Brush up aptitude tests (Time & Work, Profit & Loss, Syllogisms)', 'Prepare structured answers for stakeholder management scenarios'] }
    ]
  },
  {
    slug: 'marketing-growth',
    title: 'Digital Marketing & Growth Analyst',
    category: 'Non-Technical',
    tagline: 'Scale customer acquisition, optimize conversion funnels, and drive digital campaigns.',
    badge: 'Creative + Analytical Blend',
    iconName: 'Target',
    difficultyLevel: 'Moderate',
    salaryRange: '₹4.5 - 16 LPA',
    averageCTC: '₹7.5 LPA',
    overview: 'Digital Marketers and Growth Analysts design data-driven campaigns across Google, Meta, SEO, and email channels to acquire new users and maximize ROI. They combine creative copywriting with rigorous A/B testing and marketing attribution modeling.',
    dayInTheLife: 'Setting up Meta Ads campaigns, monitoring Cost Per Click (CPC) and Customer Acquisition Cost (CAC), optimizing landing page conversion rates, and writing weekly performance newsletters.',
    responsibilities: [
      'Design, launch, and manage paid acquisition campaigns across Google Ads, Meta Ads, and LinkedIn.',
      'Optimize organic search visibility (SEO) through keyword research and technical audits.',
      'Run rigorous A/B experiments on landing pages to lift conversion rates (CRO).',
      'Analyze customer acquisition funnels, retention cohorts, and ad spend ROI.',
      'Build automated email nurture and lifecycle marketing campaigns (CleverTap, HubSpot).'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches)', 'BBA / B.Com', 'BA Journalism / Mass Comm', 'MBA'],
      minCGPA: '6.0+',
      branchEligibility: 'Completely Open to All Degrees and Branches',
      keyPrerequisites: ['Interest in digital consumer behavior and social platforms', 'Comfort with metrics and marketing math (CAC, ROAS, LTV)']
    },
    coreSkills: [
      { name: 'Performance Marketing (Google Ads, Meta Ads)', level: 'Essential', category: 'Tools' },
      { name: 'Search Engine Optimization (SEO)', level: 'Essential', category: 'Domain' },
      { name: 'Web Analytics (Google Analytics 4 / Mixpanel)', level: 'Essential', category: 'Tools' },
      { name: 'Conversion Rate Optimization (A/B Testing)', level: 'Important', category: 'Domain' },
      { name: 'Copywriting & Content Strategy', level: 'Important', category: 'Soft Skills' },
      { name: 'Marketing Automation (HubSpot, Mailchimp)', level: 'Important', category: 'Tools' },
      { name: 'Data Interpretation & Excel', level: 'Important', category: 'Aptitude' }
    ],
    softSkills: ['Creative Empathy', 'Rapid Experimentation', 'Persuasive Writing', 'Consumer Psychology'],
    radarSkills: [
      { subject: 'Paid Ads & Funnels', score: 95, fullMark: 100 },
      { subject: 'SEO & Content', score: 90, fullMark: 100 },
      { subject: 'Analytics & GA4', score: 85, fullMark: 100 },
      { subject: 'Copywriting & Storytelling', score: 90, fullMark: 100 },
      { subject: 'Aptitude & Math', score: 70, fullMark: 100 },
      { subject: 'Coding', score: 10, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Zomato', companyId: 'comp-zomato', hiringType: 'Growth & Brand Marketing', typicalPackage: '₹8 - 16 LPA' },
      { name: 'Swiggy', companyId: 'comp-swiggy', hiringType: 'Performance Marketing', typicalPackage: '₹9 - 18 LPA' },
      { name: 'Flipkart', companyId: 'comp-flipkart', hiringType: 'Digital Acquisition', typicalPackage: '₹10 - 20 LPA' },
      { name: 'Accenture', companyId: 'comp-accenture', hiringType: 'Interactive Marketing', typicalPackage: '₹5 - 9 LPA' },
      { name: 'Jio Platforms', companyId: 'comp-jio', hiringType: 'Growth Marketing', typicalPackage: '₹6 - 12 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Marketing Aptitude & Writing Task', roundType: 'OA', focus: 'English verbal ability, data interpretation, write a sample ad copy', duration: '60 mins' },
      { roundName: 'Round 2: Growth Campaign Case Study', roundType: 'Case Study', focus: '"Given a budget of ₹10 Lakhs, how would you acquire 50,000 users for a college notes app?"', duration: '60 mins' },
      { roundName: 'Round 3: Metrics & Tools Drill', roundType: 'Technical', focus: 'Explaining ROAS, CTR, CPC, Bounce Rate, GA4 event tracking, and attribution', duration: '45 mins' },
      { roundName: 'Round 4: Culture & Passion Interview', roundType: 'HR', focus: 'Creativity, favorite marketing campaigns, handling fast pivots', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Growth Executive / Digital Marketing Associate', description: 'Monitors campaigns, optimizes ad keywords, tracks weekly conversion rates.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Growth Marketing Manager', description: 'Owns paid ad budgets of ₹50L+, runs multi-channel attribution, leads SEO strategy.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Head of Growth / Acquisition Lead', description: 'Drives total top-of-funnel customer pipeline and product-led growth (PLG).' },
      { stage: 'Executive', years: '8+ yrs', title: 'Chief Marketing Officer (CMO)', description: 'Directs global brand identity, PR, corporate sponsorship, and brand narrative.' }
    ],
    recommendedGuideSlugs: ['aptitude-reasoning', 'behavioral-hr'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'Digital Marketing Fundamentals', actionItems: ['Earn the free Google Digital Garage and Google Analytics 4 certification', 'Understand the difference between Paid, Owned, and Earned media', 'Learn how Google Ads auction works (Quality Score, Ad Rank)'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'Metrics & Experimentation', actionItems: ['Calculate CAC, LTV, ROAS, and Conversion Rate through sample Excel sheets', 'Learn how to set up Meta Business Manager and run test ad creatives', 'Practice writing catchy hooks and conversion copy'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Portfolio & Campaign Presentation', actionItems: ['Build a personal portfolio showcasing a campaign plan for an actual product', 'Audit the SEO and social strategy of a popular startup (e.g. Zerodha, Zepto)', 'Prepare STAR answers highlighting creative initiative and data-backed decisions'] }
    ]
  },
  {
    slug: 'tech-sales',
    title: 'Technology Sales & Business Development',
    category: 'Non-Technical',
    tagline: 'Drive enterprise revenue by pitching high-value SaaS, cloud, and IT software solutions.',
    badge: 'Lucrative Incentive Potential',
    iconName: 'Zap',
    difficultyLevel: 'Moderate',
    salaryRange: '₹5 - 20+ LPA (+ Uncapped Incentives)',
    averageCTC: '₹9 LPA (Base) + 30-50% Variable',
    overview: 'Tech Sales / Business Development Representatives (BDRs) identify enterprise prospects, conduct discovery calls, pitch software capabilities, negotiate contracts, and close enterprise deals. High performers often earn more than engineers through performance commissions.',
    dayInTheLife: 'Prospecting high-value accounts on LinkedIn Sales Navigator, conducting discovery calls with IT Directors, presenting live software demos, and drafting commercial proposals.',
    responsibilities: [
      'Identify and qualify prospective enterprise enterprise leads across target industries.',
      'Conduct rigorous B2B discovery calls to uncover operational pain points and budget.',
      'Deliver tailored product demos demonstrating clear business ROI to executives.',
      'Navigate multi-stakeholder contract negotiations and procurement cycles.',
      'Maintain clean CRM pipeline data in Salesforce or HubSpot.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches)', 'BBA / B.Com', 'Any Graduate', 'MBA'],
      minCGPA: '6.0+',
      branchEligibility: 'All Branches Welcome (Tech background gives great edge in SaaS sales)',
      keyPrerequisites: ['High energy, resilience, and persuasive verbal communication', 'Fearlessness in outreach and objection handling']
    },
    coreSkills: [
      { name: 'B2B Sales Methodologies (MEDDIC / BANT / SPIN)', level: 'Essential', category: 'Domain' },
      { name: 'Persuasive Cold Outreach & Discovery Calling', level: 'Essential', category: 'Soft Skills' },
      { name: 'Software Demo Presentation & Storytelling', level: 'Essential', category: 'Soft Skills' },
      { name: 'CRM Systems (Salesforce / HubSpot)', level: 'Important', category: 'Tools' },
      { name: 'Contract Negotiation & Objection Handling', level: 'Essential', category: 'Soft Skills' },
      { name: 'Enterprise Tech Literacy (Cloud, SaaS, APIs)', level: 'Important', category: 'Domain' },
      { name: 'Aptitude & Commercial Math', level: 'Important', category: 'Aptitude' }
    ],
    softSkills: ['Emotional Intelligence', 'Grit & Rejection Resilience', 'Persuasive Gravitas', 'Active Empathetic Listening'],
    radarSkills: [
      { subject: 'Pitching & Persuasion', score: 98, fullMark: 100 },
      { subject: 'Objection Handling', score: 95, fullMark: 100 },
      { subject: 'B2B Methodologies', score: 85, fullMark: 100 },
      { subject: 'Tech Literacy', score: 75, fullMark: 100 },
      { subject: 'Commercial Math', score: 80, fullMark: 100 },
      { subject: 'Coding', score: 5, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Salesforce', companyId: 'comp-salesforce', hiringType: 'BDR Cohort Hiring', typicalPackage: '₹12 - 20 LPA' },
      { name: 'Oracle', companyId: 'comp-oracle', hiringType: 'Cloud Tech Sales', typicalPackage: '₹10 - 18 LPA' },
      { name: 'Microsoft', companyId: 'comp-microsoft', hiringType: 'Commercial Sales Specialist', typicalPackage: '₹14 - 24 LPA' },
      { name: 'Cognizant', companyId: 'comp-cognizant', hiringType: 'Client Services Associate', typicalPackage: '₹5 - 8.5 LPA' },
      { name: 'TCS', companyId: 'comp-tcs', hiringType: 'Business Development', typicalPackage: '₹4.5 - 8 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Verbal Communication & Personality Test', roundType: 'OA', focus: 'Spoken English clarity, listening assessment, situational judgment test', duration: '45 mins' },
      { roundName: 'Round 2: Mock Sales Pitch / Cold Call Roleplay', roundType: 'Technical', focus: 'Pitch a product (e.g. Slack or AWS) to an interviewer playing a skeptical CTO', duration: '45 mins' },
      { roundName: 'Round 3: Objection Handling & Commercial Case', roundType: 'Case Study', focus: '"The client says your product is 40% more expensive than competitor. How do you respond?"', duration: '45 mins' },
      { roundName: 'Round 4: Leadership Fit & Motivation Interview', roundType: 'HR', focus: 'Motivation for sales, handling rejection, commission drive', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Business Development Representative (BDR / SDR)', description: 'Generates outbound pipeline, qualifies leads, sets up discovery meetings.' },
      { stage: 'Mid', years: '2 - 4 yrs', title: 'Account Executive (AE)', description: 'Runs full sales cycles, conducts demos, negotiates contracts, closes enterprise revenue.' },
      { stage: 'Senior', years: '4 - 7 yrs', title: 'Senior Enterprise AE / Strategic Account Lead', description: 'Closes multi-million dollar annual recurring revenue (ARR) deals with Fortune 500s.' },
      { stage: 'Executive', years: '7+ yrs', title: 'VP of Global Sales / Chief Revenue Officer (CRO)', description: 'Sets global revenue quotas, leads global sales orgs, sets sales compensation plans.' }
    ],
    recommendedGuideSlugs: ['behavioral-hr', 'aptitude-reasoning'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'B2B Sales Principles', actionItems: ['Read "Fanatical Prospecting" by Jeb Blount and "The Challenger Sale"', 'Understand B2B frameworks: BANT (Budget, Authority, Need, Timeline) and MEDDIC', 'Practice elevator pitches of top tech products in under 60 seconds'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'Cold Calling & Roleplay Practice', actionItems: ['Record yourself delivering discovery questions and listen for filler words', 'Practice handling standard sales objections: "No budget", "Not interested", "Already using competitor"', 'Learn basic Salesforce/HubSpot navigation'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Interview Roleplay Drills', actionItems: ['Do at least 5 mock sales pitch interviews with tough pushback', 'Prepare clear examples of resilience, targets achieved, and persuasive wins', 'Research the target company\'s products and customer case studies inside out'] }
    ]
  },
  {
    slug: 'operations-management',
    title: 'Operations & Supply Chain Analyst',
    category: 'Non-Technical',
    tagline: 'Optimize logistics, inventory, and fulfillment to power modern hyper-scale platforms.',
    badge: 'Core Engine of E-Commerce',
    iconName: 'Workflow',
    difficultyLevel: 'Moderate',
    salaryRange: '₹5 - 18 LPA',
    averageCTC: '₹8.5 LPA',
    overview: 'Operations and Supply Chain Analysts streamline the complex physical and digital engines of commerce: warehouse routing, last-mile delivery, supplier logistics, and inventory management. They apply quantitative analytics to eliminate bottlenecks and cut delivery times.',
    dayInTheLife: 'Monitoring warehouse throughput metrics, predicting seasonal inventory shortages, auditing vendor SLAs, and designing route optimization experiments.',
    responsibilities: [
      'Monitor and optimize end-to-end supply chain logistics, fulfillment, and returns.',
      'Forecast inventory demand using historical sales trends and seasonal models.',
      'Identify operational bottlenecks across warehousing, procurement, and last-mile transit.',
      'Audit supplier performance against agreed Service Level Agreements (SLAs).',
      'Deploy automated reporting tools to track on-time delivery (OTD) and fleet efficiency.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches, especially Mechanical, Industrial, Production, CSE)', 'BBA / B.Com', 'MBA'],
      minCGPA: '6.0 - 7.0+',
      branchEligibility: 'All Engineering and Management Branches Welcome',
      keyPrerequisites: ['Strong quantitative and operational reasoning', 'Comfort with spreadsheets and multi-variable optimization']
    },
    coreSkills: [
      { name: 'Supply Chain Management Principles', level: 'Essential', category: 'Domain' },
      { name: 'Advanced Excel (VLOOKUP, Pivot, Solver)', level: 'Essential', category: 'Tools' },
      { name: 'Inventory Optimization & Demand Forecasting', level: 'Essential', category: 'Domain' },
      { name: 'SQL & Database Reporting', level: 'Important', category: 'Domain' },
      { name: 'Process Optimization (Lean / Six Sigma Concepts)', level: 'Important', category: 'Domain' },
      { name: 'Logistics ERP Systems (SAP / Oracle SCM)', level: 'Bonus', category: 'Tools' },
      { name: 'Aptitude & Critical Reasoning', level: 'Essential', category: 'Aptitude' }
    ],
    softSkills: ['Crisis Firefighting', 'Vendor Negotiation', 'Process Discipline', 'Cross-Department Coordination'],
    radarSkills: [
      { subject: 'Supply Chain & Logistics', score: 95, fullMark: 100 },
      { subject: 'Process Optimization', score: 90, fullMark: 100 },
      { subject: 'Excel & Data Analysis', score: 85, fullMark: 100 },
      { subject: 'Aptitude & Problem Solving', score: 85, fullMark: 100 },
      { subject: 'Vendor Management', score: 80, fullMark: 100 },
      { subject: 'Coding', score: 10, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Amazon', companyId: 'comp-amazon', hiringType: 'Operations Manager / Area Manager', typicalPackage: '₹12 - 20 LPA' },
      { name: 'Flipkart', companyId: 'comp-flipkart', hiringType: 'Supply Chain Operations', typicalPackage: '₹10 - 18 LPA' },
      { name: 'Swiggy', companyId: 'comp-swiggy', hiringType: 'City Operations & Logistics', typicalPackage: '₹9 - 16 LPA' },
      { name: 'Zomato', companyId: 'comp-zomato', hiringType: 'Hyperlocal Operations', typicalPackage: '₹8 - 15 LPA' },
      { name: 'Walmart Global Tech', companyId: 'comp-walmart', hiringType: 'Retail Supply Chain Analytics', typicalPackage: '₹11 - 18 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Quantitative & Logic Assessment', roundType: 'OA', focus: 'Time, speed and distance, ratio, data interpretation, critical thinking', duration: '60 mins' },
      { roundName: 'Round 2: Operations Case Study', roundType: 'Case Study', focus: '"A warehouse delivery delay jumped from 2% to 11% this Diwali. How do you isolate and resolve the issue?"', duration: '60 mins' },
      { roundName: 'Round 3: Analytical & Excel Drill', roundType: 'Technical', focus: 'Data reconciliation, inventory turnover ratios, safety stock calculations', duration: '45 mins' },
      { roundName: 'Round 4: Leadership & Ground Execution Fit', roundType: 'HR', focus: 'Managing ground teams, handling crisis disruptions, labor coordination', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Operations Associate / Area Manager', description: 'Supervises shift teams, tracks daily fulfillment targets, audits return rates.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Operations Manager / Supply Chain Lead', description: 'Manages fulfillment center hub, optimizes logistics routes, manages vendor contracts.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Regional Operations Director', description: 'Directs logistics across multiple states/cities, leads multi-million dollar automation budgets.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Chief Operating Officer (COO) / VP Supply Chain', description: 'Directs global supply chain resilience, robotics adoption, and corporate margins.' }
    ],
    recommendedGuideSlugs: ['aptitude-reasoning', 'behavioral-hr'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'Operations & Supply Chain Fundamentals', actionItems: ['Study Economic Order Quantity (EOQ), Safety Stock, Bullwhip Effect, and JIT', 'Master Excel functions (INDEX-MATCH, SUMIFS, Pivot Tables, What-If Analysis)', 'Understand modern hyperlocal delivery models (Dark stores, 10-minute delivery)'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'Operations Case Studies', actionItems: ['Practice solving warehouse capacity and bottleneck optimization cases', 'Learn how Amazon uses fulfillment centers and sort centers', 'Understand Six Sigma DMAIC methodology'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Ground Leadership & Behavioral Polish', actionItems: ['Prepare STAR stories demonstrating leadership under pressure and conflict resolution', 'Study the target company\'s logistics network (e.g. Swiggy Instamart, Amazon Prime)', 'Practice timed quantitative aptitude drills'] }
    ]
  },
  {
    slug: 'human-resources',
    title: 'Human Resources & Talent Acquisition (HR)',
    category: 'Non-Technical',
    tagline: 'Source top talent, shape organizational culture, and manage employee lifecycle.',
    badge: 'People & Culture Custodian',
    iconName: 'Users',
    difficultyLevel: 'Moderate',
    salaryRange: '₹4 - 15 LPA',
    averageCTC: '₹7 LPA',
    overview: 'HR and Talent Acquisition professionals attract, evaluate, hire, and nurture the human capital of companies. In tech organizations, Technical Recruiters and HR Business Partners (HRBP) play a strategic role in scaling engineering teams and building high-performance work cultures.',
    dayInTheLife: 'Sourcing engineering candidates on LinkedIn Recruiter, conducting screening interviews, negotiating salary offers, resolving workplace grievances, and coordinating employee engagement programs.',
    responsibilities: [
      'Source, screen, and interview candidates for technical and non-technical vacancies.',
      'Coordinate campus recruitment drives and university placement partnerships.',
      'Manage employee onboarding, orientation, and training programs.',
      'Implement performance appraisal systems and employee feedback cycles.',
      'Ensure compliance with labor regulations and drive diversity, equity & inclusion (DEI).'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E (All Branches)', 'BBA / B.Com', 'BA Psychology / English / Economics', 'MBA HR / Any Post-Grad'],
      minCGPA: '6.0+',
      branchEligibility: 'Completely Open to All Degrees and Branches',
      keyPrerequisites: ['High emotional quotient (EQ) and active listening skills', 'Strong interpersonal diplomacy and organizational skills']
    },
    coreSkills: [
      { name: 'Talent Sourcing & Recruitment (LinkedIn, Portals)', level: 'Essential', category: 'Domain' },
      { name: 'Behavioral & Competency-Based Interviewing', level: 'Essential', category: 'Soft Skills' },
      { name: 'Human Resource Management Systems (HRMS)', level: 'Important', category: 'Tools' },
      { name: 'Compensation & Benefits Structure', level: 'Important', category: 'Domain' },
      { name: 'Employee Engagement & Conflict Mediation', level: 'Essential', category: 'Soft Skills' },
      { name: 'Labor Laws & Corporate Compliance', level: 'Important', category: 'Domain' },
      { name: 'Aptitude & Verbal Communication', level: 'Essential', category: 'Aptitude' }
    ],
    softSkills: ['High Empathy', 'Discretion & Confidentiality', 'Diplomatic Communication', 'Culture Champion'],
    radarSkills: [
      { subject: 'Talent Sourcing & Hiring', score: 95, fullMark: 100 },
      { subject: 'Interpersonal & Empathy', score: 98, fullMark: 100 },
      { subject: 'Interviewing & Evaluation', score: 90, fullMark: 100 },
      { subject: 'Verbal & Written English', score: 95, fullMark: 100 },
      { subject: 'Aptitude & Logic', score: 75, fullMark: 100 },
      { subject: 'Coding', score: 5, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'TCS', companyId: 'comp-tcs', hiringType: 'HR Trainee / Talent Acquisition', typicalPackage: '₹4 - 7 LPA' },
      { name: 'Infosys', companyId: 'comp-infosys', hiringType: 'Human Resources Practice', typicalPackage: '₹4 - 7.5 LPA' },
      { name: 'Google', companyId: 'comp-google', hiringType: 'People Operations / Recruiter', typicalPackage: '₹14 - 24 LPA' },
      { name: 'Amazon', companyId: 'comp-amazon', hiringType: 'HR Business Partner (HRBP)', typicalPackage: '₹12 - 20 LPA' },
      { name: 'Wipro', companyId: 'comp-wipro', hiringType: 'Talent Acquisition Team', typicalPackage: '₹4 - 7 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Verbal Ability & Personality Assessment', roundType: 'OA', focus: 'English comprehension, grammar, situational workplace judgment test', duration: '45 mins' },
      { roundName: 'Round 2: Group Discussion (GD) / Case Presentation', roundType: 'Case Study', focus: 'Participating in a structured GD on modern workplace topics (e.g. Remote vs Office, AI in hiring)', duration: '45 mins' },
      { roundName: 'Round 3: HR Domain & Behavioral Interview', roundType: 'Technical', focus: 'Competency-based questions: resolving teammate disputes, handling candidate drop-offs', duration: '45 mins' },
      { roundName: 'Round 4: Leadership & Fitment Interview', roundType: 'HR', focus: 'Long-term commitment, integrity, alignment with company values', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'HR Trainee / Technical Recruiter Associate', description: 'Sources candidates, coordinates interview schedules, conducts first-round screenings.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior Recruiter / HRBP Specialist', description: 'Partners with engineering VPs to staff full departments, manages performance reviews.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Head of Talent Acquisition / Senior HRBP', description: 'Directs campus placement strategy, designs corporate compensation & ESOP plans.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Chief Human Resources Officer (CHRO) / VP People', description: 'Guides board on talent strategy, executive succession, and organizational culture.' }
    ],
    recommendedGuideSlugs: ['behavioral-hr', 'aptitude-reasoning'],
    prepRoadmap: [
      { phase: 'Phase 1', timeline: 'Month 1', focus: 'HR Fundamentals & Recruitment', actionItems: ['Study recruitment funnels: Sourcing, Screening, Assessment, Offer, Onboarding', 'Understand compensation terms: CTC, Fixed, Variable, ESOPs, PF, Gratuity', 'Learn LinkedIn boolean search operators (AND, OR, NOT, title:"software")'] },
      { phase: 'Phase 2', timeline: 'Month 2', focus: 'Group Discussions & Soft Skills', actionItems: ['Practice participating in Group Discussions (GD) with structured opening and summarization', 'Learn modern workplace trends: Hybrid work policies, retention strategies, burnout mitigation', 'Review labor compliance basics in India'] },
      { phase: 'Phase 3', timeline: 'Month 3', focus: 'Mock Interviews & Scenario Handling', actionItems: ['Prepare structured answers for classic HR dilemmas (e.g. employee underperformance, counteroffers)', 'Conduct mock behavioral interviews with peers', 'Demonstrate proven leadership and organizational record from campus events'] }
    ]
  }
];

export function getCareerRoleBySlug(slug: string): CareerRole | undefined {
  return CAREER_ROLES.find((role) => role.slug === slug);
}
