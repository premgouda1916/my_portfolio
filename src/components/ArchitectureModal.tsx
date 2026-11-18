import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, ExternalLink, Github, CheckCircle2, Cpu, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { type Project } from '../constants/resumeData';

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project || !project.architecture) return null;

  const { architecture } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white dark:bg-[#111218] text-black dark:text-white border-brutal-bold shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#38bdf8] w-full max-w-4xl max-h-[90vh] flex flex-col z-10 overflow-hidden"
        >
          {/* Header Bar */}
          <div className="bg-slate-100 dark:bg-[#181A24] px-5 py-3.5 border-b-2 border-black dark:border-white/20 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 bg-blue-600 text-white border border-black">
                {project.category === 'ml' ? <Cpu size={18} /> : <Server size={18} />}
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest block">
                  SYSTEM DESIGN & ARCHITECTURE DEEP-DIVE
                </span>
                <h3 className="font-display font-black text-base sm:text-lg uppercase tracking-tight text-black dark:text-white truncate">
                  {project.title} — {project.subtitle}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white flex items-center gap-1.5 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Github size={13} /> Repo
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 bg-red-500 hover:bg-red-600 text-white border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
                aria-label="Close architecture modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            
            {/* Overview Strip */}
            <div className="p-4 bg-amber-100 dark:bg-amber-950/40 border-2 border-black dark:border-white/30 text-black dark:text-white">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 block mb-1">
                // SYSTEM OVERVIEW
              </span>
              <p className="font-sans text-sm sm:text-base leading-relaxed font-semibold">
                {architecture.overview}
              </p>
            </div>

            {/* Step-by-Step Data Pipeline / Architectural Flow */}
            <div className="p-5 bg-slate-50 dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#38bdf8]">
              <div className="flex justify-between items-center pb-2.5 mb-4 border-b-2 border-black dark:border-white/20 font-mono text-xs font-bold uppercase">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <Zap size={15} /> // END-TO-END DATA FLOW PIPELINE
                </span>
                <span className="text-slate-500">{architecture.flow.length} STAGES</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {architecture.flow.map((step, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-white dark:bg-[#1A1D2A] border border-black dark:border-white/20 flex items-start gap-3"
                  >
                    <span className="px-1.5 py-0.5 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] flex-shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 leading-normal">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Engineering Decisions */}
            <div className="p-5 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#38bdf8]">
              <div className="flex items-center gap-2 pb-2.5 mb-4 border-b-2 border-black dark:border-white/20 font-mono text-xs font-bold uppercase text-black dark:text-white">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>// ARCHITECTURAL TRADE-OFFS & JUSTIFICATIONS</span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {architecture.designDecisions.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 dark:bg-[#1A1D2A] border border-black dark:border-white/20">
                    <div className="font-mono text-xs font-black text-blue-600 dark:text-blue-400 uppercase mb-1 flex items-center gap-1.5">
                      <ArrowRight size={13} />
                      <span>{item.decision}</span>
                    </div>
                    <p className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scale & Latency Benchmark Box */}
            <div className="p-4 bg-black text-white dark:bg-[#181A26] border-2 border-black dark:border-white/30 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block tracking-wider">
                  VERIFIED BENCHMARKS // SCALE & LATENCY
                </span>
                <span className="font-bold text-amber-300 text-sm">
                  {architecture.latencyOrScale}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <CheckCircle2 size={14} />
                <span>VERIFIED TEST BENCH</span>
              </div>
            </div>

          </div>

          {/* Footer Action Strip */}
          <div className="bg-slate-100 dark:bg-[#181A24] px-5 py-3 border-t-2 border-black dark:border-white/20 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <span className="text-slate-500 text-[11px]">
              ARCHITECTURE SPEC: {project.title.toUpperCase()}_ARCH_V1
            </span>

            <div className="flex items-center gap-2">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-400 text-black font-bold uppercase border border-black flex items-center gap-1.5 hover:bg-emerald-300"
                >
                  Live Deployment <ExternalLink size={12} />
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-black dark:text-white font-bold uppercase border border-black dark:border-white"
              >
                Close Spec
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
