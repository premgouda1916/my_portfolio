import React from 'react';
import { useVisitorCounter } from '../hooks/useVisitorCounter';
import { resumeData } from '../constants/resumeData';
import { Github, Linkedin, Mail, ArrowUp, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const visitors = useVisitorCounter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#08090D] border-t-2 border-black dark:border-white/20 py-12 px-4 sm:px-6 lg:px-8 text-black dark:text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Colophon */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1.5 cursor-pointer" onClick={scrollToTop}>
            <span className="font-display font-black text-xl uppercase tracking-tight text-black dark:text-white">
              {resumeData.name}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black font-bold">
              PORTFOLIO
            </span>
          </div>
          <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400 max-w-sm">
            Information Science & Engineering • Yenepoya Institute of Technology, Mangalore (VTU).
          </p>
        </div>

        {/* Social Navigation */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <a
            href={resumeData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-slate-100 dark:bg-[#141620] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href={resumeData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-slate-100 dark:bg-[#141620] hover:bg-[#0077b5] hover:text-white border-2 border-black dark:border-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <a
            href={`mailto:${resumeData.email}`}
            className="p-2.5 bg-slate-100 dark:bg-[#141620] hover:bg-red-500 hover:text-white border-2 border-black dark:border-white transition-colors"
            aria-label="Email"
          >
            <Mail size={17} />
          </a>

          {/* Quick Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-amber-300 hover:bg-amber-400 text-black border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer ml-2"
            aria-label="Back to top"
            title="Return to top"
          >
            <ArrowUp size={17} />
          </button>
        </div>

        {/* Visitor Counter & Copyright */}
        <div className="flex flex-col items-center md:items-end font-mono text-[11px] text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-[#141620] border border-black dark:border-white/20 mb-1.5">
            <Terminal size={12} className="text-blue-600 dark:text-blue-400" />
            <span>VISITOR TELEMETRY:</span>
            <strong className="text-black dark:text-white font-bold">{visitors}</strong>
          </div>
          <div>
            © {new Date().getFullYear()} PREM GOUDA • ALL RIGHTS RESERVED
          </div>
        </div>

      </div>
    </footer>
  );
};
