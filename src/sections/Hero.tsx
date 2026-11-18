import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import { ArrowRight, Download, Github, Linkedin, Mail, Eye, Copy, Check } from 'lucide-react';
import { ResumeModal } from '../components/ResumeModal';

export const Hero: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(resumeData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Prem_Gouda_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const quickMetrics = [
    { label: "B.E. CGPA", val: "9.28 / 10", tag: "Rank 1 Holder" },
    { label: "Deep Learning", val: "72% ELITE", tag: "IIT Ropar" },
    { label: "Java Training", val: "100%", tag: "IIT Bombay" },
    { label: "Production Systems", val: "5 Built", tag: "Distributed & AI" }
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-white/20"
    >
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />

      <div className="max-w-7xl mx-auto w-full">
        {/* Main Grid: Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col">
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter uppercase text-black dark:text-white leading-[0.92] mb-4"
            >
              PREM <br />
              <span className="text-blue-600 dark:text-blue-400 underline decoration-4 decoration-amber-400 underline-offset-8">
                GOUDA
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-200 dark:bg-white/10 text-black dark:text-white border border-black dark:border-white/30 uppercase">
                // JAVA FULL-STACK
              </span>
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-200 dark:bg-white/10 text-black dark:text-white border border-black dark:border-white/30 uppercase">
                // NLP & TRANSFORMERS
              </span>
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-200 dark:bg-white/10 text-black dark:text-white border border-black dark:border-white/30 uppercase">
                // DISTRIBUTED REST APIS
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-sans max-w-2xl mb-8 border-l-4 border-black dark:border-white pl-4"
            >
              Information Science & Engineering undergraduate at Yenepoya Institute of Technology (VTU). Building high-throughput full-stack platforms with <strong className="text-black dark:text-white">Java, Spring Boot, React</strong> and deep learning solutions with <strong className="text-black dark:text-white">Python, PyTorch & XLM-RoBERTa</strong>.
            </motion.p>

            {/* Brutalist Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-3.5 items-center mb-8"
            >
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="px-6 py-3.5 bg-amber-300 hover:bg-amber-400 text-black font-mono font-black text-xs uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] brutal-press flex items-center gap-2 cursor-pointer"
              >
                <Eye size={16} /> View Resume (PDF)
              </button>

              <button
                onClick={handleResumeDownload}
                className="px-5 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-black dark:text-white font-mono font-bold text-xs uppercase tracking-wider border-2 border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#38bdf8] brutal-press flex items-center gap-2 cursor-pointer"
              >
                <Download size={16} /> Download
              </button>

              <button
                onClick={handleContactClick}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] brutal-press flex items-center gap-2 cursor-pointer"
              >
                <span>Initiate Contact</span>
                <ArrowRight size={15} />
              </button>
            </motion.div>

            {/* Social Links & Quick Copy Email Bar */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="uppercase text-slate-500">// CONNECT:</span>
              <a
                href={resumeData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-white dark:bg-slate-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black dark:border-white transition-colors flex items-center gap-1.5"
              >
                <Github size={13} /> GitHub
              </a>
              <a
                href={resumeData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-white dark:bg-slate-900 hover:bg-[#0077b5] hover:text-white border border-black dark:border-white transition-colors flex items-center gap-1.5"
              >
                <Linkedin size={13} /> LinkedIn
              </a>

              {/* 1-Click Copy Email Tool */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`px-2.5 py-1 border border-black dark:border-white transition-all flex items-center gap-1.5 cursor-pointer brutal-press ${
                  copiedEmail
                    ? 'bg-emerald-400 text-black font-bold'
                    : 'bg-amber-300 hover:bg-amber-400 text-black'
                }`}
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check size={13} className="text-emerald-900" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${resumeData.email}`}
                className="px-2.5 py-1 bg-white dark:bg-slate-900 hover:bg-red-500 hover:text-white border border-black dark:border-white transition-colors flex items-center gap-1.5"
                title="Open mail application"
              >
                <Mail size={13} />
              </a>
            </div>

          </div>

          {/* Right Hero Image: Clean Brutalist Architectural Framing */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Offset Decorative Shadow Block */}
              <div className="absolute inset-0 bg-blue-600 translate-x-3 translate-y-3 border-2 border-black dark:border-white" />

              {/* Main Photo Card Frame */}
              <div className="relative bg-white dark:bg-[#151722] border-brutal-bold p-3 z-10">
                {/* Picture Container */}
                <div className="relative aspect-4/5 overflow-hidden border-2 border-black dark:border-white bg-slate-900">
                  <img
                    src="/prem.jpeg"
                    alt={resumeData.name}
                    className="w-full h-full object-cover object-[center_10%]"
                  />
                </div>

                {/* Card Caption Strip */}
                <div className="mt-2.5 pt-2 border-t-2 border-black dark:border-white/20 flex justify-between items-center font-mono text-[11px]">
                  <span className="font-bold uppercase text-black dark:text-white">
                    {resumeData.name}
                  </span>
                  <span className="text-slate-500 font-semibold">
                    Yenepoya Institute of Tech (VTU)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bottom Brutalist KPI / Metric Bar */}
        <div className="mt-14 pt-8 border-t-2 border-black dark:border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickMetrics.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#38bdf8] flex flex-col"
            >
              <div className="flex justify-between items-start mb-1 font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold">
                <span>{item.label}</span>
                <span className="px-1.5 py-0.2 bg-amber-300 text-black border border-black font-semibold">
                  {item.tag}
                </span>
              </div>
              <span className="font-display font-black text-2xl md:text-3xl text-black dark:text-white">
                {item.val}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
