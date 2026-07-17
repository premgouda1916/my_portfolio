import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import type { Certification } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Award, ExternalLink, X, Calendar, BadgeCheck } from 'lucide-react';

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);


  return (
    <section id="certificates" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accentBlue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Credentials"
          title="Certifications"
          subtitle="Verified training completions, professional qualifications, and specialization courses."
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setSelectedCert(cert)}
              className="bg-glass dark:bg-glass p-6 rounded-3xl border border-white/5 flex flex-col justify-between group hover:border-accentBlue/30 hover:scale-102 transition-all duration-300 shadow-lg cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-slate-800/60 dark:bg-slate-950/60 border border-white/5 text-accentBlue group-hover:scale-110 transition-transform duration-300">
                    <Award size={20} />
                  </div>
                  {cert.score && (
                    <span className="px-2.5 py-1 rounded-xl bg-accentCyan/10 border border-accentCyan/20 text-accentCyan text-xs font-mono font-bold">
                      Score: {cert.score}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-accentBlue transition-colors duration-300 mb-2">
                  {cert.name}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-4">
                  Issued by: {cert.issuer}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-accentBlue group-hover:text-accentCyan font-bold transition-colors duration-300 mt-auto pt-2 border-t border-white/5">
                View Certificate <ExternalLink size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Preview Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
              />

              {/* Certificate Lightbox Box */}
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden"
              >
                {/* Visual badge highlight */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-accentBlue/20 rounded-full blur-3xl" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute right-6 top-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Simulated Certificate Render */}
                <div className="border-4 border-slate-950 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-center relative">
                  {/* Watermark Logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                    <Award size={200} />
                  </div>

                  <span className="font-mono text-[9px] tracking-[0.2em] text-accentCyan font-bold uppercase block mb-4">
                    Official Verification Certificate
                  </span>

                  <h4 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                    {selectedCert.name}
                  </h4>
                  
                  <div className="h-0.5 w-24 bg-gradient-to-r from-accentBlue to-accentCyan mx-auto mb-6" />

                  <p className="text-slate-300 text-sm italic mb-6">
                    This document certifies that
                  </p>

                  <h5 className="text-2xl font-bold text-white mb-6 font-sans">
                    Prem Gouda
                  </h5>

                  <p className="text-slate-200 text-sm leading-relaxed max-w-md mx-auto mb-8">
                    has successfully completed the coursework requirements, examinations, and projects mandated by the issuing institution.
                  </p>

                  <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-6 text-left">
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Issuer</span>
                      <span className="font-bold text-slate-200 text-sm">{selectedCert.issuer}</span>
                    </div>
                    {selectedCert.score ? (
                      <div>
                        <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Verification / Score</span>
                        <span className="font-bold text-accentCyan text-sm">{selectedCert.score} (Excellent)</span>
                      </div>
                    ) : (
                      <div>
                        <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Status</span>
                        <span className="font-bold text-emerald-400 text-sm flex items-center gap-1">
                          <BadgeCheck size={16} /> Verified Active
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> Completed Academic Term</span>
                  <span>ID: VER-{selectedCert.name.slice(0,4).toUpperCase()}-{Math.floor(Math.random()*9000+1000)}</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
