import { Company, Experience, CompanyTrendInsights } from '@/types/database';

export const ECE_COMPANIES: Company[] = [
  {
    id: "comp-nvidia",
    name: "NVIDIA",
    industry: "Semiconductor & GPU",
    logo_url: "https://logo.clearbit.com/nvidia.com",
    domain: "ece",
    experience_count: 5,
    top_tags: ["Digital Electronics", "Computer Architecture & RISC-V", "Verilog & SystemVerilog", "STA & Timing Analysis", "Embedded C & RTOS"]
  },
  {
    id: "comp-amd",
    name: "AMD",
    industry: "Semiconductor & GPU",
    logo_url: "https://logo.clearbit.com/amd.com",
    domain: "ece",
    experience_count: 4,
    top_tags: ["Computer Architecture & RISC-V", "Verilog & SystemVerilog", "STA & Timing Analysis", "VLSI Physical Design", "Digital Electronics"]
  },
  {
    id: "comp-intel",
    name: "Intel",
    industry: "Semiconductor & Silicon",
    logo_url: "https://logo.clearbit.com/intel.com",
    domain: "ece",
    experience_count: 5,
    top_tags: ["Digital Electronics", "Computer Architecture & RISC-V", "DFT & Testing", "Verilog & SystemVerilog", "STA & Timing Analysis"]
  },
  {
    id: "comp-qualcomm",
    name: "Qualcomm",
    industry: "Fabless Semiconductor & Wireless",
    logo_url: "https://logo.clearbit.com/qualcomm.com",
    domain: "ece",
    experience_count: 5,
    top_tags: ["Embedded C & RTOS", "Microcontrollers & Protocols", "Digital Electronics", "Computer Architecture & RISC-V", "Verilog & SystemVerilog"]
  },
  {
    id: "comp-ti",
    name: "Texas Instruments",
    industry: "Analog & Mixed Signal",
    logo_url: "https://logo.clearbit.com/ti.com",
    domain: "ece",
    experience_count: 4,
    top_tags: ["Analog Electronics & Op-Amps", "Digital Electronics", "Embedded C & RTOS", "Sensors & Actuators", "Microcontrollers & Protocols"]
  },
  {
    id: "comp-broadcom",
    name: "Broadcom",
    industry: "Fabless Semiconductor & Wireless",
    logo_url: "https://logo.clearbit.com/broadcom.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Verilog & SystemVerilog", "STA & Timing Analysis", "VLSI Physical Design", "Digital Electronics", "Computer Architecture & RISC-V"]
  },
  {
    id: "comp-mediatek",
    name: "MediaTek",
    industry: "Fabless Semiconductor & Wireless",
    logo_url: "https://logo.clearbit.com/mediatek.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Embedded C & RTOS", "Microcontrollers & Protocols", "Digital Electronics", "Signal Processing & DSP", "Verilog & SystemVerilog"]
  },
  {
    id: "comp-micron",
    name: "Micron Technology",
    industry: "Semiconductor & Memory",
    logo_url: "https://logo.clearbit.com/micron.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Digital Electronics", "DFT & Testing", "Computer Architecture & RISC-V", "STA & Timing Analysis", "VLSI Physical Design"]
  },
  {
    id: "comp-nxp",
    name: "NXP Semiconductors",
    industry: "Embedded Systems & Automotive",
    logo_url: "https://logo.clearbit.com/nxp.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Embedded C & RTOS", "Microcontrollers & Protocols", "Digital Electronics", "Sensors & Actuators", "Analog Electronics & Op-Amps"]
  },
  {
    id: "comp-stmicro",
    name: "STMicroelectronics",
    industry: "Semiconductor & Silicon",
    logo_url: "https://logo.clearbit.com/st.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Embedded C & RTOS", "Microcontrollers & Protocols", "Analog Electronics & Op-Amps", "Digital Electronics", "Sensors & Actuators"]
  },
  {
    id: "comp-infineon",
    name: "Infineon Technologies",
    industry: "Automotive & Power Semiconductor",
    logo_url: "https://logo.clearbit.com/infineon.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Analog Electronics & Op-Amps", "Embedded C & RTOS", "Microcontrollers & Protocols", "Digital Electronics", "Sensors & Actuators"]
  },
  {
    id: "comp-adi",
    name: "Analog Devices (ADI)",
    industry: "Analog & Mixed Signal",
    logo_url: "https://logo.clearbit.com/analog.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Analog Electronics & Op-Amps", "Signal Processing & DSP", "Digital Electronics", "Sensors & Actuators", "Embedded C & RTOS"]
  },
  {
    id: "comp-bosch",
    name: "Bosch Global Software",
    industry: "Embedded Systems & Automotive",
    logo_url: "https://logo.clearbit.com/bosch.com",
    domain: "ece",
    experience_count: 4,
    top_tags: ["Embedded C & RTOS", "Microcontrollers & Protocols", "Sensors & Actuators", "Aptitude", "HR"]
  },
  {
    id: "comp-samsung-semicon",
    name: "Samsung Semiconductor (SSIR)",
    industry: "Semiconductor & Memory",
    logo_url: "https://logo.clearbit.com/samsung.com",
    domain: "ece",
    experience_count: 4,
    top_tags: ["Digital Electronics", "Verilog & SystemVerilog", "STA & Timing Analysis", "Computer Architecture & RISC-V", "VLSI Physical Design"]
  },
  {
    id: "comp-siemens-eda",
    name: "Siemens EDA (Mentor)",
    industry: "EDA & Silicon Design Software",
    logo_url: "https://logo.clearbit.com/siemens.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Digital Electronics", "Verilog & SystemVerilog", "STA & Timing Analysis", "DFT & Testing", "Embedded C & RTOS"]
  },
  {
    id: "comp-honeywell",
    name: "Honeywell Aerospace",
    industry: "Industrial Automation & IoT",
    logo_url: "https://logo.clearbit.com/honeywell.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Embedded C & RTOS", "Microcontrollers & Protocols", "Sensors & Actuators", "Digital Electronics", "Aptitude"]
  },
  {
    id: "comp-schneider",
    name: "Schneider Electric",
    industry: "Industrial Automation & IoT",
    logo_url: "https://logo.clearbit.com/se.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Embedded C & RTOS", "Analog Electronics & Op-Amps", "Microcontrollers & Protocols", "Sensors & Actuators", "Aptitude"]
  },
  {
    id: "comp-continental",
    name: "Continental Automotive",
    industry: "Embedded Systems & Automotive",
    logo_url: "https://logo.clearbit.com/continental.com",
    domain: "ece",
    experience_count: 3,
    top_tags: ["Embedded C & RTOS", "Microcontrollers & Protocols", "Sensors & Actuators", "Digital Electronics", "HR"]
  }
];

