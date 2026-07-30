import React from 'react';
import { 
  Sparkles, 
  Code2, 
  Briefcase, 
  Mail, 
  FileText, 
  Palette, 
  Bot, 
  Edit3,
  Globe,
  Lock,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  name: string;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  isAdmin: boolean;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenAdminAuth: () => void;
  onOpenHostingGuide: () => void;
  onOpenAIAssistant: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  theme,
  onThemeChange,
  isAdmin,
  isEditMode,
  onToggleEditMode,
  onOpenAdminAuth,
  onOpenHostingGuide,
  onOpenAIAssistant,
  onOpenResume,
}) => {
  const themes: { id: ThemeMode; label: string; bg: string }[] = [
    { id: 'dark-slate', label: 'Dark Slate', bg: 'bg-slate-900 border-slate-700' },
    { id: 'modern-light', label: 'Pure Light', bg: 'bg-white border-gray-300' },
    { id: 'cyber-neon', label: 'Cyber Neon', bg: 'bg-zinc-950 border-cyan-500' },
    { id: 'emerald-dusk', label: 'Emerald', bg: 'bg-emerald-950 border-emerald-600' },
    { id: 'rose-gold', label: 'Rose Dark', bg: 'bg-stone-900 border-rose-500' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 border-slate-800/80 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Name */}
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            {name.charAt(0) || 'P'}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors tracking-tight text-sm sm:text-base">
              {name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Portfolio
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#projects" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-indigo-400" />
            Projects
          </a>
          <a href="#skills" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Skills
          </a>
          <a href="#experience" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            Experience
          </a>
          <a href="#contact" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-rose-400" />
            Contact
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Ask AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-medium shadow-sm transition-all"
            title="Ask AI Recruiter Assistant about my background"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI Assistant</span>
            <span className="sm:hidden">Ask AI</span>
          </button>

          {/* Hosting & Deploy Guide Button */}
          <button
            onClick={onOpenHostingGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-all"
            title="Learn how to host this portfolio 100% free"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Host Free Guide</span>
          </button>

          {/* Resume Viewer Button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
            title="View Formatted Resume"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            Resume
          </button>

          {/* Admin / Edit Mode Toggle */}
          {isAdmin ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onToggleEditMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isEditMode
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                }`}
                title="Toggle Edit Controls"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{isEditMode ? 'Editing Active' : 'Admin Edit On'}</span>
              </button>

              <button
                onClick={onOpenAdminAuth}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all"
                title="Admin Dashboard & Passcode Settings"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Admin</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 hover:border-indigo-500/50 text-slate-300 hover:text-white text-xs font-medium transition-all"
              title="Admin Login for Portfolio Owner"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Owner Login</span>
            </button>
          )}

          {/* Theme Selector Dropdown */}
          <div className="relative group">
            <button className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-all">
              <Palette className="w-4 h-4 text-purple-400" />
            </button>
            <div className="absolute right-0 mt-2 w-44 py-2 bg-slate-900 border border-slate-800 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Theme
              </div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    theme === t.id ? 'text-indigo-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {t.label}
                  <span className={`w-3 h-3 rounded-full border ${t.bg}`}></span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
