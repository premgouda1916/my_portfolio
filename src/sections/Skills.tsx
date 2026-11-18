import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { Layout, Cpu, Database, Server, ShieldCheck, Check } from 'lucide-react';

interface SkillItem {
  name: string;
  badge?: string;
  featured?: boolean;
}

interface SkillDomain {
  id: string;
  title: string;
  code: string;
  icon: React.ReactNode;
  description: string;
  skills: SkillItem[];
}

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const domains: SkillDomain[] = [
    {
      id: 'backend',
      title: 'Backend & Distributed Systems',
      code: 'SYS.01',
      icon: <Server size={18} className="text-blue-600 dark:text-blue-400" />,
      description: 'High-concurrency services, enterprise Java architecture, and distributed message queues.',
      skills: [
        { name: "Java", badge: "100% IIT Bombay", featured: true },
        { name: "Spring Boot", badge: "Spring Data & JWT", featured: true },
        { name: "FastAPI", badge: "Async APIs", featured: true },
        { name: "Node.js", badge: "Runtime" },
        { name: "Express.js", badge: "REST Framework" },
        { name: "Redis", badge: "Atomic Lua Locking", featured: true },
        { name: "RabbitMQ", badge: "Message Queues" },
        { name: "RESTful APIs", badge: "Clean Architecture" },
        { name: "Flask", badge: "Microservices" }
      ]
    },
    {
      id: 'ai-ml',
      title: 'AI, Machine Learning & NLP',
      code: 'SYS.02',
      icon: <Cpu size={18} className="text-amber-500" />,
      description: 'Deep learning neural models, multilingual transformer pipelines, and GPU acceleration.',
      skills: [
        { name: "PyTorch", badge: "Deep Learning & CNNs", featured: true },
        { name: "XLM-RoBERTa", badge: "Multilingual NLP", featured: true },
        { name: "TensorFlow", badge: "Neural Networks" },
        { name: "Scikit-learn", badge: "Pipelines & Classifiers" },
        { name: "CUDA", badge: "GPU Acceleration" },
        { name: "Python", badge: "Core & Data Science", featured: true },
        { name: "Emotion Classification", badge: "Ekman Model" }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend & Interactive Web',
      code: 'SYS.03',
      icon: <Layout size={18} className="text-emerald-500" />,
      description: 'Performant, accessible user interfaces with clean state management and responsive layouts.',
      skills: [
        { name: "React", badge: "Hooks & SPA", featured: true },
        { name: "Next.js", badge: "SSR & App Router", featured: true },
        { name: "TypeScript", badge: "Strict Type Safety" },
        { name: "JavaScript", badge: "ES6+ Async" },
        { name: "Tailwind CSS", badge: "Utility-first", featured: true },
        { name: "HTML5 / CSS3", badge: "Semantic & Flex/Grid" },
        { name: "Chart.js", badge: "Data Visuals" },
        { name: "PWA", badge: "Offline Support" }
      ]
    },
    {
      id: 'data-cloud',
      title: 'Databases, Cloud & Observability',
      code: 'SYS.04',
      icon: <Database size={18} className="text-purple-500" />,
      description: 'Persistent storage, cloud certification, container workflows, and metrics observability.',
      skills: [
        { name: "PostgreSQL", badge: "Relational RDBMS", featured: true },
        { name: "MySQL", badge: "Enterprise DB" },
        { name: "MongoDB", badge: "NoSQL Documents" },
        { name: "Azure (AZ-900)", badge: "Microsoft Certified", featured: true },
        { name: "Docker", badge: "Containers" },
        { name: "Git & GitHub", badge: "90% IIT Bombay SINE" },
        { name: "Prometheus", badge: "System Metrics" },
        { name: "Grafana", badge: "Observability Dashboards" },
        { name: "Power BI / Tableau", badge: "Analytics" }
      ]
    }
  ];

  const filteredDomains = activeTab === 'all'
    ? domains
    : domains.filter(d => d.id === activeTab);

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-white/20 bg-slate-50 dark:bg-[#0D0E14]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="// 03"
          badge="Core Stack Matrix"
          title="Skills & Technologies"
          subtitle="A structured, high-density matrix of production tooling spanning distributed backends, modern frontend, and deep learning."
        />

        {/* Quick Filter Switcher */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              activeTab === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_#2563eb]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            All Disciplines
          </button>
          {domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveTab(d.id)}
              className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press flex items-center gap-1.5 ${
                activeTab === d.id
                  ? 'bg-blue-600 text-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]'
                  : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
              }`}
            >
              <span>{d.title.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Compact, Highly-Efficient 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDomains.map((domain) => (
              <motion.div
                layout
                key={domain.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#38bdf8] flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black dark:border-white/20">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-slate-100 dark:bg-black border border-black dark:border-white">
                        {domain.icon}
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest block">
                          {domain.code} // DOMAIN
                        </span>
                        <h3 className="font-display font-black text-base sm:text-lg uppercase tracking-tight text-black dark:text-white">
                          {domain.title}
                        </h3>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black">
                      {domain.skills.length} Techs
                    </span>
                  </div>

                  <p className="font-sans text-xs text-slate-600 dark:text-slate-400 mb-4 leading-normal">
                    {domain.description}
                  </p>

                  {/* Dense, Clean Technical Pills */}
                  <div className="flex flex-wrap gap-2">
                    {domain.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-black dark:border-white/40 transition-all font-mono text-xs ${
                          skill.featured
                            ? 'bg-amber-100 dark:bg-amber-950/40 text-black dark:text-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#facc15]'
                            : 'bg-slate-50 dark:bg-[#1A1D2A] text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span className="font-bold">{skill.name}</span>
                        {skill.badge && (
                          <span className={`text-[10px] font-semibold px-1 py-0.2 border border-black/30 dark:border-white/20 ${
                            skill.featured ? 'bg-amber-300 text-black' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}>
                            {skill.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle verified strip */}
                <div className="mt-5 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Check size={13} className="text-emerald-500" />
                    <span>Verified Project Applications</span>
                  </span>
                  <span className="uppercase text-[10px] tracking-wider">Production Grade</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cloud Certification Ribbon */}
        <div className="mt-6 p-4 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#38bdf8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <span className="p-1.5 bg-blue-600 text-white font-bold">AZ-900</span>
            <span className="font-bold text-black dark:text-white">
              Microsoft Certified: Azure Fundamentals
            </span>
            <span className="hidden sm:inline text-slate-500">• Cloud Concepts, Architecture & Governance</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-400 text-black font-mono text-xs font-bold border border-black">
            <ShieldCheck size={14} /> CERTIFIED
          </div>
        </div>

      </div>
    </section>
  );
};
