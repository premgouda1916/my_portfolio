import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import { Background3D } from './components/Background3D';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Education } from './sections/Education';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Awards } from './sections/Awards';
import { Certificates } from './sections/Certificates';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { useScrollProgress } from './hooks/useScrollProgress';
import { ArrowUp } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollProgress = useScrollProgress();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <html className={theme} />
        <title>Prem Gouda | Full Stack Engineer & AI Developer</title>
        <meta name="description" content="Premium developer portfolio of Prem Gouda, Full Stack Engineer & AI Developer. Specialised in React, Node, Java, and Machine Learning." />
      </Helmet>

      {/* Global layouts */}
      <div className="relative min-h-screen bg-slate-50 dark:bg-darkBg text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden font-sans transition-colors duration-300">
        
        {/* Scroll Progress Bar */}
        <div 
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accentBlue to-accentCyan z-99" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* 3D Canvas Background */}
        <Background3D />

        {/* Custom Glow Cursor */}
        <CustomCursor />

        {/* Sticky Glass Navbar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Core Page Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Awards />
          <Certificates />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3.5 rounded-full bg-glass border border-white/10 text-slate-400 hover:text-white shadow-lg transition-all duration-300 z-40 cursor-pointer ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="animate-pulse-slow" />
        </button>

      </div>
    </HelmetProvider>
  );
};

export default App;
