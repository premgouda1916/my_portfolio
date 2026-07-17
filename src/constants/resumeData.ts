export interface Project {
  title: string;
  description: string;
  details: string[];
  tech: string[];
  category: 'ml' | 'web' | 'other';
  github?: string;
  demo?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
  score?: string;
  location: string;
}

export interface Certification {
  name: string;
  issuer: string;
  score?: string;
}

export interface Award {
  title: string;
  description: string;
}

export interface Language {
  name: string;
  level: string;
  proficiency: string; // e.g. "C2", "C1", "Native"
  percentage: number; // for progress bars
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
    frameworks: string[];
    databases: string[];
    tools: string[];
    softSkills: string[];
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
  title: "Full Stack Engineer & AI Developer",
  email: "premgouda27@gmail.com",
  phone: "+91-7204970418",
  location: "Haliyala, Karnataka 581356",
  summary: "Full stack engineer with expertise in Java, JavaScript, HTML, CSS, and modern frameworks such as React and Node.js. Proven ability to develop scalable and efficient web applications that enhance user experience. Committed to continuous improvement in backend development, system design, and cloud technologies.",
  skills: {
    languages: ["Java", "Python", "C", "JavaScript", "HTML", "CSS"],
    frameworks: ["React", "Node.js", "Express", "Tailwind CSS"],
    databases: ["MySQL", "MongoDB", "PostgreSQL"],
    tools: ["Git", "GitHub", "Power BI", "Tableau", "VS Code"],
    softSkills: ["Analytical thinking", "Problem solving", "Critical thinking", "Decision making", "Data analysis"]
  },
  education: [
    {
      institution: "Visvesvaraya Technological University (VTU)",
      degree: "Bachelor of Engineering (B.E) in Information Science and Engineering",
      period: "Expected in 01/2027",
      gpa: "9.5 / 10",
      location: "Karnataka, India"
    },
    {
      institution: "Jawahar Navodaya Vidyalaya",
      degree: "Pre University College (PUC) in PCMB",
      period: "Completed 01/2023",
      score: "85%",
      location: "North Canara, Karnataka"
    },
    {
      institution: "Jawahar Navodaya Vidyalaya",
      degree: "Class 10th",
      period: "Completed 01/2021",
      score: "90.4%",
      location: "North Canara, Karnataka"
    }
  ],
  certifications: [
    {
      name: "Rapid Development for AI services",
      issuer: "IBMCE"
    },
    {
      name: "Microsoft Certified Azure Fundamental",
      issuer: "Microsoft"
    },
    {
      name: "Java Business Application Training",
      issuer: "IIT Bombay",
      score: "100%"
    },
    {
      name: "Introduction to Machine Learning",
      issuer: "NPTEL, IIT Madras"
    },
    {
      name: "Python 3.4.3 Training",
      issuer: "IIT Bombay",
      score: "85%"
    },
    {
      name: "Completion of GIT Training",
      issuer: "EduPyramids, SINE, IIT Bombay",
      score: "90%"
    },
    {
      name: "Introduction to Computer Networking",
      issuer: "Coursera / Cisco"
    }
  ],
  projects: [
    {
      title: "Sentiment analysis Using XLM-RoBERTa",
      description: "Developed a Kannada Emotion Classifier using NLP and machine learning to detect emotions like happiness, sadness, and anger from text data.",
      details: [
        "Achieved 92% accuracy using deep learning models",
        "Processed and analyzed Kannada text dataset for emotion detection",
        "Improved model performance through preprocessing and hyperparameter tuning"
      ],
      tech: ["Python", "XLM-RoBERTa", "NLP", "PyTorch", "Hugging Face"],
      category: "ml",
      github: "https://github.com/premgouda1916"
    },
    {
      title: "Smart Adherence System (SAS)",
      description: "Developed a Smart Adherence System to analyze patient data and provide personalized medication adherence solutions.",
      details: [
        "Achieved high accuracy in risk prediction and solution generation using machine learning models",
        "Processed and analyzed patient notes and drug side effects datasets for risk assessment",
        "Improved system performance through data preprocessing, feature engineering, and model optimization"
      ],
      tech: ["Machine Learning", "Python", "Pandas", "Scikit-Learn", "Flask"],
      category: "ml",
      github: "https://github.com/premgouda1916"
    },
    {
      title: "NeuroGuard — The Digital Habit Guardian",
      description: "Developed an OS-integrated digital wellness suite to reduce doom-scrolling and digital addiction. Built as a TechFusion 2.0 Hackathon project.",
      details: [
        "Implemented real-time user behavior analysis to identify unhealthy screen usage patterns",
        "Designed proactive interventions to break addictive social media usage cycles",
        "Enabled parental monitoring and remote oversight of family digital wellness",
        "Won awards at TechFusion 2.0 Hackathon focusing on AI-driven digital well-being"
      ],
      tech: ["React", "Node.js", "Electron", "Tailwind CSS", "Socket.io"],
      category: "web",
      github: "https://github.com/premgouda1916"
    }
  ],
  awards: [
    {
      title: "Academic Excellence - B.E 1st Year",
      description: "Awarded first rank in first-year of Engineering with a CGPA of 9.5."
    },
    {
      title: "Academic Excellence - B.E 2nd Year",
      description: "Awarded first rank in second-year of Engineering with a CGPA of 9.44."
    },
    {
      title: "TechFusion 2.0 Hackathon",
      description: "Participated and presented NeuroGuard at Dayananda Sagar Academy of Technology and Management, Bengaluru."
    },
    {
      title: "Intercollege Hackathon GCEM 3.0",
      description: "Participated and showcased innovative projects in Bangalore."
    }
  ],
  languages: [
    { name: "English", level: "Proficient", proficiency: "C2", percentage: 95 },
    { name: "Kannada", level: "Proficient", proficiency: "C2", percentage: 100 },
    { name: "Hindi", level: "Advanced", proficiency: "C1", percentage: 85 },
    { name: "Marathi", level: "Native", proficiency: "Native", percentage: 100 }
  ],
  socials: {
    github: "https://github.com/premgouda1916",
    linkedin: "https://www.linkedin.com/in/prem-p-g-703717310"
  }
};
