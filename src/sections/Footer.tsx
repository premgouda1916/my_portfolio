import React from 'react';
import { useVisitorCounter } from '../hooks/useVisitorCounter';
import { resumeData } from '../constants/resumeData';
import { Github, Linkedin, Mail, Heart, Eye } from 'lucide-react';

export const Footer: React.FC = () => {
  const visitors = useVisitorCounter();

  const handleLinkClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle radial background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accentBlue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Side: Brand Logo & Credits */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-1.5 cursor-pointer mb-3" onClick={() => handleLinkClick('hero')}>
            <span className="font-extrabold text-xl tracking-tight text-white">
              PREM GOUDA<span className="text-accentBlue">.</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xs leading-normal">
            A premium developer portfolio handcrafted to showcase full stack engineering and AI solutions.
          </p>
        </div>

        {/* Center: Social Networking Icons */}
        <div className="flex gap-4">
          <a
            href={resumeData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:scale-105 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={resumeData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:scale-105 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${resumeData.email}`}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:scale-105 transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Right Side: Visitor Badge & Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-3">
          {/* Visitor Counter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-white/5 shadow-inner">
            <Eye size={14} className="text-accentCyan" />
            <span className="text-xs text-slate-400 font-medium">Visitor Count:</span>
            <span className="text-xs font-mono font-bold text-white tracking-widest">{visitors}</span>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono uppercase tracking-widest select-none">
            © {new Date().getFullYear()} PREM GOUDA. MADE WITH <Heart size={10} className="text-red-500 animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
};
