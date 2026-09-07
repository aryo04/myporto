export interface PersonalInfo {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  bio: string;
  education: string;
  focusAreas?: string;
  aboutStory: string;
  email: string;
  socialLinks: {
    name: string;
    url: string;
    icon: 'linkedin' | 'github' | 'instagram' | 'email';
  }[];
}

export interface SkillItem {
  name: string;
  code?: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  icon: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  type: string;
  role: string;
  company: string;
  period: string;
  description?: string;
  points?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  highlightBadge?: string;
  primaryButton?: {
    label: string;
    url: string;
  };
  links: {
    project?: string;
    github?: string;
  };
  telemetry?: {
    type: 'room' | 'agent' | 'turbine' | 'vision' | 'detexa';
    title?: string;
    badge?: string;
    statusTitle?: string;
    statusValue?: string;
    schedule?: string;
    metricLabel?: string;
    metricValue?: string;
    subLabel?: string;
    subValue?: string;
    health?: string;
    bars?: number[];
    percentage?: number;
    subPercentage?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "Aryo Daffa Khairuddin",
  shortName: "ArDK",
  role: "AI Engineer & Web Developer",
  tagline: "I'm Aryo.",
  bio: "Building AI-powered applications and modern web apps that solve real-world problems.",
  education: "Informatics Graduate • Gunadarma University",
  aboutStory: "Fresh Graduate in Informatics from Gunadarma University with a focus on AI Engineering and Web Development. Experienced in developing AI-powered web applications, integrating machine learning and deep learning models, and implementing practical LLM-based solutions with enterprise reliability.",
  email: "aryodaffakha48@gmail.com",
  socialLinks: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aryo-daffa-khairuddin/", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/aryo04", icon: "github" },
    { name: "Email", url: "mailto:aryodaffakha48@gmail.com", icon: "email" },
  ]
};

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    subtitle: "Model synthesis & vector pipelines",
    icon: "neurology",
    skills: [
      { name: "Python" },
      { name: "TensorFlow" },
      { name: "FastAPI" },
      { name: "Scikit-learn" },
      { name: "Pandas" },
      { name: "NumPy" },
    ]
  },
  {
    title: "Full-Stack & Mobile",
    subtitle: "Scalable web apps & cross-platform mobile",
    icon: "dns",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "PHP" },
      { name: "Go (Golang)" },
      { name: "PostgreSQL" },
      { name: "Tailwind CSS" },
    ]
  },
  {
    title: "Tools & DevOps",
    subtitle: "DevOps & application interfaces",
    icon: "terminal",
    skills: [
      { name: "Docker" },
      { name: "Git / GitHub" },
      { name: "Linux" },
      { name: "Postman" },
      { name: "REST APIs" },
      { name: "Google Workspace" },
    ]
  }
];

