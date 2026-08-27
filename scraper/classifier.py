"""
PlacementPrep Radar - Rule-based Topic Classifier
Classifies interview round text into structured topic tags based on deterministic keyword matching.
No ML or LLM required: fast, explainable, and fully reproducible.
"""

TOPIC_KEYWORDS = {
    "DP": ["dynamic programming", "dp ", "memoization", "knapsack", "lcs", "lis", "tabulation", "coin change"],
    "Graphs": ["graph", "bfs", "dfs", "dijkstra", "topological sort", "union find", "shortest path", "mst", "kruskal", "prim", "bipartite", "cycle detection"],
    "Trees": ["binary tree", "bst", "trie", "segment tree", "avl", "traversal", "lowest common ancestor", "lca", "binary search tree"],
    "Arrays & Strings": ["array", "string manipulation", "two pointer", "sliding window", "hashmap", "binary search", "matrix", "prefix sum", "kadane"],
    "System Design": [
        "system design", "scalability", "load balancer", "database design",
        "microservices", "high level design", "low level design", "lld", "hld",
        "caching", "kafka", "redis", "sharding", "rate limiter", "message queue",
        "consistent hashing", "api design"
    ],
    "OOP": ["object oriented", "oop", "design pattern", "singleton", "factory pattern", "solid principles", "inheritance", "polymorphism", "encapsulation", "abstraction"],
    "DBMS": ["sql", "normalization", "joins", "indexing", "acid", "transactions", "nosql", "postgres", "foreign key", "primary key", "query optimization"],
    "OS": ["operating system", "deadlock", "process", "thread", "semaphore", "paging", "virtual memory", "mutex", "concurrency", "cpu scheduling", "fork"],
    "CN": ["computer network", "tcp", "udp", "http", "https", "dns", "osi model", "socket", "ip addressing", "handshake", "tls", "routing"],
    "Aptitude": ["quantitative", "logical reasoning", "aptitude test", "puzzle", "probability", "permutation", "combination", "speed distance", "work time"],
    "HR": ["tell me about yourself", "hr round", "why should we hire", "strengths and weaknesses", "salary expectation", "relocation", "why this company"],
    "Behavioral": ["behavioral", "conflict resolution", "team project", "leadership", "star method", "challenging situation", "failure", "culture fit"],
}


def classify_round(text: str) -> list[str]:
    """
    Scans interview round text (lowercased) and returns all matching topic tags.
    Returns ['Uncategorized'] if no keywords match.
    """
    if not text:
        return ["Uncategorized"]

    text_lower = text.lower()
    matched: list[str] = []

    for tag, keywords in TOPIC_KEYWORDS.items():
        if any(kw in text_lower for kw in keywords):
            matched.append(tag)

    return matched or ["Uncategorized"]


if __name__ == "__main__":
    # Test classifier with sample round texts
    test_samples = [
        "Asked 1 question on dynamic programming (0/1 knapsack) and 1 on BFS in a grid.",
        "Design a URL shortener like TinyURL. Discussed load balancer, caching with Redis, and database sharding.",
        "HR questions: Tell me about yourself, why Google, and a time you handled conflict in a team.",
        "Questions on SQL joins, indexing in B-Trees, and ACID properties.",
        "General discussion on my resume and projects."
    ]

    print("Classifier Validation Test:")
    print("=" * 60)
    for sample in test_samples:
        tags = classify_round(sample)
        print(f"Text: {sample}")
        print(f"Tags: {tags}\n")
