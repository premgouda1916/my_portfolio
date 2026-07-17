import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../constants/resumeData';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    "Full-Stack Engineer",
    "Information Science Student",
    "AI & Machine Learning Developer",
    "Problem Solver"
  ];
  
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    let timer: number;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      timer = window.setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      timer = window.setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentRole) {
      timer = window.setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = () => {
    // Attempt download of resume.pdf
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Prem_Gouda_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden px-6 md:px-12"
    >
      {/* Visual blur highlights */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accentBlue/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accentCyan/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column - Text Details */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accentBlue bg-accentBlue/10 border border-accentBlue/20 mb-6">
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white"
          >
            Hi, I'm <br className="md:hidden"/>
            <span className="text-gradient-accent">{resumeData.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200 h-10 mb-6 flex justify-center lg:justify-start items-center"
          >
            <span>I'm a&nbsp;</span>
            <span className="text-blue-600 dark:text-accentCyan underline decoration-accentBlue/30 underline-offset-4">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-800 dark:text-slate-200 text-base md:text-lg max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
          >
            {resumeData.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
          >
            <button
              onClick={handleContactClick}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-accentBlue to-accentCyan text-white font-semibold flex items-center justify-center gap-2 shadow-glow-blue hover:shadow-lg hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer"
            >
              Get In Touch <ArrowRight size={18} />
            </button>
            <button
              onClick={handleResumeDownload}
              className="px-8 py-3.5 rounded-full bg-slate-800/60 hover:bg-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900 text-white border border-white/10 font-semibold flex items-center justify-center gap-2 hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              Download Resume <Download size={18} />
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-4 justify-center lg:justify-start items-center"
          >
            <a
              href={resumeData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-accentBlue hover:scale-110 transition-all duration-300 cursor-pointer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={resumeData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-accentBlue hover:scale-110 transition-all duration-300 cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-accentBlue hover:scale-110 transition-all duration-300 cursor-pointer"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        {/* Right Column - Avatar / Image placeholder */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
            className="relative w-64 h-64 md:w-80 md:h-80"
          >
            {/* Pulsing ring around photo */}
            <div className="absolute inset-0 rounded-full border-2 border-accentBlue/30 animate-pulse-slow" />
            <div className="absolute -inset-4 rounded-full border border-accentCyan/20 animate-spin-slow" />
            
            {/* Inner avatar background */}
            <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-tr from-slate-900 to-slate-800 border-4 border-slate-950 flex items-center justify-center shadow-2xl shadow-accentBlue/20 group hover:border-accentBlue/50 transition-colors duration-500">
              <picture>
                <source srcSet="/prem.jpeg" type="image/jpeg" />
                <img
                  src="/prem.jpeg"
                  alt={resumeData.name}
                  className="w-full h-full object-cover object-[center_8%] scale-110 transition-transform duration-700 group-hover:scale-115"
                  onError={(e) => {
                    // Fallback to animated SVG if image not found
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const svgFallback = document.createElement('div');
                      svgFallback.className = "flex flex-col items-center justify-center text-center p-8 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950";
                      svgFallback.innerHTML = `
                        <svg class="w-20 h-20 text-accentBlue animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
                        </svg>
                        <span class="mt-4 text-xs font-mono tracking-widest text-accentCyan uppercase animate-pulse">PREM GOUDA</span>
                      `;
                      parent.appendChild(svgFallback);
                    }
                  }}
                />
              </picture>
            </div>
            
            {/* Small floating elements */}
            <div className="absolute -top-4 -right-4 bg-slate-900/90 dark:bg-darkBg/90 border border-white/10 p-3 rounded-2xl shadow-lg animate-float">
              <span className="text-xl">🚀</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-slate-900/90 dark:bg-darkBg/90 border border-white/10 p-3 rounded-2xl shadow-lg animate-float-delayed">
              <span className="text-xl">💻</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-xs tracking-widest font-mono text-slate-500 uppercase">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1.5">
          <motion.div 
            animate={{ 
              y: [0, 12, 0] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 bg-accentBlue rounded-full"
          />
        </div>
      </div>
    </section>
  );
};
