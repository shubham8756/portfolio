import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Search, 
  Sparkles, 
  Layers, 
  Star, 
  X, 
  ArrowUpRight,
  TrendingUp,
  Plus
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  isEditMode?: boolean;
  onAddProject?: () => void;
  onEditProject?: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isEditMode,
  onAddProject,
  onEditProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'AI & ML', 'Frontend', 'Mobile', 'Open Source'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              Featured Work & Cases
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Crafted Software Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Explore real-world web applications, production AI engines, and open source architectures built with modern engineering standards.
            </p>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects or tech tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            {isEditMode && onAddProject && (
              <button
                onClick={onAddProject}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            )}
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges Overlay */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-indigo-300 text-[10px] font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Edit action if in edit mode */}
                  {isEditMode && onEditProject && (
                    <button
                      onClick={() => onEditProject(project)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-amber-400 hover:text-white text-xs font-medium"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-indigo-300/80 font-medium line-clamp-1">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Metrics if available */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex items-center gap-3 pt-2">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {m.label}: <span className="font-bold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[10px] font-mono border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/40">
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  View Details
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                      title="View Code Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all"
                      title="Live Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-medium">No projects match your filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs text-indigo-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Header Image */}
            <div className="relative h-56 sm:h-64 bg-slate-950 shrink-0">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white border border-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              <div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {activeProjectModal.category}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeProjectModal.title}
                </h3>
                <p className="text-sm font-medium text-indigo-300 mt-1">
                  {activeProjectModal.tagline}
                </p>
              </div>

              {/* Detailed Specs */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Project Overview</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeProjectModal.longDescription || activeProjectModal.description}
                </p>
              </div>

              {/* Key Metrics */}
              {activeProjectModal.metrics && activeProjectModal.metrics.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Impact & Architecture Metrics</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {activeProjectModal.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                        <div className="text-xs text-slate-400">{m.label}</div>
                        <div className="text-base font-bold text-emerald-400 mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Tags */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                {activeProjectModal.demoUrl && (
                  <a
                    href={activeProjectModal.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Live App
                  </a>
                )}
                {activeProjectModal.githubUrl && (
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
                  >
                    <Github className="w-4 h-4" />
                    GitHub Source Code
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
