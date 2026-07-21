import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Terminal, Database, Cpu, Wrench, Layers } from 'lucide-react';

type SkillCategory = 'all' | 'languages' | 'frameworks' | 'databases' | 'tools';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const categories = [
    { id: 'all', name: 'All Skills', icon: <Layers size={16} /> },
    { id: 'languages', name: 'Languages', icon: <Terminal size={16} /> },
    { id: 'frameworks', name: 'Frameworks', icon: <Cpu size={16} /> },
    { id: 'databases', name: 'Databases', icon: <Database size={16} /> },
    { id: 'tools', name: 'Tools & Others', icon: <Wrench size={16} /> }
  ];

  // Map skill name to details (percentage and icon placeholder/description)
  const skillDetails: Record<string, { percentage: number; color: string; desc: string }> = {
    // Languages
    "Java": { percentage: 95, color: "from-amber-500 to-red-500", desc: "Core & Enterprise, 100% Score" },
    "Python": { percentage: 90, color: "from-blue-500 to-yellow-500", desc: "ML, Automation, Scripting" },
    "C": { percentage: 75, color: "from-slate-500 to-indigo-500", desc: "Foundational, Systems" },
    "JavaScript": { percentage: 90, color: "from-yellow-400 to-yellow-600", desc: "ES6+, Frontend & Backend" },
    "HTML": { percentage: 95, color: "from-orange-500 to-red-500", desc: "Semantic Markup" },
    "CSS": { percentage: 85, color: "from-blue-400 to-indigo-600", desc: "Flexbox, Grid, Responsive" },
    
    // Frameworks
    "React": { percentage: 90, color: "from-cyan-400 to-blue-500", desc: "Hooks, Router, Redux" },
    "Node.js": { percentage: 85, color: "from-green-500 to-emerald-700", desc: "Rest APIs, Scalable Backends" },
    "Express": { percentage: 80, color: "from-slate-600 to-slate-900", desc: "Web Framework, Routing" },
    "Tailwind CSS": { percentage: 90, color: "from-cyan-400 to-teal-400", desc: "Utility-first CSS styling" },
    
    // Databases
    "MySQL": { percentage: 85, color: "from-blue-500 to-orange-500", desc: "Relational Queries, Joins" },
    "MongoDB": { percentage: 80, color: "from-green-500 to-green-600", desc: "NoSQL document storage" },
    "PostgreSQL": { percentage: 80, color: "from-blue-600 to-sky-700", desc: "Advanced RDBMS, Indexing" },
    
    // Tools
    "Git": { percentage: 90, color: "from-orange-600 to-red-600", desc: "Branching, Collaboration" },
    "GitHub": { percentage: 95, color: "from-slate-700 to-black", desc: "CI/CD, PR Review, Actions" },
    "Power BI": { percentage: 75, color: "from-yellow-500 to-amber-600", desc: "Data analysis dashboards" },
    "Tableau": { percentage: 70, color: "from-blue-400 to-indigo-500", desc: "Analytics & Visualisation" },
    "VS Code": { percentage: 95, color: "from-blue-500 to-indigo-600", desc: "Primary IDE environment" }
  };

  const getFilteredSkills = () => {
    if (activeCategory === 'all') {
      return [
        ...resumeData.skills.languages.map(s => ({ name: s, category: 'languages' })),
        ...resumeData.skills.frameworks.map(s => ({ name: s, category: 'frameworks' })),
        ...resumeData.skills.databases.map(s => ({ name: s, category: 'databases' })),
        ...resumeData.skills.tools.map(s => ({ name: s, category: 'tools' }))
      ];
    }
    
    if (activeCategory === 'languages') {
      return resumeData.skills.languages.map(s => ({ name: s, category: 'languages' }));
    }
    if (activeCategory === 'frameworks') {
      return resumeData.skills.frameworks.map(s => ({ name: s, category: 'frameworks' }));
    }
    if (activeCategory === 'databases') {
      return resumeData.skills.databases.map(s => ({ name: s, category: 'databases' }));
    }
    return resumeData.skills.tools.map(s => ({ name: s, category: 'tools' }));
  };

  const filteredSkills = getFilteredSkills();

  // Radar chart categories for SVG visualization
  const radarMetrics = [
    { area: "Full-Stack Dev", value: 92, angle: 0 },
    { area: "Machine Learning", value: 85, angle: 72 },
    { area: "Relational DBs", value: 80, angle: 144 },
    { area: "Analytics/BI", value: 75, angle: 216 },
    { area: "DevOps & Git", value: 90, angle: 288 }
  ];

  // Helper to project radial to Cartesian
  const getCoordinates = (value: number, angle: number) => {
    const radius = (value / 100) * 110; // Max radius is 110
    const angleRad = (angle - 90) * (Math.PI / 180);
    const x = 150 + radius * Math.cos(angleRad);
    const y = 150 + radius * Math.sin(angleRad);
    return { x, y };
  };

  // Generate radar path
  const radarPath = radarMetrics
    .map(m => {
      const coords = getCoordinates(m.value, m.angle);
      return `${coords.x},${coords.y}`;
    })
    .join(' ');

  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative overflow-hidden bg-slate-100/40 dark:bg-slate-900/20">
      {/* Visual background lights */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-accentCyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Expertise"
          title="Skills & Technologies"
          subtitle="My technical stack, tools, and visual distribution of core capabilities."
        />

        {/* Layout split: Skills & Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: Category Switcher & Skill cards */}
          <div className="lg:col-span-8">
            
            {/* Tab switchers */}
            <div className="flex flex-wrap gap-2.5 mb-10 justify-center lg:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as SkillCategory)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-semibold flex items-center gap-2 border transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-white border-transparent shadow-glow-blue'
                      : 'bg-glass border-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-white/10'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Grid of skills */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => {
                  const details = skillDetails[skill.name] || { percentage: 80, color: "from-accentBlue to-accentCyan", desc: "Specialist" };
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={skill.name}
                      className="bg-glass dark:bg-glass p-6 rounded-3xl border border-white/5 relative group hover:border-accentBlue/20 hover:scale-102 transition-all duration-300 shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-accentBlue transition-colors duration-300">
                            {skill.name}
                          </h4>
                          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                            {details.desc}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-accentCyan text-sm">
                          {details.percentage}%
                        </span>
                      </div>

                      {/* Animated slider bar */}
                      <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${details.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${details.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Panel: Skill Radar Chart Visualization */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="bg-glass dark:bg-glass p-8 rounded-3xl border border-white/5 w-full max-w-[360px] flex flex-col items-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-accentBlue/5 to-transparent pointer-events-none" />
              
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-6 text-center">
                Skills Distribution
              </h4>

              {/* Custom SVG Radar Chart */}
              <svg className="w-64 h-64 overflow-visible" viewBox="0 0 300 300">
                {/* Background Radar Rings */}
                {[20, 40, 60, 80, 100].map((ring, idx) => (
                  <circle
                    key={idx}
                    cx="150"
                    cy="150"
                    r={(ring / 100) * 110}
                    className="fill-none stroke-slate-800/60 dark:stroke-slate-800/80"
                    strokeWidth="1.2"
                    strokeDasharray={idx === 4 ? "0" : "4, 4"}
                  />
                ))}

                {/* Radar Axis Lines */}
                {radarMetrics.map((m, idx) => {
                  const end = getCoordinates(100, m.angle);
                  return (
                    <line
                      key={idx}
                      x1="150"
                      y1="150"
                      x2={end.x}
                      y2={end.y}
                      className="stroke-slate-800/80 dark:stroke-slate-800/80"
                      strokeWidth="1.2"
                    />
                  );
                })}

                {/* Area Outline Polygon */}
                <polygon
                  points={radarPath}
                  className="fill-accentBlue/20 stroke-accentCyan"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Radar Vertex Points */}
                {radarMetrics.map((m, idx) => {
                  const coords = getCoordinates(m.value, m.angle);
                  return (
                    <circle
                      key={idx}
                      cx={coords.x}
                      cy={coords.y}
                      r="4.5"
                      className="fill-white stroke-accentBlue"
                      strokeWidth="2"
                    />
                  );
                })}

                {/* Labels */}
                {radarMetrics.map((m, idx) => {
                  const labelOffset = 135; // slightly beyond ring border
                  const angleRad = (m.angle - 90) * (Math.PI / 180);
                  const x = 150 + labelOffset * Math.cos(angleRad);
                  const y = 150 + labelOffset * Math.sin(angleRad);
                  
                  // Adjust label text anchors for alignment
                  let textAnchor: 'inherit' | 'end' | 'middle' | 'start' = "middle";
                  if (Math.cos(angleRad) > 0.2) textAnchor = "start";
                  if (Math.cos(angleRad) < -0.2) textAnchor = "end";


                  return (
                    <text
                      key={idx}
                      x={x}
                      y={y + 4}
                      textAnchor={textAnchor}
                      className="fill-slate-700 dark:fill-slate-300 font-mono font-bold text-[9px] uppercase tracking-wide"
                    >
                      {m.area}
                    </text>
                  );
                })}
              </svg>

              <div className="mt-8 text-center text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Graph displays score assessments based on relative coursework performance and training completion achievements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
