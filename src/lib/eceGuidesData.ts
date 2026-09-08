import { PrepGuide } from './guidesData';

export const ECE_PREP_GUIDES: PrepGuide[] = [
  // 1. Digital Electronics & FSM
  {
    slug: 'digital-electronics-vlsi',
    title: 'Digital Electronics & FSM Master Guide',
    tag: 'Digital Electronics',
    category: 'VLSI & Hardware',
    difficulty: 'Beginner',
    estimatedHours: 20,
    iconName: 'Binary',
    shortDescription: 'Master K-Maps, hazard-free logic, flip-flop conversions, synchronous counters, and Mealy/Moore FSMs tested in every hardware interview.',
    overview: 'Digital Electronics is the undisputed foundation of all semiconductor engineering rounds. Whether interviewing at Intel, NVIDIA, Qualcomm, or AMD, every candidate is first vetted on Boolean logic minimization, flip-flop characteristics, setup/hold constraints, and finite state machine synthesis.',
    importanceWeight: 'Tested in 95% of Semiconductor & Hardware Technical Rounds',
    concepts: [
      {
        title: 'Karnaugh Maps & Glitch Hazards',
        description: 'Learn minimal SOP/POS extraction, don’t-care conditions, and static-0/static-1 hazard removal by inserting redundant consensus product terms.',
        badge: 'Fundamental'
      },
      {
        title: 'Flip-Flops & Sequential Conversions',
        description: 'Understand internal latch/flop operation, master-slave configurations, setup/hold margins, and excitation table conversions (JK, D, T, SR).',
        badge: 'Core Pattern'
      },
      {
        title: 'Mealy vs Moore FSM Synthesis',
        description: 'Design deterministic sequence detectors with overlapping window support, state transition diagrams, state reduction, and one-hot vs binary state encoding.',
        badge: 'High Frequency'
      },
      {
        title: 'Multiplexer-Based Logic Implementation',
        description: 'Synthesize any N-variable Boolean function using an (N-1) select line multiplexer without extra inverter gates.',
        badge: 'Classic Interview Trick'
      }
    ],
    problems: [
      {
        id: 'ece-de-1',
        title: 'Non-Overlapping vs Overlapping Sequence Detector (1011)',
        difficulty: 'Medium',
        platform: 'HDLBits',
        url: 'https://hdlbits.01xz.net/wiki/Exams/ece241_2013_q4',
        pattern: 'FSM Design',
        whyAsked: 'Evaluates if you understand state retention on matching prefixes and difference between Mealy (1 less state, output glitch) and Moore (glitch-free).',
        keyTakeaway: 'Always verify the transition on mismatched bits — if 1010 arrives instead of 1011, transition back to state where prefix 10 is preserved.'
      },
      {
        id: 'ece-de-2',
        title: 'Implement 3-input XOR using 2:1 Multiplexers Only',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/multiplexers-in-digital-logic/',
        pattern: 'Combinational Logic',
        whyAsked: 'Tests fundamental Shannon Expansion theorem intuition without paper-and-pencil delay.',
        keyTakeaway: 'F(A,B,C) = A*F(1,B,C) + A\'*F(0,B,C). Use A as the select line.'
      },
      {
        id: 'ece-de-3',
        title: 'Design a Mod-6 Synchronous Counter with Self-Correction',
        difficulty: 'Medium',
        platform: 'HDLBits',
        url: 'https://hdlbits.01xz.net/wiki/Count1to10',
        pattern: 'Sequential Counters',
        whyAsked: 'Tests ability to handle unused states (6 and 7 in a 3-bit counter) so the counter cannot get stuck in an infinite lockup loop.',
        keyTakeaway: 'Map unused states to point explicitly to state 000 in the next-state K-map.'
      },
      {
        id: 'ece-de-4',
        title: 'Flip-Flop Conversion: Implement T Flip-Flop using D Flip-Flop',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/conversion-of-flip-flops/',
        pattern: 'Flip-Flop Synthesis',
        whyAsked: 'Standard warm-up question at TI, Intel, and Qualcomm to verify excitation table knowledge.',
        keyTakeaway: 'D = T ^ Q (D input equals T XOR current output Q).'
      }
    ],
    interviewTips: [
      'Draw timing diagrams clearly with clock, setup window, hold window, and propagation delay arrows.',
      'When asked to design an FSM, always clarify whether overlapping sequences should be detected.',
      'Remember: Mealy outputs can change asynchronously if inputs change; Moore outputs depend strictly on current state.'
    ],
    recommendedOrder: [
      '1. Review Logic Gates and Universal Gate implementations (NAND / NOR)',
      '2. Practice 4-variable and 5-variable K-Maps with static hazards',
      '3. Master Flip-Flop conversions and timing parameter definitions',
      '4. Implement 5 FSM sequence detectors (1011, 11010, palindrome 3-bit) on paper'
    ],
    testedCompanies: ['Intel', 'NVIDIA', 'Qualcomm', 'AMD', 'Texas Instruments', 'Broadcom', 'MediaTek']
  },

  // 2. Verilog & SystemVerilog
  {
    slug: 'verilog-systemverilog',
    title: 'Verilog & SystemVerilog RTL Blueprint',
    tag: 'Verilog & SystemVerilog',
    category: 'VLSI & Hardware',
    difficulty: 'Intermediate',
    estimatedHours: 24,
    iconName: 'Cpu',
    shortDescription: 'From synthesizable RTL modules to advanced SystemVerilog OOP verification and testbench architecture.',
    overview: 'Verilog and SystemVerilog are the universal languages of modern silicon. This guide prepares you to write synthesis-clean RTL code without inferred latches, handle blocking vs non-blocking simulation semantics, and build OOP verification environments.',
    importanceWeight: 'Mandatory for all ASIC, FPGA, and DV Roles',
    concepts: [
      {
        title: 'Blocking (=) vs Non-Blocking (<=) Semantics',
        description: 'Understand Verilog event simulation scheduler (Active, Inactive, NBA, Postponed queues) and why blocking assignments cause race conditions in sequential logic.',
        badge: 'Top Asked Topic'
      },
      {
        title: 'Avoiding Inferred Latches',
        description: 'Why incomplete if-else branches or missing default clauses in combinational always blocks synthesize unwanted transparent latches.',
        badge: 'Critical Bug Hazard'
      },
      {
        title: 'Synchronous vs Asynchronous FIFO Design',
        description: 'Full/empty flag generation, pointer wrap-around, and dual-clock asynchronous FIFO design using 2-flop Gray pointer synchronizers.',
        badge: 'Silicon Standard'
      },
      {
        title: 'SystemVerilog OOP & Randomization',
        description: 'Classes, inheritance, virtual interfaces, rand/randc variables, constraint blocks, and inter-process mailboxes.',
        badge: 'Verification Core'
      }
    ],
    problems: [
      {
        id: 'ece-vs-1',
        title: 'Design a Parameterized Synchronous FIFO',
        difficulty: 'Medium',
        platform: 'HDLBits',
        url: 'https://hdlbits.01xz.net/wiki/Sim/circuit10',
        pattern: 'Queue Storage',
        whyAsked: 'Every silicon chip uses FIFOs for rate matching between processing blocks.',
        keyTakeaway: 'Use an extra bit in read/write pointers to distinguish between FIFO Full (MSBs differ, rest match) and Empty (all bits match).'
      },
      {
        id: 'ece-vs-2',
        title: 'Clock Divider by Odd Number (Divide by 3 with 50% Duty Cycle)',
        difficulty: 'Hard',
        platform: 'HDLBits',
        url: 'https://hdlbits.01xz.net/wiki/Exams/ece241_2014_q4',
        pattern: 'Clock Division',
        whyAsked: 'Frequent trick question at Qualcomm and NVIDIA. Dividing by even numbers is trivial; odd numbers require ORing posedge and negedge clocks.',
        keyTakeaway: 'Generate a 1-cycle high pulse on positive clock edge and another on negative clock edge, then OR them together.'
      },
      {
        id: 'ece-vs-3',
        title: 'Round-Robin Arbiter with Priority Rotating',
        difficulty: 'Hard',
        platform: 'HDLBits',
        url: 'https://hdlbits.01xz.net/wiki/Exams/m2014_q4k',
        pattern: 'Arbitration Logic',
        whyAsked: 'Tests ability to grant bus access fairly without starving any requestor.',
        keyTakeaway: 'Mask lower priority requests after grant and use a double-width request vector trick (req & ~mask).'
      },
      {
        id: 'ece-vs-4',
        title: '4-bit Binary to Gray Code and Gray to Binary Converter',
        difficulty: 'Easy',
        platform: 'HDLBits',
        url: 'https://hdlbits.01xz.net/wiki/Grayce',
        pattern: 'Data Conversion',
        whyAsked: 'Gray code is mandatory across clock boundaries because only 1 bit changes at any clock transition.',
        keyTakeaway: 'Binary to Gray: gray = bin ^ (bin >> 1). Gray to Binary: XOR bits iteratively from MSB to LSB.'
      }
    ],
    interviewTips: [
      'Golden Rule: Use <= for sequential always @(posedge clk) blocks, and = for combinational always @(*) blocks. NEVER mix both in the same block.',
      'Always specify default assignment at the very beginning of a combinational block to guarantee no inferred latches.',
      'In SystemVerilog, explain why virtual interfaces are needed inside verification classes.'
    ],
    recommendedOrder: [
      '1. Understand the Verilog Stratified Event Queue (IEEE 1364)',
      '2. Practice Verilog modules on HDLBits website (Gates, Vectors, Hierarchy, Latches)',
      '3. Code and simulate a Synchronous FIFO in EDA Playground',
      '4. Study SystemVerilog OOP constructs: constructors, copy methods, and constraints'
    ],
    testedCompanies: ['NVIDIA', 'AMD', 'Intel', 'Broadcom', 'Qualcomm', 'Micron', 'Samsung']
  },

  // 3. STA & Timing Analysis
  {
    slug: 'sta-timing-analysis',
    title: 'Static Timing Analysis (STA) & CDC Guide',
    tag: 'STA & Timing Analysis',
    category: 'VLSI & Hardware',
    difficulty: 'Advanced',
    estimatedHours: 26,
    iconName: 'Clock',
    shortDescription: 'The #1 differentiator in VLSI interviews: master setup slack, hold slack, clock skew, jitter, and Clock Domain Crossing.',
    overview: 'Static Timing Analysis (STA) verifies that a digital circuit will operate reliably at the target clock frequency without running slow circuit simulations. Setup and hold time questions decide whether you get hired as a hardware engineer.',
    importanceWeight: 'Highest Weight in AMD, NVIDIA, Intel & Broadcom Technical Interviews',
    concepts: [
      {
        title: 'Setup Time Margin & Slack Equation',
        description: 'T_clk >= T_cq + T_comb_max + T_setup - T_skew + T_jitter. If data arrives too late, setup violation occurs.',
        badge: 'Golden Equation'
      },
      {
        title: 'Hold Time Margin & Slack Equation',
        description: 'T_cq + T_comb_min >= T_hold + T_skew. Hold time is frequency-independent! Reducing clock speed DOES NOT fix hold violations.',
        badge: 'Trap Question'
      },
      {
        title: 'Clock Skew: Positive vs Negative Skew',
        description: 'Positive skew helps setup time but hurts hold time. Negative skew hurts setup time but helps hold time.',
        badge: 'Fundamental Tradeoff'
      },
      {
        title: 'Fixing Timing Violations in Silicon',
        description: 'Fixing Setup: Pipelining, cell sizing (higher drive strength), logic restructuring. Fixing Hold: Inserting delay buffers along the data path.',
        badge: 'Engineering Practice'
      }
    ],
    problems: [
      {
        id: 'ece-sta-1',
        title: 'Calculate Maximum Operational Frequency given T_cq, T_comb, T_setup and Skew',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/setup-and-hold-time-in-digital-logic/',
        pattern: 'STA Calculation',
        whyAsked: 'Standard interview question asked on a whiteboard within the first 10 minutes.',
        keyTakeaway: 'T_min = T_cq + T_comb_max + T_setup - T_skew. Frequency f_max = 1 / T_min.'
      },
      {
        id: 'ece-sta-2',
        title: 'Why Can Hold Violations NOT be Fixed by Lowering Clock Frequency?',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/static-timing-analysis-basics/',
        pattern: 'Conceptual STA',
        whyAsked: 'Disqualifies candidates who just memorize formulas without physical understanding.',
        keyTakeaway: 'The clock period T_clk does not appear anywhere in the hold slack equation (T_cq + T_comb >= T_hold + T_skew). Both launch and capture edges are the same clock transition!'
      },
      {
        id: 'ece-sta-3',
        title: 'Design a 2-Flip-Flop Synchronizer for Clock Domain Crossing',
        difficulty: 'Medium',
        platform: 'HDLBits',
        url: 'https://hdlbits.01xz.net/wiki/Exams/ece241_2013_q8',
        pattern: 'CDC Synchronization',
        whyAsked: 'When signals travel from a 100MHz domain to a 250MHz domain, metastability can corrupt data.',
        keyTakeaway: 'A 2-flop synchronizer gives metastable output of the first flop an entire clock period to settle to a valid logic level before being sampled.'
      },
      {
        id: 'ece-sta-4',
        title: 'Calculate FIFO Depth to Prevent Overflow Between Two Asynchronous Clocks',
        difficulty: 'Hard',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/fifo-depth-calculation/',
        pattern: 'Architecture & Buffering',
        whyAsked: 'Crucial ASIC system design problem for burst data transfers between mismatched clock frequencies.',
        keyTakeaway: 'Depth = Burst Size - (Burst Size * (f_read / f_write) * (time_read_active / time_total)).'
      }
    ],
    interviewTips: [
      'Always draw two flip-flops, label Clock 1, Clock 2, Combinational Delay, and write out launch vs capture edges.',
      'Mention that hold time checks are performed at the same clock edge (0ns), whereas setup checks are performed at the next clock edge (T_clk).',
      'If an interviewer asks how to fix a hold violation without changing RTL, answer: Insert delay buffers or routing detour on the data path during Physical Design.'
    ],
    recommendedOrder: [
      '1. Understand setup time, hold time, and propagation delay definitions',
      '2. Practice 15 numerical setup/hold slack calculation problems',
      '3. Study Clock Skew and Clock Jitter impacts',
      '4. Master Clock Domain Crossing (CDC) and Async FIFO depth calculations'
    ],
    testedCompanies: ['AMD', 'NVIDIA', 'Intel', 'Broadcom', 'Qualcomm', 'Texas Instruments', 'Apple Hardware']
  },

  // 4. Embedded C & RTOS
  {
    slug: 'embedded-c-rtos',
    title: 'Embedded C & FreeRTOS Concurrency Guide',
    tag: 'Embedded C & RTOS',
    category: 'Embedded Systems',
    difficulty: 'Intermediate',
    estimatedHours: 22,
    iconName: 'Terminal',
    shortDescription: 'Master pointer manipulation, volatile keywords, memory segments, interrupt rules, and real-time multithreading.',
    overview: 'Embedded C is distinct from general software development: you directly manipulate silicon memory-mapped registers, handle hardware interrupts in microseconds, and synchronize concurrent threads under strict RTOS deadlines.',
    importanceWeight: 'Primary Focus for Qualcomm, Bosch, NXP & Continental Interviews',
    concepts: [
      {
        title: 'The volatile Keyword & Hardware Registers',
        description: 'Why compiler optimization can optimize away hardware polling loops unless qualified with volatile, and when to use const volatile pointers.',
        badge: 'Absolute Must-Know'
      },
      {
        title: 'Memory Segments in Embedded C',
        description: 'Deep dive into .text (code), .rodata (constants), .data (initialized globals), .bss (uninitialized globals), Stack (local variables), and Heap (dynamic memory).',
        badge: 'Memory Architecture'
      },
      {
        title: 'Rules of Interrupt Service Routines (ISRs)',
        description: 'Why printf(), malloc(), floating point math, and blocking delays are strictly forbidden inside an ISR.',
        badge: 'Firmware Design Rule'
      },
      {
        title: 'RTOS Priority Inversion & Inheritance',
        description: 'How a medium priority task can block a high priority task indefinitely when a low priority task holds a mutex, and how priority inheritance resolves it.',
        badge: 'Mars Pathfinder Bug'
      }
    ],
    problems: [
      {
        id: 'ece-ec-1',
        title: 'Implement Bitwise Macros: Set, Clear, Toggle and Read nth Bit',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/',
        pattern: 'Bit Manipulation',
        whyAsked: 'Used daily in microcontroller firmware to configure peripheral registers.',
        keyTakeaway: '#define SET_BIT(reg, n) ((reg) |= (1U << (n))) and CLEAR_BIT(reg, n) ((reg) &= ~(1U << (n))).'
      },
      {
        id: 'ece-ec-2',
        title: 'Thread-Safe Circular Buffer (Ring Buffer) Implementation in C',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/circular-queue-set-1-introduction-array-implementation/',
        pattern: 'Data Structures in C',
        whyAsked: 'Universal embedded data structure used to buffer incoming UART, SPI, or ADC packet streams.',
        keyTakeaway: 'Maintain head and tail indices; buffer is empty when head == tail, and full when ((head + 1) % SIZE) == tail.'
      },
      {
        id: 'ece-ec-3',
        title: 'Determine CPU Endianness (Little Endian vs Big Endian) at Runtime',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/little-and-big-endian-mystery/',
        pattern: 'Hardware Architecture',
        whyAsked: 'Tests understanding of memory byte order when transmitting data across network packets.',
        keyTakeaway: 'Cast unsigned int x = 1 to char* pointer: if *c == 1 it is Little-Endian; if *c == 0 it is Big-Endian.'
      },
      {
        id: 'ece-ec-4',
        title: 'Explain Binary Semaphore vs Mutex in RTOS',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/mutex-vs-semaphore/',
        pattern: 'RTOS Concurrency',
        whyAsked: 'Checks whether candidate understands resource ownership vs task synchronization.',
        keyTakeaway: 'A Mutex has an ownership concept (only the locking task can unlock it) and supports priority inheritance. A Semaphore is a signaling mechanism.'
      }
    ],
    interviewTips: [
      'When asked about pointers, always discuss pointer to const vs const pointer: const int *ptr (data cannot change) vs int * const ptr (pointer address cannot change).',
      'Never suggest malloc in an embedded safety-critical system because of heap fragmentation risk.',
      'Be ready to write a custom memcpy or strlen without using standard C library.'
    ],
    recommendedOrder: [
      '1. Master bitwise manipulation operators (&, |, ^, ~, <<, >>)',
      '2. Understand C memory layout and storage classes (auto, static, register, extern)',
      '3. Study microcontroller startup code, vector table, and ISR entry/exit',
      '4. Learn FreeRTOS primitives: xTaskCreate, vTaskDelay, xQueueSend, xSemaphoreTake'
    ],
    testedCompanies: ['Qualcomm', 'Bosch', 'NXP', 'Texas Instruments', 'STMicroelectronics', 'Honeywell']
  },

  // 5. Hardware Protocols (I2C, SPI, UART, CAN)
  {
    slug: 'microcontrollers-protocols',
    title: 'Hardware Communication Protocols Master Guide',
    tag: 'Microcontrollers & Protocols',
    category: 'Embedded Systems',
    difficulty: 'Intermediate',
    estimatedHours: 18,
    iconName: 'Zap',
    shortDescription: 'Comprehensive breakdown of UART, SPI, I2C, and CAN buses: waveforms, timing, pinouts, and hardware arbitration.',
    overview: 'Every embedded product connects microcontrollers to external sensors, memory chips, displays, and actuators using serial communication protocols. Interviewers test your physical signal level knowledge (pull-ups, differential pairs) and frame formats.',
    importanceWeight: 'Tested in 90% of Embedded, Firmware & IoT Interviews',
    concepts: [
      {
        title: 'I2C Bus: Open-Drain & Clock Stretching',
        description: 'Two-wire synchronous bus (SDA, SCL), open-drain output stages with pull-up resistors, 7-bit addressing, ACK/NACK bits, and clock stretching by slow slaves.',
        badge: 'Top Protocol Question'
      },
      {
        title: 'SPI Bus: 4 Modes (CPOL & CPHA)',
        description: 'Four-wire high-speed full-duplex bus (MOSI, MISO, SCK, CS/SS). Clock Polarity (CPOL) and Clock Phase (CPHA) permutations.',
        badge: 'High Speed'
      },
      {
        title: 'UART: Asynchronous Framing & Baud Rates',
        description: 'Start bit (low), 8 data bits, parity bit, stop bit (high), baud rate synchronization, and clock drift tolerance.',
        badge: 'Diagnostic Standard'
      },
      {
        title: 'CAN Bus: Differential Arbitration & Bit Stuffing',
        description: 'CAN_High and CAN_Low differential signaling, dominant (0) vs recessive (1) bus states, and non-destructive CSMA/CD + AMP arbitration.',
        badge: 'Automotive King'
      }
    ],
    problems: [
      {
        id: 'ece-pr-1',
        title: 'Why Does I2C Require Pull-Up Resistors on SDA and SCL Lines?',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/i2c-communication-protocol/',
        pattern: 'Physical Layer',
        whyAsked: 'Fundamental circuit understanding of open-drain / open-collector outputs.',
        keyTakeaway: 'Because devices can only pull the line LOW (to GND). The pull-up resistor is required to restore the line to HIGH (VCC), preventing short circuits if two devices transmit simultaneously.'
      },
      {
        id: 'ece-pr-2',
        title: 'Explain Non-Destructive Bitwise Arbitration in CAN Protocol',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/controller-area-network-can-protocol/',
        pattern: 'Protocol Arbitration',
        whyAsked: 'Crucial for automotive engineering interviews at Bosch, Continental, and NXP.',
        keyTakeaway: 'When multiple nodes transmit simultaneously, dominant bits (0) overwrite recessive bits (1). The node transmitting a 1 senses a 0, realizes it has lower priority, and backs off immediately without corrupting the higher-priority frame.'
      },
      {
        id: 'ece-pr-3',
        title: 'Compare I2C vs SPI: Advantages, Drawbacks & Throughput',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/difference-between-spi-and-i2c/',
        pattern: 'Tradeoff Analysis',
        whyAsked: 'Evaluates architectural judgment when selecting components on a PCB schematic.',
        keyTakeaway: 'SPI is much faster (50+ MHz vs 400kHz/3.4MHz), full-duplex, but requires dedicated Chip Select lines per slave (pin-heavy). I2C uses only 2 wires for up to 127 devices but is slower and half-duplex.'
      },
      {
        id: 'ece-pr-4',
        title: 'What is Clock Stretching in I2C?',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/i2c-communication-protocol/',
        pattern: 'Handshake Mechanics',
        whyAsked: 'Shows deep familiarity with real-world sensor communication glitches.',
        keyTakeaway: 'When a slave microcontroller needs more time to process received data or prepare response, it holds SCL line LOW. The master detects this and pauses until the slave releases SCL.'
      }
    ],
    interviewTips: [
      'Draw the timing diagrams of I2C Start (SDA falls while SCL high) and Stop condition (SDA rises while SCL high).',
      'Explain SPI CPOL=0 (clock idles low) vs CPOL=1 (clock idles high), and CPHA=0 (sample on first edge) vs CPHA=1 (sample on second edge).',
      'Mention maximum cable length and 120Ω termination resistors at both ends of a CAN bus differential line.'
    ],
    recommendedOrder: [
      '1. Study UART frame structure, baud rate math, and RS-232 level shifting',
      '2. Understand I2C addressing, open-drain circuits, and pull-up resistor value sizing',
      '3. Master SPI 4-modes and shift-register master-slave data exchange',
      '4. Deep-dive into automotive CAN bus differential frames and arbitration'
    ],
    testedCompanies: ['Bosch', 'Qualcomm', 'Texas Instruments', 'NXP', 'Continental', 'Schneider Electric']
  },

  // 6. Computer Architecture & RISC-V
  {
    slug: 'computer-architecture-riscv',
    title: 'Computer Architecture & RISC-V Pipeline Guide',
    tag: 'Computer Architecture & RISC-V',
    category: 'VLSI & Hardware',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    iconName: 'Cpu',
    shortDescription: 'Instruction pipelining, structural/data/control hazards, forwarding units, cache coherency (MESI), and branch prediction.',
    overview: 'Processors power everything from smartphones to AI supercomputers. This guide covers classical Hennessy & Patterson computer architecture concepts: 5-stage classic RISC pipeline, branch prediction algorithms, memory hierarchy, and multi-core coherency.',
    importanceWeight: 'Essential for CPU, GPU & AI Silicon Roles at NVIDIA, Intel & AMD',
    concepts: [
      {
        title: '5-Stage Classic RISC Pipeline',
        description: 'Instruction Fetch (IF), Instruction Decode / Register Fetch (ID), Execute (EX), Memory Access (MEM), and Write-Back (WB).',
        badge: 'Foundation'
      },
      {
        title: 'Pipeline Hazards & Mitigation',
        description: 'Structural hazards (resource conflict), Data hazards (RAW, WAR, WAW) mitigated by operand forwarding/bypassing, and Control hazards resolved by branch prediction.',
        badge: 'Core Problem'
      },
      {
        title: 'Branch Prediction Mechanics',
        description: 'Static prediction (branch taken vs not taken) and Dynamic branch predictors: 1-bit, 2-bit saturating counters, Branch Target Buffers (BTB).',
        badge: 'Performance Engine'
      },
      {
        title: 'Cache Memory & MESI Coherence',
        description: 'Modified, Exclusive, Shared, Invalid (MESI) snooping protocol for maintaining memory consistency across multi-core systems.',
        badge: 'Multi-Core Standard'
      }
    ],
    problems: [
      {
        id: 'ece-ca-1',
        title: 'Identify Read-After-Write (RAW) Data Hazards in Assembly and Show Forwarding Paths',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/pipelining-hazards-in-computer-architecture/',
        pattern: 'Pipeline Hazards',
        whyAsked: 'Standard whiteboard question at Intel, AMD, and NVIDIA processor design teams.',
        keyTakeaway: 'Without forwarding, RAW hazard requires 2 stall bubbles. With EX-to-EX and MEM-to-EX forwarding paths, ALU instructions require zero stalls.'
      },
      {
        id: 'ece-ca-2',
        title: 'Calculate Effective Memory Access Time (EMAT) with Multi-Level Caches',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/effective-memory-access-time-emat-in-computer-organization/',
        pattern: 'Memory Hierarchy Math',
        whyAsked: 'Evaluates understanding of cache latency vs hit rate economics.',
        keyTakeaway: 'EMAT = Hit_Time_L1 + Miss_Rate_L1 * (Hit_Time_L2 + Miss_Rate_L2 * Memory_Penalty).'
      },
      {
        id: 'ece-ca-3',
        title: 'Explain the 4 States in the MESI Cache Coherency Protocol',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/mesi-protocol-in-computer-architecture/',
        pattern: 'Multiprocessor Systems',
        whyAsked: 'Vital for GPU, Server, and SoC hardware engineers.',
        keyTakeaway: 'Modified (dirty, exclusive to this cache), Exclusive (clean, only in this cache), Shared (clean, present in multiple caches), Invalid (cache line holds stale data).'
      },
      {
        id: 'ece-ca-4',
        title: 'Compare Harvard Architecture vs Von Neumann Architecture',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/difference-between-von-neumann-and-harvard-architecture/',
        pattern: 'System Architecture',
        whyAsked: 'Fundamental classification of microprocessor systems.',
        keyTakeaway: 'Von Neumann shares a single memory bus for both instructions and data (Von Neumann bottleneck). Harvard has separate instruction and data buses, allowing simultaneous access.'
      }
    ],
    interviewTips: [
      'Know the differences between RISC (fixed length, load-store architecture, large register set) and CISC (variable length, memory operands).',
      'Be able to draw the pipeline execution diagram (time vs instructions) showing stalls and forwarding arrows.',
      'Remember: Load-Use data hazard CANNOT be solved with forwarding alone; it always requires at least 1 clock cycle stall.'
    ],
    recommendedOrder: [
      '1. Review instruction cycle: Fetch, Decode, Execute, Memory, Write-back',
      '2. Understand Pipelining throughput, speedup formulas, and structural hazards',
      '3. Solve 10 problems on RAW, WAR, and WAW hazards and forwarding conditions',
      '4. Study Cache associativity (Direct-Mapped, Fully Associative, N-way Set Associative)'
    ],
    testedCompanies: ['Intel', 'AMD', 'NVIDIA', 'ARM', 'Qualcomm', 'Apple Silicon']
  },

  // 7. Analog Electronics & Op-Amps
  {
    slug: 'analog-electronics-opamps',
    title: 'Analog Circuits, Op-Amps & Data Converters Guide',
    tag: 'Analog Electronics & Op-Amps',
    category: 'VLSI & Hardware',
    difficulty: 'Advanced',
    estimatedHours: 24,
    iconName: 'Activity',
    shortDescription: 'Master small-signal MOSFET analysis, Op-Amp negative feedback, stability & phase margins, and ADC/DAC architectures.',
    overview: 'Analog electronics demands deep physics intuition and circuit derivation skills. Texas Instruments, Analog Devices (ADI), and Infineon test your ability to calculate gain, bandwidth, slew rate, and frequency stability on a whiteboard.',
    importanceWeight: 'Core Requirement for Texas Instruments, ADI, STMicro & Infineon',
    concepts: [
      {
        title: 'Ideal vs Practical Op-Amp Characteristics',
        description: 'Infinite open loop gain, infinite input impedance, zero output impedance, virtual ground concept, and practical limitations: finite gain, input offset voltage, slew rate, CMRR.',
        badge: 'Fundamental'
      },
      {
        title: 'MOSFET Small-Signal Equivalent Circuits',
        description: 'Derive small-signal transconductance (gm = dId/dVgs), output resistance (ro = 1/lambda*Id), and calculate voltage gain for Common-Source and Cascode configurations.',
        badge: 'Silicon Design Core'
      },
      {
        title: 'Frequency Response & Feedback Stability',
        description: 'Bode plots, dominant pole, phase margin (PM >= 45° for stability), gain margin, and Miller compensation techniques in two-stage CMOS Op-Amps.',
        badge: 'High Difficulty'
      },
      {
        title: 'ADC Architectures (Flash, SAR, Sigma-Delta)',
        description: 'Speed vs resolution tradeoffs: Flash ADC (fastest, 2^N-1 comparators), SAR ADC (medium speed, successive approximation), Sigma-Delta (highest resolution, oversampling).',
        badge: 'Mixed Signal'
      }
    ],
    problems: [
      {
        id: 'ece-an-1',
        title: 'Derive Closed-Loop Gain of Non-Inverting Op-Amp with Finite Open-Loop Gain (A)',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/non-inverting-operational-amplifier/',
        pattern: 'Op-Amp Derivation',
        whyAsked: 'Tests whether candidate understands negative feedback mathematics beyond the ideal virtual short assumption.',
        keyTakeaway: 'A_closed = (1 + R2/R1) / (1 + (1 + R2/R1)/A). As open-loop gain A approaches infinity, closed-loop gain simplifies to 1 + R2/R1.'
      },
      {
        id: 'ece-an-2',
        title: 'Explain Slew Rate and Calculate Maximum Un-distorted Frequency for a Given Sine Wave',
        difficulty: 'Easy',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/slew-rate-of-op-amp/',
        pattern: 'Op-Amp Limitations',
        whyAsked: 'Standard TI and ADI interview screening question.',
        keyTakeaway: 'Slew Rate SR = max(dv/dt) = 2 * pi * f * Vp. Therefore maximum frequency f_max = SR / (2 * pi * Vp).'
      },
      {
        id: 'ece-an-3',
        title: 'Derive the Small-Signal Voltage Gain of a Common-Source Amplifier with Source Degeneration',
        difficulty: 'Hard',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/common-source-amplifier-with-source-degeneration/',
        pattern: 'Small-Signal Analysis',
        whyAsked: 'Demonstrates ability to draw small-signal T or Pi model and solve KCL equations on the fly.',
        keyTakeaway: 'Av ≈ - (gm * Rd) / (1 + gm * Rs). Source degeneration stabilizes gain against transistor variations at the cost of reduced gain.'
      },
      {
        id: 'ece-an-4',
        title: 'How Does a Successive Approximation Register (SAR) ADC Work?',
        difficulty: 'Medium',
        platform: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/successive-approximation-type-adc/',
        pattern: 'Mixed-Signal Converters',
        whyAsked: 'SAR ADCs dominate modern microcontroller built-in analog conversion peripherals.',
        keyTakeaway: 'Uses binary search algorithm: starts at MSB = 1, tests output with internal DAC and comparator; keeps bit 1 if Vin > Vdac, else sets bit to 0. Takes N clock cycles for N-bit resolution.'
      }
    ],
    interviewTips: [
      'Always start circuit analysis by stating assumptions: whether MOSFET is in saturation (Vds >= Vgs - Vth) and channel length modulation lambda is considered.',
      'In negative feedback op-amp circuits, explain why virtual short holds (because high gain drives differential voltage (V+ - V-) to zero).',
      'For stability questions, state that Phase Margin of 60° provides optimal transient response with minimum overshoot.'
    ],
    recommendedOrder: [
      '1. Review Op-Amp linear circuits (Inverting, Non-inverting, Summing, Difference)',
      '2. Study Op-Amp frequency response, gain-bandwidth product (GBW), and Slew Rate',
      '3. Derive small signal gain for Common Source, Common Drain, and Common Gate MOSFETs',
      '4. Compare ADC topologies: Flash vs SAR vs Sigma-Delta'
    ],
    testedCompanies: ['Texas Instruments', 'Analog Devices (ADI)', 'Infineon', 'STMicroelectronics', 'NXP']
  }
];

export function getEcePrepGuideBySlug(slug: string): PrepGuide | undefined {
  return ECE_PREP_GUIDES.find(g => g.slug === slug || g.tag.toLowerCase() === slug.toLowerCase());
}
