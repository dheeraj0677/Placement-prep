"""
PlacementPrep Radar - Rule-based Topic Classifier (Software & Semiconductor)
Classifies interview round text into structured topic tags based on deterministic keyword matching.
No ML or LLM required: fast, explainable, and fully reproducible.
"""

from typing import List, Optional

IT_TOPIC_KEYWORDS = {
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

ECE_TOPIC_KEYWORDS = {
    "Digital Electronics": ["k-map", "boolean algebra", "combinational", "sequential", "flip-flop", "fsm", "state machine", "counter", "multiplexer", "decoder", "hazard", "logic gate", "karnaugh", "adder"],
    "Verilog & SystemVerilog": ["verilog", "systemverilog", "hdl", "rtl", "always block", "blocking", "non-blocking", "uvm", "testbench", "assertion", "sva", "hdlbits"],
    "STA & Timing Analysis": ["setup time", "hold time", "static timing analysis", "sta", "clock skew", "jitter", "slack", "critical path", "metastability", "clock domain crossing", "cdc", "fifo depth", "timing closure"],
    "Computer Architecture & RISC-V": ["computer architecture", "risc-v", "riscv", "pipelining", "pipeline hazard", "branch prediction", "cache", "mesi", "instruction set", "isa", "mips", "superscalar"],
    "Embedded C & RTOS": ["embedded c", "freertos", "rtos", "volatile", "isr", "interrupt", "priority inversion", "mutex", "semaphore", "memory layout", "bare-metal", "circular buffer", "ring buffer"],
    "Microcontrollers & Protocols": ["uart", "spi", "i2c", "can bus", "autosar", "stm32", "arm cortex", "microcontroller", "baud rate", "open-drain", "clock stretching", "dma"],
    "Analog Electronics & Op-Amps": ["op-amp", "operational amplifier", "small signal", "mosfet", "bjt", "slew rate", "cmrr", "bode plot", "phase margin", "bandgap", "adc", "dac", "filter", "cascode"],
    "VLSI Physical Design": ["physical design", "floorplanning", "cts", "clock tree", "routing", "drc", "lvs", "ir drop", "gdsii", "netlist", "place and route", "p&r"],
    "DFT & Testing": ["dft", "design for testability", "scan chain", "atpg", "stuck-at", "bist", "mbist", "jtag", "boundary scan", "tap controller"],
    "FPGA Design": ["fpga", "xilinx", "vivado", "lut", "clb", "dsp48", "quartus", "altera"],
    "Sensors & Actuators": ["sensor", "actuator", "transducer", "pwm", "motor control", "adc sampling", "thermistor", "accelerometer"],
    "Signal Processing & DSP": ["dsp", "signal processing", "fft", "sampling theorem", "nyquist", "fir", "iir", "z-transform"],
    "Aptitude": ["quantitative", "logical reasoning", "aptitude test", "puzzle", "probability"],
    "HR": ["tell me about yourself", "hr round", "why should we hire", "salary expectation", "relocation"],
}

# Unified keyword dictionary
TOPIC_KEYWORDS = {**IT_TOPIC_KEYWORDS, **ECE_TOPIC_KEYWORDS}


def classify_round(text: str, domain: Optional[str] = None) -> List[str]:
    """
    Scans interview round text (lowercased) and returns all matching topic tags.
    If domain is specified ('it' or 'ece'), uses domain-specific keywords.
    Returns ['Uncategorized'] if no keywords match.
    """
    if not text:
        return ["Uncategorized"]

    text_lower = text.lower()
    matched: List[str] = []

    if domain == "it":
        keywords_dict = IT_TOPIC_KEYWORDS
    elif domain == "ece":
        keywords_dict = ECE_TOPIC_KEYWORDS
    else:
        keywords_dict = TOPIC_KEYWORDS

    for tag, keywords in keywords_dict.items():
        if any(kw in text_lower for kw in keywords):
            matched.append(tag)

    return matched or ["Uncategorized"]


if __name__ == "__main__":
    test_samples = [
        ("IT", "Asked 1 question on dynamic programming (0/1 knapsack) and 1 on BFS in a grid."),
        ("IT", "Design a URL shortener like TinyURL. Discussed load balancer, caching with Redis, and database sharding."),
        ("ECE", "Questions on Static Timing Analysis (STA), calculating setup/hold slack, and CDC with async FIFO."),
        ("ECE", "Deep dive into Embedded C: volatile keyword, ISR rules, FreeRTOS priority inversion, and I2C clock stretching."),
        ("ECE", "Derive small-signal voltage gain of Cascode amplifier and explain slew rate calculation in Op-Amps.")
    ]

    print("Classifier Validation Test:")
    print("=" * 70)
    for expected_track, sample in test_samples:
        tags = classify_round(sample)
        print(f"[{expected_track}] Text: {sample}")
        print(f"       Tags: {tags}\n")
