import { CareerRole } from './careerPathsData';

export const ECE_CAREER_ROLES: CareerRole[] = [
  // 1. Embedded Systems Engineer
  {
    slug: 'embedded-systems-engineer',
    title: 'Embedded Systems Engineer',
    category: 'Technical',
    tagline: 'Bridge hardware and software by engineering firmware, device drivers, and real-time control systems.',
    badge: 'High Hardware Demand',
    iconName: 'Cpu',
    difficultyLevel: 'High',
    salaryRange: '₹6 - 28+ LPA',
    averageCTC: '₹12.5 LPA',
    overview: 'Embedded Systems Engineers architect software running directly on microcontrollers and microprocessors without a full desktop OS. They interface directly with sensors, ADCs, motor controllers, and automotive/industrial IoT communication buses.',
    dayInTheLife: 'You will write C/C++ firmware, hook up logic analyzers and oscilloscopes to debug SPI/I2C signals, configure DMA channels and timer interrupts, and optimize memory footprints under strict KB RAM limits.',
    responsibilities: [
      'Develop bare-metal and RTOS-based firmware for ARM Cortex-M, ESP32, and RISC-V platforms.',
      'Write low-level hardware device drivers (UART, SPI, I2C, CAN, Ethernet, USB).',
      'Debug hardware-software timing glitches using oscilloscopes, DMMs, and logic analyzers.',
      'Optimize firmware execution for ultra-low-power battery consumption.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.', 'M.Tech'],
      minCGPA: '7.0 / 10.0',
      branchEligibility: 'ECE, EEE, E&I, Mechatronics, CSE (with hardware interest)',
      keyPrerequisites: ['Embedded C', 'Microcontroller Architecture (ARM/AVR)', 'Digital Electronics', 'Basic Circuit Debugging']
    },
    coreSkills: [
      { name: 'Embedded C & Pointers', level: 'Essential', category: 'Programming' },
      { name: 'Microcontrollers (ARM Cortex-M/STM32)', level: 'Essential', category: 'Domain' },
      { name: 'Buses (UART, I2C, SPI, CAN)', level: 'Essential', category: 'Domain' },
      { name: 'FreeRTOS / Multithreading', level: 'Important', category: 'Development' },
      { name: 'Oscilloscope & Logic Analyzer Debugging', level: 'Important', category: 'Tools' },
      { name: 'Memory Layout (.data, .bss, Stack/Heap)', level: 'Essential', category: 'Domain' }
    ],
    softSkills: [
      'Tenacious hardware troubleshooting mentality',
      'Cross-functional collaboration with PCB hardware engineers',
      'System safety and fail-safe thinking'
    ],
    radarSkills: [
      { subject: 'Embedded C', score: 95, fullMark: 100 },
      { subject: 'Protocols (SPI/I2C/CAN)', score: 90, fullMark: 100 },
      { subject: 'RTOS Concepts', score: 85, fullMark: 100 },
      { subject: 'Hardware Debugging', score: 85, fullMark: 100 },
      { subject: 'DSA & Algorithms', score: 65, fullMark: 100 },
      { subject: 'Digital Logic', score: 80, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Qualcomm', companyId: 'comp-qualcomm', hiringType: 'Firmware Engineer', typicalPackage: '₹18 - 32 LPA' },
      { name: 'Bosch Global Software', companyId: 'comp-bosch', hiringType: 'Embedded Software Engineer', typicalPackage: '₹7 - 14 LPA' },
      { name: 'Texas Instruments', companyId: 'comp-ti', hiringType: 'Embedded Applications Engineer', typicalPackage: '₹16 - 26 LPA' },
      { name: 'NXP Semiconductors', companyId: 'comp-nxp', hiringType: 'Embedded Systems Trainee', typicalPackage: '₹12 - 20 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Online Assessment', roundType: 'OA', focus: 'C pointers, bit manipulation, volatile, ISR output prediction, and basic electronics', duration: '60 mins' },
      { roundName: 'Round 2: Technical Interview 1', roundType: 'Technical', focus: 'Deep dive into Embedded C: memory layout, function pointers, circular buffers, and interrupt latency', duration: '50 mins' },
      { roundName: 'Round 3: Technical Interview 2', roundType: 'Technical', focus: 'Communication protocol arbitration (I2C clock stretching, CAN dominant/recessive bits) and RTOS priority inversion', duration: '50 mins' },
      { roundName: 'Round 4: HR & Fitment', roundType: 'HR', focus: 'Academic hardware project walkthrough, team problem-solving, and adaptability', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Associate Embedded Engineer', description: 'Implements peripheral drivers and writes test firmware on dev boards.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior Embedded Engineer', description: 'Architects RTOS task graphs, optimizes power budgets, and liaises with silicon vendors.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Embedded Systems Architect', description: 'Defines system-wide hardware/software partition, chooses MCU architectures, leads product certification.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Director of Embedded Engineering', description: 'Oversees whole product lines across automotive, defense, or consumer electronics.' }
    ],
    recommendedGuideSlugs: ['embedded-c-rtos', 'microcontrollers-protocols'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'Embedded C Mastery', actionItems: ['Master bitwise operators (shifts, masking, bitfield structs)', 'Understand volatile, const volatile, static storage classes', 'Implement circular queue buffer for UART reception in C'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'Hardware Protocols & Peripherals', actionItems: ['Work with STM32 (Nucleo) or ESP32 using bare-metal register programming or HAL', 'Compare SPI, I2C, UART, and CAN on oscilloscope waveforms', 'Study DMA, Timer PWM generation, and ADC sampling'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'RTOS & Interview Questions', actionItems: ['Build a multi-task FreeRTOS project using queues and semaphores', 'Understand Priority Inversion and Priority Inheritance', 'Solve 50+ classic Embedded C interview output prediction questions'] }
    ]
  },

  // 2. VLSI / ASIC Design Engineer
  {
    slug: 'vlsi-design-engineer',
    title: 'VLSI / ASIC Design Engineer',
    category: 'Technical',
    tagline: 'Translate complex mathematical and architectural specifications into synthesis-ready silicon circuits.',
    badge: 'Premier Semiconductor Role',
    iconName: 'Cpu',
    difficultyLevel: 'Very High',
    salaryRange: '₹10 - 40+ LPA',
    averageCTC: '₹18 LPA',
    overview: 'ASIC/VLSI Design Engineers create the microarchitecture of microprocessors, GPUs, and AI accelerators using Hardware Description Languages (HDL) like Verilog and SystemVerilog.',
    dayInTheLife: 'You will write synthesizable RTL code, create state machines, run Lint and CDC checks, collaborate with verification engineers on bug fixes, and optimize datapath timing.',
    responsibilities: [
      'Architect RTL blocks using Verilog and SystemVerilog for SoCs and ASICs.',
      'Design synchronous and asynchronous FIFOs, arbiters, and bus interfaces (AXI, AHB, APB).',
      'Resolve Clock Domain Crossing (CDC) issues and static timing bottlenecks.',
      'Work alongside Physical Design teams to meet clock frequency and area targets.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.', 'M.Tech (VLSI / Microelectronics)'],
      minCGPA: '7.5 / 10.0',
      branchEligibility: 'ECE, EEE, Microelectronics, VLSI',
      keyPrerequisites: ['Digital Electronics & K-Maps', 'Verilog / SystemVerilog', 'Computer Architecture', 'Static Timing Analysis (STA)']
    },
    coreSkills: [
      { name: 'Verilog / SystemVerilog (RTL)', level: 'Essential', category: 'Programming' },
      { name: 'Digital Logic & FSM Design', level: 'Essential', category: 'Domain' },
      { name: 'Static Timing Analysis (Setup/Hold)', level: 'Essential', category: 'Domain' },
      { name: 'Computer Architecture & Pipelining', level: 'Important', category: 'Domain' },
      { name: 'Bus Protocols (AXI / AHB / APB)', level: 'Important', category: 'Domain' },
      { name: 'Simulation Tools (ModelSim / Questa / VCS)', level: 'Important', category: 'Tools' }
    ],
    softSkills: [
      'Meticulous detail-oriented verification eye',
      'Deep patience for long simulation and synthesis runs',
      'Clarity in documenting microarchitecture specifications'
    ],
    radarSkills: [
      { subject: 'Verilog / RTL', score: 95, fullMark: 100 },
      { subject: 'Digital Electronics', score: 95, fullMark: 100 },
      { subject: 'STA & Timing', score: 90, fullMark: 100 },
      { subject: 'Computer Architecture', score: 85, fullMark: 100 },
      { subject: 'Protocols (AXI/AHB)', score: 75, fullMark: 100 },
      { subject: 'Scripting (Python/Tcl)', score: 70, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'NVIDIA', companyId: 'comp-nvidia', hiringType: 'ASIC Design Engineer', typicalPackage: '₹22 - 42 LPA' },
      { name: 'AMD', companyId: 'comp-amd', hiringType: 'Silicon Design Engineer', typicalPackage: '₹18 - 36 LPA' },
      { name: 'Intel', companyId: 'comp-intel', hiringType: 'Logic Design Engineer', typicalPackage: '₹16 - 32 LPA' },
      { name: 'Broadcom', companyId: 'comp-broadcom', hiringType: 'ASIC Design Engineer', typicalPackage: '₹20 - 38 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Digital Written Test', roundType: 'OA', focus: 'K-Maps, Flip-Flop setup/hold calculations, FSM design, Verilog blocking vs non-blocking assignments', duration: '60 mins' },
      { roundName: 'Round 2: RTL & Digital Design', roundType: 'Technical', focus: 'Live RTL coding of Sequence Detector, Synchronous/Asynchronous FIFO, and Gray Code conversions', duration: '60 mins' },
      { roundName: 'Round 3: Timing & Architecture', roundType: 'Technical', focus: 'STA setup and hold slack derivation with skew/jitter, fixing violations, CPU pipelining hazards', duration: '60 mins' },
      { roundName: 'Round 4: Leadership & Fitment', roundType: 'HR', focus: 'Handling tape-out pressure, design trade-offs (PPA: Power, Performance, Area)', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'RTL Design Engineer I', description: 'Designs sub-blocks, writes synthesizable Verilog, resolves lint warnings.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior ASIC Design Engineer', description: 'Owns full IP modules (e.g., PCIe controller, memory subsystem, cryptographic engine).' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Principal Silicon Architect', description: 'Defines chip microarchitecture specifications and leads tapeout readiness.' },
      { stage: 'Executive', years: '8+ yrs', title: 'VP of Silicon Engineering', description: 'Steers roadmap for multi-billion transistor semiconductor chip families.' }
    ],
    recommendedGuideSlugs: ['digital-electronics-vlsi', 'verilog-systemverilog', 'sta-timing-analysis'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'Digital Fundamentals & K-Maps', actionItems: ['Master Flip-Flops, timing diagrams, clock skew and jitter', 'Solve 50+ setup and hold time calculation problems', 'Design Mealy and Moore FSMs with state minimization'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'Verilog & Microarchitecture', actionItems: ['Understand blocking (=) vs non-blocking (<=) assignment synthesis semantics', 'Code FIFO, Arbiter, and ALU in synthesizable Verilog', 'Study AMBA AXI/AHB protocols and handshakes'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'CDC, STA & Mock Interviews', actionItems: ['Learn Clock Domain Crossing (CDC) synchronizers and Gray coding', 'Practice STA constraint generation (create_clock, set_input_delay)', 'Simulate Verilog testbenches in ModelSim or Icarus Verilog'] }
    ]
  },

  // 3. Design Verification Engineer (DV)
  {
    slug: 'verification-engineer',
    title: 'Design Verification Engineer (DV)',
    category: 'Technical',
    tagline: 'Ensure billion-transistor chips are 100% bug-free using SystemVerilog, UVM, and constrained random tests.',
    badge: 'Highest VLSI Job Openings',
    iconName: 'ShieldCheck',
    difficultyLevel: 'High',
    salaryRange: '₹8 - 35+ LPA',
    averageCTC: '₹15 LPA',
    overview: 'Verification Engineers ensure that semiconductor designs conform perfectly to architectural specifications before manufacturing. With chip tapeout costing tens of millions of dollars, DV engineers outnumber design engineers 2-to-1.',
    dayInTheLife: 'You will build object-oriented verification testbenches in SystemVerilog using the Universal Verification Methodology (UVM), write functional coverage models, and trace RTL waveforms to track bugs.',
    responsibilities: [
      'Develop UVM testbenches (Driver, Monitor, Scoreboard, Sequencer, Agent).',
      'Create constrained-random test sequences and functional coverage points.',
      'Debug simulation failures and log defect tickets with RTL designers.',
      'Perform gate-level simulation (GLS) and assertion-based verification (SVA).'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.', 'M.Tech'],
      minCGPA: '7.0 / 10.0',
      branchEligibility: 'ECE, EEE, CSE, VLSI',
      keyPrerequisites: ['SystemVerilog & OOP Concepts', 'Digital Design', 'UVM Basics', 'Python / Perl scripting']
    },
    coreSkills: [
      { name: 'SystemVerilog (OOP & Verification)', level: 'Essential', category: 'Programming' },
      { name: 'UVM Methodology', level: 'Essential', category: 'Domain' },
      { name: 'SystemVerilog Assertions (SVA)', level: 'Important', category: 'Domain' },
      { name: 'Constrained Random Testing', level: 'Essential', category: 'Domain' },
      { name: 'Digital Electronics & Protocols', level: 'Important', category: 'Domain' },
      { name: 'EDA Simulators (VCS / Questa / Xcelium)', level: 'Important', category: 'Tools' }
    ],
    softSkills: [
      'Adversarial test mentality ("trying to break the chip")',
      'Structured root-cause bug analysis',
      'Clear cross-team communication'
    ],
    radarSkills: [
      { subject: 'SystemVerilog OOP', score: 95, fullMark: 100 },
      { subject: 'UVM Framework', score: 90, fullMark: 100 },
      { subject: 'Digital Logic', score: 85, fullMark: 100 },
      { subject: 'Functional Coverage', score: 85, fullMark: 100 },
      { subject: 'Assertions (SVA)', score: 80, fullMark: 100 },
      { subject: 'Scripting (Python/Tcl)', score: 75, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Qualcomm', companyId: 'comp-qualcomm', hiringType: 'Design Verification Engineer', typicalPackage: '₹18 - 34 LPA' },
      { name: 'NVIDIA', companyId: 'comp-nvidia', hiringType: 'ASIC Verification Engineer', typicalPackage: '₹20 - 40 LPA' },
      { name: 'Intel', companyId: 'comp-intel', hiringType: 'Pre-Silicon Verification Engineer', typicalPackage: '₹15 - 30 LPA' },
      { name: 'Broadcom', companyId: 'comp-broadcom', hiringType: 'Hardware Verification Engineer', typicalPackage: '₹18 - 35 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Online Assessment', roundType: 'OA', focus: 'Digital electronics, SystemVerilog OOP questions, virtual methods, shallow vs deep copy', duration: '60 mins' },
      { roundName: 'Round 2: SV OOP & Testbench Architecture', roundType: 'Technical', focus: 'Implement a verification environment: mailboxes, semaphores, fork-join blocks, and polymorphism', duration: '60 mins' },
      { roundName: 'Round 3: UVM & Problem Solving', roundType: 'Technical', focus: 'UVM phases, TLM ports, factory pattern, configuration database, and coverage-driven test closure', duration: '60 mins' },
      { roundName: 'Round 4: Managerial / HR', roundType: 'HR', focus: 'Bug triage experience, conflict resolution with designers, and attention to detail', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Verification Engineer I', description: 'Writes directed and random tests, closes basic functional coverage holes.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior DV Engineer', description: 'Architects UVM testbenches from scratch for complex SoC sub-systems.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Principal Verification Lead', description: 'Signs off on tapeout verification completeness and methodology standardization.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Director of Verification', description: 'Leads global DV organizations spanning multi-die chiplet verification.' }
    ],
    recommendedGuideSlugs: ['verilog-systemverilog', 'digital-electronics-vlsi'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'OOP in SystemVerilog', actionItems: ['Classes, objects, inheritance, polymorphism, virtual classes', 'Randomization (rand vs randc, constraint blocks, solve-before)', 'Inter-process synchronization: events, mailboxes, semaphores'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'UVM Architecture Basics', actionItems: ['Learn UVM component hierarchy: uvm_driver, uvm_monitor, uvm_scoreboard', 'Understand UVM build/run/cleanup execution phases', 'Implement a simple ALU verification testbench in EDA Playground'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'Coverage & SVA', actionItems: ['Write Covergroups, Coverpoints, and Cross-coverage', 'Write immediate and concurrent SystemVerilog Assertions (SVA)', 'Practice 40+ SV verification interview questions'] }
    ]
  },

  // 4. Physical Design Engineer (PD)
  {
    slug: 'physical-design-engineer',
    title: 'Physical Design Engineer',
    category: 'Technical',
    tagline: 'Transform logical gate netlists into geometric GDSII mask layouts ready for foundry fabrication.',
    badge: 'High Silicon Impact',
    iconName: 'Layers',
    difficultyLevel: 'Very High',
    salaryRange: '₹8 - 36+ LPA',
    averageCTC: '₹16 LPA',
    overview: 'Physical Design (PD) Engineers take synthesized gate-level netlists and position billions of transistors on silicon wafers. They manage floorplanning, power distribution, clock tree synthesis (CTS), routing, and physical verification (DRC/LVS).',
    dayInTheLife: 'You will run EDA place-and-route tools (Synopsys ICC2 / Cadence Innovus), analyze clock skew across millions of registers, fix DRC violations, and optimize IR drop.',
    responsibilities: [
      'Perform floorplanning, pin placement, macro placement, and power mesh synthesis.',
      'Build low-skew Clock Trees (CTS) and optimize clock latency.',
      'Achieve timing closure (resolving setup and hold violations) across PVT corners.',
      'Execute Physical Verification (Design Rule Checks DRC, Layout Versus Schematic LVS).'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.', 'M.Tech (VLSI)'],
      minCGPA: '7.0 / 10.0',
      branchEligibility: 'ECE, EEE, VLSI',
      keyPrerequisites: ['CMOS Basics', 'Static Timing Analysis (STA)', 'ASIC Design Flow', 'Tcl Scripting']
    },
    coreSkills: [
      { name: 'ASIC Physical Design Flow (Netlist to GDSII)', level: 'Essential', category: 'Domain' },
      { name: 'Static Timing Analysis (STA & Slack)', level: 'Essential', category: 'Domain' },
      { name: 'Clock Tree Synthesis (CTS & Skew)', level: 'Essential', category: 'Domain' },
      { name: 'CMOS Inverter & Fabrication Basics', level: 'Essential', category: 'Domain' },
      { name: 'DRC, LVS & Antenna Checks', level: 'Important', category: 'Domain' },
      { name: 'Tcl Scripting for EDA Automation', level: 'Important', category: 'Programming' }
    ],
    softSkills: [
      'Problem-solving under tapeout pressure',
      'Analytical mindset for trade-offs (timing vs power vs area)',
      'Collaboration with foundry and package engineering teams'
    ],
    radarSkills: [
      { subject: 'Physical Design Flow', score: 95, fullMark: 100 },
      { subject: 'STA & Timing Closure', score: 95, fullMark: 100 },
      { subject: 'CTS & Clock Skew', score: 90, fullMark: 100 },
      { subject: 'CMOS Physics & DRC', score: 85, fullMark: 100 },
      { subject: 'Tcl Scripting', score: 80, fullMark: 100 },
      { subject: 'Digital Logic', score: 80, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'AMD', companyId: 'comp-amd', hiringType: 'Physical Design Engineer', typicalPackage: '₹18 - 36 LPA' },
      { name: 'Intel', companyId: 'comp-intel', hiringType: 'SoC Physical Design Engineer', typicalPackage: '₹16 - 32 LPA' },
      { name: 'NVIDIA', companyId: 'comp-nvidia', hiringType: 'ASIC Physical Design Engineer', typicalPackage: '₹22 - 42 LPA' },
      { name: 'Samsung Semiconductor (SSIR)', companyId: 'comp-samsung-semicon', hiringType: 'Physical Design Specialist', typicalPackage: '₹16 - 30 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Screening Test', roundType: 'OA', focus: 'CMOS inverter VTC curve, setup/hold equation derivation, RC delays, and basic digital circuits', duration: '60 mins' },
      { roundName: 'Round 2: Physical Design Flow & Floorplanning', roundType: 'Technical', focus: 'Core-to-IO boundary, macro halo, power grid design, EM (electromigration), and IR drop calculations', duration: '60 mins' },
      { roundName: 'Round 3: CTS & Timing Closure', roundType: 'Technical', focus: 'H-Tree vs Mesh, clock buffers, fixing hold violations with buffers, multi-corner multi-mode (MCMM) analysis', duration: '60 mins' },
      { roundName: 'Round 4: HR & Fitment', roundType: 'HR', focus: 'Work ethic, handling tight deadlines, and eagerness to master EDA software tools', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Physical Design Engineer I', description: 'Executes block-level placement, runs CTS scripts, and fixes simple DRC violations.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior PD Engineer', description: 'Owns full-chip floorplanning, signoff timing closure, and tapeout delivery.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Physical Design Lead / Principal', description: 'Defines synthesis and P&R methodologies for advanced foundry nodes (3nm/2nm).' },
      { stage: 'Executive', years: '8+ yrs', title: 'Director of Physical Implementation', description: 'Oversees foundry partnerships and chip packaging strategy.' }
    ],
    recommendedGuideSlugs: ['vlsi-physical-design', 'sta-timing-analysis', 'digital-electronics-vlsi'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'CMOS Basics & STA Math', actionItems: ['Derive inverter threshold voltage, noise margins, and propagation delay', 'Understand dynamic and leakage power dissipation formulas', 'Master setup and hold time slack equations with jitter and skew'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'P&R Step-by-Step Flow', actionItems: ['Study Floorplanning, Placement, CTS, and Routing step inputs/outputs', 'Understand LEF, DEF, Liberty (.lib), and SDC constraint files', 'Learn basic Tcl scripting commands for automation'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'Timing Closure & Physical Verification', actionItems: ['Study DRC rules (spacing, width, enclosure) and LVS extraction', 'Understand why hold violations cannot be fixed by decreasing clock frequency', 'Practice 30 classic PD interview scenario questions'] }
    ]
  },

  // 5. Firmware Engineer
  {
    slug: 'firmware-engineer',
    title: 'Firmware Engineer',
    category: 'Technical',
    tagline: 'Write high-performance system code that directly controls hardware in SSDs, GPUs, and network switches.',
    badge: 'Critical High-Paying Role',
    iconName: 'Terminal',
    difficultyLevel: 'High',
    salaryRange: '₹7 - 32+ LPA',
    averageCTC: '₹14 LPA',
    overview: 'Firmware Engineers develop the mission-critical code stored in non-volatile ROM/Flash memory. They handle system initialization, bootloaders, PCIe drivers, SSD flash translation layers (FTL), and GPU power management.',
    dayInTheLife: 'You will write C and Assembly code, analyze boot sequences using JTAG/SWD debuggers, optimize memory caching, and write kernel-level low-latency drivers.',
    responsibilities: [
      'Develop UEFI, BIOS, and custom bootloader sequences.',
      'Write device drivers for PCIe, NVMe, Ethernet, and DMA controllers.',
      'Optimize low-level hardware concurrency using spinlocks, semaphores, and atomics.',
      'Conduct hardware-in-the-loop (HIL) testing and bare-metal diagnostics.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.', 'M.Tech'],
      minCGPA: '7.0 / 10.0',
      branchEligibility: 'ECE, CSE, EEE',
      keyPrerequisites: ['C Programming & Bitwise Operations', 'Computer Architecture', 'Operating Systems Basics', 'Microprocessors']
    },
    coreSkills: [
      { name: 'Low-Level C & Pointers', level: 'Essential', category: 'Programming' },
      { name: 'Computer Architecture & Memory Hierarchy', level: 'Essential', category: 'Domain' },
      { name: 'Operating Systems & Concurrency', level: 'Important', category: 'Domain' },
      { name: 'Device Drivers (PCIe, NVMe, USB)', level: 'Important', category: 'Domain' },
      { name: 'JTAG / GDB Hardware Debugging', level: 'Important', category: 'Tools' },
      { name: 'Assembly & Bootloaders', level: 'Important', category: 'Programming' }
    ],
    softSkills: [
      'Precision and discipline in code quality',
      'Systematic debugging without graphical tools',
      'Ownership of hardware bring-up milestones'
    ],
    radarSkills: [
      { subject: 'Low-Level C', score: 95, fullMark: 100 },
      { subject: 'Computer Architecture', score: 90, fullMark: 100 },
      { subject: 'OS & Memory Layout', score: 85, fullMark: 100 },
      { subject: 'Hardware Debugging (GDB/JTAG)', score: 85, fullMark: 100 },
      { subject: 'Data Structures', score: 75, fullMark: 100 },
      { subject: 'Digital Systems', score: 75, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Micron Technology', companyId: 'comp-micron', hiringType: 'SSD Firmware Engineer', typicalPackage: '₹15 - 28 LPA' },
      { name: 'Qualcomm', companyId: 'comp-qualcomm', hiringType: 'Firmware Engineer', typicalPackage: '₹18 - 32 LPA' },
      { name: 'NVIDIA', companyId: 'comp-nvidia', hiringType: 'GPU Firmware Engineer', typicalPackage: '₹22 - 40 LPA' },
      { name: 'Intel', companyId: 'comp-intel', hiringType: 'Firmware BIOS Engineer', typicalPackage: '₹15 - 30 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Coding & Systems Assessment', roundType: 'OA', focus: 'C pointer puzzles, bit reversal, endianness checks, and OS memory concepts', duration: '60 mins' },
      { roundName: 'Round 2: C Programming Deep Dive', roundType: 'Technical', focus: 'Implement custom malloc, circular buffer, lock-free ring buffer, volatile keyword in hardware registers', duration: '60 mins' },
      { roundName: 'Round 3: Computer Architecture & Hardware Bring-up', roundType: 'Technical', focus: 'Cache coherence, DMA transfers, interrupt nesting, and debugging an infinite boot loop', duration: '60 mins' },
      { roundName: 'Round 4: Fitment & HR', roundType: 'HR', focus: 'Problem solving under incomplete documentation, project ownership', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Associate Firmware Engineer', description: 'Maintains diagnostic firmware, fixes peripheral driver bugs.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior Firmware Engineer', description: 'Designs core storage or network stack firmware; leads silicon bring-up in lab.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Principal Firmware Architect', description: 'Defines architecture for next-gen silicon boot and power management stacks.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Director of Firmware Engineering', description: 'Leads cross-platform firmware engineering across global product segments.' }
    ],
    recommendedGuideSlugs: ['embedded-c-rtos', 'computer-architecture-riscv'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'Pointers & Bitwise C Puzzles', actionItems: ['Write functions to check endianness at runtime', 'Implement bitwise pack/unpack macros for hardware registers', 'Understand alignment, structure padding, and __attribute__((packed))'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'Architecture & Peripherals', actionItems: ['Understand L1/L2/L3 cache architectures and memory barriers', 'Write a simulated ring buffer driver with head/tail pointers', 'Learn GDB debugging over QEMU ARM simulator'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'PCIe/NVMe & Mock Rounds', actionItems: ['Study NVMe command queues and PCIe configuration space', 'Practice OS concepts: virtual memory, MMU page tables, TLB hits/misses', 'Solve top 30 firmware coding interview problems'] }
    ]
  },

  // 6. Analog & Mixed Signal Design Engineer
  {
    slug: 'analog-design-engineer',
    title: 'Analog & Mixed-Signal IC Design Engineer',
    category: 'Technical',
    tagline: 'Design precision silicon circuits that convert continuous real-world signals into clean digital data.',
    badge: 'Rarest & Prestigious Skillset',
    iconName: 'Activity',
    difficultyLevel: 'Very High',
    salaryRange: '₹8 - 34+ LPA',
    averageCTC: '₹16 LPA',
    overview: 'Analog and Mixed-Signal engineers design operational amplifiers, voltage regulators (LDOs), Phase-Locked Loops (PLLs), and Analog-to-Digital Converters (ADCs). Because real-world signals are continuous, analog design requires profound circuit intuition.',
    dayInTheLife: 'You will design schematic circuits in Cadence Virtuoso, run SPICE simulations across temperature and voltage corners, and draw full-custom transistor layouts.',
    responsibilities: [
      'Design high-gain, wide-bandwidth Op-Amps, Bandgap References, and LDOs.',
      'Architect data converters (SAR ADC, Delta-Sigma, DAC).',
      'Simulate noise, linearity (THD, SNR), and stability (Phase Margin, Gain Margin).',
      'Perform transistor-level layout with matching techniques (common-centroid, interdigitized).'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.', 'M.Tech (Microelectronics / VLSI)'],
      minCGPA: '7.5 / 10.0',
      branchEligibility: 'ECE, EEE, Microelectronics',
      keyPrerequisites: ['Electronic Devices & Circuits (EDC)', 'Analog Circuits & Op-Amps', 'MOSFET Small Signal Models', 'Signals & Systems']
    },
    coreSkills: [
      { name: 'MOSFET Small-Signal Analysis (gm, ro)', level: 'Essential', category: 'Domain' },
      { name: 'Op-Amp Topologies (Two-stage, Folded Cascode)', level: 'Essential', category: 'Domain' },
      { name: 'Frequency Compensation (Miller, Phase Margin)', level: 'Essential', category: 'Domain' },
      { name: 'Data Converters (ADC & DAC)', level: 'Important', category: 'Domain' },
      { name: 'Noise Analysis (Thermal, Flicker 1/f)', level: 'Important', category: 'Domain' },
      { name: 'SPICE Simulation Tools (Cadence Spectre / LTSpice)', level: 'Important', category: 'Tools' }
    ],
    softSkills: [
      'Deep physics and mathematical intuition',
      'Patience for iterative analog parameter tuning',
      'Clear schematic and derivation documentation'
    ],
    radarSkills: [
      { subject: 'MOSFET Physics & Models', score: 95, fullMark: 100 },
      { subject: 'Op-Amp Topologies', score: 95, fullMark: 100 },
      { subject: 'Stability & Phase Margin', score: 90, fullMark: 100 },
      { subject: 'ADCs & Data Converters', score: 85, fullMark: 100 },
      { subject: 'SPICE Simulation', score: 85, fullMark: 100 },
      { subject: 'Noise Analysis', score: 80, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Texas Instruments', companyId: 'comp-ti', hiringType: 'Analog Design Engineer', typicalPackage: '₹18 - 30 LPA' },
      { name: 'Analog Devices (ADI)', companyId: 'comp-adi', hiringType: 'Mixed-Signal IC Designer', typicalPackage: '₹17 - 28 LPA' },
      { name: 'Infineon Technologies', companyId: 'comp-infineon', hiringType: 'Analog IC Engineer', typicalPackage: '₹14 - 24 LPA' },
      { name: 'STMicroelectronics', companyId: 'comp-stmicro', hiringType: 'Analog Trainee', typicalPackage: '₹12 - 20 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Core Analog Assessment', roundType: 'OA', focus: 'RC filters, BJT/MOSFET operating regions, Bode plots, gain-bandwidth product', duration: '60 mins' },
      { roundName: 'Round 2: Small Signal Derivation', roundType: 'Technical', focus: 'Live derivation of small signal gain for Common Source with degeneration and Cascode amplifiers', duration: '60 mins' },
      { roundName: 'Round 3: Op-Amp Design & Stability', roundType: 'Technical', focus: 'Two-stage CMOS Op-Amp design, Miller compensation capacitor sizing, and Bandgap Reference circuits', duration: '60 mins' },
      { roundName: 'Round 4: Fitment & HR', roundType: 'HR', focus: 'Passion for physical hardware and lab oscilloscope testing experience', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Analog Design Engineer I', description: 'Designs bias circuits, runs corner simulations, performs sub-circuit layout.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior Analog Designer', description: 'Owns high-speed ADC/DAC or power management IP blocks.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Principal Mixed-Signal Architect', description: 'Leads breakthrough RF/Analog front-end design for sensor and 5G/6G silicon.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Fellow / VP Analog Engineering', description: 'Industry authority guiding company-wide analog patents and architectures.' }
    ],
    recommendedGuideSlugs: ['analog-electronics-opamps'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'MOSFET Small Signal Models', actionItems: ['Master CS, CD, CG amplifier configurations with active loads', 'Derive input/output impedance and voltage gain formulas by hand', 'Practice Razavi Chapter 2 and 3 problems'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'Op-Amp Architecture & Feedback', actionItems: ['Study Differential Pairs: CMRR, input common-mode range, offset voltage', 'Learn Two-Stage CMOS Op-Amp and Miller pole splitting', 'Simulate frequency response and phase margin in LTSpice'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'Reference Circuits & Data Converters', actionItems: ['Understand Bandgap Voltage References (Brokaw / Kuijk cells)', 'Compare Flash, SAR, and Delta-Sigma ADC topologies', 'Practice 25 classic TI / ADI analog interview questions'] }
    ]
  },

  // 7. FPGA Design & Acceleration Engineer
  {
    slug: 'fpga-engineer',
    title: 'FPGA Design & Acceleration Engineer',
    category: 'Technical',
    tagline: 'Program reconfigurable hardware logic to accelerate high-frequency trading, AI, and aerospace radar.',
    badge: 'High-Frequency FinTech & Defense',
    iconName: 'Zap',
    difficultyLevel: 'High',
    salaryRange: '₹8 - 38+ LPA',
    averageCTC: '₹16 LPA',
    overview: 'FPGA Engineers design hardware architectures on field-programmable gate arrays (AMD/Xilinx, Intel/Altera). Unlike ASICs, FPGAs can be reprogrammed in seconds, making them ideal for FinTech ultra-low latency trading, aerospace radar processing, and rapid ASIC prototyping.',
    dayInTheLife: 'You will write synthesizable VHDL/Verilog, configure high-speed multi-gigabit transceivers (GTX/GTH), optimize pipeline latency, and use Vivado logic analyzers on physical hardware boards.',
    responsibilities: [
      'Implement high-throughput digital pipelines in Verilog / VHDL.',
      'Interface FPGAs with PCIe, 10G/40G/100G Ethernet MACs, and DDR4 memory.',
      'Achieve timing closure using Xilinx Vivado or Intel Quartus Prime.',
      'Prototype ASIC microarchitectures prior to silicon tapeout.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.', 'M.Tech'],
      minCGPA: '7.0 / 10.0',
      branchEligibility: 'ECE, EEE, Instrumentation, CSE',
      keyPrerequisites: ['Digital Logic', 'Verilog / VHDL', 'High-Speed Communication', 'Vivado / Quartus Tools']
    },
    coreSkills: [
      { name: 'Verilog / SystemVerilog & VHDL', level: 'Essential', category: 'Programming' },
      { name: 'FPGA Architecture (LUTs, DSP48, BRAM, Clock Buffers)', level: 'Essential', category: 'Domain' },
      { name: 'Timing Closure & Constraints (XDC / SDC)', level: 'Essential', category: 'Domain' },
      { name: 'High-Speed Protocols (Ethernet, PCIe, AXI)', level: 'Important', category: 'Domain' },
      { name: 'EDA Tools (Xilinx Vivado / Quartus)', level: 'Important', category: 'Tools' },
      { name: 'Hardware In-System Debugging (ILA / ChipScope)', level: 'Important', category: 'Tools' }
    ],
    softSkills: [
      'Obsession with sub-microsecond latency optimization',
      'Systematic lab board testing discipline',
      'Clear documentation of register maps'
    ],
    radarSkills: [
      { subject: 'FPGA Architecture', score: 95, fullMark: 100 },
      { subject: 'Verilog / VHDL', score: 95, fullMark: 100 },
      { subject: 'Timing Constraints (XDC)', score: 90, fullMark: 100 },
      { subject: 'High-Speed Buses', score: 85, fullMark: 100 },
      { subject: 'DSP & Math Pipelines', score: 80, fullMark: 100 },
      { subject: 'Lab Testing (ILA)', score: 85, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'AMD (Xilinx)', companyId: 'comp-amd', hiringType: 'FPGA Applications Engineer', typicalPackage: '₹18 - 35 LPA' },
      { name: 'Intel (Altera)', companyId: 'comp-intel', hiringType: 'FPGA Design Specialist', typicalPackage: '₹16 - 30 LPA' },
      { name: 'Goldman Sachs / Tower Research', companyId: 'comp-goldman', hiringType: 'FPGA Hardware Trading Developer', typicalPackage: '₹25 - 50+ LPA' },
      { name: 'Honeywell Aerospace', companyId: 'comp-honeywell', hiringType: 'FPGA Systems Engineer', typicalPackage: '₹10 - 20 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Digital Electronics & RTL Test', roundType: 'OA', focus: 'Logic gates, timing analysis, FSM implementation, and pipelining questions', duration: '60 mins' },
      { roundName: 'Round 2: FPGA Architecture & RTL Design', roundType: 'Technical', focus: 'Structure of CLBs, LUTs, DSP slices, Block RAMs, and coding a high-throughput pipeline', duration: '60 mins' },
      { roundName: 'Round 3: High-Speed Interfaces & Timing', roundType: 'Technical', focus: 'AXI-Stream protocol, packet parsing at line rate, CDC in FPGAs, and resolving timing in Vivado', duration: '60 mins' },
      { roundName: 'Round 4: Fitment / HR', roundType: 'HR', focus: 'Project walkthrough on development board, teamwork, and problem ownership', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'FPGA Engineer I', description: 'Implements peripheral blocks, writes testbenches, runs synthesis in Vivado.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior FPGA Engineer', description: 'Designs high-speed 100G networking pipelines or HFT order-matching engines.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Principal FPGA Acceleration Architect', description: 'Architects heterogenous CPU-FPGA accelerator platforms for AI & datacenter workloads.' },
      { stage: 'Executive', years: '8+ yrs', title: 'VP of Hardware Systems', description: 'Leads full hardware infrastructure for mission-critical trading or defense radar.' }
    ],
    recommendedGuideSlugs: ['digital-electronics-vlsi', 'verilog-systemverilog', 'sta-timing-analysis'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'FPGA Fabric Fundamentals', actionItems: ['Understand Look-Up Tables (LUTs), flip-flops, carry chains, and DSP48 blocks', 'Learn difference between Block RAM (BRAM) and Distributed RAM', 'Write synthesizable Verilog code for a pipelined multiplier'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'Vivado Workflow & Constraints', actionItems: ['Create a project in Xilinx Vivado (free ML edition)', 'Write XDC timing constraints (clock definitions, I/O delay)', 'Use Integrated Logic Analyzer (ILA) to capture real-time hardware signals'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'Streaming Protocols & Mock Prep', actionItems: ['Study AXI4-Stream handshake (TREADY, TVALID, TDATA)', 'Implement a packet FIFO with frame validation', 'Practice 25 hardware acceleration interview questions'] }
    ]
  },

  // 8. Design for Testability (DFT) Engineer
  {
    slug: 'dft-engineer',
    title: 'DFT Engineer (Design for Testability)',
    category: 'Technical',
    tagline: 'Insert structural scan architectures into silicon so post-fabrication physical defects can be caught instantly.',
    badge: 'High Semiconductor Stability',
    iconName: 'CheckSquare',
    difficultyLevel: 'High',
    salaryRange: '₹8 - 32+ LPA',
    averageCTC: '₹14.5 LPA',
    overview: 'When billions of transistors are manufactured on silicon wafers, manufacturing defects (dust particles, open vias, shorted wires) inevitably occur. DFT Engineers design internal test circuits (Scan chains, Built-In Self-Test BIST, JTAG IEEE 1149.1) that allow automated test equipment (ATE) to detect bad chips.',
    dayInTheLife: 'You will insert scan flip-flops into gate netlists, generate test patterns using ATPG tools (Synopsys TestMAX, Siemens Tessent), simulate fault coverage, and work with foundry test teams.',
    responsibilities: [
      'Insert scan chains and test compression logic (EDT / TestKompress).',
      'Generate test patterns using Automatic Test Pattern Generation (ATPG) algorithms.',
      'Design Memory Built-In Self-Test (MBIST) and repair logic for embedded SRAMs.',
      'Achieve 99%+ stuck-at and transition delay fault test coverage.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.', 'M.Tech (VLSI)'],
      minCGPA: '7.0 / 10.0',
      branchEligibility: 'ECE, EEE, VLSI',
      keyPrerequisites: ['Digital Electronics', 'Fault Modeling (Stuck-at, Transition)', 'Verilog Basics', 'STA Basics']
    },
    coreSkills: [
      { name: 'Scan Chain Insertion & Architecture', level: 'Essential', category: 'Domain' },
      { name: 'ATPG Algorithms (D-Algorithm, PODEM)', level: 'Essential', category: 'Domain' },
      { name: 'Fault Models (Stuck-At, Transition, Path Delay)', level: 'Essential', category: 'Domain' },
      { name: 'Memory BIST (MBIST) & JTAG Boundary Scan', level: 'Important', category: 'Domain' },
      { name: 'DFT Tools (Tessent / TestMAX)', level: 'Important', category: 'Tools' },
      { name: 'Digital Logic & STA', level: 'Important', category: 'Domain' }
    ],
    softSkills: [
      'Methodical analytical reasoning',
      'Sharp attention to test efficiency and tester execution time',
      'Effective collaboration with physical design and foundry test teams'
    ],
    radarSkills: [
      { subject: 'Scan & ATPG', score: 95, fullMark: 100 },
      { subject: 'Fault Modeling', score: 95, fullMark: 100 },
      { subject: 'MBIST & JTAG', score: 90, fullMark: 100 },
      { subject: 'Digital Circuits', score: 85, fullMark: 100 },
      { subject: 'STA Impact', score: 80, fullMark: 100 },
      { subject: 'Scripting', score: 75, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Intel', companyId: 'comp-intel', hiringType: 'DFT Engineer', typicalPackage: '₹16 - 30 LPA' },
      { name: 'NVIDIA', companyId: 'comp-nvidia', hiringType: 'DFT Design Engineer', typicalPackage: '₹20 - 38 LPA' },
      { name: 'Qualcomm', companyId: 'comp-qualcomm', hiringType: 'DFT Specialist', typicalPackage: '₹17 - 32 LPA' },
      { name: 'Siemens EDA', companyId: 'comp-siemens-eda', hiringType: 'DFT Software / Apps Engineer', typicalPackage: '₹14 - 26 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Digital & Aptitude Assessment', roundType: 'OA', focus: 'Boolean logic, sequential circuits, stuck-at fault counting, and aptitude', duration: '60 mins' },
      { roundName: 'Round 2: Fault Models & Scan Architecture', roundType: 'Technical', focus: 'Stuck-at-0/1 test vector generation, multiplexed flip-flop scan cell operation, scan shift vs capture mode', duration: '60 mins' },
      { roundName: 'Round 3: ATPG, MBIST & JTAG', roundType: 'Technical', focus: 'PODEM algorithm, March C+ algorithm for memory testing, IEEE 1149.1 TAP controller state machine', duration: '60 mins' },
      { roundName: 'Round 4: Fitment & HR', roundType: 'HR', focus: 'Interest in semiconductor manufacturing test, career longevity in VLSI test', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'DFT Engineer I', description: 'Inserts scan chains, runs ATPG tool scripts, and debugs DRC violations in scan rules.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior DFT Engineer', description: 'Architects hierarchical DFT for multi-core SoCs, optimizes test compression.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Principal DFT Architect', description: 'Defines corporate test strategy, brings up first silicon on ATE in foundry.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Director of Test Engineering', description: 'Controls multi-million dollar ATE test time budgets and foundry yield.' }
    ],
    recommendedGuideSlugs: ['digital-electronics-vlsi', 'sta-timing-analysis'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'Fault Models & Test Vectors', actionItems: ['Understand Stuck-at-0 and Stuck-at-1 fault models', 'Derive test vectors manually for combinational circuits', 'Calculate test coverage and fault equivalence'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'Scan Chains & MBIST', actionItems: ['Study Muxed-D Scan Flip-Flop architecture', 'Understand scan shift mode (SE=1) vs scan capture mode (SE=0)', 'Learn March test algorithms for embedded RAMs'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'JTAG & Industry Tools', actionItems: ['Draw and memorize the 16-state JTAG TAP controller FSM', 'Understand Boundary Scan register cells (BSR)', 'Review 30 top DFT interview questions asked at Intel & Qualcomm'] }
    ]
  },

  // 9. Hardware & PCB Design Engineer
  {
    slug: 'pcb-hardware-engineer',
    title: 'Hardware & PCB Design Engineer',
    category: 'Technical',
    tagline: 'Design high-speed multilayer printed circuit boards, power supplies, and signal-integrity compliant boards.',
    badge: 'Core Physical Electronics',
    iconName: 'Sliders',
    difficultyLevel: 'Moderate',
    salaryRange: '₹5 - 22+ LPA',
    averageCTC: '₹10.5 LPA',
    overview: 'Hardware Design Engineers design the physical circuit boards that connect processors, memories, power converters, and antennas. They select components, draw schematics, route high-speed differential pairs (PCIe, USB, DDR), and ensure electromagnetic compliance (EMC).',
    dayInTheLife: 'You will create schematics in Altium Designer or KiCAD, calculate trace impedance, route 6-to-12 layer PCBs, solder prototype components in the lab, and verify signal integrity with high-bandwidth scopes.',
    responsibilities: [
      'Design schematics and multi-layer PCB layouts using Altium, KiCAD, or Cadence OrCAD.',
      'Perform component selection, BOM optimization, and power supply design (SMPS, LDO).',
      'Manage high-speed signal integrity, controlled impedance (50Ω single / 100Ω diff), and length matching.',
      'Troubleshoot hardware prototypes in lab and conduct EMI/EMC compliance testing.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.'],
      minCGPA: '6.5 / 10.0',
      branchEligibility: 'ECE, EEE, Instrumentation, Mechatronics',
      keyPrerequisites: ['Circuit Theory & Network Analysis', 'Analog & Power Electronics', 'PCB CAD Software', 'Hands-on Soldering/Lab Experience']
    },
    coreSkills: [
      { name: 'Schematic Capture & PCB Layout (Altium / KiCAD)', level: 'Essential', category: 'Tools' },
      { name: 'High-Speed Signal Integrity & Impedance Matching', level: 'Essential', category: 'Domain' },
      { name: 'Power Supply Design (Buck, Boost, LDO)', level: 'Essential', category: 'Domain' },
      { name: 'Component Selection & Datasheet Reading', level: 'Important', category: 'Domain' },
      { name: 'Lab Test Instruments (Oscilloscope, Spectrum Analyzer)', level: 'Important', category: 'Tools' },
      { name: 'EMI / EMC Mitigation Techniques', level: 'Important', category: 'Domain' }
    ],
    softSkills: [
      'Hands-on maker passion for hardware prototypes',
      'Careful eye for layout spacing and manufacturing constraints (DFM/DFA)',
      'Vendor negotiation and component sourcing tenacity'
    ],
    radarSkills: [
      { subject: 'PCB Layout (Altium/KiCAD)', score: 95, fullMark: 100 },
      { subject: 'Power Supply Design', score: 90, fullMark: 100 },
      { subject: 'Signal Integrity & High-Speed', score: 85, fullMark: 100 },
      { subject: 'Circuit Analysis', score: 85, fullMark: 100 },
      { subject: 'Lab Testing & Soldering', score: 90, fullMark: 100 },
      { subject: 'EMI / EMC Basics', score: 75, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Schneider Electric', companyId: 'comp-schneider', hiringType: 'Hardware Design Engineer', typicalPackage: '₹7 - 14 LPA' },
      { name: 'Continental Automotive', companyId: 'comp-continental', hiringType: 'Electronics Hardware Engineer', typicalPackage: '₹7 - 15 LPA' },
      { name: 'Bosch Global Software', companyId: 'comp-bosch', hiringType: 'Hardware Engineer', typicalPackage: '₹7 - 14 LPA' },
      { name: 'Honeywell Aerospace', companyId: 'comp-honeywell', hiringType: 'Hardware Specialist', typicalPackage: '₹9 - 18 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Electronics Fundamentals Test', roundType: 'OA', focus: 'Ohm’s law, Thevenin equivalent, Op-Amp circuits, passive filter cutoff frequencies, and component ratings', duration: '60 mins' },
      { roundName: 'Round 2: Schematic Review & Design', roundType: 'Technical', focus: 'Live review of a flawed schematic: find ground loops, missing decoupling caps, wrong diode polarities, and undersized resistors', duration: '60 mins' },
      { roundName: 'Round 3: High-Speed Layout & Power Supplies', roundType: 'Technical', focus: 'Controlled impedance calculation, differential pair length matching, buck converter layout loop optimization', duration: '60 mins' },
      { roundName: 'Round 4: Fitment & HR', roundType: 'HR', focus: 'Portfolio presentation of past college hardware projects, team skills', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Hardware Design Engineer I', description: 'Assists with schematics, BOM creation, lab prototyping, and board bring-up.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior Hardware Engineer', description: 'Owns high-speed 8+ layer PCB designs, runs signal integrity simulations.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Lead Hardware Architect', description: 'Architects complex multi-board product systems and directs regulatory compliance (CE, FCC).' },
      { stage: 'Executive', years: '8+ yrs', title: 'VP of Hardware Engineering', description: 'Manages complete physical product hardware development and manufacturing.' }
    ],
    recommendedGuideSlugs: ['analog-electronics-opamps', 'microcontrollers-protocols'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'Circuit Analysis & Component Selection', actionItems: ['Calculate power dissipation in MOSFETs, diodes, and linear regulators', 'Study capacitor types (ceramic MLCC, tantalum, electrolytic) and ESR', 'Learn to interpret complex datasheets for microcontrollers and power ICs'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'CAD Layout & Design Rules', actionItems: ['Complete a 4-layer microcontroller PCB in KiCAD or Altium Designer', 'Learn ground plane management: unbroken reference planes for return currents', 'Understand stackup design and dielectric constants (FR4)'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'High-Speed Layout & Lab Prep', actionItems: ['Learn differential trace routing rules for USB and Ethernet', 'Study buck converter current loops and minimizing parasitic inductance', 'Assemble a hardware portfolio showcasing photos of your physical boards'] }
    ]
  },

  // 10. Digital Logic Design Engineer
  {
    slug: 'digital-design-engineer',
    title: 'Digital Logic Design Engineer',
    category: 'Technical',
    tagline: 'Craft high-efficiency combinational and sequential hardware blocks for processors and controllers.',
    badge: 'Fundamental ECE Core',
    iconName: 'Binary',
    difficultyLevel: 'Moderate',
    salaryRange: '₹6 - 25+ LPA',
    averageCTC: '₹12 LPA',
    overview: 'Digital Logic Design Engineers design core logic subsystems, ALUs, memory controllers, and peripheral modules. They bridge the gap between abstract algorithmic requirements and concrete boolean gate implementations.',
    dayInTheLife: 'You will formulate state transition tables, write clean RTL in Verilog, optimize boolean logic using synthesis engines, and run behavioral simulations.',
    responsibilities: [
      'Design efficient combinational and sequential digital circuits.',
      'Develop Mealy and Moore state machines for protocol controllers.',
      'Minimize silicon gate count and dynamic switching power.',
      'Verify digital logic functionality using test vectors and assertions.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.'],
      minCGPA: '6.5 / 10.0',
      branchEligibility: 'ECE, EEE, CSE',
      keyPrerequisites: ['Boolean Algebra & K-Maps', 'Counters & Shift Registers', 'Verilog', 'Digital Number Systems']
    },
    coreSkills: [
      { name: 'Boolean Algebra, K-Maps & Logic Minimization', level: 'Essential', category: 'Domain' },
      { name: 'Sequential Logic & Flip-Flop Conversions', level: 'Essential', category: 'Domain' },
      { name: 'FSM Design (Mealy vs Moore)', level: 'Essential', category: 'Domain' },
      { name: 'Verilog RTL Coding', level: 'Essential', category: 'Programming' },
      { name: 'Binary Arithmetic (Adders, Multipliers, Booth)', level: 'Important', category: 'Domain' },
      { name: 'Setup / Hold Time Calculations', level: 'Important', category: 'Domain' }
    ],
    softSkills: [
      'Logical clarity and systematic decomposition',
      'Clean coding style in HDL',
      'Strong problem-solving persistence'
    ],
    radarSkills: [
      { subject: 'Combinational Logic', score: 95, fullMark: 100 },
      { subject: 'Sequential Logic & FSM', score: 95, fullMark: 100 },
      { subject: 'Verilog Coding', score: 90, fullMark: 100 },
      { subject: 'Binary Arithmetic', score: 85, fullMark: 100 },
      { subject: 'Timing Basics', score: 80, fullMark: 100 },
      { subject: 'Computer Organization', score: 75, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'NXP Semiconductors', companyId: 'comp-nxp', hiringType: 'Digital Design Engineer', typicalPackage: '₹12 - 20 LPA' },
      { name: 'STMicroelectronics', companyId: 'comp-stmicro', hiringType: 'Digital Logic Trainee', typicalPackage: '₹10 - 18 LPA' },
      { name: 'MediaTek', companyId: 'comp-mediatek', hiringType: 'Digital IC Designer', typicalPackage: '₹14 - 24 LPA' },
      { name: 'Samsung Semiconductor (SSIR)', companyId: 'comp-samsung-semicon', hiringType: 'Digital Design Associate', typicalPackage: '₹15 - 28 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Digital Written Exam', roundType: 'OA', focus: 'K-Maps (4-variable, 5-variable), mux implementation of logic functions, flip-flop conversions (JK to D, etc.)', duration: '60 mins' },
      { roundName: 'Round 2: FSM & Sequential Design', roundType: 'Technical', focus: 'Design a sequence detector with overlapping detection; draw state diagram, state transition table, and circuit', duration: '60 mins' },
      { roundName: 'Round 3: Verilog & Logic Optimization', roundType: 'Technical', focus: 'Code synchronous counters, priority encoders, and carry-select adders; explain glitch hazards', duration: '60 mins' },
      { roundName: 'Round 4: Fitment & HR', roundType: 'HR', focus: 'Academic projects, aptitude, willingness to learn advanced VLSI flows', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Associate Digital Design Engineer', description: 'Implements standard digital building blocks and test benches.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior Digital Design Engineer', description: 'Designs complex arithmetic coprocessors and peripheral IP blocks.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Principal Digital Architect', description: 'Architects sub-systems and coordinates microarchitecture definitions.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Director of Logic Engineering', description: 'Directs digital IP development for next-generation silicon platforms.' }
    ],
    recommendedGuideSlugs: ['digital-electronics-vlsi', 'verilog-systemverilog'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'Combinational Logic & Mux Tricks', actionItems: ['Implement any boolean function using only 2:1 or 4:1 Multiplexers', 'Study hazard glitches: static-0, static-1, and dynamic hazards', 'Master Gray code conversion and parity generators'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'Flip-Flops, Registers & Counters', actionItems: ['Practice all flip-flop conversions (SR, JK, D, T)', 'Design synchronous Mod-N counters and ring/Johnson counters', 'Calculate maximum clock frequency for sequential circuits'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'FSM & Verilog Implementation', actionItems: ['Design Moore and Mealy FSMs for pattern detection', 'Write behavioral and dataflow Verilog code', 'Practice 30 classic digital logic placement interview questions'] }
    ]
  },

  // 11. Semiconductor Test & Validation Engineer
  {
    slug: 'semiconductor-process-test-engineer',
    title: 'Semiconductor Test & Post-Silicon Validation Engineer',
    category: 'Technical',
    tagline: 'Bring up first silicon in high-tech labs and ensure post-fab chips operate reliably across temperature extremes.',
    badge: 'Hands-on Silicon Bring-Up',
    iconName: 'CheckCircle2',
    difficultyLevel: 'Moderate',
    salaryRange: '₹6 - 24+ LPA',
    averageCTC: '₹12.5 LPA',
    overview: 'When the first manufactured silicon wafers arrive from TSMC, Samsung, or Intel foundries, Post-Silicon Validation Engineers bring the chip to life. They hook up high-speed test benches, run stress tests across temperature extremes (-40°C to 125°C), and characterize silicon yield.',
    dayInTheLife: 'You will write Python automation scripts to control lab instruments (Automated Test Equipment ATE, power supplies, thermal chambers), analyze silicon characterization data, and isolate silicon errata.',
    responsibilities: [
      'Execute post-silicon validation test plans on actual hardware boards.',
      'Automate lab test equipment using Python (PyVISA, SCPI commands).',
      'Characterize silicon performance across Voltage-Frequency-Temperature (VFT) shmoo plots.',
      'Root-cause silicon bugs and write errata documentation for customers.'
    ],
    eligibility: {
      degrees: ['B.Tech / B.E.', 'M.Tech'],
      minCGPA: '6.5 / 10.0',
      branchEligibility: 'ECE, EEE, Instrumentation',
      keyPrerequisites: ['Digital & Analog Electronics', 'Python Scripting', 'Lab Instruments (Oscilloscopes, ATE)', 'Basic Computer Architecture']
    },
    coreSkills: [
      { name: 'Python Lab Automation (PyVISA / SCPI)', level: 'Essential', category: 'Programming' },
      { name: 'Silicon Characterization & Shmoo Plots', level: 'Essential', category: 'Domain' },
      { name: 'Digital & Analog Electronics Debugging', level: 'Essential', category: 'Domain' },
      { name: 'High-Speed Test Equipment (BERT, Scopes, ATE)', level: 'Important', category: 'Tools' },
      { name: 'Computer Architecture & PCIe/DDR Protocol Analysis', level: 'Important', category: 'Domain' },
      { name: 'Statistical Data Analysis (JMP / Pandas)', level: 'Important', category: 'Tools' }
    ],
    softSkills: [
      'Hands-on lab tenacity and patience',
      'Data-driven defect isolation mentality',
      'Effective collaboration with pre-silicon designers and customers'
    ],
    radarSkills: [
      { subject: 'Lab Automation (Python)', score: 95, fullMark: 100 },
      { subject: 'Silicon Characterization', score: 90, fullMark: 100 },
      { subject: 'Digital & Analog Debug', score: 85, fullMark: 100 },
      { subject: 'Lab Instruments', score: 90, fullMark: 100 },
      { subject: 'Computer Systems', score: 75, fullMark: 100 },
      { subject: 'Statistics & Data Analysis', score: 80, fullMark: 100 }
    ],
    hiringCompanies: [
      { name: 'Intel', companyId: 'comp-intel', hiringType: 'Post-Silicon Validation Engineer', typicalPackage: '₹14 - 26 LPA' },
      { name: 'NVIDIA', companyId: 'comp-nvidia', hiringType: 'Silicon Validation Engineer', typicalPackage: '₹18 - 34 LPA' },
      { name: 'Micron Technology', companyId: 'comp-micron', hiringType: 'Test & Product Engineer', typicalPackage: '₹13 - 24 LPA' },
      { name: 'Qualcomm', companyId: 'comp-qualcomm', hiringType: 'Silicon Bring-Up Engineer', typicalPackage: '₹16 - 28 LPA' }
    ],
    interviewRounds: [
      { roundName: 'Round 1: Technical & Scripting Test', roundType: 'OA', focus: 'Digital electronics fundamentals, basic circuits, and Python data manipulation', duration: '60 mins' },
      { roundName: 'Round 2: Silicon Debug & Lab Scenarios', roundType: 'Technical', focus: 'How to diagnose a chip that fails only at high temperatures; explain setup/hold margins and VDD noise', duration: '60 mins' },
      { roundName: 'Round 3: Automation & Architecture', roundType: 'Technical', focus: 'Write Python script to sweep clock frequencies and log bit error rates; discuss PCIe/DDR training', duration: '60 mins' },
      { roundName: 'Round 4: Fitment & HR', roundType: 'HR', focus: 'Comfort with laboratory environment, shift-work during tapeout bring-up phases', duration: '30 mins' }
    ],
    careerLadder: [
      { stage: 'Entry', years: '0 - 2 yrs', title: 'Post-Silicon Validation Engineer I', description: 'Executes test plans in lab, writes automation scripts, catalogs silicon defects.' },
      { stage: 'Mid', years: '2 - 5 yrs', title: 'Senior Validation Engineer', description: 'Leads complex protocol bring-up (e.g. DDR5, PCIe Gen5), builds automated validation frameworks.' },
      { stage: 'Senior', years: '5 - 8 yrs', title: 'Principal Silicon Validation Lead', description: 'Directs silicon signoff readiness for mass production, interfaces with foundry.' },
      { stage: 'Executive', years: '8+ yrs', title: 'Director of Product Engineering', description: 'Oversees manufacturing test, silicon quality, and customer deployment globally.' }
    ],
    recommendedGuideSlugs: ['digital-electronics-vlsi', 'computer-architecture-riscv', 'embedded-c-rtos'],
    prepRoadmap: [
      { phase: 'Month 1', timeline: 'Weeks 1 - 4', focus: 'Python Scripting & Instrument Control', actionItems: ['Master Python for automation: file I/O, regex, serial communication (pyserial)', 'Learn SCPI commands to configure lab signal generators and DMMs', 'Build a simple temperature data logger script'] },
      { phase: 'Month 2', timeline: 'Weeks 5 - 8', focus: 'Silicon Characterization & VFT', actionItems: ['Understand Voltage-Frequency-Temperature (VFT) operating corners', 'Learn what a Shmoo plot is and how it identifies timing vs voltage failures', 'Study Bit Error Rate (BER) testing and eye diagrams for high-speed signals'] },
      { phase: 'Month 3', timeline: 'Weeks 9 - 12', focus: 'Silicon Bring-Up & Mock Questions', actionItems: ['Understand JTAG boundary scan for initial board connectivity checks', 'Study boot sequence debug methods (power rails, reset de-assertion, clock stability)', 'Practice 25 post-silicon validation interview questions'] }
    ]
  }
];

export function getEceCareerRoleBySlug(slug: string): CareerRole | undefined {
  return ECE_CAREER_ROLES.find((role) => role.slug === slug);
}
