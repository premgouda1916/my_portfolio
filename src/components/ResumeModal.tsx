import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../constants/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Prem_Gouda_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop with brutalist hatch/dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
          />

          {/* Neo-Brutalist Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative bg-white dark:bg-[#111218] text-black dark:text-white border-brutal-bold shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#38bdf8] w-full max-w-5xl h-[90vh] flex flex-col z-10 overflow-hidden"
          >
            {/* Architectural Header Bar */}
            <div className="bg-slate-100 dark:bg-[#181A24] px-4 py-3 border-b-2 border-black dark:border-white/20 flex flex-wrap sm:flex-nowrap justify-between items-center gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm sm:text-base uppercase tracking-tight flex items-center gap-2 truncate">
                    <span>{resumeData.name} — Curriculum Vitae</span>
                    <span className="hidden md:inline-flex items-center gap-1 font-mono text-[10px] bg-emerald-400 text-black px-1.5 py-0.5 border border-black">
                      <CheckCircle2 size={11} /> VERIFIED 2026
                    </span>
                  </h3>
                  <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    B.E. ISE • Yenepoya Institute of Technology • CGPA 9.28/10
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] brutal-press flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-amber-300 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] brutal-press flex items-center gap-1.5 cursor-pointer"
                  title="Open PDF in new tab"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">New Tab</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 bg-red-500 hover:bg-red-600 text-white border-2 border-black shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] brutal-press cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Document Frame */}
            <div className="flex-1 w-full bg-slate-200 dark:bg-black/80 relative overflow-hidden">
              <iframe
                src="/resume.pdf#view=FitH"
                title={`${resumeData.name} Resume`}
                className="w-full h-full border-0"
              />
            </div>

            {/* Brutalist Footer Strip */}
            <div className="bg-slate-100 dark:bg-[#181A24] px-4 py-2 border-t-2 border-black dark:border-white/20 flex justify-between items-center font-mono text-[11px] text-slate-700 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block" />
                <span>DOC.ID: PREM_GOUDA_RESUME_V2.PDF</span>
              </span>
              <span className="hidden sm:inline uppercase">
                Languages: Java, Python • Full-Stack & Machine Learning
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