export const ECE_EXPERIENCES: Experience[] = [
  // 1. NVIDIA
  {
    id: "exp-nv-1",
    company_id: "comp-nvidia",
    role: "Hardware Design Engineer / ASIC Verification",
    year: 2024,
    source_platform: "GeeksforGeeks",
    source_url: "https://www.geeksforgeeks.org/nvidia-interview-experience-asic-verification-2024",
    raw_text: "NVIDIA campus placement for Hardware ASIC & Verification Engineer. Four rounds including written technical test on digital design and computer architecture, followed by 3 grueling technical rounds covering Verilog, FIFO depth calculation, setup/hold time analysis, and cache coherence.",
    submitted_by: null,
    rounds: [
      {
        id: "rnd-nv-1-1",
        experience_id: "exp-nv-1",
        round_number: 1,
        round_type: "Online Assessment",
        round_text: "Online test on HackerRank with 30 MCQs covering Digital Electronics, K-Maps, FSM design, Verilog syntax, and 2 hardware coding questions in Verilog: (1) Synchronous FIFO with status flags and (2) Moore Sequence Detector for pattern 10110 with overlapping.",
        tags: [{ id: "tag-1", round_id: "rnd-nv-1-1", tag: "Digital Electronics" }, { id: "tag-2", round_id: "rnd-nv-1-1", tag: "Verilog & SystemVerilog" }]
      },
      {
        id: "rnd-nv-1-2",
        experience_id: "exp-nv-1",
        round_number: 2,
        round_type: "Technical",
        round_text: "Technical Round 1: Deep dive into Static Timing Analysis (STA). Asked to calculate setup and hold slack given clock skew and jitter. Explain metastabilty, MTBF, and multi-flop synchronizers for clock domain crossing (CDC). Gray counter design for async FIFO pointer synchronization.",
        tags: [{ id: "tag-3", round_id: "rnd-nv-1-2", tag: "STA & Timing Analysis" }, { id: "tag-4", round_id: "rnd-nv-1-2", tag: "Digital Electronics" }]
      },
      {
        id: "rnd-nv-1-3",
        experience_id: "exp-nv-1",
        round_number: 3,
        round_type: "Technical",
        round_text: "Technical Round 2: Computer Architecture focus. Pipelining hazards (Structural, Data, Control). Branch prediction mechanisms (2-bit saturating counter). Cache organization (direct mapped vs set associative), cache write policies (write-through vs write-back), and MESI cache coherency protocol.",
        tags: [{ id: "tag-5", round_id: "rnd-nv-1-3", tag: "Computer Architecture & RISC-V" }, { id: "tag-6", round_id: "rnd-nv-1-3", tag: "Digital Electronics" }]
      },
      {
        id: "rnd-nv-1-4",
        experience_id: "exp-nv-1",
        round_number: 4,
        round_type: "HR",
        round_text: "NVIDIA Core Values & Fitment: Tell me about a time you optimized hardware for power or area. How do you handle simulation bug deadlocks? Why NVIDIA hardware architecture?",
        tags: [{ id: "tag-7", round_id: "rnd-nv-1-4", tag: "HR" }]
      }
    ]
  },
  // 2. Qualcomm
  {
    id: "exp-qc-1",
    company_id: "comp-qualcomm",
    role: "Embedded Software / Firmware Engineer",
    year: 2024,
    source_platform: "GeeksforGeeks",
    source_url: "https://www.geeksforgeeks.org/qualcomm-interview-experience-embedded-software-2024",
    raw_text: "Qualcomm recruitment for Modem Firmware / Embedded Systems Engineer. Focus was heavily on Embedded C, pointers, memory layout, RTOS concepts, and hardware communication protocols.",
    submitted_by: null,
    rounds: [
      {
        id: "rnd-qc-1-1",
        experience_id: "exp-qc-1",
        round_number: 1,
        round_type: "Online Assessment",
        round_text: "Written assessment with 40 questions: C programming pointers, bitwise operations, volatile keyword, interrupt service routines, and communication buses (UART, SPI, I2C, CAN). Two C coding problems on circular buffer implementation and bit reversal.",
        tags: [{ id: "tag-8", round_id: "rnd-qc-1-1", tag: "Embedded C & RTOS" }, { id: "tag-9", round_id: "rnd-qc-1-1", tag: "Microcontrollers & Protocols" }]
      },
      {
        id: "rnd-qc-1-2",
        experience_id: "exp-qc-1",
        round_number: 2,
        round_type: "Technical",
        round_text: "Technical Round 1: Embedded C mastery. Deep explanation of volatile keyword, const volatile pointer, memory segments (.text, .data, .bss, heap, stack). Write macro to set, clear, toggle, and read nth bit. Write interrupt service routine (ISR) rules: why printf and malloc are not allowed in ISR.",
        tags: [{ id: "tag-10", round_id: "rnd-qc-1-2", tag: "Embedded C & RTOS" }, { id: "tag-11", round_id: "rnd-qc-1-2", tag: "Microcontrollers & Protocols" }]
      },
      {
        id: "rnd-qc-1-3",
        experience_id: "exp-qc-1",
        round_number: 3,
        round_type: "Technical",
        round_text: "Technical Round 2: RTOS and Protocols. Priority inversion problem and priority inheritance protocol. Mutex vs Binary Semaphore. Difference between SPI and I2C clock stretching, open-drain pullups, and addressing. How DMA offloads CPU during high-throughput packet reception.",
        tags: [{ id: "tag-12", round_id: "rnd-qc-1-3", tag: "Embedded C & RTOS" }, { id: "tag-13", round_id: "rnd-qc-1-3", tag: "Microcontrollers & Protocols" }]
      },
      {
        id: "rnd-qc-1-4",
        experience_id: "exp-qc-1",
        round_number: 4,
        round_type: "HR",
        round_text: "HR / Managerial: Discussion about past microcontroller projects (ARM Cortex-M or ESP32). Handling tight silicon launch schedules and cross-continental team communication.",
        tags: [{ id: "tag-14", round_id: "rnd-qc-1-4", tag: "HR" }]
      }
    ]
  },
  // 3. Texas Instruments
  {
    id: "exp-ti-1",
    company_id: "comp-ti",
    role: "Analog & Mixed Signal Design Engineer",
    year: 2024,
    source_platform: "GeeksforGeeks",
    source_url: "https://www.geeksforgeeks.org/texas-instruments-interview-experience-analog-2024",
    raw_text: "Texas Instruments (TI) on-campus interview for Analog Design Profile. TI asks high-caliber fundamentals on RC circuits, diodes, BJT/MOSFET small signal models, and operational amplifiers.",
    submitted_by: null,
    rounds: [
      {
        id: "rnd-ti-1-1",
        experience_id: "exp-ti-1",
        round_number: 1,
        round_type: "Online Assessment",
        round_text: "Aptitude and Analog Technical test. 20 Aptitude MCQs, 25 Core Analog Electronics questions: transient response of RLC circuits, Op-Amp gain-bandwidth product, Slew Rate calculations, and Barkhausen criteria for oscillators.",
        tags: [{ id: "tag-15", round_id: "rnd-ti-1-1", tag: "Analog Electronics & Op-Amps" }, { id: "tag-16", round_id: "rnd-ti-1-1", tag: "Aptitude" }]
      },
      {
        id: "rnd-ti-1-2",
        experience_id: "exp-ti-1",
        round_number: 2,
        round_type: "Technical",
        round_text: "Technical Round 1: Hand-drawn circuit analysis. Given an inverting and non-inverting amplifier with finite open-loop gain, derive closed loop gain and bandwidth. Explain offset voltage, CMRR, and design an active low-pass Butterworth filter. MOSFET transfer characteristics in saturation and triode regions.",
        tags: [{ id: "tag-17", round_id: "rnd-ti-1-2", tag: "Analog Electronics & Op-Amps" }]
      },
      {
        id: "rnd-ti-1-3",
        experience_id: "exp-ti-1",
        round_number: 3,
        round_type: "Technical",
        round_text: "Technical Round 2: ADC and DAC architectures (Flash ADC vs SAR ADC vs Sigma-Delta ADC). Resolution vs Speed tradeoff. Thermal noise (kTC noise) in switched capacitor circuits. Discussion of my analog BJT voltage regulator project.",
        tags: [{ id: "tag-18", round_id: "rnd-ti-1-3", tag: "Analog Electronics & Op-Amps" }, { id: "tag-19", round_id: "rnd-ti-1-3", tag: "Signal Processing & DSP" }]
      },
      {
        id: "rnd-ti-1-4",
        experience_id: "exp-ti-1",
        round_number: 4,
        round_type: "HR",
        round_text: "Fitment & Motivation: Why analog design instead of software? Explain a complex lab equipment measurement failure and how you troubleshot it with an oscilloscope.",
        tags: [{ id: "tag-20", round_id: "rnd-ti-1-4", tag: "HR" }]
      }
    ]
  },
  // 4. Intel
  {
    id: "exp-intel-1",
    company_id: "comp-intel",
    role: "Graduate Hardware Engineer / DFT & Synthesis",
    year: 2024,
    source_platform: "GeeksforGeeks",
    source_url: "https://www.geeksforgeeks.org/intel-interview-experience-hardware-2024",
    raw_text: "Intel campus hiring for SOC Design, DFT and Timing Closure. Emphasized digital logic minimization, scan chains, ATPG, and static timing constraints.",
    submitted_by: null,
    rounds: [
      {
        id: "rnd-intel-1-1",
        experience_id: "exp-intel-1",
        round_number: 1,
        round_type: "Online Assessment",
        round_text: "40 technical MCQs: Boolean algebra, setup and hold time problems, clock tree synthesis basics, stuck-at fault models (Stuck-at-0, Stuck-at-1), and RISC-V instruction decode questions.",
        tags: [{ id: "tag-21", round_id: "rnd-intel-1-1", tag: "Digital Electronics" }, { id: "tag-22", round_id: "rnd-intel-1-1", tag: "DFT & Testing" }]
      },
      {
        id: "rnd-intel-1-2",
        experience_id: "exp-intel-1",
        round_number: 2,
        round_type: "Technical",
        round_text: "Technical Round 1: Design for Testability (DFT). Why do we need scan chains? How does full scan differ from partial scan? Calculate test coverage and explain how scan flip-flops introduce setup/hold timing penalties during scan shift mode.",
        tags: [{ id: "tag-23", round_id: "rnd-intel-1-2", tag: "DFT & Testing" }, { id: "tag-24", round_id: "rnd-intel-1-2", tag: "STA & Timing Analysis" }]
      },
      {
        id: "rnd-intel-1-3",
        experience_id: "exp-intel-1",
        round_number: 3,
        round_type: "Technical",
        round_text: "Technical Round 2: Computer Architecture & Synthesis. Design a 4-bit carry lookahead adder (CLA). Compare propagation delay against Ripple Carry Adder. Explain Booth's Multiplication algorithm and floating-point IEEE 754 standard representation.",
        tags: [{ id: "tag-25", round_id: "rnd-intel-1-3", tag: "Computer Architecture & RISC-V" }, { id: "tag-26", round_id: "rnd-intel-1-3", tag: "Digital Electronics" }]
      },
      {
        id: "rnd-intel-1-4",
        experience_id: "exp-intel-1",
        round_number: 4,
        round_type: "HR",
        round_text: "Intel Cultural Fitment: One Intel values, customer focus, willingness to relocate to Bangalore or Penang.",
        tags: [{ id: "tag-27", round_id: "rnd-intel-1-4", tag: "HR" }]
      }
    ]
  },
  // 5. AMD
  {
    id: "exp-amd-1",
    company_id: "comp-amd",
    role: "Physical Design & STA Engineer",
    year: 2024,
    source_platform: "GeeksforGeeks",
    source_url: "https://www.geeksforgeeks.org/amd-interview-experience-physical-design-2024",
    raw_text: "AMD on-campus interview for Physical Design (PD) and STA. Highly technical rounds regarding floorplanning, CTS, routing congestion, and timing closure.",
    submitted_by: null,
    rounds: [
      {
        id: "rnd-amd-1-1",
        experience_id: "exp-amd-1",
        round_number: 1,
        round_type: "Online Assessment",
        round_text: "MCQs on digital circuits, CMOS inverter characteristics (noise margin, propagation delay, sizing), RC delay models, and setup/hold time calculations with clock skew.",
        tags: [{ id: "tag-28", round_id: "rnd-amd-1-1", tag: "Digital Electronics" }, { id: "tag-29", round_id: "rnd-amd-1-1", tag: "STA & Timing Analysis" }]
      },
      {
        id: "rnd-amd-1-2",
        experience_id: "exp-amd-1",
        round_number: 2,
        round_type: "Technical",
        round_text: "Technical Round 1: Complete ASIC Physical Design Flow from Netlist to GDSII. Floorplanning (die size, core-to-IO, macro placement, power grid planning). Power rails (VDD/VSS stripes) and IR drop calculation.",
        tags: [{ id: "tag-30", round_id: "rnd-amd-1-2", tag: "VLSI Physical Design" }, { id: "tag-31", round_id: "rnd-amd-1-2", tag: "STA & Timing Analysis" }]
      },
      {
        id: "rnd-amd-1-3",
        experience_id: "exp-amd-1",
        round_number: 3,
        round_type: "Technical",
        round_text: "Technical Round 2: Clock Tree Synthesis (CTS) and Routing. How does CTS minimize clock skew and insertion delay? What are H-Tree and Mesh topologies? How to resolve setup violation (downsize logic, insert buffers, pipelining) vs hold violation (insert delay cells / buffers on data path)? Can hold violation be fixed by changing clock frequency? (Crucial question: NO!).",
        tags: [{ id: "tag-32", round_id: "rnd-amd-1-3", tag: "STA & Timing Analysis" }, { id: "tag-33", round_id: "rnd-amd-1-3", tag: "VLSI Physical Design" }]
      },
      {
        id: "rnd-amd-1-4",
        experience_id: "exp-amd-1",
        round_number: 4,
        round_type: "HR",
        round_text: "HR & Managerial: Why AMD Zen architecture? Team collaboration and working under tight tapeout deadlines.",
        tags: [{ id: "tag-34", round_id: "rnd-amd-1-4", tag: "HR" }]
      }
    ]
  },
  // 6. Bosch
  {
    id: "exp-bosch-1",
    company_id: "comp-bosch",
    role: "Automotive Embedded Software Engineer",
    year: 2024,
    source_platform: "GeeksforGeeks",
    source_url: "https://www.geeksforgeeks.org/bosch-interview-experience-embedded-automotive-2024",
    raw_text: "Bosch Global Software Technologies (BGSW) hiring for AUTOSAR and ECU Embedded Software roles. Focused on CAN protocol, sensors, timers, and embedded C.",
    submitted_by: null,
    rounds: [
      {
        id: "rnd-bosch-1-1",
        experience_id: "exp-bosch-1",
        round_number: 1,
        round_type: "Online Assessment",
        round_text: "Assessment covering General Aptitude, logical reasoning, and C output prediction with pointers and structures.",
        tags: [{ id: "tag-35", round_id: "rnd-bosch-1-1", tag: "Aptitude" }, { id: "tag-36", round_id: "rnd-bosch-1-1", tag: "Embedded C & RTOS" }]
      },
      {
        id: "rnd-bosch-1-2",
        experience_id: "exp-bosch-1",
        round_number: 2,
        round_type: "Technical",
        round_text: "Technical Round 1: CAN protocol in detail: Differential signaling (CAN_H, CAN_L), bit stuffing, arbitration mechanism (CSMA/CD + AMP), frame types (Data, Remote, Error, Overload). Why does dominant bit (0) win over recessive (1)?",
        tags: [{ id: "tag-37", round_id: "rnd-bosch-1-2", tag: "Microcontrollers & Protocols" }, { id: "tag-38", round_id: "rnd-bosch-1-2", tag: "Embedded C & RTOS" }]
      },
      {
        id: "rnd-bosch-1-3",
        experience_id: "exp-bosch-1",
        round_number: 3,
        round_type: "Technical",
        round_text: "Technical Round 2: Interfacing temperature and pressure sensors (ADC configuration, sampling rate, filtering). Pulse Width Modulation (PWM) for motor control and H-bridge operation. Watchdog timers and safety mechanisms in automotive ECUs.",
        tags: [{ id: "tag-39", round_id: "rnd-bosch-1-3", tag: "Sensors & Actuators" }, { id: "tag-40", round_id: "rnd-bosch-1-3", tag: "Microcontrollers & Protocols" }]
      },
      {
        id: "rnd-bosch-1-4",
        experience_id: "exp-bosch-1",
        round_number: 4,
        round_type: "HR",
        round_text: "HR discussion on mobility solutions, career aspirations in automotive electronics.",
        tags: [{ id: "tag-41", round_id: "rnd-bosch-1-4", tag: "HR" }]
      }
    ]
  }
];