export const experiences: ExperienceItem[] = [
  {
    type: "Internship",
    role: "Full-Stack Web Developer Intern",
    company: "Badan Nasional Pencarian dan Pertolongan (BASARNAS)",
    period: "Jan 2026 – Mar 2026",
    points: [
      "Developed MERAPAT, a web-based meeting room management system using React, Express.js, and PostgreSQL, supporting room reservations, attendance tracking, executive scheduling, and automated reporting.",
      "Implemented double-booking prevention, employee data synchronization APIs, QR-based attendance with digital signatures, automated PDF/Excel reports, real-time and email notifications, and digital signage.",
      "Implemented security measures including JWT authentication, rate limiting, HTTP security headers, and audit logging, and deployed the production environment using Docker and Nginx.",
      "Collaborated with internal stakeholders through requirements gathering, regular progress demos, and feedback cycles, while preparing the Software Requirements Specification (SRS) and user manuals."
    ]
  },
  {
    type: "Cohort Program",
    role: "React & Back-End with AI Cohort",
    company: "Asah led by Dicoding 2025",
    period: "Aug 2025 – Jan 2026",
    points: [
      "Completed an intensive track focused on modern web development, covering React, JavaScript, web fundamentals, cloud computing, and Generative AI application development.",
      "Developed **MaintEase**, an AI-powered predictive maintenance web application integrating deployed machine learning models with an LLM-based conversational assistant.",
      "Built an intelligent chatbot using the OpenAI API for AI-assisted diagnostics, risk assessment, and conversational maintenance ticket creation, integrated with live machine learning models.",
      "Collaborated cross-functionally with Machine Learning and Frontend teams on model integration, testing, and iterative feedback, earning a final project score of **90/100**."
    ]
  },
  {
    type: "Cohort Program",
    role: "Machine Learning Engineer Cohort",
    company: "Coding Camp 2025 — Dicoding & DBS Foundation",
    period: "10 Feb 2025 – 16 Jul 2025",
    points: [
      "Completed training in Python data processing, statistical visualization, machine learning model development and evaluation, and deep learning applications in NLP, computer vision, and recommender systems.",
      "Developed **DiagnoSmart**, a web-based multi-disease diagnostic platform integrating four Convolutional Neural Network (CNN) models built and trained with TensorFlow for general, bone, skin, and gastrointestinal conditions.",
      "Built and deployed a REST API using FastAPI to serve real-time model predictions to the web application.",
      "Achieved a final project score of **92/100**, recognized for robust system functionality, reliable predictions, and intuitive user interface design."
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    id: "merapat",
    title: "MERAPAT",
    category: "Enterprise Full-Stack System",
    description: "Enterprise meeting room management platform for managing room reservations, attendance, executive schedules, and meeting operations.",
    tags: ["React", "Express.js", "PostgreSQL", "Docker", "Nginx", "Linux"],
    image: "/assets/projects/merapat.png",
    primaryButton: {
      label: "Live System",
      url: "https://merapat.basarnas.go.id/"
    },
    links: {
      project: "https://merapat.basarnas.go.id/",
    },
    telemetry: {
      type: "room",
      title: "Room #B-204",
      badge: "QR Verified",
      statusTitle: "Collision Status",
      statusValue: "Anti-Conflict Locked",
      schedule: "09:00 - 11:30 WIB"
    }
  },
  {
    id: "finary",
    title: "Finary",
    category: "AI Personal Finance & Vault",
    description: "AI-powered personal finance mobile application where users can log expenses by simply chatting with an AI assistant or scanning receipts, while managing cash, bank accounts, and e-wallets in one place with real-time financial insights and secure data storage.",
    tags: ["Flutter", "Dart", "Supabase", "OpenAI API"],
    image: "/assets/projects/finary.png",
    links: {
      github: "https://github.com/aryo04/Finary"
    }
  },
  {
    id: "maintease",
    title: "MaintEase",
    category: "Industrial Predictive AI",
    description: "AI-powered predictive maintenance web application integrating machine learning models for equipment analysis with an LLM-based chatbot built using the OpenAI API for diagnostics, risk assessment, and maintenance management.",
    tags: ["React", "Express.js", "Node.js", "Tailwind CSS", "Supabase", "OpenAI API"],
    image: "/assets/projects/maintease.png",
    links: {
      github: "https://github.com/aryo04/MaintEase"
    },
    telemetry: {
      type: "turbine",
      title: "Turbine #4-B",
      health: "Health: 92/100",
      bars: [30, 45, 28, 60, 85]
    }
  },
  {
    id: "diagnosmart",
    title: "Diagnosmart",
    category: "Medical AI & Deep Learning",
    description: "Web-based multi-disease diagnosis application classifying health conditions across 4 medical categories using a custom CNN model.",
    tags: ["Python", "JavaScript", "FastAPI", "Express.js", "TensorFlow"],
    image: "/assets/projects/diagnosmart.png",
    primaryButton: {
      label: "Demo Platform",
      url: "https://diagnosmart-a5d59.web.app/"
    },
    links: {
      github: "https://github.com/aryo04/DiagnoSmart"
    },
    telemetry: {
      type: "vision",
      title: "Vision Pipeline",
      badge: "Validated",
      metricLabel: "Normal Tissue",
      percentage: 98.2,
      subLabel: "Inflammation",
      subPercentage: "1.4%"
    }
  },
  {
    id: "detexa",
    title: "Detexa",
    category: "Computer Vision & AI Detection",
    description: "Deep learning-based facial image classification system using EfficientNetV2-S to distinguish real human faces from StyleGAN-generated synthetic faces.",
    tags: ["Python", "TensorFlow", "Deep Learning"],
    image: "/assets/projects/detexa.png",
    primaryButton: {
      label: "Demo Platform",
      url: "https://detexa.streamlit.app/"
    },
    links: {
      github: "https://github.com/aryo04/deepfake"
    },
    telemetry: {
      type: "detexa",
      title: "Detexa CV Core",
      badge: "v2.4 Active",
      metricLabel: "Detection Confidence",
      percentage: 97.6,
      subLabel: "Feature Heatmap",
      subValue: "Multi-Scale"
    }
  }
];
