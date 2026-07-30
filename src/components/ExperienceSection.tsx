import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ChevronRight, Plus, Award, ShieldCheck, ExternalLink } from 'lucide-react';
import { WorkExperience, Education, Certification, Award as AwardType } from '../types';

interface ExperienceSectionProps {
  experience: WorkExperience[];
  education: Education[];
  certifications?: Certification[];
  awards?: AwardType[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  education,
  certifications = [],
  awards = [],
}) => {
  const [activeTab, setActiveTab] = useState<'work' | 'certifications' | 'awards' | 'education'>('work');

  return (
    <section id="experience" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              Career Journey & Credentials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Work Experience, Certifications & Awards
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              A chronological timeline of engineering leadership, verified cloud certifications, Apple Store launch awards, and academic background.
            </p>
          </div>

          {/* Toggle Tab Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('work')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'work'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Work Roles ({experience.length})
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'certifications'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Certifications ({certifications.length})
            </button>

            <button
              onClick={() => setActiveTab('awards')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'awards'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Awards ({awards.length})
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'education'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Education ({education.length})
            </button>
          </div>
        </div>

        {/* Content View */}
        {activeTab === 'work' && (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-12">
            {experience.map((exp) => (
              <div key={exp.id} className="relative group">
                
                {/* Timeline Connector Dot */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 ${
                  exp.current 
                    ? 'bg-emerald-500 border-emerald-300 shadow-md shadow-emerald-500/50 animate-pulse' 
                    : 'bg-slate-900 border-slate-700'
                }`}></div>

                {/* Card Container */}
                <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-all shadow-lg space-y-4">
                  
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold">
                            Current Role
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-emerald-400/90 mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="pt-3 flex flex-wrap gap-1.5 border-t border-slate-800/80">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/40 transition-all shadow-md flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-semibold">
                      {cert.category}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
                  <span>{cert.issueDate || 'Verified Credentials'}</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-sans font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Awards Tab */}
        {activeTab === 'awards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 sm:p-8 hover:border-amber-500/60 transition-all shadow-lg space-y-3 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{award.title}</h3>
                      <p className="text-xs font-semibold text-amber-400/90 mt-0.5">{award.issuer}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono">
                    {award.date}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-md space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                    <p className="text-sm font-semibold text-emerald-400 mt-0.5">{edu.institution}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono">
                    {edu.period}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
