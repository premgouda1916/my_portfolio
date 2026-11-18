import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { MapPin, Mail, Phone, Calendar, Globe, Terminal, Award, FileText, Check, Copy, Briefcase } from 'lucide-react';
import { ResumeModal } from '../components/ResumeModal';

export const About: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const contactMeta = [
    { icon: <MapPin size={16} />, label: "LOCATION", value: resumeData.location },
    { icon: <Mail size={16} />, label: "EMAIL", value: resumeData.email },
    { icon: <Phone size={16} />, label: "CONTACT", value: resumeData.phone },
    { icon: <Calendar size={16} />, label: "GRADUATION", value: "May 2027" }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-white/20 bg-slate-50 dark:bg-[#0D0E14]">
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="// 01"
          badge="Profile Overview"
          title="Background & Architecture"
          subtitle="A disciplined engineer combining enterprise Java principles with modern NLP and deep learning systems."
        />

        {/* Executive Recruiter TL;DR Snapshot Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 p-6 sm:p-7 bg-white dark:bg-[#141620] border-brutal-bold shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#38bdf8]"
        >
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-5 border-b-2 border-black dark:border-white/20">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-300 text-black border border-black">
                <Briefcase size={16} />
              </span>
              <span className="font-display font-black text-sm sm:text-base uppercase tracking-tight text-black dark:text-white">
                EXECUTIVE CANDIDATE BRIEF // RECRUITER TL;DR
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-emerald-400 text-black border border-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                AVAILABLE FOR 2026/2027 ROLES
              </span>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-mono text-xs">
            {/* Pillar 1 */}
            <div className="p-4 bg-slate-50 dark:bg-[#1A1D2A] border border-black dark:border-white/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  01 // TARGET ROLES
                </span>
                <strong className="text-black dark:text-white text-sm font-black block mb-1">
                  SDE & AI Developer
                </strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-normal font-sans">
                  Full-Stack Engineer, Distributed Backend, ML/NLP Engineer.
                </p>
              </div>
              <span className="mt-3 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                Open to Relocation ✓
              </span>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 bg-slate-50 dark:bg-[#1A1D2A] border border-black dark:border-white/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  02 // ACADEMIC DISTINCTION
                </span>
                <strong className="text-black dark:text-white text-sm font-black block mb-1">
                  Rank 1 (CGPA: 9.28/10)
                </strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-normal font-sans">
                  1st Rank in 1st Year (9.5) & 2nd Year (9.44) at Yenepoya Institute of Tech (VTU).
                </p>
              </div>
              <span className="mt-3 text-[10px] font-bold text-amber-500">
                Top 1% Engineering Cohort ✓
              </span>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 bg-slate-50 dark:bg-[#1A1D2A] border border-black dark:border-white/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  03 // HIGH-CONCURRENCY STACK
                </span>
                <strong className="text-black dark:text-white text-sm font-black block mb-1">
                  200+ RPS Distributed
                </strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-normal font-sans">
                  Redis Lua atomic locks, RabbitMQ, Java 21 Spring Boot, and PyTorch CUDA pipelines.
                </p>
              </div>
              <span className="mt-3 text-[10px] font-bold text-emerald-500">
                Zero Double-Booking ✓
              </span>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 bg-slate-50 dark:bg-[#1A1D2A] border border-black dark:border-white/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  04 // VERIFIED CREDENTIALS
                </span>
                <strong className="text-black dark:text-white text-sm font-black block mb-1">
                  IIT Ropar & Bombay
                </strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-normal font-sans">
                  Deep Learning (Elite 72%), Java (100% Score), Microsoft Azure (AZ-900).
                </p>
              </div>
              <span className="mt-3 text-[10px] font-bold text-purple-500">
                8 Verified Accreditations ✓
              </span>
            </div>
          </div>

          {/* Recruiter Quick Action Strip */}
          <div className="pt-4 border-t-2 border-black dark:border-white/20 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {/* 1-Click Copy Email Tool */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3.5 py-2 bg-amber-300 hover:bg-amber-400 text-black font-bold uppercase border-2 border-black shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] flex items-center gap-1.5 brutal-press cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className="text-emerald-700" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Email ({resumeData.email})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="px-3.5 py-2 bg-black hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black font-bold uppercase border-2 border-black dark:border-white flex items-center gap-1.5 brutal-press cursor-pointer"
              >
                <FileText size={14} />
                <span>View Full Resume (PDF)</span>
              </button>
            </div>

            <span className="text-slate-500 text-[11px]">
              LOCATION: HALIYAL / MANGALORE, KA • OPEN TO RELOCATE
            </span>
          </div>
        </motion.div>

        {/* Two-Column Deep-Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Dossier Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Primary Bio Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#38bdf8]"
            >
              <div className="flex justify-between items-center pb-3 mb-4 border-b-2 border-black dark:border-white/20 font-mono text-xs uppercase font-bold">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <Terminal size={14} /> // SUMMARY DOSSIER
                </span>
                <span className="bg-amber-300 text-black px-2 py-0.5 border border-black">
                  STATUS: 8TH SEM ISE
                </span>
              </div>

              <p className="text-slate-800 dark:text-slate-200 text-base leading-relaxed font-sans mb-6">
                {resumeData.summary}
              </p>

              {/* Contact Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono">
                {contactMeta.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-slate-100 dark:bg-[#1A1D2A] border border-black dark:border-white/20 flex items-center gap-3"
                  >
                    <div className="p-2 bg-black text-white dark:bg-white dark:text-black">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] text-slate-500 uppercase tracking-widest">{item.label}</span>
                      <span className="block text-xs font-bold text-black dark:text-white truncate">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsResumeOpen(true)}
                className="w-full py-3 bg-black hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black dark:border-white shadow-[3px_3px_0px_#2563eb] brutal-press flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText size={16} /> Open Official PDF Resume
              </button>
            </motion.div>

            {/* Academic Track Record Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 bg-amber-300 text-black border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-black text-amber-300 border-2 border-black flex-shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg uppercase tracking-tight mb-1">
                    Consistent University Rank Holder
                  </h4>
                  <p className="font-sans text-sm text-slate-900 leading-normal mb-2">
                    Secured <strong>1st Rank</strong> in First Year Engineering (CGPA 9.5) and <strong>1st Rank</strong> in Second Year Engineering (CGPA 9.44) at Yenepoya Institute of Technology, Mangalore.
                  </p>
                  <span className="font-mono text-xs font-bold uppercase underline">
                    Cumulative CGPA: 9.28 / 10.0
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Languages & Core Focus */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Languages Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#38bdf8]"
            >
              <div className="flex justify-between items-center pb-3 mb-5 border-b-2 border-black dark:border-white/20 font-mono text-xs uppercase font-bold">
                <span className="flex items-center gap-1.5 text-black dark:text-white">
                  <Globe size={15} /> // LINGUISTIC COMPETENCY
                </span>
                <span className="text-slate-500">4 LANGUAGES</span>
              </div>

              <div className="flex flex-col gap-4">
                {resumeData.languages.map((lang, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-[#1A1D2A] border border-black dark:border-white/20">
                    <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                      <span className="font-bold text-black dark:text-white uppercase">{lang.name}</span>
                      <span className="px-1.5 py-0.5 bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase font-bold">
                        {lang.level}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-600 dark:text-slate-400 font-mono mb-2">
                      <span>Capabilities:</span>
                      <span className="font-bold text-black dark:text-white">{lang.skills}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-black border border-black dark:border-white/40">
                      <div 
                        className="h-full bg-blue-600 dark:bg-blue-400"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Core Competencies Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 bg-white dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#38bdf8]"
            >
              <h4 className="font-mono text-xs uppercase font-bold pb-2 mb-3 border-b-2 border-black dark:border-white/20 text-black dark:text-white">
                // CORE COMPUTER SCIENCE FOUNDATIONS
              </h4>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {resumeData.skills.coreConcepts.map((concept, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-black dark:text-white border border-black dark:border-white/20 uppercase"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
