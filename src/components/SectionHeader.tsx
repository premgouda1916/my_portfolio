import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, badge }) => {
  return (
    <div className="text-center mb-16 relative z-10">
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accentBlue bg-accentBlue/10 border border-accentBlue/20 mb-4"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-slate-900 via-accentBlue to-accentCyan dark:from-white dark:via-blue-400 dark:to-accentCyan bg-clip-text text-transparent"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="h-1 w-20 bg-gradient-to-r from-accentBlue to-accentCyan mx-auto mb-4 rounded-full origin-center"
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};
