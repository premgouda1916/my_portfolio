import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData, type Award } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Trophy, Flame, Users, ExternalLink, X, CheckCircle2 } from 'lucide-react';

export const Awards: React.FC = () => {
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [filter, setFilter] = useState<'all' | 'academic' | 'hackathon' | 'achievement'>('all');

  const filtered = filter === 'all' 
    ? resumeData.awards 
    : resumeData.awards.filter(a => a.category === filter);

  const getCategoryBadge = (cat?: string) => {
    switch (cat) {
      case 'academic':
        return { label: "ACADEMIC RANK 1", color: "bg-amber-300 text-black", icon: <Trophy size={14} /> };
      case 'hackathon':
        return { label: "HACKATHON", color: "bg-purple-400 text-black", icon: <Flame size={14} /> };
      default:
        return { label: "LEADERSHIP", color: "bg-blue-400 text-black", icon: <Users size={14} /> };
    }
  };

  return (
    <section id="awards" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-white/20 bg-white dark:bg-[#0C0D12]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="// 06"
          badge="Honors & Competitions"
          title="Achievements & Awards"
          subtitle="Top university rank honors, national hackathon recognitions, and internal hackathon leadership."
        />

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              filter === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-[3px_3px_0px_#2563eb]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            All Honors ({resumeData.awards.length})
          </button>
          <button
            onClick={() => setFilter('academic')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              filter === 'academic'
                ? 'bg-amber-300 text-black shadow-[3px_3px_0px_#000]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            Academic Ranks (2)
          </button>
          <button
            onClick={() => setFilter('hackathon')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              filter === 'hackathon'
                ? 'bg-purple-400 text-black shadow-[3px_3px_0px_#000]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            Hackathons (2)
          </button>
          <button
            onClick={() => setFilter('achievement')}
            className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white cursor-pointer brutal-press ${
              filter === 'achievement'
                ? 'bg-blue-600 text-white shadow-[3px_3px_0px_#000]'
                : 'bg-white dark:bg-[#141620] text-black dark:text-white hover:bg-amber-300'
            }`}
          >
            Leadership (1)
          </button>
        </div>

        {/* Awards Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((award) => {
              const badge = getCategoryBadge(award.category);
              return (
                <motion.div
                  layout
                  key={award.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => award.fileUrl && setSelectedAward(award)}
                  className={`p-6 sm:p-7 bg-slate-50 dark:bg-[#141620] border-2 border-black dark:border-white/30 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#38bdf8] flex flex-col justify-between transition-all ${
                    award.fileUrl ? 'cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#2563eb]' : ''
                  }`}
                >
                  <div>
                    {/* Header Strip */}
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-2.5 py-1 font-mono text-[10px] font-black uppercase border border-black flex items-center gap-1.5 ${badge.color}`}>
                        {badge.icon} {badge.label}
                      </span>
                      {award.score && (
                        <span className="font-mono text-xs font-bold text-black dark:text-white">
                          {award.score}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-black text-xl uppercase tracking-tight text-black dark:text-white mb-2 leading-tight">
                      {award.title}
                    </h3>

                    {award.issuer && (
                      <p className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold mb-3">
                        {award.issuer}
                      </p>
                    )}

                    <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {award.description}
                    </p>
                  </div>

                  {/* Footer Strip */}
                  <div className="pt-3 border-t-2 border-black/10 dark:border-white/10 flex justify-between items-center font-mono text-xs">
                    {award.fileUrl ? (
                      <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                        View Certificate <ExternalLink size={12} />
                      </span>
                    ) : (
                      <span className="text-slate-500 font-semibold">
                        Core Committee
                      </span>
                    )}

                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 size={13} /> Verified
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Modal Lightbox for Award PDF verification */}
        <AnimatePresence>
          {selectedAward && selectedAward.fileUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAward(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
              />

              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white dark:bg-[#111218] text-black dark:text-white border-brutal-bold shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#38bdf8] w-full max-w-4xl h-[88vh] flex flex-col z-10 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-slate-100 dark:bg-[#181A24] px-4 py-3 border-b-2 border-black dark:border-white/20 flex justify-between items-center gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display font-black text-sm sm:text-base uppercase tracking-tight truncate">
                      {selectedAward.title}
                    </h3>
                    <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      Issuer: <strong>{selectedAward.issuer}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={selectedAward.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-amber-300 text-black font-mono text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
                    >
                      <ExternalLink size={13} />
                      <span className="hidden sm:inline">New Tab</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedAward(null)}
                      className="p-1.5 bg-red-500 text-white border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 w-full bg-slate-200 dark:bg-black/90 relative overflow-hidden">
                  <iframe
                    src={`${selectedAward.fileUrl}#view=FitH`}
                    title={selectedAward.title}
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Footer */}
                <div className="bg-slate-100 dark:bg-[#181A24] px-4 py-2 border-t-2 border-black dark:border-white/20 flex justify-between items-center font-mono text-[11px] text-slate-700 dark:text-slate-400">
                  <span>OFFICIAL UNIVERSITY / HACKATHON RECORD</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">VERIFIED DOCUMENT</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