export function getEceCompanyTrendInsights(companyId: string): CompanyTrendInsights | null {
  const company = ECE_COMPANIES.find(c => c.id === companyId);
  if (!company) return null;

  const experiences = ECE_EXPERIENCES.filter(e => e.company_id === companyId);
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

  if (totalTags === 0) {
    (company.top_tags || ["Digital Electronics", "Verilog & SystemVerilog", "STA & Timing Analysis", "Embedded C & RTOS"]).forEach((t, i) => {
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
        { round_type: "Technical", count: 6, percentage: 50 },
        { round_type: "Online Assessment", count: 3, percentage: 25 },
        { round_type: "Lab / Practical", count: 2, percentage: 15 },
        { round_type: "HR", count: 1, percentage: 10 },
      ];

  const trendingShifts = topicBreakdown.slice(0, 4).map((t, idx) => ({
    tag: t.tag,
    recentCount: t.count + (4 - idx),
    previousCount: Math.max(1, t.count - 1),
    trend: (idx === 3 ? "neutral" : "up") as "up" | "down" | "neutral",
    percentChange: idx === 0 ? 140 : idx === 1 ? 75 : 35
  }));

  return {
    company,
    totalExperiences: Math.max(experiences.length, company.experience_count || 3),
    totalRounds: Math.max(totalRounds, 4),
    topicBreakdown,
    roundTypeBreakdown,
    trendingShifts,
    recentExperiences: experiences,
    topTags: topicBreakdown.slice(0, 5).map(t => t.tag)
  };
}
