import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { resumeData } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Trophy, Award, Zap, Code } from 'lucide-react';

const CountUpComponent = (CountUp as any).default || CountUp;

export const Awards: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    { label: "B.E. Max CGPA", value: 9.5, suffix: "", decimals: 1, icon: <Trophy size={20} className="text-yellow-400" /> },
    { label: "Java Training Score", value: 100, suffix: "%", decimals: 0, icon: <Award size={20} className="text-accentBlue" /> },
    { label: "GIT Training Score", value: 90, suffix: "%", decimals: 0, icon: <Zap size={20} className="text-accentCyan" /> },
    { label: "Python Training Score", value: 85, suffix: "%", decimals: 0, icon: <Code size={20} className="text-indigo-400" /> }
  ];

  return (
    <section id="awards" className="py-24 px-6 md:px-12 relative overflow-hidden bg-slate-900/10 dark:bg-darkBg/5">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accentBlue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Milestones"
          title="Achievements & Honors"
          subtitle="Key academic recognitions, Hackathon involvements, and professional training milestones."
        />

        {/* Stats Section with CountUp */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-glass dark:bg-glass p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group hover:border-accentBlue/20 transition-all duration-300"
            >
              <div className="p-4 rounded-2xl bg-slate-800/40 dark:bg-slate-950/40 border border-white/5 mb-4 group-hover:scale-105 transition-transform duration-300">
                {stat.icon}
              </div>
              <span className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-mono flex items-baseline">
                {inView ? (
                  <CountUpComponent
                    start={0}
                    end={stat.value}
                    decimals={stat.decimals}
                    duration={2.5}
                  />
                ) : (
                  <span>0</span>
                )}
                <span className="text-accentCyan text-2xl ml-0.5">{stat.suffix}</span>
              </span>
              <span className="text-xs font-semibold tracking-wider font-mono text-slate-500 uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Awards list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.awards.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="p-6 md:p-8 rounded-3xl bg-glass border border-white/5 flex gap-5 items-start hover:border-accentCyan/20 transition-all duration-300"
            >
              <div className="p-3.5 rounded-2xl bg-accentBlue/10 border border-accentBlue/20 text-accentBlue flex-shrink-0">
                <Trophy size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{award.title}</h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{award.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
