import React, { useState, useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { resumeData } from '../constants/resumeData';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { ResumeModal } from './ResumeModal';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const sectionIds = [
    'hero',
    'about',
    'education',
    'skills',
    'projects',
    'awards',
    'certificates',
    'contact'
  ];

  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'education', name: 'Education' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'awards', name: 'Achievements' },
    { id: 'certificates', name: 'Certificates' },
    { id: 'contact', name: 'Contact' }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-200 border-b-2 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#0C0D12]/95 backdrop-blur-sm border-black dark:border-white/20 shadow-[0_4px_0px_rgba(0,0,0,0.06)]'
            : 'bg-white/80 dark:bg-[#0C0D12]/80 backdrop-blur-sm border-black/80 dark:border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          
          {/* Logo / Brandmark */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 bg-black text-white dark:bg-white dark:text-black font-display font-black text-sm flex items-center justify-center border-2 border-black dark:border-white shadow-[2px_2px_0px_#2563eb] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
              PG
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-tight text-base uppercase text-black dark:text-white leading-none">
                {resumeData.name}
              </span>
              <span className="font-mono text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-tight">
                ISE // AI & Full-Stack
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_#2563eb]'
                      : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5 border-2 border-transparent'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: Resume & Theme */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-300 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] brutal-press cursor-pointer"
            >
              <FileText size={14} />
              <span>Resume.pdf</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 bg-white dark:bg-slate-900 text-black dark:text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] brutal-press cursor-pointer"
              aria-label="Toggle visual theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={17} className="text-amber-400" />
              ) : (
                <Moon size={17} className="text-slate-800" />
              )}
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-[#0C0D12] border-b-2 border-black dark:border-white/20 p-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`py-2 px-3 text-left font-mono font-bold text-sm uppercase tracking-wider flex justify-between items-center border-b border-slate-200 dark:border-white/10 ${
                  activeSection === link.id
                    ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-white/5'
                    : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                <span>{link.name}</span>
                <span className="font-mono text-xs opacity-60">→</span>
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsResumeOpen(true);
              }}
              className="mt-3 w-full py-2.5 bg-amber-300 text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2"
            >
              <FileText size={16} /> View Official Resume (PDF)
            </button>
          </div>
        )}
      </header>
    </>
  );
};
