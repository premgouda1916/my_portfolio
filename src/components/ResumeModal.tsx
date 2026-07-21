import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, Sparkles } from 'lucide-react';
import { resumeData } from '../constants/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative bg-slate-900 border border-white/10 w-full max-w-5xl h-[88vh] rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Ambient Background Glows */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accentBlue/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accentCyan/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header with Integrated Close Button */}
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 mb-4 border-b border-white/10 pb-4 z-20 relative">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2.5 truncate">
                  <FileText className="text-accentBlue flex-shrink-0" size={24} />
                  <span className="truncate">{resumeData.name} — Curriculum Vitae</span>
                </h3>
                <p className="text-slate-400 text-xs md:text-sm mt-0.5 flex items-center gap-2">
                  <Sparkles size={14} className="text-accentCyan flex-shrink-0" />
                  <span>{resumeData.title} • Updated 2026</span>
                </p>
              </div>

              {/* Action Buttons & Close Button */}
              <div className="flex items-center gap-2 flex-shrink-0 z-30">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-accentBlue to-accentCyan hover:opacity-90 text-white font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-2 shadow-glow-blue cursor-pointer"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Download Resume</span>
                  <span className="sm:hidden">Download</span>
                </button>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 text-xs md:text-sm font-semibold transition-colors duration-300 flex items-center justify-center cursor-pointer"
                  title="Open in new window"
                >
                  <ExternalLink size={16} />
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all duration-300 cursor-pointer z-30"
                  aria-label="Close modal"
                  title="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* PDF Viewer Frame */}
            <div className="flex-1 w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/5 relative z-10">
              <iframe
                src="/resume.pdf#view=FitH"
                title={`${resumeData.name} Resume`}
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer */}
            <div className="mt-3 flex justify-between items-center text-xs text-slate-400 z-10 px-1 font-mono">
              <span>📄 Official PDF Resume</span>
              <span className="hidden sm:inline">Visvesvaraya Technological University (VTU) • Information Science</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
