import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { GraduationCap, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-white/20 bg-white dark:bg-[#0C0D12]">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          index="// 02"
          badge="Academic Credentials"
          title="Education History"
          subtitle="A proven academic track record across engineering and pre-university sciences."
        />

        {/* Brutalist Timeline Container */}
        <div className="relative pl-6 sm:pl-10 ml-2 sm:ml-6 border-l-4 border-black dark:border-white/40 flex flex-col gap-10">
          {resumeData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Indicator Block */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-4 w-5 h-5 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white flex items-center justify-center font-mono text-[10px] font-bold">
                {idx + 1}
              </div>

              {/* Education Card */}
              <div className="p-6 sm:p-8 bg-slate-50 dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#38bdf8]">
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b-2 border-black dark:border-white/20">
                  <span className="font-mono text-xs font-black uppercase px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black">
                    {edu.period}
                  </span>

                  {(edu.gpa || edu.score) && (
                    <span className="font-mono text-xs font-bold px-3 py-1 bg-amber-300 text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                      {edu.gpa || `Score: ${edu.score}`}
                    </span>
                  )}
                </div>

                {/* Degree & Institution */}
                <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-black dark:text-white mb-1.5">
                  {edu.degree}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-slate-700 dark:text-slate-300 mb-4">
                  <span className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                    <GraduationCap size={16} /> {edu.institution}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin size={14} /> {edu.location}
                  </span>
                </div>

                {/* Key Bullet Highlights */}
                {edu.details && edu.details.length > 0 && (
                  <div className="pt-3 border-t border-black/10 dark:border-white/10">
                    <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-300">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">▪</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
