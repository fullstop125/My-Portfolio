import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaTwitter, FaMedium, FaAngellist } from 'react-icons/fa';

const Footer = () => {
  const [isInView, setIsInView] = useState(false);

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/fullstop125', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/momanyi-hassan-32a489180', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/moseshassany', label: 'Twitter' },
    { icon: <FaMedium />, url: 'https://medium.com/@momanyihassan', label: 'Medium' },
    { icon: <FaAngellist />, url: 'https://angel.co/u/hassan-momanyi', label: 'AngelList' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.3 }}
      className="relative bg-slate-900 border-t border-slate-800 transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
      
      {/* Top Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

      <div className="relative z-10 px-6 md:px-[12%] py-16 flex flex-col items-center gap-10">
        
        {/* Logo */}
        <a href="#" className="flex items-center font-bold text-3xl tracking-widest group">
          <span className="text-primary group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_8px_rgba(96,112,255,0.8)]">M</span>
          <span className="inline-block w-3 h-3 bg-gradient-to-r from-[#ff1ead] to-primary rounded-full mx-1.5 shadow-[0_0_10px_rgba(255,30,173,0.5)] group-hover:scale-125 transition-transform duration-300"></span>
          <span className="text-white group-hover:text-gray-300 transition-colors duration-500">MANYI</span>
        </a>

        {/* Social Icons */}
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {socialLinks.map((link, index) => (
            <motion.li 
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-primary/20 hover:border-primary hover:text-white hover:shadow-[0_0_15px_rgba(96,112,255,0.5)] hover:-translate-y-1 transition-all duration-300 text-xl"
              >
                {link.icon}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Divider */}
        <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-2"></div>

        {/* Bottom Info: Copyright + Terminal */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="font-mono text-[#00ff41] text-sm md:text-base font-bold flex items-center justify-center gap-2 bg-black/40 px-6 py-3 rounded-lg border border-slate-800 shadow-inner w-fit">
            <span className="text-gray-500">root@system:~$</span>
            <span className="min-w-[220px] text-left">
              {isInView && (
                <Typewriter
                  words={['connection closed. goodbye.']}
                  loop={1}
                  cursor
                  cursorStyle='_'
                  typeSpeed={60}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              )}
            </span>
          </div>
          
          <p className="text-slate-500 text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Momanyi Hassan. All rights reserved.
          </p>
        </div>
        
      </div>
    </motion.footer>
  );
};

export default Footer;
