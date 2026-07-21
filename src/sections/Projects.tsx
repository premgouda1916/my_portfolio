import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Github, ExternalLink, Search, Cpu, Code2 } from 'lucide-react';


export const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'ml' | 'web'>('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = resumeData.projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Unique visuals for project headers
  const getProjectVisual = (title: string, index: number) => {
    const gradients = [
      "from-blue-600/20 via-indigo-900/30 to-slate-950",
      "from-emerald-600/20 via-teal-900/30 to-slate-950",
      "from-cyan-600/20 via-blue-900/30 to-slate-950"
    ];
    const grad = gradients[index % gradients.length];
    
    return (
      <div className={`h-48 w-full bg-gradient-to-br ${grad} relative overflow-hidden flex items-center justify-center border-b border-white/5`}>
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        
        {/* Glowing floating light sphere */}
        <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
        
        {/* Central code graphics */}
        <div className="relative z-10 p-5 rounded-3xl bg-slate-900/90 border border-white/10 shadow-glow-blue flex items-center justify-center animate-float">
          {title.includes('XLM-RoBERTa') || title.includes('SAS') ? (
            <Cpu size={32} className="text-accentCyan" />
          ) : (
            <Code2 size={32} className="text-accentBlue" />
          )}
        </div>

        {/* Diagonal tech banner */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 border border-white/10 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
          {title.includes('XLM-RoBERTa') || title.includes('SAS') ? "AI/ML Model" : "App Suite"}
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden bg-slate-100/40 dark:bg-slate-900/20">
      {/* Light highlights */}
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Portfolio"
          title="Featured Projects"
          subtitle="A selection of machine learning classifiers, patient adherence systems, and wellness suites."
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 bg-glass dark:bg-glass p-4 rounded-3xl border border-white/5 shadow-md max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-5 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2 border whitespace-nowrap cursor-pointer transition-all duration-300 ${
                filterCategory === 'all'
                  ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-white border-transparent'
                  : 'bg-slate-100 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-white/10'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilterCategory('ml')}
              className={`px-5 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2 border whitespace-nowrap cursor-pointer transition-all duration-300 ${
                filterCategory === 'ml'
                  ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-white border-transparent'
                  : 'bg-slate-100 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-white/10'
              }`}
            >
              Machine Learning
            </button>
            <button
              onClick={() => setFilterCategory('web')}
              className={`px-5 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2 border whitespace-nowrap cursor-pointer transition-all duration-300 ${
                filterCategory === 'web'
                  ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-white border-transparent'
                  : 'bg-slate-100 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-white/10'
              }`}
            >
              Full-Stack / OS Web
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search technologies, titles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-accentBlue/50 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.title}
                className="bg-glass dark:bg-glass rounded-3xl border border-white/5 overflow-hidden flex flex-col group hover:border-accentBlue/30 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
              >
                {/* Custom geometric visual header */}
                {getProjectVisual(project.title, idx)}

                {/* Content Block */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-accentBlue transition-colors duration-300 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Details Bullet List */}
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 mb-6">
                    {project.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-accentCyan mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology badging */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-slate-800/50 dark:bg-slate-950/50 border border-white/5 font-mono text-[10px] text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
                    >
                      <Github size={16} /> Code repo
                    </a>
                    
                    {/* Demo Link (Mock link since it's client portfolio, pointing to github repo or preview) */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-accentBlue hover:text-accentCyan transition-colors duration-300"
                    >
                      Live Preview <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-slate-600 dark:text-slate-400 font-semibold">No projects match your search criteria.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
