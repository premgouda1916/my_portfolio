import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import type { Certification } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Award, ExternalLink, X, Calendar } from 'lucide-react';

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
                className="relative bg-slate-900 border border-white/10 w-full max-w-4xl h-[85vh] rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Visual background highlight */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-accentBlue/20 rounded-full blur-3xl pointer-events-none" />
                
                {/* Header info */}
                <div className="flex justify-between items-start mb-4 pr-12 z-10">
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                      <Award className="text-accentBlue flex-shrink-0" size={22} />
                      {selectedCert.name}
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm mt-1">
                      Issued by: <span className="text-slate-200 font-semibold">{selectedCert.issuer}</span>
                      {selectedCert.score && ` • Score: ${selectedCert.score}`}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute right-6 top-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer z-20"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* PDF Frame */}
                <div className="flex-1 w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/5 relative z-10">
                  {selectedCert.fileUrl ? (
                    <iframe
                      src={`${selectedCert.fileUrl}#view=FitH`}
                      title={selectedCert.name}
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                      <Award size={48} className="text-slate-600 mb-3" />
                      <p className="text-slate-400 mb-2">No file available for this certificate.</p>
                    </div>
                  )}
                </div>

                {/* Footer and fallback link */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 z-10">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] md:text-xs">
                    <Calendar size={14} /> ID: VER-{selectedCert.name.slice(0, 4).toUpperCase().replace(/\s+/g, '')}-{selectedCert.issuer.slice(0, 3).toUpperCase()}
                  </span>
                  {selectedCert.fileUrl && (
                    <a
                      href={selectedCert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accentBlue/10 hover:bg-accentBlue/20 text-accentBlue hover:text-accentCyan font-semibold transition-all duration-300 border border-accentBlue/20"
                    >
                      Open PDF in New Window <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
