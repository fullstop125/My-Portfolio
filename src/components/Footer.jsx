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
      className="bg-slate-900 border-t border-slate-800 transition-colors duration-300"
    >
      {/* Top Row: Logo */}
      <div className="px-6 md:px-[12%] pt-12 pb-8 flex justify-center border-b border-slate-800">
        <a href="#" className="flex items-center font-bold text-2xl tracking-widest group">
          <span className="text-primary group-hover:text-[#4053fc] transition-colors">M</span>
          <span className="inline-block w-3 h-3 bg-gradient-to-r from-[#ff1ead] to-primary rounded-full mx-1 shadow-lg group-hover:scale-125 transition-transform"></span>
          <span className="text-white">MANYI</span>
        </a>
      </div>

      {/* Middle Row: Social Icons */}
      <div className="px-6 md:px-[12%] py-6 flex justify-center border-b border-slate-800">
        <ul className="flex gap-5 text-xl text-gray-500">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="hover:text-primary transition-colors p-2 block"
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Row: Copyright + Terminal line */}
      <div className="px-6 md:px-[12%] py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Momanyi Hassan. All rights reserved.
        </p>
        <div className="font-mono text-[#00ff41] text-xs font-bold flex items-center gap-2">
          <span className="text-gray-600">root@system:~$</span>
          {isInView && (
            <Typewriter
              words={['connection closed. goodbye.']}
              loop={1}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          )}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
