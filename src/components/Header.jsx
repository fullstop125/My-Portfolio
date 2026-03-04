import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gradient-to-r from-[#b1e1ff] via-[#22c1c3] to-[#fdbb2d] shadow-md py-3' : 'bg-transparent py-5'
      } px-6 md:px-16 flex justify-between items-center`}
    >
      <div className="logo cursor-pointer text-secondary font-bold text-2xl tracking-widest z-50">
        <a href="#" className="flex items-center group">
          <span className="text-primary group-hover:text-[#4053fc] transition-colors">M</span>
          <span className="inline-block w-3 h-3 bg-gradient-to-r from-[#ff1ead] to-primary rounded-full mx-1 shadow-lg group-hover:scale-125 transition-transform"></span>
          <span>MANYI</span>
        </a>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex space-x-10 text-[16px] font-semibold text-tertiary">
          {['Portfolio', 'About', 'Contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item === 'Portfolio' ? 'work-card' : item.toLowerCase()}`} 
                className="relative group hover:text-primary transition-colors"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Icon */}
      <div className="md:hidden z-50 cursor-pointer text-primary text-2xl" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl flex flex-col pt-32 px-8 z-40"
          >
            <ul className="flex flex-col space-y-8 font-bold text-4xl text-secondary">
              {['Portfolio', 'About', 'Contact'].map((item, i) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <a 
                    href={`#${item === 'Portfolio' ? 'work-card' : item.toLowerCase()}`} 
                    onClick={closeMenu}
                    className="hover:text-primary transition-colors block border-b border-gray-100 pb-4"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;