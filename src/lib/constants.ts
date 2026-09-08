export const TOPIC_KEYWORDS: Record<string, string[]> = {
  "DP": ["dynamic programming", "dp ", "memoization", "knapsack", "lcs", "lis", "tabulation"],
  "Graphs": ["graph", "bfs", "dfs", "dijkstra", "topological sort", "union find", "shortest path", "mst"],
  "Trees": ["binary tree", "bst", "trie", "segment tree", "avl", "traversal", "lowest common ancestor"],
  "Arrays & Strings": ["array", "string manipulation", "two pointer", "sliding window", "hashmap", "binary search", "matrix"],
  "System Design": ["system design", "scalability", "load balancer", "database design", "microservices", "high level design", "low level design", "lld", "hld", "caching", "kafka", "redis", "sharding"],
  "OOP": ["object oriented", "oop", "design pattern", "singleton", "factory pattern", "solid principles", "inheritance", "polymorphism"],
  "DBMS": ["sql", "normalization", "joins", "indexing", "acid", "transactions", "nosql", "postgres", "foreign key"],
  "OS": ["operating system", "deadlock", "process", "thread", "semaphore", "paging", "virtual memory", "mutex", "concurrency"],
  "CN": ["computer network", "tcp", "udp", "http", "https", "dns", "osi model", "socket", "ip addressing"],
  "Aptitude": ["quantitative", "logical reasoning", "aptitude test", "puzzle", "probability", "permutation"],
  "HR": ["tell me about yourself", "hr round", "why should we hire", "strengths and weaknesses", "salary expectation", "relocation"],
  "Behavioral": ["behavioral", "conflict resolution", "team project", "leadership", "star method", "failure", "culture fit"],
  
  // ECE / Semiconductor Keywords
  "Digital Electronics": ["k-map", "boolean algebra", "combinational", "sequential", "flip-flop", "fsm", "state machine", "counter", "multiplexer", "decoder", "hazard", "logic gate", "karnaugh"],
  "Verilog & SystemVerilog": ["verilog", "systemverilog", "hdl", "rtl", "always block", "blocking", "non-blocking", "uvm", "testbench", "assertion", "sva", "hdlbits"],
  "STA & Timing Analysis": ["setup time", "hold time", "static timing analysis", "sta", "clock skew", "jitter", "slack", "critical path", "metastability", "clock domain crossing", "cdc", "fifo depth", "timing closure"],
  "Computer Architecture & RISC-V": ["computer architecture", "risc-v", "riscv", "pipelining", "pipeline hazard", "branch prediction", "cache", "mesi", "instruction set", "isa", "mips", "superscalar"],
  "Embedded C & RTOS": ["embedded c", "freertos", "rtos", "volatile", "isr", "interrupt", "priority inversion", "mutex", "semaphore", "memory layout", "bare-metal", "circular buffer"],
  "Microcontrollers & Protocols": ["uart", "spi", "i2c", "can bus", "autosar", "stm32", "arm cortex", "microcontroller", "baud rate", "open-drain", "clock stretching", "dma"],
  "Analog Electronics & Op-Amps": ["op-amp", "operational amplifier", "small signal", "mosfet", "bjt", "slew rate", "cmrr", "bode plot", "phase margin", "bandgap", "adc", "dac", "filter", "cascode"],
  "VLSI Physical Design": ["physical design", "floorplanning", "cts", "clock tree", "routing", "drc", "lvs", "ir drop", "gdsii", "netlist", "place and route", "p&r"],
  "DFT & Testing": ["dft", "design for testability", "scan chain", "atpg", "stuck-at", "bist", "mbist", "jtag", "boundary scan", "tap controller"],
  "FPGA Design": ["fpga", "xilinx", "vivado", "lut", "clb", "dsp48", "quartus", "altera"],
  "Sensors & Actuators": ["sensor", "actuator", "transducer", "pwm", "motor control", "adc sampling", "thermistor", "accelerometer"],
  "Signal Processing & DSP": ["dsp", "signal processing", "fft", "sampling theorem", "nyquist", "fir", "iir", "z-transform"]
};

export const TAG_COLORS: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  // IT / CS Colors
  "DP": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", bar: "#9333ea" },
  "Graphs": { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", bar: "#7c3aed" },
  "Trees": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", bar: "#059669" },
  "Arrays & Strings": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", bar: "#0891b2" },
  "System Design": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", bar: "#d97706" },
  "OOP": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", bar: "#4f46e5" },
  "DBMS": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", bar: "#e11d48" },
  "OS": { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200", bar: "#0284c7" },
  "CN": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", bar: "#0d9488" },
  "Aptitude": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", bar: "#ea580c" },
  "HR": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", bar: "#db2777" },
  "Behavioral": { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200", bar: "#ca8a04" },

  // ECE / Hardware Colors
  "Digital Electronics": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", bar: "#2563eb" },
  "Verilog & SystemVerilog": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", bar: "#4f46e5" },
  "STA & Timing Analysis": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", bar: "#e11d48" },
  "Computer Architecture & RISC-V": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", bar: "#9333ea" },
  "Embedded C & RTOS": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", bar: "#059669" },
  "Microcontrollers & Protocols": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", bar: "#0d9488" },
  "Analog Electronics & Op-Amps": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", bar: "#d97706" },
  "VLSI Physical Design": { bg: "bg-fuchsia-50", text: "text-fuchsia-700", border: "border-fuchsia-200", bar: "#c026d3" },
  "DFT & Testing": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", bar: "#0891b2" },
  "FPGA Design": { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", bar: "#7c3aed" },
  "Sensors & Actuators": { bg: "bg-lime-50", text: "text-lime-700", border: "border-lime-200", bar: "#65a30d" },
  "Signal Processing & DSP": { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200", bar: "#0284c7" },

  "Uncategorized": { bg: "bg-zinc-100", text: "text-zinc-700", border: "border-zinc-200", bar: "#71717a" },
};

export const ROUND_TYPE_COLORS: Record<string, string> = {
  "Online Assessment": "#8b5cf6",
  "Technical": "#a855f7",
  "System Design": "#f59e0b",
  "Lab / Practical": "#059669",
  "HR": "#ec4899",
  "Behavioral": "#10b981",
  "Managerial": "#06b6d4",
  "Other": "#71717a"
};

export const POPULAR_COMPANIES = [
  "Google",
  "Amazon",
  "Microsoft",
  "TCS",
  "Infosys",
  "Capgemini",
  "Wipro",
  "Cognizant",
  "Accenture",
  "Flipkart",
  "Goldman Sachs",
  "Walmart Global Tech",
  "Samsung R&D",
  "JP Morgan Chase",
  "Uber",
  "Meta",
  "Atlassian",
  "Adobe",
  "Oracle",
  "Salesforce",
  "Morgan Stanley",
  "PayPal",
  "Cisco",
  "IBM",
  "Zomato",
  "Swiggy",
  "Jio Platforms"
];

export const POPULAR_ECE_COMPANIES = [
  "NVIDIA",
  "AMD",
  "Intel",
  "Qualcomm",
  "Texas Instruments",
  "Broadcom",
  "MediaTek",
  "Micron Technology",
  "NXP Semiconductors",
  "STMicroelectronics",
  "Infineon Technologies",
  "Analog Devices (ADI)",
  "Bosch Global Software",
  "Samsung Semiconductor (SSIR)",
  "Siemens EDA (Mentor)",
  "Honeywell Aerospace",
  "Schneider Electric",
  "Continental Automotive"
];
