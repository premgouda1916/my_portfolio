import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  index?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  badge, 
  index,
  align = 'center' 
}) => {
  const isLeft = align === 'left';

  return (
    <div className={`mb-14 relative z-10 ${isLeft ? 'text-left' : 'text-center'}`}>
      {/* Brutalist Label / Index Badge */}
      <div className={`flex items-center gap-2 mb-3.5 ${isLeft ? 'justify-start' : 'justify-center'}`}>
        {index && (
          <span className="font-mono text-xs font-bold px-2 py-1 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white shadow-[2px_2px_0px_#2563eb]">
            {index}
          </span>
        )}
        {badge && (
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 bg-amber-300 text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
            {badge}
          </span>
        )}
      </div>

      {/* Main Title: Bold, Assertive Brutalist Display */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight uppercase text-black dark:text-white"
      >
        {title}
      </motion.h2>

      {/* Structural Accent Bar */}
      <div className={`mt-3 mb-4 flex items-center gap-1.5 ${isLeft ? 'justify-start' : 'justify-center'}`}>
        <div className="h-1.5 w-12 bg-blue-600 dark:bg-blue-500 border border-black dark:border-white" />
        <div className="h-1.5 w-3 bg-amber-400 border border-black dark:border-white" />
        <div className="h-1.5 w-3 bg-emerald-400 border border-black dark:border-white" />
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 font-sans max-w-2xl leading-relaxed ${
          isLeft ? '' : 'mx-auto'
        }`}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};
