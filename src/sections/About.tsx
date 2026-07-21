import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Calendar, MapPin, Mail, Phone, BookOpen, Globe, Eye } from 'lucide-react';
import { ResumeModal } from '../components/ResumeModal';

export const About: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const details = [
    { icon: <MapPin className="text-accentBlue" size={20} />, label: "Location", value: resumeData.location },
    { icon: <Mail className="text-accentCyan" size={20} />, label: "Email", value: resumeData.email },
    { icon: <Phone className="text-accentBlue" size={20} />, label: "Phone", value: resumeData.phone },
    { icon: <Calendar className="text-accentCyan" size={20} />, label: "Expected Graduation", value: "January 2027" }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden bg-slate-100/40 dark:bg-slate-900/20">
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="About Me"
          title="My Background & Purpose"
          subtitle="A passionate full stack engineer committed to building high-performance, user-centric web applications and AI solutions."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Block - Bio & Details */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-glass dark:bg-glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-accentBlue/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accentBlue/10 to-transparent rounded-bl-full pointer-events-none" />
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Career Objective</h3>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed mb-6">
                Full stack engineer with expertise in Java, JavaScript, HTML, CSS, and modern frameworks such as React and Node.js. Proven ability to develop scalable and efficient web applications that enhance user experience. Committed to continuous improvement in backend development, system design, and cloud technologies.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {details.map((detail, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300">
                      {detail.icon}
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">{detail.label}</span>
                      <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{detail.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsResumeOpen(true)}
                className="w-full py-3 rounded-2xl bg-accentBlue/10 hover:bg-accentBlue/20 text-accentBlue font-semibold text-xs md:text-sm border border-accentBlue/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye size={16} /> View Full Resume (PDF)
              </button>
            </div>

            <div className="bg-glass dark:bg-glass p-8 rounded-3xl border border-white/5 hover:border-accentCyan/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="text-accentCyan" size={24} /> Learning Philosophy
              </h3>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                As a student of Information Science and Engineering at VTU, I approach technology with a researcher's curiosity and a builder's pragmatism. I focus on mastering foundational concepts in algorithms and system design while rapidly adopting cutting-edge tools in cloud services and deep learning. My score of 100% in Java training and 92% accuracy in ML classifiers reflect my commitment to detail.
              </p>
            </div>
          </motion.div>

          {/* Right Block - Languages & Stats */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-glass dark:bg-glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-accentBlue/20 transition-all duration-300 flex-1">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="text-accentBlue" size={24} /> Languages Known
              </h3>
              
              <div className="flex flex-col gap-6">
                {resumeData.languages.map((lang, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{lang.name}</span>
                        <span className="px-2 py-0.5 rounded bg-accentBlue/10 border border-accentBlue/20 text-accentBlue font-mono text-xs">
                          {lang.proficiency}
                        </span>
                      </div>
                      <span className="text-xs font-semibold font-mono text-slate-500 dark:text-slate-400">{lang.level}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-accentBlue to-accentCyan rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Fact Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-accentBlue/10 to-accentCyan/10 border border-white/5 flex items-center gap-4 hover:scale-102 transition-transform duration-300">
              <div className="text-4xl">💡</div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Hackathon Competitor</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                  Actively participated in GCEM 3.0 Bangalore and TechFusion 2.0 Dayananda Sagar Academy.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
