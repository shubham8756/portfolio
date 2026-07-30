export type ThemeMode = 'dark-slate' | 'modern-light' | 'cyber-neon' | 'emerald-dusk' | 'rose-gold';

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'website' | 'youtube';
  url: string;
  label: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Cloud & Infrastructure' | 'DevOps & CI/CD' | 'Containers & Orchestration' | 'Observability & Monitoring' | 'Languages & Security' | string;
  level: number; // 1 to 100
  iconName?: string;
  isTopSkill?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: 'Cloud & Infrastructure' | 'DevOps & CI/CD' | 'Observability' | 'Site Reliability' | 'Full-Stack' | string;
  image: string;
  tags: string[];
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  badgeUrl?: string;
  verifyUrl?: string;
  category: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
  current?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export interface PortfolioProfile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  avatarUrl: string;
  availability: 'Available for Hire' | 'Open to Consulting' | 'Full-Time Roles Only' | 'Busy with Projects';
  socialLinks: SocialLink[];
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    githubContributions: number;
    happyClients: number;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
