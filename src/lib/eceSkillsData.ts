import { SkillItem } from './skillsData';

export const ECE_SKILLS_DATABASE: SkillItem[] = [
  // ==========================================
  // 1. DIGITAL ELECTRONICS & HARDWARE DESIGN
  // ==========================================
  {
    id: 'digital-logic-kmaps',
    name: 'Combinational Logic & K-Maps',
    category: 'VLSI & Semiconductor',
    description: 'Boolean algebra simplification, SOP/POS forms, hazard identification, and multiplexer/decoder logic trees.',
    importanceLevel: 'Critical',
    relatedRoles: ['digital-design-engineer', 'vlsi-design-engineer', 'fpga-engineer'],
    linkedGuideSlug: 'digital-electronics-vlsi',
    tags: ['K-Maps', 'Boolean Algebra', 'Multiplexers', 'Logic Gates']
  },
  {
    id: 'sequential-circuits-fsm',
    name: 'Sequential Logic & FSM Design',
    category: 'VLSI & Semiconductor',
    description: 'Flip-flop state machines, Mealy vs. Moore models, state minimization, and sequence detectors with overlapping detection.',
    importanceLevel: 'Critical',
    relatedRoles: ['digital-design-engineer', 'vlsi-design-engineer', 'verification-engineer'],
    linkedGuideSlug: 'digital-electronics-vlsi',
    tags: ['FSM', 'Flip-Flops', 'State Tables', 'Sequence Detector']
  },
  {
    id: 'sta-timing-slack',
    name: 'Static Timing Analysis (STA)',
    category: 'VLSI & Semiconductor',
    description: 'Setup and hold time margin calculations, clock skew, jitter, slack equations, and violation mitigation strategies.',
    importanceLevel: 'Critical',
    relatedRoles: ['vlsi-design-engineer', 'physical-design-engineer', 'fpga-engineer'],
    linkedGuideSlug: 'sta-timing-analysis',
    tags: ['Setup Slack', 'Hold Slack', 'Clock Skew', 'Critical Path']
  },
  {
    id: 'cdc-metastability',
    name: 'Clock Domain Crossing (CDC)',
    category: 'VLSI & Semiconductor',
    description: 'Multi-flop synchronizers, MTBF calculations, Gray-coded async FIFO pointers, and handshake synchronizers.',
    importanceLevel: 'Critical',
    relatedRoles: ['vlsi-design-engineer', 'verification-engineer', 'fpga-engineer'],
    linkedGuideSlug: 'sta-timing-analysis',
    tags: ['CDC', 'Metastability', 'Async FIFO', 'Gray Code']
  },

  // ==========================================
  // 2. HARDWARE LANGUAGES (HDL & VERIFICATION)
  // ==========================================
  {
    id: 'verilog-rtl',
    name: 'Verilog RTL (Synthesizable)',
    category: 'Programming',
    description: 'Writing clean synthesizable Verilog, blocking vs non-blocking semantics, module hierarchy, and synchronous resets.',
    importanceLevel: 'Critical',
    relatedRoles: ['vlsi-design-engineer', 'fpga-engineer', 'digital-design-engineer'],
    linkedGuideSlug: 'verilog-systemverilog',
    tags: ['RTL', 'Always Blocks', 'Non-blocking', 'Synthesis']
  },
  {
    id: 'systemverilog-oop',
    name: 'SystemVerilog & OOP Verification',
    category: 'Programming',
    description: 'Object-oriented verification in SystemVerilog: classes, inheritance, virtual interfaces, mailboxes, and semaphores.',
    importanceLevel: 'Critical',
    relatedRoles: ['verification-engineer'],
    linkedGuideSlug: 'verilog-systemverilog',
    tags: ['SystemVerilog', 'OOP', 'Randomization', 'Mailbox']
  },
  {
    id: 'uvm-methodology',
    name: 'UVM (Universal Verification Methodology)',
    category: 'VLSI & Semiconductor',
    description: 'Industry-standard verification framework: drivers, monitors, scoreboards, sequencers, TLM ports, and phases.',
    importanceLevel: 'High',
    relatedRoles: ['verification-engineer'],
    linkedGuideSlug: 'verilog-systemverilog',
    tags: ['UVM', 'Scoreboard', 'TLM', 'Coverage']
  },

  // ==========================================
  // 3. COMPUTER ARCHITECTURE & PROCESSORS
  // ==========================================
  {
    id: 'computer-architecture-riscv',
    name: 'Computer Architecture & RISC-V',
    category: 'VLSI & Semiconductor',
    description: '5-stage instruction pipelining, data/structural/control hazards, forwarding units, branch prediction, and RISC-V ISA.',
    importanceLevel: 'Critical',
    relatedRoles: ['vlsi-design-engineer', 'firmware-engineer', 'semiconductor-process-test-engineer'],
    linkedGuideSlug: 'computer-architecture-riscv',
    tags: ['Pipelining', 'Hazards', 'RISC-V', 'Branch Prediction']
  },
  {
    id: 'cache-memory-hierarchy',
    name: 'Cache Memory & Coherency',
    category: 'VLSI & Semiconductor',
    description: 'Direct-mapped vs Set-Associative caches, write policies (write-through/back), MESI protocol, and virtual memory / TLB.',
    importanceLevel: 'High',
    relatedRoles: ['firmware-engineer', 'vlsi-design-engineer', 'embedded-systems-engineer'],
    linkedGuideSlug: 'computer-architecture-riscv',
    tags: ['Cache Hierarchy', 'MESI', 'Virtual Memory', 'TLB']
  },

  // ==========================================
  // 4. EMBEDDED SYSTEMS & RTOS
  // ==========================================
  {
    id: 'embedded-c-pointers',
    name: 'Embedded C & Memory Layout',
    category: 'Programming',
    description: 'Pointer arithmetic, function pointers, volatile keyword, memory segments (.text, .data, .bss), and bitwise macros.',
    importanceLevel: 'Critical',
    relatedRoles: ['embedded-systems-engineer', 'firmware-engineer'],
    linkedGuideSlug: 'embedded-c-rtos',
    tags: ['Embedded C', 'Volatile', 'Pointers', 'Memory Layout']
  },
  {
    id: 'interrupts-isr-rules',
    name: 'Interrupts & ISR Programming',
    category: 'Embedded & Hardware',
    description: 'Vector interrupt controllers (NVIC), interrupt latency, nesting, and coding restrictions inside ISRs.',
    importanceLevel: 'Critical',
    relatedRoles: ['embedded-systems-engineer', 'firmware-engineer'],
    linkedGuideSlug: 'embedded-c-rtos',
    tags: ['ISR', 'NVIC', 'Interrupt Latency', 'Atomic Operations']
  },
  {
    id: 'rtos-freertos-multithreading',
    name: 'RTOS & Concurrency (FreeRTOS)',
    category: 'Embedded & Hardware',
    description: 'Task scheduling, Mutex vs Semaphore, Priority Inversion problem, and message queues under real-time constraints.',
    importanceLevel: 'Critical',
    relatedRoles: ['embedded-systems-engineer', 'firmware-engineer'],
    linkedGuideSlug: 'embedded-c-rtos',
    tags: ['FreeRTOS', 'Priority Inversion', 'Mutex', 'Deadlock']
  },

  // ==========================================
  // 5. HARDWARE PROTOCOLS & BUSES
  // ==========================================
  {
    id: 'comm-buses-spi-i2c-uart',
    name: 'Serial Buses (UART, SPI, I2C)',
    category: 'Embedded & Hardware',
    description: 'Open-drain pullups, clock stretching, multi-master arbitration, SPI 4 modes (CPOL/CPHA), and baud rate calculations.',
    importanceLevel: 'Critical',
    relatedRoles: ['embedded-systems-engineer', 'pcb-hardware-engineer'],
    linkedGuideSlug: 'microcontrollers-protocols',
    tags: ['I2C', 'SPI', 'UART', 'Clock Stretching']
  },
  {
    id: 'automotive-can-bus',
    name: 'CAN Bus & Industrial Protocols',
    category: 'Embedded & Hardware',
    description: 'Controller Area Network (CAN): differential signaling, dominant vs recessive bits, non-destructive bit arbitration, and CRC.',
    importanceLevel: 'High',
    relatedRoles: ['embedded-systems-engineer', 'pcb-hardware-engineer'],
    linkedGuideSlug: 'microcontrollers-protocols',
    tags: ['CAN Bus', 'Differential Signaling', 'Automotive', 'Arbitration']
  },
  {
    id: 'arm-cortex-microcontrollers',
    name: 'ARM Cortex-M Architecture',
    category: 'Embedded & Hardware',
    description: 'Registers (R0-R15), Link Register, Program Counter, SysTick timer, and direct peripheral register manipulation (CMSIS).',
    importanceLevel: 'High',
    relatedRoles: ['embedded-systems-engineer', 'firmware-engineer'],
    linkedGuideSlug: 'microcontrollers-protocols',
    tags: ['ARM Cortex-M', 'STM32', 'SysTick', 'CMSIS']
  },

  // ==========================================
  // 6. ANALOG ELECTRONICS & CIRCUITS
  // ==========================================
  {
    id: 'opamp-analog-circuits',
    name: 'Op-Amps & Active Filters',
    category: 'VLSI & Semiconductor',
    description: 'Negative feedback, closed-loop gain derivations, virtual ground, slew rate, CMRR, and Butterworth filter topologies.',
    importanceLevel: 'Critical',
    relatedRoles: ['analog-design-engineer', 'pcb-hardware-engineer'],
    linkedGuideSlug: 'analog-electronics-opamps',
    tags: ['Op-Amps', 'Slew Rate', 'CMRR', 'Filters']
  },
  {
    id: 'mosfet-small-signal',
    name: 'MOSFET Small-Signal Analysis',
    category: 'VLSI & Semiconductor',
    description: 'Transconductance (gm), output resistance (ro), Common Source, Common Drain, and Cascode amplifier gain and bandwidth.',
    importanceLevel: 'Critical',
    relatedRoles: ['analog-design-engineer'],
    linkedGuideSlug: 'analog-electronics-opamps',
    tags: ['MOSFET', 'Small Signal', 'Cascode', 'Bode Plot']
  },
  {
    id: 'data-converters-adc-dac',
    name: 'Data Converters (ADC & DAC)',
    category: 'VLSI & Semiconductor',
    description: 'Flash, SAR, and Delta-Sigma ADC architectures; quantization noise, ENOB, SNR, and sampling theorem (Nyquist rate).',
    importanceLevel: 'High',
    relatedRoles: ['analog-design-engineer', 'semiconductor-process-test-engineer'],
    linkedGuideSlug: 'analog-electronics-opamps',
    tags: ['ADC', 'DAC', 'SAR ADC', 'Nyquist Rate']
  },

  // ==========================================
  // 7. VLSI PHYSICAL DESIGN & DFT
  // ==========================================
  {
    id: 'asic-pd-flow',
    name: 'ASIC Physical Design Flow',
    category: 'VLSI & Semiconductor',
    description: 'Floorplanning, power grid distribution, placement, CTS, detailed routing, and physical verification (DRC/LVS).',
    importanceLevel: 'Critical',
    relatedRoles: ['physical-design-engineer'],
    linkedGuideSlug: 'vlsi-physical-design',
    tags: ['Floorplanning', 'P&R', 'CTS', 'DRC/LVS']
  },
  {
    id: 'dft-scan-atpg',
    name: 'DFT, Scan Chains & ATPG',
    category: 'VLSI & Semiconductor',
    description: 'Stuck-at-0/1 fault models, scan insertion, test compression, ATPG test vector generation, and JTAG IEEE 1149.1.',
    importanceLevel: 'High',
    relatedRoles: ['dft-engineer', 'semiconductor-process-test-engineer'],
    linkedGuideSlug: 'digital-electronics-vlsi',
    tags: ['DFT', 'ATPG', 'Scan Chains', 'JTAG']
  },

  // ==========================================
  // 8. HARDWARE TOOLS & LAB INSTRUMENTATION
  // ==========================================
  {
    id: 'pcb-cad-altium-kicad',
    name: 'PCB Layout (Altium / KiCAD)',
    category: 'Embedded & Hardware',
    description: 'Multilayer PCB routing, controlled impedance traces (50Ω), return path ground planes, and Gerber file generation.',
    importanceLevel: 'High',
    relatedRoles: ['pcb-hardware-engineer'],
    tags: ['Altium', 'KiCAD', 'Controlled Impedance', 'Gerber']
  },
  {
    id: 'fpga-vivado-toolflow',
    name: 'FPGA Vivado / Quartus Tools',
    category: 'VLSI & Semiconductor',
    description: 'FPGA synthesis, implementation, XDC timing constraints, and hardware debugging with Integrated Logic Analyzers (ILA).',
    importanceLevel: 'High',
    relatedRoles: ['fpga-engineer'],
    tags: ['Vivado', 'XDC Constraints', 'ILA', 'FPGA Flow']
  },
  {
    id: 'lab-oscilloscope-debugging',
    name: 'Lab Instruments (Scopes & Logic Analyzers)',
    category: 'Embedded & Hardware',
    description: 'Hands-on troubleshooting with digital oscilloscopes, protocol decoders, signal generators, and spectrum analyzers.',
    importanceLevel: 'High',
    relatedRoles: ['embedded-systems-engineer', 'pcb-hardware-engineer', 'semiconductor-process-test-engineer'],
    tags: ['Oscilloscope', 'Logic Analyzer', 'Protocol Decoding', 'Lab Debug']
  },
  {
    id: 'python-lab-automation',
    name: 'Python Lab Automation (PyVISA)',
    category: 'Programming',
    description: 'Automating hardware test benches, sweeping frequencies, and communicating with ATE using SCPI commands.',
    importanceLevel: 'Moderate',
    relatedRoles: ['semiconductor-process-test-engineer'],
    tags: ['Python', 'PyVISA', 'SCPI', 'Automation']
  }
];
