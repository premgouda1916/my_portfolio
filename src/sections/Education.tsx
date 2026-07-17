import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { GraduationCap, Award, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 100, damping: 12 } as const
    }
  };


  return (
    <section id="education" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Light highlights */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accentBlue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Journey"
          title="Education Timeline"
          subtitle="My academic foundation in Information Science & Engineering and basic sciences."
        />

        <div className="relative border-l border-slate-700/60 dark:border-slate-800/80 ml-4 md:ml-32 pl-8 md:pl-12 flex flex-col gap-12">
          {resumeData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-4 border-accentBlue flex items-center justify-center shadow-glow-blue z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-accentCyan" />
              </div>

              {/* Year Badge on the left (visible on desktop) */}
              <div className="hidden md:block absolute -left-[180px] top-1.5 w-[120px] text-right font-mono font-bold text-accentCyan text-sm">
                {edu.period.split(' ').slice(-1)[0]}
              </div>

              {/* Education Card */}
              <motion.div
                variants={cardVariants}
                className="bg-glass dark:bg-glass p-6 md:p-8 rounded-3xl border border-white/5 relative group hover:border-accentBlue/30 transition-all duration-300 shadow-xl"
              >
                {/* Visual hover top gradient line */}
                <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-accentBlue/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="md:hidden inline-block font-mono text-accentCyan text-xs font-bold mb-2">
                      {edu.period}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-accentBlue transition-colors duration-300">
                      {edu.degree}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 font-semibold mt-1 flex items-center gap-1.5">
                      <GraduationCap size={18} className="text-accentCyan" /> {edu.institution}
                    </p>
                  </div>
                  
                  {(edu.gpa || edu.score) && (
                    <div className="flex items-center gap-2 self-start md:self-center px-4 py-2 rounded-2xl bg-accentBlue/10 border border-accentBlue/20 text-accentBlue font-mono text-sm font-bold shadow-sm animate-fade-in">
                      <Award size={16} /> {edu.gpa ? `GPA: ${edu.gpa}` : `Score: ${edu.score}`}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <MapPin size={14} /> {edu.location}
                </div>

                {/* Additional Details based on level */}
                <div className="mt-4 pt-4 border-t border-white/5 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {idx === 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Focusing on Data Structures, Database Systems, Web Development, and Machine Learning.</li>
                      <li>Achieved Rank 1 in both 1st and 2nd years with 9.5 and 9.44 CGPA respectively.</li>
                    </ul>
                  ) : idx === 1 ? (
                    <p>Focused on Physics, Chemistry, Mathematics, and Biology (PCMB) course work in pre-university training.</p>
                  ) : (
                    <p>Secondary education training under CBSE curriculum with high academic standings.</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
