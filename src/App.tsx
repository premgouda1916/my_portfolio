import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import { Background3D } from './components/Background3D';
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
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
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
        <title>Prem Gouda | Information Science Engineer & AI Developer</title>
        <meta 
          name="description" 
          content="Portfolio of Prem Gouda, Information Science & Engineering student at Yenepoya Institute of Technology (VTU). Specializing in Java Full-Stack, Python, and Deep Learning NLP." 
        />
      </Helmet>

      {/* Global layouts */}
      <div className="relative min-h-screen bg-[#FDFDFD] dark:bg-[#0C0D12] text-black dark:text-slate-100 antialiased overflow-x-hidden font-sans transition-colors duration-200">
        
        {/* Precision Scroll Progress Bar */}
        <div 
          className="fixed top-0 left-0 h-1 bg-blue-600 dark:bg-blue-400 z-50 border-b border-black" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Architectural Technical Blueprint Grid */}
        <Background3D />

        {/* Neo-Brutalist Navbar */}
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

        {/* Tactile Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 bg-amber-300 hover:bg-amber-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] brutal-press transition-all duration-200 z-40 cursor-pointer ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          aria-label="Scroll to top"
          title="Return to top"
        >
          <ArrowUp size={18} />
        </button>

      </div>
    </HelmetProvider>
  );
};

export default App;
