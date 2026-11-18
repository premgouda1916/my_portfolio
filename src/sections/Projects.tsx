import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData, type Project } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Github, ExternalLink, Cpu, Code2, Server, Search, CheckCircle, Zap, ArrowRight } from 'lucide-react';
import { ArchitectureModal } from '../components/ArchitectureModal';

export const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'ml' | 'distributed' | 'web'>('all');
  const [selectedArchProject, setSelectedArchProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredProjects = resumeData.projects.filter((project: Project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.subtitle && project.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Ensure selected index is always valid when filters change
  useEffect(() => {
    if (selectedIndex >= filteredProjects.length) {
      setSelectedIndex(0);
    }
  }, [filteredProjects.length, selectedIndex]);

  const activeProject: Project | undefined = filteredProjects[selectedIndex] || filteredProjects[0];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ml':
        return <Cpu size={16} className="text-blue-600 dark:text-blue-400" />;
      case 'distributed':
        return <Server size={16} className="text-amber-500" />;
      default:
        return <Code2 size={16} className="text-emerald-500" />;
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-white/20 bg-slate-50 dark:bg-[#0D0E14]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="// 04"
          badge="Featured Systems"
          title="Engineering Projects"
          subtitle="Production-ready architectures spanning high-concurrency distributed engines, transformer NLP pipelines, and full-stack web platforms."
        />

        {/* Filter & Search Bar */}
        <div className="mb-8 p-3 sm:p-4 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#38bdf8] flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto font-mono text-xs">
            <button
              onClick={() => { setFilterCategory('all'); setSelectedIndex(0); }}
              className={`px-3 py-1.5 font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
                filterCategory === 'all'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_#2563eb]'
                  : 'bg-slate-100 dark:bg-black text-black dark:text-white hover:bg-amber-300'
              }`}
            >
              All Systems ({resumeData.projects.length})
            </button>
            <button
              onClick={() => { setFilterCategory('ml'); setSelectedIndex(0); }}
              className={`px-3 py-1.5 font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
                filterCategory === 'ml'
                  ? 'bg-blue-600 text-white shadow-[2px_2px_0px_#000]'
                  : 'bg-slate-100 dark:bg-black text-black dark:text-white hover:bg-amber-300'
              }`}
            >
              AI & Deep Learning
            </button>
            <button
              onClick={() => { setFilterCategory('distributed'); setSelectedIndex(0); }}
              className={`px-3 py-1.5 font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
                filterCategory === 'distributed'
                  ? 'bg-amber-400 text-black shadow-[2px_2px_0px_#000]'
                  : 'bg-slate-100 dark:bg-black text-black dark:text-white hover:bg-amber-300'
              }`}
            >
              Distributed Systems
            </button>
            <button
              onClick={() => { setFilterCategory('web'); setSelectedIndex(0); }}
              className={`px-3 py-1.5 font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
                filterCategory === 'web'
                  ? 'bg-emerald-600 text-white shadow-[2px_2px_0px_#000]'
                  : 'bg-slate-100 dark:bg-black text-black dark:text-white hover:bg-amber-300'
              }`}
            >
              Full-Stack & Web
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input
              type="text"
              placeholder="Search tech or title..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setSelectedIndex(0); }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-black border-2 border-black dark:border-white font-mono text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:bg-amber-50 dark:focus:bg-slate-900 transition-colors"
            />
          </div>
        </div>

        {/* Master-Detail Engineering Console */}
        {filteredProjects.length > 0 && activeProject ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Interactive Project Navigator (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-1 mb-1 font-mono text-xs uppercase font-bold text-slate-500">
                <span>// SELECT SYSTEM CONSOLE</span>
                <span>{filteredProjects.length} AVAILABLE</span>
              </div>

              {filteredProjects.map((project, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 border-2 transition-all cursor-pointer brutal-press flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-[4px_4px_0px_#2563eb]'
                        : 'bg-white dark:bg-[#141620] text-black dark:text-white border-black dark:border-white/30 hover:bg-amber-50 dark:hover:bg-slate-800/80 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#38bdf8]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`font-mono text-xs font-black px-1.5 py-0.5 border ${
                        isSelected 
                          ? 'bg-amber-300 text-black border-black' 
                          : 'bg-slate-100 dark:bg-black text-slate-600 dark:text-slate-300 border-black/40 dark:border-white/30'
                      }`}>
                        0{idx + 1}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-black text-base uppercase tracking-tight truncate">
                            {project.title}
                          </h4>
                        </div>
                        <span className={`font-mono text-[10px] block truncate ${
                          isSelected ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500'
                        }`}>
                          {project.tag}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 font-mono text-xs">
                      {project.demo && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 border ${
                          isSelected ? 'bg-emerald-400 text-black border-black' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-500'
                        }`}>
                          LIVE
                        </span>
                      )}
                      <ArrowRight size={15} className={isSelected ? 'text-amber-300 dark:text-blue-600 translate-x-1 transition-transform' : 'text-slate-400'} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Deep-Dive Showcase Console (7 Columns) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 sm:p-7 bg-white dark:bg-[#141620] border-brutal-bold shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#38bdf8] flex flex-col justify-between"
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b-2 border-black dark:border-white/20">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-slate-100 dark:bg-black border border-black dark:border-white">
                          {getCategoryIcon(activeProject.category)}
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest block">
                            ACTIVE SHOWCASE CONSOLE
                          </span>
                          <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black dark:text-white">
                            {activeProject.title}
                          </h3>
                        </div>
                      </div>

                      <span className="font-mono text-xs font-bold px-2.5 py-1 bg-amber-300 text-black border border-black shadow-[2px_2px_0px_#000]">
                        {activeProject.tag}
                      </span>
                    </div>

                    {/* Subtitle */}
                    {activeProject.subtitle && (
                      <p className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 mb-3">
                        {activeProject.subtitle}
                      </p>
                    )}

                    {/* Description */}
                    <p className="font-sans text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
                      {activeProject.description}
                    </p>

                    {/* Architecture Highlights Box */}
                    <div className="mb-4 p-3.5 bg-slate-50 dark:bg-[#10121A] border border-black/15 dark:border-white/15">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                        // CORE ARCHITECTURE SPECIFICATIONS
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs text-slate-700 dark:text-slate-300">
                        {activeProject.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold mt-0.5">▪</span>
                            <span className="leading-snug">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-slate-100 dark:bg-black text-black dark:text-white font-mono text-[10px] font-semibold uppercase border border-black dark:border-white/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t-2 border-black dark:border-white/20 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      {activeProject.github && (
                        <a
                          href={activeProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-black hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black font-bold uppercase border-2 border-black dark:border-white flex items-center gap-1.5 transition-colors brutal-press"
                        >
                          <Github size={13} />
                          <span>Code Repository</span>
                        </a>
                      )}

                      {activeProject.architecture && (
                        <button
                          type="button"
                          onClick={() => setSelectedArchProject(activeProject)}
                          className="px-3.5 py-2 bg-amber-300 hover:bg-amber-400 text-black font-bold uppercase border-2 border-black shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] flex items-center gap-1.5 brutal-press cursor-pointer"
                        >
                          <Zap size={13} />
                          <span>Architecture ⚡</span>
                        </button>
                      )}
                    </div>

                    {activeProject.demo ? (
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-black font-bold uppercase border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 brutal-press"
                      >
                        <span>Live Demo ↗</span>
                        <ExternalLink size={13} />
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] text-slate-500 flex items-center gap-1">
                        <CheckCircle size={13} className="text-blue-500" />
                        <span>{activeProject.metrics || "Benchmarked"}</span>
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 p-6 bg-white dark:bg-[#141620] border-2 border-black dark:border-white font-mono text-xs uppercase">
            No projects found matching filter query: "{searchQuery}"
          </div>
        )}

        {/* System Architecture Deep-Dive Modal */}
        <ArchitectureModal
          project={selectedArchProject}
          onClose={() => setSelectedArchProject(null)}
        />
      </div>
    </section>
  );
};
