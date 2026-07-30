import React from 'react';
import { X, Printer, Copy, Download, Briefcase, GraduationCap, Code2, Mail, MapPin, Globe, ShieldCheck, Award as AwardIcon } from 'lucide-react';
import { PortfolioProfile, Project, Skill, WorkExperience, Education, Certification, Award } from '../types';

interface ResumeModalProps {
  profile: PortfolioProfile;
  projects: Project[];
  skills: Skill[];
  experience: WorkExperience[];
  education: Education[];
  certifications?: Certification[];
  awards?: Award[];
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  profile,
  projects,
  skills,
  experience,
  education,
  certifications = [],
  awards = [],
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const email = profile.socialLinks.find((l) => l.platform === 'email')?.url.replace('mailto:', '') || '';
  const github = profile.socialLinks.find((l) => l.platform === 'github')?.url || '';
  const linkedin = profile.socialLinks.find((l) => l.platform === 'linkedin')?.url || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Curriculum Vitae / Formatted Resume
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print Printable Container */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-white text-slate-900 font-sans print:p-0 print:m-0">
          
          {/* Header */}
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h1>
            <p className="text-base font-semibold text-indigo-600 mt-0.5">{profile.title}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-mono mt-3">
              {email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {email}</span>}
              {profile.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>}
              {github && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {github}</span>}
              {linkedin && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {linkedin}</span>}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              Work Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-slate-900">{exp.role}</span>
                    <span className="text-xs font-semibold text-indigo-600 ml-2">@ {exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{exp.period} | {exp.location}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5 pl-1">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Core Technical Competencies */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              Technical Stack & Skills
            </h2>
            <div className="text-xs text-slate-700 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s.id} className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-200">
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Highlighted Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              Featured Projects
            </h2>
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{p.title}</span>
                  <span className="text-[10px] font-mono text-indigo-600">{p.category}</span>
                </div>
                <p className="text-[11px] text-slate-600">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
                Verified Cloud & Infrastructure Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {certifications.map((c) => (
                  <div key={c.id} className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-900 block">{c.title}</span>
                      <span className="text-[10px] text-slate-500">{c.issuer}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 font-semibold">{c.issueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Honors & Awards */}
          {awards && awards.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
                Honors & Key Recognitions
              </h2>
              {awards.map((a) => (
                <div key={a.id} className="text-xs space-y-0.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{a.title} ({a.issuer})</span>
                    <span className="font-mono text-slate-500 text-[10px]">{a.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{a.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span> - <span className="text-slate-600">{edu.institution}</span>
                </div>
                <span className="font-mono text-slate-500">{edu.period}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
