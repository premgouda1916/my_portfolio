export interface ProjectArchitecture {
  overview: string;
  flow: string[];
  designDecisions: { decision: string; reason: string }[];
  latencyOrScale: string;
}

export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  details: string[];
  tech: string[];
  category: 'ml' | 'web' | 'distributed';
  tag: string;
  github?: string;
  demo?: string;
  metrics?: string;
  architecture?: ProjectArchitecture;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
  score?: string;
  location: string;
  details?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  score?: string;
  period?: string;
  rollNo?: string;
  fileUrl?: string;
  isElite?: boolean;
  category?: 'ai-ml' | 'cloud' | 'programming' | 'tools';
}

export interface Award {
  title: string;
  description: string;
  issuer?: string;
  score?: string;
  fileUrl?: string;
  category?: 'academic' | 'hackathon' | 'achievement';
  date?: string;
}

export interface Language {
  name: string;
  level: string;
  skills: string;
  percentage: number;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: {
    languages: string[];
    webTechnologies: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    coreConcepts: string[];
    cloud: string[];
  };
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  awards: Award[];
  languages: Language[];
  socials: {
    github: string;
    linkedin: string;
  };
}

export const resumeData: ResumeData = {
  name: "Prem Gouda",
  title: "Information Science Engineer & AI Developer",
  email: "premgouda27@gmail.com",
  phone: "+91 7204970418",
  location: "Haliyal, Karnataka, India",
  summary: "Information Science and Engineering student with a strong foundation in Java, object-oriented programming, data structures, algorithms, and full-stack development. Hands-on experience building web applications and AI-powered solutions using Java, Python, JavaScript, React, REST APIs, and databases. Experienced in developing NLP and machine learning applications, including multilingual sentiment analysis using deep learning and transformer-based models. Strong problem-solving skills with a proven academic record and a passion for developing scalable, intelligent software solutions while continuously strengthening Java full-stack and AI engineering skills.",
  skills: {
    languages: ["Java", "Python", "JavaScript", "TypeScript"],
    webTechnologies: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
    frameworks: ["Spring Boot", "FastAPI", "Node.js", "Express.js", "PyTorch", "XLM-RoBERTa", "TensorFlow", "Scikit-learn", "Flask"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    tools: ["Docker", "RabbitMQ", "Git", "GitHub", "VS Code", "Prometheus", "Grafana", "Tableau", "Power BI"],
    coreConcepts: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "Computer Networks",
      "REST APIs & Clean Architecture"
    ],
    cloud: ["Microsoft Azure Fundamentals (AZ-900)"]
  },
  education: [
    {
      institution: "Yenepoya Institute of Technology, Mangalore",
      degree: "Bachelor of Engineering (B.E.) in Information Science and Engineering",
      period: "Expected May 2027",
      gpa: "CGPA: 9.28 / 10",
      location: "Mangalore, Karnataka (Affiliated with VTU Belagavi)",
      details: [
        "1st Rank in First Year of Engineering (CGPA: 9.5)",
        "1st Rank in Second Year of Engineering (CGPA: 9.44)",
        "Core coursework in DSA, OOP, DBMS, OS, Computer Networks & AI"
      ]
    },
    {
      institution: "Jawahar Navodaya Vidyalaya, North Canara",
      degree: "Pre-University Course (PCMB)",
      period: "2021 – 2023",
      score: "84.8%",
      location: "North Canara, Karnataka",
      details: ["Physics, Chemistry, Mathematics & Biology foundational sciences"]
    },
    {
      institution: "Jawahar Navodaya Vidyalaya, North Canara",
      degree: "Secondary School Leaving Certificate (SSLC)",
      period: "2021",
      score: "90.4%",
      location: "North Canara, Karnataka",
      details: ["CBSE Secondary education with academic distinction"]
    }
  ],
  certifications: [
    {
      name: "Deep Learning – IIT Ropar",
      issuer: "NPTEL (Funded by MoE, Govt. of India)",
      score: "72% • ELITE",
      period: "Jul-Oct 2026 (12-week course • 4 Credits)",
      rollNo: "NPTEL26CS138S374201328",
      fileUrl: "/certificates/NPTEL-Deep Learning.pdf",
      isElite: true,
      category: "ai-ml"
    },
    {
      name: "Java Business Application Training",
      issuer: "IIT Bombay",
      score: "100%",
      fileUrl: "/certificates/PREM-GOUDA-JAVA BUSINESS APPLICATION.pdf",
      category: "programming"
    },
    {
      name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      score: "Certified",
      fileUrl: "/certificates/AZ-CERTIFICATE.pdf",
      category: "cloud"
    },
    {
      name: "Rapid Development for AI Services",
      issuer: "IBMCE",
      score: "Certified",
      fileUrl: "/certificates/IBMCE CERDAI1IN Certificate _ Etrain.pdf",
      category: "ai-ml"
    },
    {
      name: "Introduction to Machine Learning",
      issuer: "NPTEL, IIT Madras",
      score: "Certified",
      fileUrl: "/certificates/PREM-NPTEL-ML.pdf",
      category: "ai-ml"
    },
    {
      name: "Git Training",
      issuer: "EduPyramids, SINE IIT Bombay",
      score: "90%",
      fileUrl: "/certificates/PREM-GOUDA-GIT Training.pdf",
      category: "tools"
    },
    {
      name: "Python 3.4.3 Training",
      issuer: "IIT Bombay",
      score: "85%",
      fileUrl: "/certificates/PREM-GOUDA-Python 3.4.3-Certificate.pdf",
      category: "programming"
    },
    {
      name: "Introduction to Computer Networking",
      issuer: "Simplilearn",
      score: "Certified",
      fileUrl: "/certificates/INTRODUCTION TO COMPUTER NETWORKING.pdf",
      category: "tools"
    }
  ],
  projects: [
    {
      title: "SentimentX",
      subtitle: "Hybrid Multilingual Sentiment Analyzer",
      description: "Architected a hybrid deep learning model combining XLM-RoBERTa and Multi-Kernel 1D CNNs to classify text into 6 Ekman emotional states across 5 low-resource Indian languages and English.",
      details: [
        "Architected a hybrid deep learning model combining XLM-RoBERTa and Multi-Kernel 1D CNNs (kernels 3, 4, 5) to classify text into 6 Ekman emotional states across 5 low-resource Indian languages and English.",
        "Designed an optimized NLP pipeline featuring emoji demojization, subword tokenization, and mathematically balanced loss weighting to handle phonetic code-mixing and dataset class imbalances.",
        "Developed an asynchronous FastAPI backend and dashboard UI, achieving 85.8% accuracy (87.06% Weighted precision, 85.78% Weighted F1-score) across 72K+ records with sub-30ms GPU inference latency."
      ],
      tech: ["Python", "PyTorch", "XLM-RoBERTa", "FastAPI", "CUDA", "JavaScript"],
      category: "ml",
      tag: "TRANSFORMERS / NLP",
      metrics: "85.8% Accuracy • 72K+ Records",
      github: "https://github.com/premgouda1916/SentimentX",
      architecture: {
        overview: "A hybrid deep learning pipeline that extracts contextual embeddings from multilingual transformer models and feeds them into parallel 1D CNNs for ultra-fast emotional state classification.",
        flow: [
          "Raw Multilingual Input Text (Kannada, Hindi, Tamil, Telugu, Malayalam, English)",
          "Preprocessing Layer: Emoji Demojization, Text Normalization & Subword Tokenization",
          "Feature Extraction: Pretrained XLM-RoBERTa Transformer Encoder creates rich contextual embeddings",
          "Multi-Kernel Convolution: Parallel 1D CNNs with kernel window sizes (3, 4, 5) capture local affective phrase triggers",
          "Pooling & Dense Layer: Global Max-Pooling with Dropout (0.3) feeds Dense Softmax output layer",
          "FastAPI Asynchronous Gateway: Delivers real-time batched GPU inference in sub-30ms"
        ],
        designDecisions: [
          { decision: "Parallel Multi-Kernel 1D CNNs", reason: "While XLM-RoBERTa captures long-range semantics, the multi-size CNN kernels simultaneously extract short and medium emotional phrase patterns without heavy compute." },
          { decision: "Mathematically Balanced Loss Weighting", reason: "Prevents dominance by high-resource languages and neutral sentiment, ensuring 85.78% balanced F1-score across underrepresented classes." },
          { decision: "Async FastAPI with PyTorch JIT", reason: "Replaced heavy web frameworks to achieve high-throughput, sub-30ms GPU inference latency on local CUDA." }
        ],
        latencyOrScale: "85.8% Accuracy • 87.06% Precision • 85.78% F1-score • Sub-30ms Inference Latency"
      }
    },
    {
      title: "Ticketing Engine",
      subtitle: "High-Concurrency Flash-Sale Engine",
      description: "Built an event-driven flash sale ticketing engine handling 200+ RPS with zero double-booking using Clean Architecture and Domain-Driven Design (DDD) principles.",
      details: [
        "Built an event-driven flash sale engine handling 200+ RPS with zero double-booking using Clean Architecture and DDD principles.",
        "Implemented sub-millisecond distributed locking via atomic Redis Lua scripts and decoupled database persistence using RabbitMQ queues.",
        "Engineered full system observability with Prometheus and Grafana, and built a Next.js seat-selection UI with real-time hold timers."
      ],
      tech: ["TypeScript", "Next.js", "Redis", "RabbitMQ", "PostgreSQL", "Prometheus", "Grafana"],
      category: "distributed",
      tag: "DISTRIBUTED / 200+ RPS",
      metrics: "200+ RPS • Sub-ms Locking",
      github: "https://github.com/premgouda1916/ticketing-engine",
      architecture: {
        overview: "An event-driven, high-concurrency reservation engine designed to withstand extreme flash-sale traffic spikes without overselling or database connection exhaustion.",
        flow: [
          "User selects seats on Next.js real-time interactive seat grid with 10-minute hold timers",
          "API Gateway receives purchase reservation request and validates user session",
          "Atomic Redis Lua script validates seat availability and applies distributed lock in <1ms",
          "Order Reservation event published into RabbitMQ message broker for asynchronous processing",
          "Durable worker processes consume queue messages and execute transactional writes into PostgreSQL",
          "Prometheus scrapes latency/throughput metrics while Grafana monitors real-time RPS and queue depth"
        ],
        designDecisions: [
          { decision: "Atomic Redis Lua Scripting", reason: "Executes availability checking and lock creation as a single uninterrupted atomic operation in Redis memory, eliminating race conditions without database row-locking bottlenecks." },
          { decision: "RabbitMQ Decoupled Persistence", reason: "Buffers intense write spikes so the underlying PostgreSQL database processes orders at a sustained, safe throughput rate." },
          { decision: "Clean Architecture & Domain-Driven Design", reason: "Strict separation of core domain business logic, use-cases, and external adapters for high modularity and rigorous unit testability." }
        ],
        latencyOrScale: "200+ Requests Per Second • Sub-1ms Redis Distributed Lock • Zero Double-Bookings"
      }
    },
    {
      title: "CampusFlow",
      subtitle: "Smart Campus Placement & Recruitment Platform",
      description: "Full-stack placement management platform using Java, Spring Boot, and React, enabling students, recruiters, and placement officers to manage recruitment workflows.",
      details: [
        "Developed a full-stack placement management platform using Java, Spring Boot, and React, enabling students, recruiters, and placement officers to manage recruitment workflows.",
        "Implemented secure JWT authentication, role-based access control, and dynamic eligibility evaluation based on CGPA, backlogs, departments, and required skills.",
        "Engineered REST APIs using Spring Data JPA and MySQL for job postings, applications, interview scheduling, and offer management."
      ],
      tech: ["Java 21", "Spring Boot", "React", "MySQL", "JWT", "REST APIs"],
      category: "web",
      tag: "JAVA 21 / ENTERPRISE",
      metrics: "Live on Vercel • Role-Based RBAC",
      github: "https://github.com/premgouda1916",
      demo: "https://campusflow-eosin.vercel.app/",
      architecture: {
        overview: "An enterprise-grade campus placement platform streamlining student recruitment pipelines, applicant tracking, and automated candidate eligibility evaluation.",
        flow: [
          "React Single Page Application provides role-specific dashboards for Students, Recruiters, and TPOs",
          "Spring Security filters intercept requests, validate JWT signatures, and enforce fine-grained RBAC",
          "Eligibility Rule Engine parses company criteria and evaluates student records against CGPA, backlogs, and departmental prerequisites",
          "Spring Data JPA with HikariCP connection pooling performs relational queries against MySQL",
          "Automated status transitions notify applicants of interview scheduling and offer letter releases"
        ],
        designDecisions: [
          { decision: "Role-Based Access Control (RBAC)", reason: "Ensures strict separation of privileges between students, recruiters, and placement officers with cryptographic JWT tokens." },
          { decision: "Dynamic Eligibility Engine", reason: "Replaced manual excel-based screening with automated programmatic matching, reducing verification overhead to zero." }
        ],
        latencyOrScale: "Live on Vercel • Multi-Tenant RBAC Security • High Relational Integrity"
      }
    },
    {
      title: "NovaTrack",
      subtitle: "Habit & Task Performance System",
      description: "Developed a full-stack productivity application using Node.js and Express.js to manage weekly tasks, track monthly habits, and analyze daily performance through interactive dashboards.",
      details: [
        "Built a dynamic weekly task management system featuring task categorization, priority levels, completion tracking, and real-time progress visualization.",
        "Implemented a 31-day habit tracking matrix with automated streak calculations, personal-best tracking, and interactive monthly progress analytics.",
        "Developed a Node.js and Express.js backend with JSON-based data persistence, mindset performance analytics, PDF report generation, and PWA-based offline support."
      ],
      tech: ["Node.js", "Express.js", "JavaScript", "HTML5", "CSS3", "Chart.js", "PWA", "REST API"],
      category: "web",
      tag: "PRODUCTIVITY / PWA",
      metrics: "Live on Render • PWA Offline Ready",
      github: "https://github.com/premgouda1916/NovaTrack",
      demo: "https://novatrack-eid4.onrender.com/",
      architecture: {
        overview: "A responsive productivity and habit execution suite with client-side offline caching, algorithmic streak tracking, and interactive performance trend visualization.",
        flow: [
          "PWA Service Worker caches app shell and static assets for instantaneous load times and offline execution",
          "Interactive 31-Day Habit Grid records daily completions with immediate state recalculation",
          "Streak Engine calculates consecutive streaks, completion consistency percentages, and historic personal bests",
          "Express.js backend handles JSON persistence, data migrations, and automated monthly PDF report compilation",
          "Chart.js visualizes performance curves across weekly and monthly completion windows"
        ],
        designDecisions: [
          { decision: "Offline-First Progressive Web App", reason: "Guarantees full tracking functionality even in low or zero network environments via service worker caching." },
          { decision: "Deterministic Streak Algorithm", reason: "Handles edge cases around missed days and timezone differences without desynchronizing user streaks." }
        ],
        latencyOrScale: "Live on Render • PWA Offline Ready • 31-Day Matrix Tracking"
      }
    },
    {
      title: "NeuroGuard",
      subtitle: "The Digital Habit Guardian",
      description: "OS-integrated digital wellness suite to reduce doom-scrolling and digital addiction. Built as a TechFusion 2.0 Hackathon finalist project.",
      details: [
        "Implemented real-time user behavior analysis to identify unhealthy screen usage patterns and triggers.",
        "Designed proactive interventions to break addictive social media usage cycles with customizable break-locks.",
        "Awarded Finalist at TechFusion 2.0 Hackathon (DSATM Bengaluru) for AI-driven digital wellness innovation."
      ],
      tech: ["React", "Node.js", "Electron", "Tailwind CSS", "Socket.io"],
      category: "web",
      tag: "HACKATHON FINALIST",
      metrics: "TechFusion 2.0 Finalist • Desktop Suite",
      github: "https://github.com/premgouda1916/Team-Ignite_NeuroGuard",
      architecture: {
        overview: "An OS-level wellness system monitoring active foreground processes, calculating cognitive fatigue patterns, and triggering proactive focus interventions.",
        flow: [
          "Electron Desktop Daemon monitors system process windows and active duration hooks",
          "Behavior Analyzer evaluates rapid app switching and continuous doom-scrolling patterns",
          "Proactive Intervention Engine locks intrusive distraction windows with timed cognitive breaks",
          "Socket.io synchronizes session analytics and digital wellness scores with remote overview dashboard"
        ],
        designDecisions: [
          { decision: "Electron + OS Process Hooks", reason: "Standard web extensions cannot control system-wide applications; an Electron daemon enables cross-application intervention." },
          { decision: "Bidirectional WebSockets via Socket.io", reason: "Real-time communication for instant intervention locking and remote telemetry synchronization." }
        ],
        latencyOrScale: "TechFusion 2.0 Hackathon Finalist • Real-Time OS Process Interception"
      }
    }
  ],
  awards: [
    {
      title: "1st Rank — First Year of Engineering (CGPA 9.5)",
      issuer: "Yenepoya Institute of Technology (VTU)",
      score: "CGPA: 9.5 / 10",
      category: "academic",
      description: "Secured First Rank across the entire college cohort in First Year Engineering with a CGPA of 9.5.",
      fileUrl: "/certificates/Prem-1st-sem.pdf",
      date: "Year 1"
    },
    {
      title: "1st Rank — Second Year of Engineering (CGPA 9.44)",
      issuer: "Yenepoya Institute of Technology (VTU)",
      score: "CGPA: 9.44 / 10",
      category: "academic",
      description: "Secured First Rank across the college in Second Year Engineering with a CGPA of 9.44.",
      fileUrl: "/certificates/Prem-2nd-sem.pdf",
      date: "Year 2"
    },
    {
      title: "TechFusion 2.0 Hackathon Finalist",
      issuer: "Dayananda Sagar Academy of Tech & Mgmt (DSATM), Bengaluru",
      score: "Hackathon Finalist",
      category: "hackathon",
      description: "Presented NeuroGuard OS digital wellness system. Shortlisted among top teams across South India.",
      fileUrl: "/certificates/certi techfusion.pdf",
      date: "2024"
    },
    {
      title: "Intercollege Hackathon GCEM 3.0 Participant",
      issuer: "Gopalan College of Engineering and Management (GCEM), Bengaluru",
      score: "Hackathon Competitor",
      category: "hackathon",
      description: "Showcased rapid full-stack prototyping and AI systems in a high-intensity 24h engineering sprint.",
      fileUrl: "/certificates/Prem-certi-gcem.pdf",
      date: "2024"
    },
    {
      title: "Core Member — HackForge 2026 Internal Hackathon",
      issuer: "HackForge Committee",
      score: "Leadership / Core Member",
      category: "achievement",
      description: "Elected as a core organizing committee member driving track formulations, rulebooks, and student mentoring.",
      date: "2026"
    }
  ],
  languages: [
    { name: "English", level: "Professional", skills: "Read, Speak, Write", percentage: 95 },
    { name: "Kannada", level: "Native / Fluent", skills: "Read, Speak, Write", percentage: 100 },
    { name: "Hindi", level: "Advanced", skills: "Read, Speak", percentage: 90 },
    { name: "Marathi", level: "Conversational", skills: "Speak", percentage: 80 }
  ],
  socials: {
    github: "https://github.com/premgouda1916",
    linkedin: "https://www.linkedin.com/in/prem-gouda"
  }
};
