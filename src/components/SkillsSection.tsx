import React, { useState } from 'react';
import { Sparkles, Code2, Cpu, Database, Wrench, Search, Star, Plus } from 'lucide-react';
import { Skill } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
  isEditMode?: boolean;
  onAddSkill?: () => void;
  onEditSkill?: (skill: Skill) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isEditMode,
  onAddSkill,
  onEditSkill,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Frontend', 'Backend', 'Database & Cloud', 'AI & ML', 'Tools & DevOps'];

  const categoryIcons: Record<string, React.ReactNode> = {
    Frontend: <Code2 className="w-4 h-4 text-indigo-400" />,
    Backend: <Cpu className="w-4 h-4 text-purple-400" />,
    'Database & Cloud': <Database className="w-4 h-4 text-emerald-400" />,
    'AI & ML': <Sparkles className="w-4 h-4 text-amber-400" />,
    'Tools & DevOps': <Wrench className="w-4 h-4 text-rose-400" />,
  };

  const filteredSkills = skills.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Technical Stack & Domain Expertise
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Skills Matrix & Capabilities
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              A comprehensive breakdown of frameworks, languages, cloud platforms, and AI toolchains used across production projects.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skill (e.g. React, Docker)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            {isEditMode && onAddSkill && (
              <button
                onClick={onAddSkill}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className={`group relative p-4 rounded-xl border transition-all duration-200 ${
                skill.isTopSkill
                  ? 'bg-slate-900/90 border-indigo-500/40 hover:border-indigo-400 shadow-md shadow-indigo-500/5'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-indigo-400">
                    {categoryIcons[skill.category] || <Code2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">{skill.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {skill.isTopSkill && (
                    <span className="p-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px]" title="Top Competency">
                      <Star className="w-3 h-3 fill-amber-400" />
                    </span>
                  )}
                  {isEditMode && onEditSkill && (
                    <button
                      onClick={() => onEditSkill(skill)}
                      className="text-[10px] text-amber-400 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  <span className="text-xs font-mono font-semibold text-indigo-400">
                    {skill.level}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80 mt-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-xs font-medium">No skills found matching search.</p>
          </div>
        )}

      </div>
    </section>
  );
};
