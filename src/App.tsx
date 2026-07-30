import React, { useState, useEffect } from 'react';
import { 
  initialProfile, 
  initialProjects, 
  initialSkills, 
  initialExperience, 
  initialEducation,
  initialCertifications,
  initialAwards
} from './data/initialData';
import { 
  PortfolioProfile, 
  Project, 
  Skill, 
  WorkExperience, 
  Education, 
  Certification,
  Award as AwardType,
  ThemeMode, 
  ContactMessage 
} from './types';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { HostingGuideModal } from './components/HostingGuideModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ResumeModal } from './components/ResumeModal';
import { EditProfileModal } from './components/EditProfileModal';
import { AdminAuthModal } from './components/AdminAuthModal';

import { Sparkles, ArrowUp, Heart, Globe, Code2, ShieldCheck, Download } from 'lucide-react';

export default function App() {
  // Use code in initialData.ts as primary source of truth so code edits apply immediately
  const [profile, setProfile] = useState<PortfolioProfile>(initialProfile);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [experience, setExperience] = useState<WorkExperience[]>(initialExperience);

  const [education] = useState<Education[]>(initialEducation);
  const [certifications] = useState<Certification[]>(initialCertifications);
  const [awards] = useState<AwardType[]>(initialAwards);
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('portfolio_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState<ThemeMode>('dark-slate');
  
  // Default to clean View-Only Mode
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    return localStorage.getItem('portfolio_admin_passcode') || 'admin123';
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Modals state
  const [showHostingGuide, setShowHostingGuide] = useState<boolean>(false);
  const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);
  const [showResume, setShowResume] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState<boolean>(false);

  // Admin auth handlers
  const handleAdminLogin = (pass: string): boolean => {
    const currentPasscode = localStorage.getItem('portfolio_admin_passcode') || adminPasscode;
    if (pass === currentPasscode) {
      setIsAdmin(true);
      setIsEditMode(true);
      localStorage.setItem('portfolio_is_admin', 'true');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setIsEditMode(false);
    localStorage.removeItem('portfolio_is_admin');
  };

  const handleChangeAdminPasscode = (newPass: string) => {
    setAdminPasscode(newPass);
    localStorage.setItem('portfolio_admin_passcode', newPass);
  };

  useEffect(() => {
    localStorage.setItem('portfolio_admin_passcode', adminPasscode);
  }, [adminPasscode]);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('portfolio_experience', JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (msg: ContactMessage) => {
    setMessages((prev) => [msg, ...prev]);
  };

  const handleExportJSON = () => {
    const data = {
      profile,
      projects,
      skills,
      experience,
      education,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_portfolio.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (jsonText: string) => {
    try {
      const data = JSON.parse(jsonText);
      if (data.profile) {
        setProfile(data.profile);
        localStorage.setItem('portfolio_profile', JSON.stringify(data.profile));
      }
      if (data.projects && Array.isArray(data.projects)) {
        setProjects(data.projects);
        localStorage.setItem('portfolio_projects', JSON.stringify(data.projects));
      }
      if (data.skills && Array.isArray(data.skills)) {
        setSkills(data.skills);
        localStorage.setItem('portfolio_skills', JSON.stringify(data.skills));
      }
      if (data.experience && Array.isArray(data.experience)) {
        setExperience(data.experience);
        localStorage.setItem('portfolio_experience', JSON.stringify(data.experience));
      }
      alert('Portfolio configuration imported successfully!');
    } catch (err) {
      alert('Failed to parse portfolio JSON configuration.');
    }
  };

  // Theme container classes
  const themeClasses: Record<ThemeMode, string> = {
    'dark-slate': 'bg-slate-950 text-slate-100',
    'modern-light': 'bg-slate-50 text-slate-900',
    'cyber-neon': 'bg-zinc-950 text-zinc-100',
    'emerald-dusk': 'bg-emerald-950 text-emerald-50',
    'rose-gold': 'bg-stone-950 text-stone-100',
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300 ${themeClasses[theme]}`}>
      
      {/* Top Sticky Navbar */}
      <Navbar
        name={profile.name}
        theme={theme}
        onThemeChange={setTheme}
        isAdmin={isAdmin}
        isEditMode={isEditMode}
        onToggleEditMode={() => {
          if (!isAdmin) {
            setShowAdminAuthModal(true);
          } else {
            setIsEditMode(!isEditMode);
          }
        }}
        onOpenAdminAuth={() => setShowAdminAuthModal(true)}
        onOpenHostingGuide={() => setShowHostingGuide(true)}
        onOpenAIAssistant={() => setShowAIAssistant(true)}
        onOpenResume={() => setShowResume(true)}
      />

      {/* Main Content */}
      <main>
        
        {/* Customization Banner when Edit Mode is active */}
        {isEditMode && isAdmin && (
          <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 text-center text-xs text-amber-300 font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Admin Edit Mode Active: You can upload photos, update your bio, projects, and skills live!</span>
            <button
              onClick={() => setShowEditProfile(true)}
              className="px-3 py-1 rounded bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors ml-2"
            >
              Edit Profile Content
            </button>
            <button
              onClick={handleAdminLogout}
              className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors ml-1 text-[11px]"
            >
              Lock Admin Session
            </button>
          </div>
        )}

        {/* Hero Section */}
        <Hero
          profile={profile}
          isAdmin={isAdmin}
          onOpenContact={() => {
            const contactEl = document.getElementById('contact');
            contactEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenResume={() => setShowResume(true)}
          onOpenAIAssistant={() => setShowAIAssistant(true)}
          onEditProfile={() => setShowEditProfile(true)}
          onRequireAdminAuth={() => setShowAdminAuthModal(true)}
        />

        {/* Projects Section */}
        <ProjectsSection
          projects={projects}
          isEditMode={isEditMode}
          onAddProject={() => {
            const newProj: Project = {
              id: `proj-${Date.now()}`,
              title: "New Custom Project",
              tagline: "Short tagline describing this project",
              description: "Full description of features, tech stack, and engineering choices.",
              category: "Full-Stack",
              image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
              tags: ["React", "TypeScript"],
              featured: false,
              demoUrl: "https://example.com",
              githubUrl: "https://github.com",
            };
            setProjects([newProj, ...projects]);
          }}
          onEditProject={(projectToEdit) => {
            const updatedTitle = prompt("Enter project title:", projectToEdit.title);
            if (updatedTitle) {
              setProjects(projects.map((p) => (p.id === projectToEdit.id ? { ...p, title: updatedTitle } : p)));
            }
          }}
        />

        {/* Skills Section */}
        <SkillsSection
          skills={skills}
          isEditMode={isEditMode}
          onAddSkill={() => {
            const name = prompt("Skill Name (e.g., Python, Docker):");
            if (name) {
              const newSkill: Skill = {
                id: `sk-${Date.now()}`,
                name,
                category: "Frontend",
                level: 85,
                isTopSkill: true,
              };
              setSkills([...skills, newSkill]);
            }
          }}
          onEditSkill={(skillToEdit) => {
            const newLevelStr = prompt(`Enter proficiency (1-100) for ${skillToEdit.name}:`, skillToEdit.level.toString());
            if (newLevelStr) {
              const lvl = parseInt(newLevelStr) || 80;
              setSkills(skills.map((s) => (s.id === skillToEdit.id ? { ...s, level: lvl } : s)));
            }
          }}
        />

        {/* Experience Section */}
        <ExperienceSection
          experience={experience}
          education={education}
          certifications={certifications}
          awards={awards}
          isEditMode={isEditMode}
          onAddExperience={() => {
            const role = prompt("Job Role Title:");
            const company = prompt("Company Name:");
            if (role && company) {
              const newExp: WorkExperience = {
                id: `exp-${Date.now()}`,
                role,
                company,
                period: "2024 - Present",
                location: "Remote",
                description: "Key responsibilities and engineering achievements.",
                highlights: ["Improved performance metric by 25%"],
                techStack: ["React", "TypeScript", "Node.js"],
              };
              setExperience([newExp, ...experience]);
            }
          }}
        />

        {/* Contact Section */}
        <ContactSection
          profile={profile}
          onSendMessage={handleSendMessage}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {profile.name.charAt(0)}
            </div>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <button
              onClick={() => setShowHostingGuide(true)}
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              Free Hosting Guide
            </button>
            <button
              onClick={handleExportJSON}
              className="hover:text-indigo-400 flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              Export Portfolio JSON
            </button>
            <a
              href="#top"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showHostingGuide && (
        <HostingGuideModal
          onClose={() => setShowHostingGuide(false)}
          onExportJSON={handleExportJSON}
        />
      )}

      {showAIAssistant && (
        <AIAssistantModal
          profile={profile}
          onClose={() => setShowAIAssistant(false)}
          onApplyBio={(newBio) => setProfile({ ...profile, bio: newBio })}
        />
      )}

      {showResume && (
        <ResumeModal
          profile={profile}
          projects={projects}
          skills={skills}
          experience={experience}
          education={education}
          certifications={certifications}
          awards={awards}
          onClose={() => setShowResume(false)}
        />
      )}

      {showEditProfile && (
        <EditProfileModal
          profile={profile}
          onSaveProfile={(updatedProfile) => setProfile(updatedProfile)}
          onExportConfig={handleExportJSON}
          onImportConfig={handleImportJSON}
          onClose={() => setShowEditProfile(false)}
        />
      )}

      {showAdminAuthModal && (
        <AdminAuthModal
          isAdmin={isAdmin}
          onLogin={handleAdminLogin}
          onLogout={handleAdminLogout}
          onChangePasscode={handleChangeAdminPasscode}
          onClose={() => setShowAdminAuthModal(false)}
        />
      )}

    </div>
  );
}
