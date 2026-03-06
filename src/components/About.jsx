import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { terminalReveal, glitchItem } from '../utils/transitions';
import GlitchText from './GlitchText';
import {
  SiJavascript, SiHtml5, SiCss3, SiRuby, SiPython,
  SiReact, SiRubyonrails, SiTailwindcss, SiBootstrap,
  SiGithub, SiJest, SiWebpack,
  SiPostgresql, SiMysql, SiRedux, SiDocker,
  SiExpress, SiNextdotjs, SiCisco, SiMongodb, SiHuawei
} from 'react-icons/si';
import { FaShieldAlt, FaTerminal, FaBug, FaServer, FaLock, FaEye, FaNetworkWired, FaRoute, FaPlug, FaLayerGroup } from 'react-icons/fa';

const skillCategories = {
  Languages: [
    { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" /> },
    { name: 'Ruby', icon: <SiRuby className="text-[#CC342D]" /> },
    { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
    { name: 'HTML5', icon: <SiHtml5 className="text-[#E34F26]" /> },
    { name: 'CSS3', icon: <SiCss3 className="text-[#1572B6]" /> },
  ],
  Frameworks: [
    { name: 'React', icon: <SiReact className="text-[#61DAFB]" /> },
    { name: 'Next.js', icon: <SiNextdotjs className="text-black" /> },
    { name: 'Redux', icon: <SiRedux className="text-[#764ABC]" /> },
    { name: 'Ruby on Rails', icon: <SiRubyonrails className="text-[#CC0000]" /> },
    { name: 'Express', icon: <SiExpress className="text-black" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: 'Bootstrap', icon: <SiBootstrap className="text-[#7952B3]" /> },
  ],
  'Tools & DBs': [
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#4169E1]" /> },
    { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
    { name: 'Git & GitHub', icon: <SiGithub className="text-[#181717]" /> },
    { name: 'Jest', icon: <SiJest className="text-[#C21325]" /> },
    { name: 'Webpack', icon: <SiWebpack className="text-[#8DD6F9]" /> },
    { name: 'Docker', icon: <SiDocker className="text-[#2496ED]" /> },
  ],
  'Security Tools': [
    { name: 'Wireshark', icon: <FaEye className="text-[#1679A7]" /> },
    { name: 'Nmap', icon: <FaTerminal className="text-[#e61d2b]" /> },
    { name: 'Burp Suite', icon: <FaBug className="text-[#FF6633]" /> },
    { name: 'Metasploit', icon: <FaShieldAlt className="text-[#2A2E3F]" /> },
    { name: 'pfSense', icon: <FaServer className="text-[#212a46]" /> },
    { name: 'Fail2Ban', icon: <FaLock className="text-[#CC342D]" /> },
  ],
  Networking: [
    { name: 'MikroTik', icon: <FaServer className="text-[#293B8A]" /> },
    { name: 'EPON/GPON', icon: <FaNetworkWired className="text-[#22c1c3]" /> },
    { name: 'OSPF/BGP', icon: <FaRoute className="text-[#6070ff]" /> },
    { name: 'PPPoE', icon: <FaPlug className="text-[#fdbb2d]" /> },
    { name: 'Cisco IOS', icon: <SiCisco className="text-[#049fd9]" /> },
    { name: 'VLANs', icon: <FaLayerGroup className="text-[#172b4d]" /> },
    { name: 'Huawei OptiX', icon: <SiHuawei className="text-[#e61d2b]" /> },
  ],
  Certifications: [
    { name: 'Software Development', icon: <img src={`${import.meta.env.BASE_URL}images/microverse-logo.jpg`} alt="Microverse Logo" className="w-9 h-9 object-contain rounded-sm" />, issuer: 'Microverse' },
    { name: 'CCNA', icon: <SiCisco className="text-[#049fd9]" />, issuer: 'Cisco' },
    { name: 'CyberOps Associate', icon: <SiCisco className="text-[#049fd9]" />, issuer: 'Cisco' },
    { name: 'Cybersecurity', icon: <SiCisco className="text-[#049fd9]" />, issuer: 'Cisco' },
    { name: 'Atlas Security', icon: <SiMongodb className="text-[#47A248]" />, issuer: 'MongoDB' },
    { name: 'Media & Entertainment (2D/3D)', icon: <img src={`${import.meta.env.BASE_URL}images/nelium-logo.jpg`} alt="Nelium Logo" className="w-9 h-9 object-contain rounded-sm" />, issuer: 'Nelium Systems' },
    { name: 'Python Web Development', icon: <img src={`${import.meta.env.BASE_URL}images/nelium-logo.jpg`} alt="Nelium Logo" className="w-9 h-9 object-contain rounded-sm" />, issuer: 'Nelium Systems' },
    { name: 'Big Data', icon: <SiHuawei className="text-[#e61d2b]" />, issuer: 'Huawei' },
  ]
};

const About = () => {
  const [activeTab, setActiveTab] = useState('Languages');

  // Flatten all tech icons for the background marquee
  const allIcons = useMemo(() => {
    return Object.values(skillCategories)
      .flat()
      .filter(skill => typeof skill.icon.type !== 'string'); // Filter out image tags from certs
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 px-6 md:px-[12%] bg-[#f8f9fa] dark:bg-slate-800 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decor & Marquee */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 dark:from-blue-500/5 to-transparent pointer-events-none z-0"></div>
      
      <div className="absolute top-[20%] left-0 w-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0 -rotate-3 scale-110">
        <Marquee speed={30} gradient={false} autoFill>
          {allIcons.map((skill, i) => (
            <div key={i} className="text-8xl mx-8 grayscale">
              {skill.icon}
            </div>
          ))}
        </Marquee>
      </div>
      <div className="absolute top-[60%] left-0 w-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0 rotate-3 scale-110">
        <Marquee speed={25} direction="right" gradient={false} autoFill>
          {allIcons.map((skill, i) => (
            <div key={i} className="text-8xl mx-8 grayscale">
              {skill.icon}
            </div>
          ))}
        </Marquee>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Left Column - Text */}
        <motion.div 
          variants={terminalReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-1/2"
        >
          <div className="mb-6">
             <GlitchText as="h2" text="About Myself" className="text-4xl md:text-5xl font-alegreya font-bold text-secondary dark:text-white leading-tight uppercase tracking-wider" />
             <div className="w-24 h-1 bg-primary mt-2"></div>
          </div>
          
          <p className="text-tertiary dark:text-gray-300 text-lg mb-6 leading-relaxed">
            I am a passionate Full-Stack Software Developer trained in a global, remote-first environment. I specialize in building robust, scalable applications using modern web technologies like React, Ruby on Rails, and JavaScript. 
          </p>

          <p className="text-tertiary dark:text-gray-300 text-lg mb-6 leading-relaxed">
            My engineering journey is backed by rigorous technical certifications, extensive pair-programming experience, and a proven track record of solving complex problems collaboratively. I understand system architecture from the database layer to the user interface.
          </p>

          <p className="text-tertiary dark:text-gray-300 text-lg mb-10 leading-relaxed">
            Whether it's architecting a backend API, optimizing database performance, or crafting an intuitive front-end experience, my goal is to deliver clean, maintainable code that drives real business value.
          </p>

          <a 
            href="https://drive.google.com/file/d/1s5E3axBAA_pQnh1pFBc_ffdewD4ZFhb9/view?usp=sharing" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block bg-primary dark:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-[#4053fc] dark:hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300"
          >
            Get My Resume
          </a>
        </motion.div>

        {/* Right Column - Tech Stack Tabs */}
        <motion.div 
          variants={terminalReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-1/2"
        >
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 min-h-[400px] flex flex-col">
            <h3 className="text-2xl font-bold font-alegreya text-secondary dark:text-white mb-6">Capabilities & Certifications</h3>
            
            {/* Tabs */}
            <div className="flex gap-2 md:gap-3 border-b border-gray-100 dark:border-slate-700 mb-6 overflow-x-auto pb-px no-scrollbar">
              {Object.keys(skillCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`pb-3 px-2 md:px-3 font-semibold text-xs sm:text-sm md:text-base transition-colors relative whitespace-nowrap flex-shrink-0 ${
                    activeTab === category ? 'text-primary dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {category}
                  {activeTab === category && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-primary dark:bg-blue-400 rounded-t-md"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-grow relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={terminalReveal}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                >
                  {skillCategories[activeTab].map((skill, index) => (
                    <motion.div 
                      key={index}
                      variants={glitchItem}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-primary/30 dark:hover:border-blue-400/30 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all cursor-default"
                    >
                      <div className="text-4xl mb-3 drop-shadow-sm">
                        {skill.icon}
                      </div>
                      <span className="font-semibold text-secondary dark:text-gray-200 text-sm text-center">{skill.name}</span>
                      {skill.issuer && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{skill.issuer}</span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
