import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Dark Mode based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#ff1ead] origin-left z-[60]"
        style={{ scaleX }}
      />

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-gradient-to-r from-[#b1e1ff] via-[#22c1c3] to-[#fdbb2d] shadow-md py-3 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800' : 'bg-transparent py-5'
        } px-6 md:px-16 flex justify-between items-center`}
      >
        <div className="logo cursor-pointer font-bold text-2xl tracking-widest z-50 flex items-center gap-3">
          <a href="#" className="flex items-center group">
            <span className="text-primary dark:text-blue-400 group-hover:text-[#4053fc] transition-colors">M</span>
            <span className="inline-block w-3 h-3 bg-gradient-to-r from-[#ff1ead] to-primary rounded-full mx-1 shadow-lg group-hover:scale-125 transition-transform"></span>
            <span className="text-secondary dark:text-white">MANYI</span>
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          <ul className="flex space-x-10 text-[16px] font-semibold text-tertiary dark:text-gray-200">
            {[
              { label: 'Portfolio', href: '#work-card' },
              { label: 'Experience', href: '#experience' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative group hover:text-primary dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary dark:bg-blue-400 transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://drive.google.com/file/d/1s5E3axBAA_pQnh1pFBc_ffdewD4ZFhb9/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="bg-primary dark:bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#4053fc] dark:hover:bg-blue-500 transition-all shadow-md whitespace-nowrap"
          >
            Resume ↓
          </a>

          {/* Dark Mode Toggle Desktop */}
          <button
            onClick={toggleDarkMode}
            className="text-xl text-secondary dark:text-yellow-400 hover:text-primary transition-colors p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4 z-50">
          {/* Dark Mode Toggle Mobile */}
          <button 
            onClick={toggleDarkMode} 
            className={`text-xl ${isMenuOpen ? 'text-white' : 'text-secondary dark:text-yellow-400'}`}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Mobile Menu Icon */}
          <button 
            className={`cursor-pointer text-2xl bg-transparent border-none p-2 flex items-center justify-center rounded-lg transition-colors ${isMenuOpen ? 'text-white' : 'text-primary dark:text-blue-400'}`} 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 bg-primary/95 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col pt-32 px-8 z-40"
            >
              <ul className="flex flex-col space-y-8 font-bold text-4xl text-white">
                {[
                  { label: 'Portfolio', href: '#work-card' },
                  { label: 'Experience', href: '#experience' },
                  { label: 'About', href: '#about' },
                  { label: 'Contact', href: '#contact' },
                ].map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="hover:text-blue-300 transition-colors block border-b border-white/20 pb-4"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
