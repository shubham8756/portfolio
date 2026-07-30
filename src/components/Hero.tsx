import React from 'react';
import { 
  MapPin, 
  Sparkles, 
  Briefcase, 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  CheckCircle2,
  Code,
  Award,
  Zap
} from 'lucide-react';
import { PortfolioProfile } from '../types';

interface HeroProps {
  profile: PortfolioProfile;
  onOpenContact: () => void;
  onOpenResume: () => void;
  onOpenAIAssistant: () => void;
  onEditProfile?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onOpenContact,
  onOpenResume,
  onOpenAIAssistant,
  onEditProfile,
}) => {
  const socialIconsMap: Record<string, React.ReactNode> = {
    github: <Github className="w-4 h-4" />,
    linkedin: <Linkedin className="w-4 h-4" />,
    twitter: <Twitter className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
  };

  return (
    <section id="top" className="relative pt-12 pb-20 overflow-hidden">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Main Info */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs font-medium shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{profile.availability}</span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-rose-400" />
                {profile.location}
              </span>
            </div>

            {/* Title & Name */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-indigo-300/90">
                {profile.title}
              </p>
            </div>

            {/* Subtitle / Punchline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {profile.subtitle}
            </p>

            {/* Extended Bio */}
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
              {profile.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
              >
                View Featured Projects
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-medium text-sm transition-all"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                Get In Touch
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm font-medium transition-all"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                Resume / CV
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Connect:</span>
              <div className="flex items-center gap-2">
                {profile.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all hover:scale-105"
                    title={link.label}
                  >
                    {socialIconsMap[link.platform] || <Sparkles className="w-4 h-4" />}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Avatar & Metrics Card */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            
            <div className="relative group w-full max-w-md">
              
              {/* Outer Decorative Glow Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 group-hover:opacity-60 blur-xl transition-all duration-500"></div>

              {/* Main Card */}
              <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Avatar Frame */}
                <div className="relative w-36 h-36 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl group-hover:border-indigo-400 transition-all">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>

                {/* Quick Interactive Badges */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                  <p className="text-xs text-indigo-400 font-mono mt-0.5">{profile.title}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center">
                    <div className="flex items-center justify-center gap-1 text-indigo-400 text-lg font-bold">
                      <Zap className="w-4 h-4" />
                      {profile.stats.yearsExperience}+ Yrs
                    </div>
                    <div className="text-[11px] text-slate-400">Experience</div>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center">
                    <div className="flex items-center justify-center gap-1 text-purple-400 text-lg font-bold">
                      <Code className="w-4 h-4" />
                      {profile.stats.projectsCompleted}+
                    </div>
                    <div className="text-[11px] text-slate-400">Projects Shipped</div>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center">
                    <div className="flex items-center justify-center gap-1 text-emerald-400 text-lg font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      {profile.stats.githubContributions}+
                    </div>
                    <div className="text-[11px] text-slate-400">GitHub Commits</div>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center">
                    <div className="flex items-center justify-center gap-1 text-rose-400 text-lg font-bold">
                      <Award className="w-4 h-4" />
                      {profile.stats.happyClients}+
                    </div>
                    <div className="text-[11px] text-slate-400">Satisfied Clients</div>
                  </div>
                </div>

                {/* Ask AI Trigger inside Card */}
                <button
                  onClick={onOpenAIAssistant}
                  className="w-full mt-4 py-2.5 px-4 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                  Ask AI Recruiter Assistant about me
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
