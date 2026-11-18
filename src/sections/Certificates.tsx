import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData, type Certification } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Award, ExternalLink, X, CheckCircle2, Shield, Cpu, Code } from 'lucide-react';

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai-ml' | 'programming' | 'cloud' | 'tools'>('all');

  const getCertIcon = (cat?: string) => {
    switch (cat) {
      case 'ai-ml':
        return <Cpu size={18} className="text-blue-600 dark:text-blue-400" />;
      case 'cloud':
        return <Shield size={18} className="text-amber-500" />;
      case 'programming':
        return <Code size={18} className="text-emerald-500" />;
      default:
        return <Award size={18} className="text-indigo-500" />;
    }
  };

  const filteredCerts = activeFilter === 'all'
    ? resumeData.certifications
    : resumeData.certifications.filter(c => c.category === activeFilter);

  return (
    <section id="certificates" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-white/20 bg-white dark:bg-[#0C0D12]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="// 05"
          badge="Verified Qualifications"
          title="Certifications & Diplomas"
          subtitle="Accredited credentials across Deep Learning, Cloud Architecture, Java Enterprise, and Machine Learning."
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center font-mono text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              activeFilter === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_#2563eb]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            All Credentials ({resumeData.certifications.length})
          </button>
          <button
            onClick={() => setActiveFilter('ai-ml')}
            className={`px-3.5 py-1.5 font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              activeFilter === 'ai-ml'
                ? 'bg-blue-600 text-white shadow-[2px_2px_0px_#000]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            AI & Machine Learning (3)
          </button>
          <button
            onClick={() => setActiveFilter('programming')}
            className={`px-3.5 py-1.5 font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              activeFilter === 'programming'
                ? 'bg-emerald-600 text-white shadow-[2px_2px_0px_#000]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            Languages & Java (2)
          </button>
          <button
            onClick={() => setActiveFilter('cloud')}
            className={`px-3.5 py-1.5 font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              activeFilter === 'cloud'
                ? 'bg-amber-400 text-black shadow-[2px_2px_0px_#000]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            Cloud Infrastructure (1)
          </button>
          <button
            onClick={() => setActiveFilter('tools')}
            className={`px-3.5 py-1.5 font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              activeFilter === 'tools'
                ? 'bg-purple-600 text-white shadow-[2px_2px_0px_#000]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            Tools & Systems (2)
          </button>
        </div>

        {/* Uniform, Clean, Professional Grid of All Certificates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                layout
                key={cert.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedCert(cert)}
                className="p-5 bg-slate-50 dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#38bdf8] flex flex-col justify-between cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#2563eb] transition-all group"
              >
                <div>
                  {/* Top Bar: Icon + Score Pill */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-white dark:bg-black border border-black dark:border-white/30">
                      {getCertIcon(cert.category)}
                    </div>

                    {cert.score && (
                      <span className={`font-mono text-[11px] font-bold px-2 py-0.5 border border-black ${
                        cert.isElite
                          ? 'bg-amber-300 text-black shadow-[1px_1px_0px_#000]'
                          : cert.score === '100%'
                          ? 'bg-emerald-300 text-black'
                          : 'bg-white dark:bg-black text-black dark:text-white'
                      }`}>
                        {cert.score}
                      </span>
                    )}
                  </div>

                  {/* Title & Issuer */}
                  <h4 className="font-display font-black text-base uppercase tracking-tight text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5 leading-snug">
                    {cert.name}
                  </h4>

                  <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400 mb-3">
                    {cert.issuer}
                  </p>

                  {cert.period && (
                    <p className="font-mono text-[10px] text-slate-500 mb-2">
                      {cert.period}
                    </p>
                  )}
                </div>

                {/* Card Action Strip */}
                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:underline">
                    View PDF <ExternalLink size={12} />
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Certificate Inspection Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
              />

              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white dark:bg-[#111218] text-black dark:text-white border-brutal-bold shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#38bdf8] w-full max-w-4xl h-[88vh] flex flex-col z-10 overflow-hidden"
              >
                {/* Header Bar */}
                <div className="bg-slate-100 dark:bg-[#181A24] px-4 py-3 border-b-2 border-black dark:border-white/20 flex justify-between items-center gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display font-black text-sm sm:text-base uppercase tracking-tight truncate flex items-center gap-2">
                      <span>{selectedCert.name}</span>
                      {selectedCert.score && (
                        <span className="font-mono text-[10px] bg-amber-300 text-black px-1.5 py-0.5 border border-black font-bold">
                          {selectedCert.score}
                        </span>
                      )}
                    </h3>
                    <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      Issued by: <strong>{selectedCert.issuer}</strong> {selectedCert.rollNo && `• ${selectedCert.rollNo}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {selectedCert.fileUrl && (
                      <a
                        href={selectedCert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-amber-300 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink size={13} />
                        <span className="hidden sm:inline">New Tab</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedCert(null)}
                      className="p-1.5 bg-red-500 hover:bg-red-600 text-white border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* PDF Viewer Frame */}
                <div className="flex-1 w-full bg-slate-200 dark:bg-black/90 relative overflow-hidden">
                  {selectedCert.fileUrl ? (
                    <iframe
                      src={`${selectedCert.fileUrl}#view=FitH`}
                      title={selectedCert.name}
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full font-mono text-sm text-slate-500">
                      PDF preview unavailable for this credential.
                    </div>
                  )}
                </div>

                {/* Footer Bar */}
                <div className="bg-slate-100 dark:bg-[#181A24] px-4 py-2 border-t-2 border-black dark:border-white/20 flex justify-between items-center font-mono text-[11px] text-slate-700 dark:text-slate-400">
                  <span>OFFICIAL CREDENTIAL VERIFICATION</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">AUTHENTIC CERTIFICATE</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
