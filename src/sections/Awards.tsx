import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { resumeData } from '../constants/resumeData';
import type { Award, Certification } from '../constants/resumeData';
import { SectionHeader } from '../components/SectionHeader';
import { Trophy, Award as AwardIcon, Zap, Code, ExternalLink, X, Calendar, Filter, Sparkles, GraduationCap, Flame, ShieldCheck, Search } from 'lucide-react';

const CountUpComponent = (CountUp as any).default || CountUp;

export interface UnifiedCredential {
  id: string;
  title: string;
  type: 'academic' | 'hackathon' | 'certification';
  issuer: string;
  score?: string;
  description?: string;
  fileUrl?: string;
  categoryName: string;
}

export const Awards: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'academic' | 'hackathons' | 'certifications'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCredential, setSelectedCredential] = useState<UnifiedCredential | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCredential(null);
      }
    };
    if (selectedCredential) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCredential]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    { label: "B.E. Max CGPA", value: 9.5, suffix: "", decimals: 1, icon: <Trophy size={20} className="text-amber-400" /> },
    { label: "Java Training Score", value: 100, suffix: "%", decimals: 0, icon: <AwardIcon size={20} className="text-accentBlue" /> },
    { label: "GIT Training Score", value: 90, suffix: "%", decimals: 0, icon: <Zap size={20} className="text-accentCyan" /> },
    { label: "Python Training Score", value: 85, suffix: "%", decimals: 0, icon: <Code size={20} className="text-indigo-400" /> }
  ];

  // Map awards & certifications into categorized credential lists
  const mappedAwards: UnifiedCredential[] = resumeData.awards.map((award: Award, idx: number) => {
    const isAcademic = award.category === 'academic' || award.title.toLowerCase().includes('academic');
    return {
      id: `award-${idx}`,
      title: award.title,
      type: isAcademic ? 'academic' : 'hackathon',
      issuer: award.issuer || 'VTU / Academic Institution',
      score: award.score,
      description: award.description,
      fileUrl: award.fileUrl,
      categoryName: isAcademic ? 'Academic Honor' : 'Hackathon Achievement'
    };
  });

  const mappedCertificates: UnifiedCredential[] = resumeData.certifications.map((cert: Certification, idx: number) => ({
    id: `cert-${idx}`,
    title: cert.name,
    type: 'certification',
    issuer: cert.issuer,
    score: cert.score,
    description: `Verified professional training & certification credential issued by ${cert.issuer}.`,
    fileUrl: cert.fileUrl,
    categoryName: 'Technical Certification'
  }));

  const matchesSearch = (item: UnifiedCredential) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.issuer.toLowerCase().includes(query) ||
      (item.score && item.score.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      item.categoryName.toLowerCase().includes(query)
    );
  };

  const academicCredentials = mappedAwards.filter(c => c.type === 'academic' && matchesSearch(c));
  const hackathonCredentials = mappedAwards.filter(c => c.type === 'hackathon' && matchesSearch(c));
  const technicalCertifications = mappedCertificates.filter(c => matchesSearch(c));

  const totalCount = academicCredentials.length + hackathonCredentials.length + technicalCertifications.length;

  const renderCardGrid = (items: UnifiedCredential[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, delay: idx * 0.04 }}
          onClick={() => setSelectedCredential(item)}
          className="bg-glass dark:bg-glass p-6 rounded-3xl border border-white/5 flex flex-col justify-between group hover:border-accentBlue/30 hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer relative overflow-hidden"
        >
          <div>
            {/* Top Bar: Category Specific Icon + Badges */}
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-300 ${
                item.type === 'academic'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : item.type === 'hackathon'
                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  : 'bg-accentBlue/10 text-accentBlue border-accentBlue/20'
              }`}>
                {item.type === 'academic' ? (
                  <GraduationCap size={20} />
                ) : item.type === 'hackathon' ? (
                  <Flame size={20} />
                ) : (
                  <ShieldCheck size={20} />
                )}
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider ${
                  item.type === 'academic'
                    ? 'bg-amber-400/10 border border-amber-400/30 text-amber-400'
                    : item.type === 'hackathon'
                    ? 'bg-purple-400/10 border border-purple-400/30 text-purple-400'
                    : 'bg-accentBlue/10 border border-accentBlue/30 text-accentBlue'
                }`}>
                  {item.type === 'academic' ? 'Academic Rank' : item.type === 'hackathon' ? 'Hackathon' : 'Certificate'}
                </span>
                {item.score && (
                  <span className="px-2.5 py-0.5 rounded-xl bg-accentCyan/10 border border-accentCyan/20 text-accentCyan text-xs font-mono font-bold">
                    {item.score}
                  </span>
                )}
              </div>
            </div>

            {/* Content: Title, Issuer, Description */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-accentBlue transition-colors duration-300 mb-2">
              {item.title}
            </h3>
            
            <p className="text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles size={13} className="text-accentCyan flex-shrink-0" />
              Issued by: {item.issuer}
            </p>

            {item.description && (
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
                {item.description}
              </p>
            )}
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between text-xs text-accentBlue group-hover:text-accentCyan font-bold transition-colors duration-300 mt-auto pt-3 border-t border-white/5">
            <span className="flex items-center gap-1">
              {item.fileUrl ? 'View Certificate PDF' : 'View Details'} <ExternalLink size={12} />
            </span>
            {item.fileUrl && (
              <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/10 text-emerald-400 font-mono font-normal">
                Verified PDF
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="awards" className="py-24 px-6 md:px-12 relative overflow-hidden bg-slate-100/40 dark:bg-slate-900/20">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Milestones & Qualifications"
          title="Awards & Certifications"
          subtitle="Explore academic rank certificates, hackathon honors, and technical skill certifications in dedicated sub-sections."
        />

        {/* Stats Summary Counter Bar */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
              <span className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 font-mono flex items-baseline">
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

        {/* Quick Filter Navigation Buttons & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-14 bg-glass dark:bg-glass p-3 rounded-3xl border border-white/5 shadow-md">
          <div className="p-1 bg-slate-200/60 dark:bg-slate-950/60 rounded-2xl border border-slate-300 dark:border-white/10 flex flex-wrap justify-center md:justify-start gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Filter size={14} /> All ({totalCount})
            </button>
            <button
              onClick={() => setActiveFilter('academic')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeFilter === 'academic'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap size={14} /> Academic ({academicCredentials.length})
            </button>
            <button
              onClick={() => setActiveFilter('hackathons')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeFilter === 'hackathons'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame size={14} /> Hackathons ({hackathonCredentials.length})
            </button>
            <button
              onClick={() => setActiveFilter('certifications')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeFilter === 'certifications'
                  ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck size={14} /> Technical ({technicalCertifications.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search certificates, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accentBlue/50 text-xs md:text-sm transition-colors"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUBSECTION 1: Academic Excellence Certificates */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'academic') && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Academic Excellence & Rank Certificates
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-0.5">
                  Official university rank recognitions for academic distinction and top CGPA scores.
                </p>
              </div>
            </div>

            {renderCardGrid(academicCredentials)}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBSECTION 2: Hackathon Certificates */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'hackathons') && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Flame size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Hackathon Achievements & Certificates
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-0.5">
                  Competition honors and participation certificates in university & national hackathons.
                </p>
              </div>
            </div>

            {renderCardGrid(hackathonCredentials)}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBSECTION 3: Technical & Professional Certifications */}
        {/* ========================================================================= */}
        {(activeFilter === 'all' || activeFilter === 'certifications') && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="p-3 rounded-2xl bg-accentBlue/10 border border-accentBlue/20 text-accentBlue">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Technical & Professional Certifications
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-0.5">
                  Industry-recognized courses and training certificates in AI, Cloud, Java, Machine Learning, Python, GIT, and Networking.
                </p>
              </div>
            </div>

            {renderCardGrid(technicalCertifications)}
          </div>
        )}

        {/* Lightbox PDF Preview Modal */}
        <AnimatePresence>
          {selectedCredential && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCredential(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
              />

              {/* Lightbox Box */}
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative bg-slate-900 border border-white/10 w-full max-w-4xl h-[85vh] rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Background glow highlight */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-accentBlue/20 rounded-full blur-3xl pointer-events-none" />
                
                {/* Header info */}
                <div className="flex justify-between items-center gap-4 mb-4 pb-3 border-b border-white/10 z-20 relative">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 truncate">
                      {selectedCredential.type === 'academic' ? (
                        <GraduationCap className="text-amber-400 flex-shrink-0" size={22} />
                      ) : selectedCredential.type === 'hackathon' ? (
                        <Flame className="text-purple-400 flex-shrink-0" size={22} />
                      ) : (
                        <ShieldCheck className="text-accentBlue flex-shrink-0" size={22} />
                      )}
                      <span className="truncate">{selectedCredential.title}</span>
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm mt-1">
                      Issued by: <span className="text-slate-200 font-semibold">{selectedCredential.issuer}</span>
                      {selectedCredential.score && ` • ${selectedCredential.score}`}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCredential(null);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all duration-300 cursor-pointer flex-shrink-0 z-30"
                    aria-label="Close modal"
                    title="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Frame or Detail Box */}
                <div className="flex-1 w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/5 relative z-10 flex flex-col justify-center">
                  {selectedCredential.fileUrl ? (
                    <iframe
                      src={`${selectedCredential.fileUrl}#view=FitH`}
                      title={selectedCredential.title}
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="p-8 md:p-12 text-center max-w-2xl mx-auto flex flex-col items-center">
                      <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-6">
                        {selectedCredential.type === 'academic' ? <GraduationCap size={48} /> : selectedCredential.type === 'hackathon' ? <Flame size={48} /> : <ShieldCheck size={48} />}
                      </div>
                      
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono mb-3">
                        {selectedCredential.categoryName}
                      </span>
                      
                      <h3 className="text-2xl font-extrabold text-white mb-3">
                        {selectedCredential.title}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {selectedCredential.description}
                      </p>

                      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300">
                        <Sparkles size={16} className="text-amber-400" />
                        <span>Issued & Verified by: <strong className="text-white">{selectedCredential.issuer}</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer and link */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 z-10">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] md:text-xs">
                    <Calendar size={14} /> ID: VER-{selectedCredential.title.slice(0, 4).toUpperCase().replace(/\s+/g, '')}-{selectedCredential.issuer.slice(0, 3).toUpperCase()}
                  </span>
                  {selectedCredential.fileUrl && (
                    <a
                      href={selectedCredential.fileUrl}
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

