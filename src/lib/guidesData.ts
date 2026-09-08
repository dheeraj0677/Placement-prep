export interface GuideProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platform: 'LeetCode' | 'GeeksforGeeks' | 'HDLBits' | 'Edaplayground' | string;
  url: string;
  pattern: string;
  whyAsked: string;
  keyTakeaway: string;
}

export interface GuideConcept {
  title: string;
  description: string;
  badge?: string;
}

export interface PrepGuide {
  slug: string;
  title: string;
  tag: string;
  category: 'DSA' | 'CS Fundamentals' | 'System Design' | 'Soft Skills' | 'VLSI & Hardware' | 'Embedded Systems';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  iconName: string;
  shortDescription: string;
  overview: string;
  importanceWeight: string;
  concepts: GuideConcept[];
  problems: GuideProblem[];
  interviewTips: string[];
  recommendedOrder: string[];
  testedCompanies: string[];
}

export const PREP_GUIDES: PrepGuide[] = [
  {
    slug: 'dynamic-programming',
    title: 'Dynamic Programming Master Guide',
    tag: 'DP',
    category: 'DSA',
    difficulty: 'Advanced',
    estimatedHours: 24,
    iconName: 'Cpu',
    shortDescription: 'Master 1D, 2D, Grid, Knapsack, and String DP patterns that dominate Google, Infosys SP, Amazon & Microsoft rounds.',
    overview: 'Dynamic Programming (DP) is the single most tested advanced algorithmic topic in on-campus and off-campus placements. Companies use DP to evaluate your ability to identify overlapping subproblems, formulate state transitions, and optimize brute-force recursion into O(N) or O(N*M) space-time solutions.',
    importanceWeight: 'Tested in 85% of Product & High-Package Rounds',
    concepts: [
      {
        title: 'State Definition & Transition Equations',
        description: 'Learn to define dp[i] or dp[i][j] representing the optimal answer for a subproblem of size i,j. The transition relation is the core of 90% of DP solutions.',
        badge: 'Fundamental'
      },
      {
        title: 'Memoization (Top-Down) vs Tabulation (Bottom-Up)',
        description: 'Understand recursive memoization with recursion stack space overhead vs iterative table filling with O(1) auxiliary variable space optimizations.',
        badge: 'Core Pattern'
      },
      {
        title: '0/1 & Unbounded Knapsack Variants',
        description: 'Subset sum, equal partition, coin change, and rod cutting. Learn to distinguish between choosing items once vs infinite choices.',
        badge: 'High Frequency'
      },
      {
        title: 'DP on Strings (LCS, Edit Distance, Palindromes)',
        description: '2D matrix DP comparing string prefixes/suffixes. Common questions focus on insertion, deletion, and subsequence matching.',
        badge: 'FAANG Favorite'
      },
      {
        title: 'DP on Trees & Graphs',
        description: 'Post-order tree traversals computing states (e.g., Tree Diameter, Max Path Sum, House Robber III, Independent Sets).',
        badge: 'Hard OA Pattern'
      },
      {
        title: 'Bitmask & Digit DP',
        description: 'State compression using integer bit representations (N <= 20) and counting numbers with specific digit properties.',
        badge: 'OA Special'
      }
    ],
    problems: [
      {
        id: 'dp-1',
        title: 'Climbing Stairs',
        difficulty: 'Easy',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/climbing-stairs/',
        pattern: '1D State Transition / Fibonacci',
        whyAsked: 'Warm-up question to test if you instinctively recognize base cases and O(1) space optimization.',
        keyTakeaway: 'dp[i] = dp[i-1] + dp[i-2]. Only keep previous two variables instead of full array.'
      },
      {
        id: 'dp-2',
        title: 'Coin Change (Min Coins)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/coin-change/',
        pattern: 'Unbounded Knapsack / 1D DP',
        whyAsked: 'Standard problem to test unbounded choice logic and unreachable state handling with infinity.',
        keyTakeaway: 'Iterate coin values outer or inner; dp[amount] = min(dp[amount], dp[amount - coin] + 1).'
      },
      {
        id: 'dp-3',
        title: 'Longest Increasing Subsequence (LIS)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
        pattern: 'Subsequence DP / Binary Search',
        whyAsked: 'Interviewers look for the initial O(N^2) DP, followed by the O(N log N) patience sorting / binary search optimization.',
        keyTakeaway: 'dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]; optimize with std::lower_bound array.'
      },
      {
        id: 'dp-4',
        title: 'Longest Common Subsequence (LCS)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/longest-common-subsequence/',
        pattern: '2D String DP Matrix',
        whyAsked: 'The cornerstone of all string DP problems (Edit Distance, Shortest Common Supersequence, etc.).',
        keyTakeaway: 'If s1[i-1] == s2[j-1], dp[i][j] = 1 + dp[i-1][j-1]; else max(dp[i-1][j], dp[i][j-1]).'
      },
      {
        id: 'dp-5',
        title: '0/1 Knapsack Problem',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0929/1',
        pattern: '0/1 Knapsack Decision Tree',
        whyAsked: 'Foundational concept for bounded decision problems like Partition Equal Subset Sum and Target Sum.',
        keyTakeaway: 'Reverse 1D array loop from W down to wt[i] to prevent reusing the same item multiple times in 1D space.'
      },
      {
        id: 'dp-6',
        title: 'Edit Distance',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/edit-distance/',
        pattern: '2D String Transformation DP',
        whyAsked: 'Asked heavily at Amazon, Microsoft, and Infosys SP to test multi-branch minimum cost transitions.',
        keyTakeaway: 'Cost of Insert (dp[i][j-1]), Delete (dp[i-1][j]), and Replace (dp[i-1][j-1]).'
      },
      {
        id: 'dp-7',
        title: 'House Robber III (DP on Trees)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/house-robber-iii/',
        pattern: 'Tree Post-Order DP',
        whyAsked: 'Tests ability to pass DP state vectors [rob_this_node, skip_this_node] up the tree recursively.',
        keyTakeaway: 'Return a pair/tuple (robWithRoot, robWithoutRoot) from each subtree.'
      },
      {
        id: 'dp-8',
        title: 'Partition Equal Subset Sum',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/partition-equal-subset-sum/',
        pattern: 'Subset Sum / 0-1 Knapsack',
        whyAsked: 'Transforming word problems into standard knapsack formulations.',
        keyTakeaway: 'If total sum is odd, return false; otherwise find if subset sum exists equal to sum / 2.'
      },
      {
        id: 'dp-9',
        title: 'Trapping Rain Water (DP / Two Pointers)',
        difficulty: 'Hard',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/trapping-rain-water/',
        pattern: 'Prefix & Suffix Max Arrays',
        whyAsked: 'Tests transition from O(N) auxiliary space DP arrays to O(1) space two-pointer approach.',
        keyTakeaway: 'Water trapped at i = min(max_left[i], max_right[i]) - height[i].'
      },
      {
        id: 'dp-10',
        title: 'Burst Balloons',
        difficulty: 'Hard',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/burst-balloons/',
        pattern: 'Matrix Chain Multiplication (MCM) / Interval DP',
        whyAsked: 'Google and Samsung favorite for high-package fresher roles.',
        keyTakeaway: 'Think backwards: pick which balloon is popped LAST in range [i, j], decoupling left and right subproblems.'
      }
    ],
    interviewTips: [
      'Always start by writing down the brute-force recursive tree and identifying repeated nodes before writing DP table code.',
      'Clearly explain what your dp array state represents (e.g. "dp[i][j] is the minimum operations to convert s1[0..i] to s2[0..j]").',
      'Demonstrate space optimization: after solving in 2D O(N*M), show how you only need the previous row O(M) or variables O(1).',
      'Handle edge cases upfront: empty inputs, single elements, negative numbers, and integer overflow bounds.'
    ],
    recommendedOrder: [
      '1. Master 1D Fibonacci & Climbing Stairs style problems',
      '2. Learn 0/1 Knapsack and Unbounded Knapsack state reductions',
      '3. Solve 2D Grid DP (Unique Paths, Min Path Sum)',
      '4. Tackle String DP (LCS, Longest Palindromic Substring, Edit Distance)',
      '5. Progress to DP on Trees and Interval/MCM DP'
    ],
    testedCompanies: ['Google', 'Amazon', 'Microsoft', 'Infosys', 'Samsung R&D', 'Walmart Global Tech', 'Flipkart', 'Goldman Sachs']
  },
  {
    slug: 'graphs',
    title: 'Graphs & Network Algorithms Roadmap',
    tag: 'Graphs',
    category: 'DSA',
    difficulty: 'Advanced',
    estimatedHours: 20,
    iconName: 'Network',
    shortDescription: 'Master BFS, DFS, Dijkstra, Topological Sort, Disjoint Set Union (DSU), and Shortest Paths for top tech interviews.',
    overview: 'Graphs model real-world systems like social networks, dependency graphs, road navigation, and computer networks. Interviewers at companies like Google, Samsung R&D, Uber, and Atlassian frequently test graph modeling.',
    importanceWeight: 'Tested in 78% of Tier-1 Technical Rounds',
    concepts: [
      {
        title: 'Graph Representation & Traversals',
        description: 'Adjacency List vs Adjacency Matrix, Breadth-First Search (queue) for shortest path in unweighted graphs, Depth-First Search (recursion/stack).',
        badge: 'Fundamental'
      },
      {
        title: 'Cycle Detection (Directed vs Undirected)',
        description: 'Cycle detection using DFS visited states (0=unvisited, 1=visiting, 2=visited for directed) and parent pointers or DSU for undirected graphs.',
        badge: 'High Frequency'
      },
      {
        title: 'Topological Sort (Kahn’s Algorithm & DFS)',
        description: 'Linear ordering of vertices for Directed Acyclic Graphs (DAGs). Crucial for dependency resolution, task scheduling, and compilation order.',
        badge: 'Must Know'
      },
      {
        title: 'Shortest Path (Dijkstra & Bellman-Ford)',
        description: 'Dijkstra with Priority Queue (min-heap) for non-negative edge weights O((V+E) log V). Bellman-Ford for negative edge weights.',
        badge: 'FAANG Standard'
      },
      {
        title: 'Disjoint Set Union (DSU / Union-Find)',
        description: 'Union by rank and path compression O(alpha(N)). Used in Kruskal’s Minimum Spanning Tree and dynamic connectivity.',
        badge: 'Core Pattern'
      },
      {
        title: 'Bipartite Graphs & Graph Coloring',
        description: '2-color BFS/DFS to verify if vertices can be divided into two disjoint sets without intra-set edges.',
        badge: 'Intermediate'
      }
    ],
    problems: [
      {
        id: 'g-1',
        title: 'Number of Islands (Grid BFS/DFS)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/number-of-islands/',
        pattern: '2D Grid Graph Traversal',
        whyAsked: 'The most popular graph problem in tech interview history. Tests matrix-to-graph translation and in-place visited marking.',
        keyTakeaway: 'Traverse 4 directions (dr, dc). Mark visited cells as "0" to save memory.'
      },
      {
        id: 'g-2',
        title: 'Rotting Oranges',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/rotting-oranges/',
        pattern: 'Multi-Source BFS',
        whyAsked: 'Tests queue-based level-order multi-source BFS to calculate simultaneous unit-time propagation.',
        keyTakeaway: 'Push all initial rotten oranges into the queue together; count levels until all fresh are reached.'
      },
      {
        id: 'g-3',
        title: 'Course Schedule I & II',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/course-schedule/',
        pattern: 'Topological Sort / Kahn’s In-Degree Algorithm',
        whyAsked: 'Classic dependency resolution problem asked in almost every tech company OA.',
        keyTakeaway: 'Compute in-degrees of each course; push 0 in-degree nodes into queue; count processed vertices.'
      },
      {
        id: 'g-4',
        title: 'Network Delay Time',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/network-delay-time/',
        pattern: 'Dijkstra’s Algorithm with Min-Heap',
        whyAsked: 'Direct evaluation of shortest path in weighted directed graphs.',
        keyTakeaway: 'Maintain min-heap of (dist, u); if dist > distTo[u] skip; relax neighbors v with dist + w < distTo[v].'
      },
      {
        id: 'g-5',
        title: 'Word Ladder (Shortest Transformation)',
        difficulty: 'Hard',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/word-ladder/',
        pattern: 'Implicit State Graph BFS / Bi-directional BFS',
        whyAsked: 'Tests candidate ability to formulate an implicit graph where words are vertices and 1-letter diffs are edges.',
        keyTakeaway: 'Use standard BFS on word set mutations, or Bi-directional BFS from start and end to reduce search space.'
      },
      {
        id: 'g-6',
        title: 'Redundant Connection (Cycle in Undirected Graph)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/redundant-connection/',
        pattern: 'Disjoint Set Union (DSU)',
        whyAsked: 'Tests understanding of connected components and union-find with path compression.',
        keyTakeaway: 'If find(u) == find(v), adding edge (u, v) creates a cycle and is the redundant edge.'
      },
      {
        id: 'g-7',
        title: 'Is Graph Bipartite?',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/is-graph-bipartite/',
        pattern: '2-Coloring BFS / DFS',
        whyAsked: 'Tests graph partitioning and odd-length cycle detection.',
        keyTakeaway: 'Color node with 1, neighbors with -1. If neighbor already has same color as current node, return false.'
      },
      {
        id: 'g-8',
        title: 'Cheapest Flights Within K Stops',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
        pattern: 'Bellman-Ford / Modified BFS',
        whyAsked: 'Evaluates shortest path bounded by step counts (k hops).',
        keyTakeaway: 'Relax edges exactly K+1 times using previous iteration’s distance array copy.'
      }
    ],
    interviewTips: [
      'Always state whether the graph is directed or undirected, and whether edge weights can be negative.',
      'Check for disconnected components — run your BFS/DFS in a loop over all vertices 1..V.',
      'Beware of 2D grid matrix edge boundaries: write a helper function isValid(r, c) to keep code clean and bug-free.',
      'Remember time complexities: BFS/DFS is O(V + E) with adjacency list, O(V^2) with matrix.'
    ],
    recommendedOrder: [
      '1. Grid graph traversals (Number of Islands, Flood Fill)',
      '2. Cycle detection algorithms in directed/undirected graphs',
      '3. Kahn’s algorithm for Topological Sort & Course Schedule',
      '4. Dijkstra algorithm with Priority Queue',
      '5. Union-Find / DSU pattern & Minimum Spanning Tree'
    ],
    testedCompanies: ['Samsung R&D', 'Google', 'Microsoft', 'Uber', 'Infosys', 'Atlassian', 'Flipkart']
  },
  {
    slug: 'trees',
    title: 'Trees, BST & Trie Complete Blueprint',
    tag: 'Trees',
    category: 'DSA',
    difficulty: 'Intermediate',
    estimatedHours: 18,
    iconName: 'GitBranch',
    shortDescription: 'Master Binary Trees, BSTs, Traversals, Lowest Common Ancestor (LCA), and Prefix Tries for interview success.',
    overview: 'Tree data structures are the backbone of technical interviews. They test recursive intuition, divide-and-conquer strategy, pointer manipulation, and hierarchical indexing like Prefix Tries used in search engines.',
    importanceWeight: 'Tested in 90% of Tech Interviews',
    concepts: [
      {
        title: 'Traversals (Inorder, Preorder, Postorder, Level-Order)',
        description: 'Understand recursive vs iterative traversals with stacks and level-order with queues. BST inorder traversal gives sorted order.',
        badge: 'Fundamental'
      },
      {
        title: 'Tree Construction & Serialization',
        description: 'Reconstructing trees from preorder/inorder or postorder/inorder, and serializing/deserializing binary trees.',
        badge: 'High Frequency'
      },
      {
        title: 'Lowest Common Ancestor (LCA)',
        description: 'Finding the lowest shared ancestor node in standard Binary Trees O(N) and Binary Search Trees O(H).',
        badge: 'FAANG Favorite'
      },
      {
        title: 'Binary Search Tree (BST) Operations',
        description: 'Search, Insert, Delete node (3 cases), Validate BST, Inorder Successor in O(H) average time.',
        badge: 'Core Pattern'
      },
      {
        title: 'Prefix Trees (Trie)',
        description: 'Character node tree with isEndOfWord boolean. Essential for autocomplete, prefix search, and maximum XOR problems.',
        badge: 'Search OA Essential'
      }
    ],
    problems: [
      {
        id: 'tree-1',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        pattern: 'Divide and Conquer / Post-Order',
        whyAsked: 'Tests core understanding of recursive height calculation: 1 + max(left, right).',
        keyTakeaway: 'Base case: root == null return 0. Recurse left and right subtrees.'
      },
      {
        id: 'tree-2',
        title: 'Validate Binary Search Tree',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/validate-binary-search-tree/',
        pattern: 'Range Bound Invariant / Inorder Traversal',
        whyAsked: 'Tests subtle BST pitfall where every left node must be less than root AND its ancestors.',
        keyTakeaway: 'Pass (min_val, max_val) bounds recursively: validate(node->left, min, node->val).'
      },
      {
        id: 'tree-3',
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        pattern: 'Recursive Bottom-Up Signaling',
        whyAsked: 'Universal tech interview question asked across Google, Amazon, Microsoft, and Adobe.',
        keyTakeaway: 'If current node matches p or q, return root. If both left and right return non-null, root is the LCA.'
      },
      {
        id: 'tree-4',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        pattern: 'Queue-based BFS',
        whyAsked: 'Essential pattern for generating level-by-level groupings and calculating tree widths.',
        keyTakeaway: 'Snapshot queue length `int size = q.size()` at the start of each level loop.'
      },
      {
        id: 'tree-5',
        title: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
        pattern: 'Post-Order with Global Variable',
        whyAsked: 'Evaluates distinction between path passing through root vs path returned to parent node.',
        keyTakeaway: 'Global max updated with `left_gain + right_gain + val`; return `val + max(left_gain, right_gain)` to parent.'
      },
      {
        id: 'tree-6',
        title: 'Implement Trie (Prefix Tree)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
        pattern: 'Trie Node Array / Hashmap',
        whyAsked: 'Building autocomplete and prefix lookup systems from scratch.',
        keyTakeaway: 'Each node contains children pointers array `children[26]` and boolean `isEnd`.'
      },
      {
        id: 'tree-7',
        title: 'Top View of Binary Tree',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1',
        pattern: 'Vertical Coordinate BFS + Hash Map',
        whyAsked: 'Classic on-campus placement question in TCS, Infosys, and Amazon tests.',
        keyTakeaway: 'Pair nodes with horizontal coordinate hd; store first node visited at each hd in map.'
      }
    ],
    interviewTips: [
      'Think recursively: "If I already had the answer for the left subtree and right subtree, what do I do at the current node?"',
      'Pay attention to recursion stack space: skewed trees can cause O(N) call stack depth and stack overflow.',
      'For BST problems, always exploit the sorting property (left < root < right) to avoid full O(N) traversals.'
    ],
    recommendedOrder: [
      '1. Basic recursions: Max Depth, Invert Tree, Same Tree',
      '2. Level order BFS and Tree Views (Left/Right/Top/Bottom)',
      '3. BST operations and validation',
      '4. Lowest Common Ancestor and Path Sum variations',
      '5. Trie implementation and Maximum XOR queries'
    ],
    testedCompanies: ['Amazon', 'Infosys', 'TCS', 'Microsoft', 'Adobe', 'Walmart Global Tech', 'Google']
  },
  {
    slug: 'arrays-strings',
    title: 'Arrays, Two Pointers & Sliding Window Guide',
    tag: 'Arrays & Strings',
    category: 'DSA',
    difficulty: 'Beginner',
    estimatedHours: 16,
    iconName: 'Code',
    shortDescription: 'Master Two Pointers, Sliding Window, Prefix Sums, Binary Search, and Kadane’s Algorithm for Online Assessments.',
    overview: 'Arrays and Strings make up over 40% of all Online Assessment (OA) questions. Mastering two pointers, sliding window frequency counters, and prefix arrays enables you to breeze through round 1 coding tests across TCS, Wipro, Capgemini, Infosys, Amazon, and Google.',
    importanceWeight: 'Tested in 95% of Online Assessments',
    concepts: [
      {
        title: 'Two Pointers (Opposite & Same Direction)',
        description: 'Left and right pointers moving inward on sorted arrays, or fast/slow pointers for in-place removals and cycle detection.',
        badge: 'Fundamental'
      },
      {
        title: 'Sliding Window (Fixed & Dynamic Size)',
        description: 'Maintain window state with hash maps or frequency arrays. Expand right pointer to satisfy conditions; shrink left pointer to optimize.',
        badge: 'High Frequency'
      },
      {
        title: 'Prefix Sums & Hashmap Lookups',
        description: 'Computing running sums prefix[i] to query subarray sums in O(1). Combine with hashmap to find subarrays matching target sums in O(N).',
        badge: 'Core Pattern'
      },
      {
        title: 'Binary Search & Binary Search on Answer',
        description: 'Standard binary search O(log N), search in rotated sorted arrays, and binary search on monotonic answer spaces.',
        badge: 'OA Favorite'
      },
      {
        title: 'Kadane’s Algorithm',
        description: 'Finding maximum contiguous subarray sum in O(N) time and O(1) space.',
        badge: 'Must Know'
      }
    ],
    problems: [
      {
        id: 'arr-1',
        title: 'Two Sum',
        difficulty: 'Easy',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/two-sum/',
        pattern: 'Hashmap Complement Lookup',
        whyAsked: 'The absolute standard benchmark for hash table problem solving in O(N) time.',
        keyTakeaway: 'Store `map[target - nums[i]] = i` and check if current element exists in map.'
      },
      {
        id: 'arr-2',
        title: '3Sum',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/3sum/',
        pattern: 'Sorting + Two Pointers with Deduplication',
        whyAsked: 'Tests handling duplicate triplets cleanly while maintaining O(N^2) time complexity.',
        keyTakeaway: 'Sort array; fix first element i, then use two pointers left/right; skip identical adjacent elements.'
      },
      {
        id: 'arr-3',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        pattern: 'Dynamic Sliding Window with Hashmap',
        whyAsked: 'Tests clean window boundary tracking and character index jumping.',
        keyTakeaway: 'Store last seen index of characters in map; if duplicate seen, jump left pointer to `max(left, map[c] + 1)`.'
      },
      {
        id: 'arr-4',
        title: 'Maximum Subarray (Kadane’s Algorithm)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/maximum-subarray/',
        pattern: 'Kadane’s Algorithm / Greedy DP',
        whyAsked: 'Tests understanding of when to abandon negative prefixes.',
        keyTakeaway: '`current_sum = max(nums[i], current_sum + nums[i])`; `max_sum = max(max_sum, current_sum)`.'
      },
      {
        id: 'arr-5',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
        pattern: 'Prefix Sum + Hash Map Frequency',
        whyAsked: 'Crucial distinction between sliding window (positive numbers only) vs prefix sums with negatives.',
        keyTakeaway: '`prefix_sum - k` in map gives count of subarrays ending at current index with sum k.'
      },
      {
        id: 'arr-6',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        pattern: 'Modified Binary Search with Sorted Half Detection',
        whyAsked: 'Tests ability to identify which half is normally sorted in O(log N).',
        keyTakeaway: 'At least one half is guaranteed sorted; check if target falls in sorted range.'
      }
    ],
    interviewTips: [
      'Clarify if array is sorted: if so, binary search or two pointers are almost always the intended O(log N) or O(N) solution.',
      'Check if values can be negative: if values are strictly positive, sliding window works; if negative, you must use prefix sum + hashmap.',
      'Watch out for integer overflows with `mid = low + (high - low) / 2`.'
    ],
    recommendedOrder: [
      '1. Two Sum and basic hash map frequency counting',
      '2. Two-pointer problems: 2Sum II, 3Sum',
      '3. Sliding window templates (fixed vs dynamic window size)',
      '4. Prefix sum with hash maps for subarray problems',
      '5. Binary search on answer space'
    ],
    testedCompanies: ['TCS', 'Infosys', 'Capgemini', 'Wipro', 'Cognizant', 'Accenture', 'Amazon', 'JP Morgan Chase']
  },
  {
    slug: 'system-design',
    title: 'System Design (HLD & LLD) Masterclass',
    tag: 'System Design',
    category: 'System Design',
    difficulty: 'Advanced',
    estimatedHours: 25,
    iconName: 'Layers',
    shortDescription: 'High-Level Design (HLD) scalability blueprints & Low-Level Design (LLD) object-oriented machine coding for senior rounds.',
    overview: 'System Design interviews evaluate how you architect large-scale distributed systems that handle millions of requests, ensure high availability, minimize latency, and maintain data consistency across microservices.',
    importanceWeight: 'Tested in 100% of FTE & Tier-1 Hiring Rounds',
    concepts: [
      {
        title: 'High-Level Scalability Building Blocks',
        description: 'Load Balancers (Nginx/HAProxy), Horizontal vs Vertical scaling, Reverse Proxies, CDN edge caching, and DNS round-robin.',
        badge: 'Architecture'
      },
      {
        title: 'Database Choices & Partitioning',
        description: 'SQL vs NoSQL, Database Sharding, Master-Slave Replication, and CAP Theorem tradeoffs.',
        badge: 'Core Pattern'
      },
      {
        title: 'Caching Strategies & Eviction',
        description: 'Redis & Memcached, Cache-Aside, Write-Through, Write-Behind caching, and Eviction policies (LRU, LFU) with TTL.',
        badge: 'High Frequency'
      },
      {
        title: 'Asynchronous Processing & Message Queues',
        description: 'Event-driven architectures using Apache Kafka, RabbitMQ, Publisher-Subscriber models, and dead-letter queues.',
        badge: 'FAANG Standard'
      },
      {
        title: 'Low-Level Design (LLD) & Clean Code',
        description: 'SOLID principles, Design Patterns (Singleton, Factory, Strategy, Observer), and schema diagrams for machine coding.',
        badge: 'Flipkart/Swiggy Special'
      }
    ],
    problems: [
      {
        id: 'sd-1',
        title: 'Design URL Shortener (TinyURL)',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/system-design-url-shortening-service/',
        pattern: 'Base62 Encoding + Distributed ID Generation',
        whyAsked: 'The standard introductory HLD problem testing capacity estimation, encoding, and caching.',
        keyTakeaway: 'Use Base62 encoding on 64-bit auto-incrementing IDs generated via Snowflake / Key-Generation Service.'
      },
      {
        id: 'sd-2',
        title: 'Design LRU Cache (LLD / DSA)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/lru-cache/',
        pattern: 'Doubly Linked List + Hash Map',
        whyAsked: 'Universal machine coding problem testing O(1) get and put operations without built-in libraries.',
        keyTakeaway: 'Combine a HashMap storing key -> Node pointers with a Doubly Linked List keeping most recently used at head.'
      },
      {
        id: 'sd-3',
        title: 'Design Parking Lot System (LLD Machine Coding)',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/design-parking-lot-using-object-oriented-analysis-and-design/',
        pattern: 'Strategy Pattern + Factory Pattern',
        whyAsked: 'Standard Flipkart / Swiggy / Amazon machine coding round to test OOP modeling and extensible interfaces.',
        keyTakeaway: 'Separate Vehicle, Spot, Ticket, and ParkingStrategy interfaces for clean polymorphic slot allocation.'
      },
      {
        id: 'sd-4',
        title: 'Design Video Streaming Platform (YouTube / Netflix)',
        difficulty: 'Hard',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/system-design-netflix-a-complete-architecture/',
        pattern: 'Video Transcoding Pipeline + CDN Storage',
        whyAsked: 'Tests understanding of chunked video encoding (HLS/DASH), edge CDN caching, and asynchronous video ingestion pipelines.',
        keyTakeaway: 'Store raw video in S3 blob store, trigger async worker jobs to transcode to multiple resolutions, and deliver via CDN.'
      }
    ],
    interviewTips: [
      'Follow the 4-step framework: 1. Scope functional & non-functional requirements. 2. Back-of-the-envelope estimations. 3. High-level diagram. 4. Deep dive into bottlenecks.',
      'Never jump straight into drawing boxes — clarify reads vs writes ratio and QPS (Queries Per Second) first.',
      'Always discuss single points of failure (SPOF).'
    ],
    recommendedOrder: [
      '1. Learn the building blocks: Load Balancers, Caching, Sharding, Replication',
      '2. Master LLD: SOLID principles and LRU Cache / Rate Limiter implementations',
      '3. Solve Classic HLD: TinyURL, Rate Limiter, and Notification System',
      '4. Scale to Data Heavy: Social Media Feed, WhatsApp Chat, YouTube'
    ],
    testedCompanies: ['Google', 'Amazon', 'Flipkart', 'Swiggy', 'Zomato', 'Walmart Global Tech', 'Uber']
  },
  {
    slug: 'dbms',
    title: 'Database Management Systems & SQL Interview Guide',
    tag: 'DBMS',
    category: 'CS Fundamentals',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    iconName: 'Database',
    shortDescription: 'Master SQL Joins, Indexing B-Trees, Normalization, ACID Transactions, and Concurrency Control for placement tests.',
    overview: 'DBMS is tested in almost every placement assessment (OA) through SQL queries and in technical interviews across TCS, Infosys, Capgemini, Oracle, and Goldman Sachs.',
    importanceWeight: 'Tested in 88% of Campus & Tech Interviews',
    concepts: [
      {
        title: 'SQL Queries, Joins & Window Functions',
        description: 'INNER, LEFT, RIGHT joins; GROUP BY and HAVING filters; Window functions like ROW_NUMBER(), DENSE_RANK().',
        badge: 'High Frequency'
      },
      {
        title: 'Indexing & B-Tree / B+Tree Internals',
        description: 'Clustered vs Non-Clustered Indexes, composite index column ordering rule, index lookups vs index scans.',
        badge: 'Deep Dive'
      },
      {
        title: 'ACID Properties & Transaction States',
        description: 'Atomicity (Undo Logs), Consistency, Isolation (Locks & MVCC), and Durability (Write-Ahead Logging / Redo Logs).',
        badge: 'Core Concept'
      },
      {
        title: 'Database Normalization (1NF to BCNF)',
        description: 'Functional dependencies, eliminating insertion/deletion/update anomalies, decomposing tables into 1NF, 2NF, 3NF, and BCNF.',
        badge: 'Campus Standard'
      },
      {
        title: 'Locking & Concurrency Control (2PL)',
        description: 'Shared vs Exclusive locks, Two-Phase Locking (2PL) protocol, Deadlock detection and prevention.',
        badge: 'Must Know'
      }
    ],
    problems: [
      {
        id: 'db-1',
        title: 'Second Highest Salary (SQL)',
        difficulty: 'Easy',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/second-highest-salary/',
        pattern: 'LIMIT OFFSET / Subquery / DENSE_RANK()',
        whyAsked: 'The most asked SQL question in junior technical interviews at TCS, Infosys, and Cognizant.',
        keyTakeaway: '`SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary`.'
      },
      {
        id: 'db-2',
        title: 'Department Top Three Salaries',
        difficulty: 'Hard',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/department-top-three-salaries/',
        pattern: 'SQL Window Functions with DENSE_RANK()',
        whyAsked: 'Tests window functions over partitioned tables and join logic.',
        keyTakeaway: 'Use `DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)` as ranking filter `<= 3`.'
      },
      {
        id: 'db-3',
        title: 'Duplicate Emails & In-Place Delete',
        difficulty: 'Easy',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/delete-duplicate-emails/',
        pattern: 'GROUP BY HAVING / Self Join Deletion',
        whyAsked: 'Tests SQL data manipulation and self-joins for deduplication.',
        keyTakeaway: '`DELETE p1 FROM Person p1, Person p2 WHERE p1.email = p2.email AND p1.id > p2.id`.'
      }
    ],
    interviewTips: [
      'Always clarify SQL dialect: MySQL, PostgreSQL, or SQL Server before writing window function queries.',
      'Explain B+Tree indexing clearly: leaf nodes are linked sequentially for fast range scans.',
      'Memorize the 4 Isolation levels and their corresponding anomalies (Dirty Read, Non-Repeatable Read, Phantom Read).'
    ],
    recommendedOrder: [
      '1. Basic SQL: SELECT, WHERE, GROUP BY, HAVING, and Aggregations',
      '2. Intermediate SQL: Joins (Inner, Left, Self) and Subqueries',
      '3. Advanced SQL: Window Functions (ROW_NUMBER, DENSE_RANK)',
      '4. Theory: Indexing (B+ Trees), ACID, and Normalization (1NF-BCNF)'
    ],
    testedCompanies: ['TCS', 'Infosys', 'Capgemini', 'Cognizant', 'Oracle', 'Goldman Sachs', 'JP Morgan Chase']
  },
  {
    slug: 'operating-systems',
    title: 'Operating Systems & Concurrency Deep Dive',
    tag: 'OS',
    category: 'CS Fundamentals',
    difficulty: 'Intermediate',
    estimatedHours: 14,
    iconName: 'Terminal',
    shortDescription: 'Master Processes, Threads, Mutexes, Semaphores, Deadlocks, Virtual Memory Paging, and CPU Scheduling.',
    overview: 'Operating Systems knowledge separates candidates who just memorize code from genuine software engineers who understand CPU scheduling, memory hierarchies, processes, and synchronization.',
    importanceWeight: 'Tested in 78% of Core CS Interviews',
    concepts: [
      {
        title: 'Processes vs Threads & Context Switching',
        description: 'Process memory layout (Text, Data, Heap, Stack), Thread Control Blocks (TCB) vs PCB, and context switch overhead.',
        badge: 'Fundamental'
      },
      {
        title: 'Concurrency, Race Conditions & Synchronization',
        description: 'Critical sections, Mutex locks, Counting & Binary Semaphores, Atomic instructions (Test-and-Set, Compare-And-Swap).',
        badge: 'Core Pattern'
      },
      {
        title: 'Deadlocks (Conditions & Prevention)',
        description: 'The 4 Coffman conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait); Banker’s algorithm for deadlock avoidance.',
        badge: 'High Frequency'
      },
      {
        title: 'Virtual Memory & Page Replacement',
        description: 'MMU translation, Page Tables, TLB cache, Page Faults, Thrashing, and Page Replacement Algorithms (FIFO, LRU, Optimal).',
        badge: 'Must Know'
      },
      {
        title: 'CPU Scheduling Algorithms',
        description: 'FCFS, Shortest Job First (SJF / SRTF), Round Robin with time quantum tradeoffs, and Multi-level Feedback Queues.',
        badge: 'Campus Standard'
      }
    ],
    problems: [
      {
        id: 'os-1',
        title: 'Print in Order (Thread Synchronization)',
        difficulty: 'Easy',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/print-in-order/',
        pattern: 'Condition Variables / Semaphores',
        whyAsked: 'Tests practical multi-threading synchronization in Java / C++ / Python.',
        keyTakeaway: 'Use atomic flags, semaphores, or condition variable wait/signal to enforce sequential execution.'
      },
      {
        id: 'os-2',
        title: 'The Dining Philosophers Problem',
        difficulty: 'Medium',
        platform: 'LeetCode',
        url: 'https://leetcode.com/problems/the-dining-philosophers/',
        pattern: 'Deadlock Prevention by Breaking Circular Wait',
        whyAsked: 'Classic synchronization problem testing resource hierarchy ordering.',
        keyTakeaway: 'Enforce asymmetric fork acquisition (odd philosophers pick left first, even pick right first).'
      },
      {
        id: 'os-3',
        title: 'Implement Producer-Consumer Pattern',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/producer-consumer-problem-using-semaphores-at-process-level/',
        pattern: 'Bounded Buffer with Mutex + 2 Semaphores',
        whyAsked: 'Universal tech interview question testing mutex locks + empty/full counting semaphores.',
        keyTakeaway: '`empty` semaphore initialized to N, `full` initialized to 0, wrapped with a mutex lock.'
      }
    ],
    interviewTips: [
      'Explain the difference between process and thread: processes have isolated address spaces; threads share memory.',
      'When asked about deadlock, immediately list all 4 Coffman conditions.',
      'Understand Thrashing: excessive paging causing CPU utilization to plummet.'
    ],
    recommendedOrder: [
      '1. Process vs Threads memory layout & Lifecycle states',
      '2. Synchronization primitives (Mutex vs Semaphore vs Spinlock)',
      '3. Deadlock conditions and Banker’s Algorithm',
      '4. Virtual Memory, Paging, TLB, and LRU Page Replacement',
      '5. Concurrency coding problems'
    ],
    testedCompanies: ['Samsung R&D', 'Microsoft', 'Cisco', 'Google', 'Oracle', 'IBM', 'Adobe']
  },
  {
    slug: 'computer-networks',
    title: 'Computer Networks (CN) Protocols Guide',
    tag: 'CN',
    category: 'CS Fundamentals',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    iconName: 'Globe',
    shortDescription: 'Master the OSI 7-Layer Model, TCP 3-Way Handshake, UDP, DNS resolution, HTTP/HTTPS TLS, and Subnetting.',
    overview: 'Computer Networks is a staple topic in technical interviews, especially for Cisco, Jio, Wipro, Accenture, Google, and backend engineering roles.',
    importanceWeight: 'Tested in 70% of Technical Rounds',
    concepts: [
      {
        title: 'OSI Model vs TCP/IP Suite',
        description: 'Physical, Data Link, Network, Transport, Session, Presentation, Application layers and their protocol data units.',
        badge: 'Fundamental'
      },
      {
        title: 'TCP vs UDP & 3-Way Handshake',
        description: 'Connection-oriented reliable TCP (SYN, SYN-ACK, ACK, flow control via Sliding Window) vs connectionless UDP.',
        badge: 'High Frequency'
      },
      {
        title: 'HTTP, HTTPS & TLS/SSL Handshake',
        description: 'HTTP 1.1 keep-alive vs HTTP/2 multiplexing; Asymmetric public-key encryption exchange + Symmetric session key.',
        badge: 'FAANG Favorite'
      },
      {
        title: 'DNS Resolution & Routing Algorithms',
        description: 'Recursive vs Iterative DNS lookups, Root/TLD/Authoritative nameservers, and Distance Vector vs Link State routing.',
        badge: 'Core Concept'
      }
    ],
    problems: [
      {
        id: 'cn-1',
        title: 'Explain "What happens when you type google.com in your browser?"',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/what-happens-when-we-type-a-url-in-the-web-browser/',
        pattern: 'Comprehensive End-to-End Networking Flow',
        whyAsked: 'The most iconic holistic networking interview question spanning DNS, TCP, TLS, HTTP, and Server Rendering.',
        keyTakeaway: 'Follow the flow: Browser Cache -> OS Hosts -> Local DNS -> TLD DNS -> IP -> ARP -> TCP 3-way Handshake -> TLS Handshake -> HTTP GET -> Server Response.'
      },
      {
        id: 'cn-2',
        title: 'TCP 3-Way Handshake & 4-Way Teardown',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/',
        pattern: 'Connection Lifecycle & State Machine',
        whyAsked: 'Tests deep knowledge of sequence numbers, ISN, SYN flood attacks, and TIME_WAIT state.',
        keyTakeaway: 'Client SYN(x) -> Server SYN(y)+ACK(x+1) -> Client ACK(y+1).'
      }
    ],
    interviewTips: [
      'When asked about TCP vs UDP, explain TCP header overhead (20 bytes vs 8 bytes) and sliding window flow control.',
      'Explain HTTPS security clearly: Asymmetric encryption is only used during handshake; symmetric encryption encrypts payload.'
    ],
    recommendedOrder: [
      '1. OSI 7 Layers & Layer responsibilities',
      '2. TCP vs UDP protocols and 3-Way Handshake',
      '3. DNS resolution pipeline',
      '4. HTTP/1.1 vs HTTP/2 differences',
      '5. "What happens when you type a URL?" flow'
    ],
    testedCompanies: ['Cisco', 'Jio Platforms', 'Accenture', 'Wipro', 'Google', 'Atlassian', 'Oracle']
  },
  {
    slug: 'oop-design-patterns',
    title: 'Object-Oriented Programming (OOP) & Design Patterns',
    tag: 'OOP',
    category: 'CS Fundamentals',
    difficulty: 'Beginner',
    estimatedHours: 12,
    iconName: 'Box',
    shortDescription: 'Master Encapsulation, Polymorphism, SOLID Principles, and GoF Design Patterns (Singleton, Factory, Strategy, Observer).',
    overview: 'Object-Oriented Programming principles and Design Patterns are tested universally in TCS, Capgemini, Infosys, Wipro, Amazon, and Flipkart interviews.',
    importanceWeight: 'Tested in 90% of SDE Interviews',
    concepts: [
      {
        title: 'The 4 Pillars of OOP',
        description: 'Encapsulation, Abstraction, Inheritance, and Polymorphism (Compile-time overloading vs Runtime overriding via virtual tables).',
        badge: 'Fundamental'
      },
      {
        title: 'SOLID Design Principles',
        description: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.',
        badge: 'High Frequency'
      },
      {
        title: 'Creational & Structural Patterns',
        description: 'Singleton (Thread-safe double-checked locking), Factory Method, and Decorator Pattern.',
        badge: 'Core Pattern'
      },
      {
        title: 'Behavioral Patterns',
        description: 'Strategy Pattern (interchangeable algorithms) and Observer Pattern (event listeners).',
        badge: 'Must Know'
      }
    ],
    problems: [
      {
        id: 'oop-1',
        title: 'Thread-Safe Singleton Pattern',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/singleton-design-pattern/',
        pattern: 'Double-Checked Locking with Volatile Keyword',
        whyAsked: 'Tests multithreading knowledge combined with object-oriented creation constraints.',
        keyTakeaway: 'Use `volatile` instance variable and synchronize on the class inside an outer null check.'
      },
      {
        id: 'oop-2',
        title: 'Design Pizza Store with Decorator Pattern',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/decorator-pattern-set-3-coding-the-decorator-design-pattern/',
        pattern: 'Decorator Pattern / Dynamic Composition',
        whyAsked: 'Tests preference of composition over inheritance for dynamic feature wrapping.',
        keyTakeaway: 'Decorator class implements base component interface AND holds a reference to an existing component instance.'
      }
    ],
    interviewTips: [
      'Always recite SOLID acronym effortlessly with real-world coding examples for each letter.',
      'Explain VTable (Virtual Table) internals when asked how Runtime Polymorphism works under the hood.',
      'Highlight "Favor Composition over Inheritance".'
    ],
    recommendedOrder: [
      '1. 4 Pillars of OOP with code examples',
      '2. SOLID Principles with refactorings',
      '3. Singleton and Factory Patterns',
      '4. Strategy and Observer Patterns'
    ],
    testedCompanies: ['TCS', 'Capgemini', 'Infosys', 'Cognizant', 'Amazon', 'Flipkart', 'Adobe', 'JP Morgan Chase']
  },
  {
    slug: 'behavioral-hr',
    title: 'Behavioral & HR Interview Playbook (STAR Method)',
    tag: 'Behavioral',
    category: 'Soft Skills',
    difficulty: 'Beginner',
    estimatedHours: 8,
    iconName: 'Users',
    shortDescription: 'Master Amazon Leadership Principles, Googleyness, conflict resolution, and behavioral questions using the STAR framework.',
    overview: 'Behavioral and HR rounds are crucial across all companies — from mass recruiters (TCS MR/HR, Capgemini) to top tech (Amazon, Google, Meta, Microsoft).',
    importanceWeight: 'Tested in 100% of Final Interview Rounds',
    concepts: [
      {
        title: 'The STAR Response Framework',
        description: 'Situation (Context), Task (Your challenge), Action (What YOU did using action verbs), and Result (Measurable outcomes).',
        badge: 'Essential'
      },
      {
        title: 'Amazon 16 Leadership Principles',
        description: 'Customer Obsession, Ownership, Bias for Action, Dive Deep, Earn Trust, and Deliver Results.',
        badge: 'Amazon Priority'
      },
      {
        title: 'Conflict Resolution & Team Disagreements',
        description: 'How you handle technical disagreements, prioritize tradeoffs with data, and maintain professional relationships.',
        badge: 'High Frequency'
      },
      {
        title: 'Failure, Mistakes & Resilience',
        description: 'Discussing a real past failure with radical honesty and demonstrating what systems you built to prevent recurrence.',
        badge: 'FAANG Favorite'
      }
    ],
    problems: [
      {
        id: 'hr-1',
        title: 'Tell Me About a Time You Had a Conflict with a Team Member',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/how-to-answer-tell-me-about-a-time-you-had-a-conflict-with-a-coworker/',
        pattern: 'STAR Method + Empathy + Data-driven resolution',
        whyAsked: 'Assesses emotional intelligence, maturity, and ability to disagree constructively without ego.',
        keyTakeaway: 'Focus on separating technical ideas from personal identity; use prototypes/data to reach consensus.'
      },
      {
        id: 'hr-2',
        title: 'Tell Me About a Time You Failed or Made a Mistake',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/how-to-answer-tell-me-about-a-time-you-failed/',
        pattern: 'Accountability + Root Cause Analysis + Prevention',
        whyAsked: 'Tests integrity, humility, and whether you learn from production bugs or missed deadlines.',
        keyTakeaway: 'Own the mistake without blaming others; explain how you fixed it immediately.'
      },
      {
        id: 'hr-3',
        title: 'Tell Me About Yourself / Elevator Pitch',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/tell-me-about-yourself-in-interview/',
        pattern: 'Present -> Past -> Future Framework (90 seconds)',
        whyAsked: 'Sets the initial tone and anchor for the entire interview.',
        keyTakeaway: 'Current role/studies -> 2 key achievements/projects -> Why you are excited about this specific company.'
      }
    ],
    interviewTips: [
      'Prepare 4-5 core project stories beforehand that can be adapted to answer multiple behavioral questions.',
      'Always say "I did X" instead of "We did X" when explaining the Action phase.',
      'Quantify results with metrics: "Reduced latency by 35%", "Saved 4 hours per week".'
    ],
    recommendedOrder: [
      '1. Prepare your 90-second "Tell Me About Yourself" elevator pitch',
      '2. Build your STAR story repository (4 deep projects)',
      '3. Map stories to Amazon Leadership Principles / Googleyness',
      '4. Formulate 3 thoughtful questions to ask the interviewer'
    ],
    testedCompanies: ['TCS', 'Capgemini', 'Amazon', 'Google', 'Meta', 'Microsoft', 'Accenture', 'Cognizant']
  },
  {
    slug: 'aptitude-reasoning',
    title: 'Aptitude & Quantitative Problem Solving',
    tag: 'Aptitude',
    category: 'Soft Skills',
    difficulty: 'Beginner',
    estimatedHours: 10,
    iconName: 'Calculator',
    shortDescription: 'Master Probability, Permutations, Time & Work, Speed Distance, Puzzles, and Logical Deduction for campus hiring tests.',
    overview: 'Aptitude tests are the first elimination filter in campus placement drives (TCS NQT, Infosys, Capgemini, Wipro, Accenture, Goldman Sachs, Morgan Stanley). Scoring above the 85th percentile guarantees entry into coding rounds.',
    importanceWeight: 'Tested in 95% of Campus Placement Drives',
    concepts: [
      {
        title: 'Probability, Combinatorics & Bayes Theorem',
        description: 'Permutations, Combinations, independent vs mutually exclusive events, conditional probability.',
        badge: 'High Frequency'
      },
      {
        title: 'Time & Work, Pipes & Cisterns',
        description: 'Unit work method, efficiency ratios, alternate work days, and negative work done by emptying pipes.',
        badge: 'Campus Standard'
      },
      {
        title: 'Time, Speed & Distance, Trains & Boats',
        description: 'Relative speed, trains crossing platforms/poles, upstream/downstream stream velocity equations.',
        badge: 'Must Know'
      },
      {
        title: 'Mathematical Puzzles & Game Theory',
        description: 'Classic interview puzzles (e.g., 25 Horses 5 Tracks, 3 Bulbs 3 Switches, Heavy Coin in Balance Scale).',
        badge: 'Goldman Sachs Special'
      },
      {
        title: 'Logical Deduction & Data Interpretation',
        description: 'Syllogisms, Blood relations, Seating arrangements, Bar/Pie chart data analysis, and series completion.',
        badge: 'Core Pattern'
      }
    ],
    problems: [
      {
        id: 'apt-1',
        title: '25 Horses Puzzle (Find Top 3)',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/puzzle-9-find-the-fastest-3-horses-among-25/',
        pattern: 'Minimum Races Elimination Logic',
        whyAsked: 'Iconic Goldman Sachs / Google puzzle testing logical tree minimization.',
        keyTakeaway: 'Run 5 preliminary races, 1 race of group winners, and 1 final race of 5 candidate horses = 7 races total.'
      },
      {
        id: 'apt-2',
        title: '3 Bulbs and 3 Switches Puzzle',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/puzzle-2-find-the-light-bulb/',
        pattern: 'State Dimension Expansion (Heat + Light)',
        whyAsked: 'Tests out-of-the-box thinking by using temperature as a second observable state dimension.',
        keyTakeaway: 'Turn Switch 1 on for 10 mins (hot), turn it off and turn Switch 2 on. Walk in: lit=2, hot=1, cold=3.'
      }
    ],
    interviewTips: [
      'During Online Aptitude tests, never spend more than 90 seconds on a single question — skip and come back.',
      'Learn fast Vedic math techniques: squaring numbers near 50/100, fraction-to-percentage conversions.',
      'For puzzles, speak your thought process out loud.'
    ],
    recommendedOrder: [
      '1. High-yield arithmetic: Percentages, Profit/Loss, Ratios',
      '2. Time & Work, Speed & Distance formulas',
      '3. Permutations, Combinations, and Probability',
      '4. 20 classic tech interview puzzles on GeeksforGeeks'
    ],
    testedCompanies: ['TCS', 'Infosys', 'Capgemini', 'Wipro', 'Accenture', 'Cognizant', 'Goldman Sachs', 'Morgan Stanley']
  }
];

export function getPrepGuideBySlug(slug: string): PrepGuide | undefined {
  return PREP_GUIDES.find(g => g.slug === slug || g.tag.toLowerCase() === slug.toLowerCase());
}

export function getAllCategories(): string[] {
  return ['All', 'DSA', 'CS Fundamentals', 'System Design', 'Soft Skills'];
}
