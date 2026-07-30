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

import { ArrowUp, Globe, Download } from 'lucide-react';

export default function App() {
  // Primary profile & portfolio state
  const [profile, setProfile] = useState<PortfolioProfile>(initialProfile);
  const [projects] = useState<Project[]>(initialProjects);
  const [skills] = useState<Skill[]>(initialSkills);
  const [experience] = useState<WorkExperience[]>(initialExperience);

  const [education] = useState<Education[]>(initialEducation);
  const [certifications] = useState<Certification[]>(initialCertifications);
  const [awards] = useState<AwardType[]>(initialAwards);
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('portfolio_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState<ThemeMode>('dark-slate');

  // Modals state
  const [showHostingGuide, setShowHostingGuide] = useState<boolean>(false);
  const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);
  const [showResume, setShowResume] = useState<boolean>(false);

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
        onOpenHostingGuide={() => setShowHostingGuide(true)}
        onOpenAIAssistant={() => setShowAIAssistant(true)}
        onOpenResume={() => setShowResume(true)}
      />

      {/* Main Content */}
      <main>
        
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenContact={() => {
            const contactEl = document.getElementById('contact');
            contactEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenResume={() => setShowResume(true)}
          onOpenAIAssistant={() => setShowAIAssistant(true)}
        />

        {/* Projects Section */}
        <ProjectsSection
          projects={projects}
        />

        {/* Skills Section */}
        <SkillsSection
          skills={skills}
        />

        {/* Experience Section */}
        <ExperienceSection
          experience={experience}
          education={education}
          certifications={certifications}
          awards={awards}
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

    </div>
  );
}
