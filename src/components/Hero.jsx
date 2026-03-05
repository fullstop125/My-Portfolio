import React, { Suspense } from 'react';
import { FaTwitter, FaLinkedin, FaMedium, FaGithub, FaAngellist, FaArrowDown, FaTerminal } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { Typewriter } from 'react-simple-typewriter';
import AnimatedShape from './AnimatedShape';

const Hero = () => {
  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com/moseshassany" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/momanyi-hassan-32a489180" },
    { icon: <FaMedium />, url: "https://medium.com/@momanyihassan" },
    { icon: <FaGithub />, url: "https://github.com/fullstop125" },
    { icon: <FaAngellist />, url: "https://angel.co/u/hassan-momanyi" },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 px-6 md:px-[12%] overflow-hidden rounded-b-[2%] shadow-sm"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/bg_Header.png), linear-gradient(to right, #fdbb2d, #22c1c3)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundColor: '#b1e1ff'
      }}
    >
      
      {/* Tech Grid Overlay for Guru Vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none mix-blend-overlay z-0"></div>

      {/* Birds Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-50 md:opacity-100 z-0 overflow-hidden mix-blend-overlay">
        {[1, 2, 3, 4].map((num) => (
          <div key={`bird-set1-${num}`} className={`bird-container bird-container--${num === 1 ? 'one' : num === 2 ? 'two' : num === 3 ? 'three' : 'four'}`}>
            <div className={`bird bird--${num === 1 ? 'one' : num === 2 ? 'two' : num === 3 ? 'three' : 'four'}`}></div>
          </div>
        ))}
        {[1, 2, 3, 4].map((num) => (
          <div key={`bird-set2-${num}`} className={`bird-container bird-container--${num === 1 ? 'one' : num === 2 ? 'two' : num === 3 ? 'three' : 'four'}`} style={{ animationDelay: `${num * 2}s`, top: `${10 + num * 5}%` }}>
            <div className={`bird bird--${num === 1 ? 'one' : num === 2 ? 'two' : num === 3 ? 'three' : 'four'}`}></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-[60%] max-w-2xl">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4 bg-white/20 dark:bg-black/20 w-fit px-4 py-2 rounded-full backdrop-blur-sm border border-white/30"
          >
            <FaTerminal className="text-[#172b4d] dark:text-[#fdbb2d]" />
            <span className="text-[#172b4d] dark:text-white font-mono text-sm font-bold tracking-widest uppercase">System Online</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="drop-shadow-sm"
          >
            <h2 className="text-5xl md:text-7xl font-alegreya text-[#172b4d] font-extrabold mb-2 tracking-tight">
              Hey, I'm <span className="text-gradient drop-shadow-sm">Momanyi</span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-mono text-[#172b4d] font-bold mb-8 h-[40px] md:h-[50px]">
              <span className="text-white drop-shadow-md">{'> '}</span>
              <Typewriter
                words={['Cybersecurity Expert', 'Full-Stack Developer', 'Network Architect', 'System Engineer']}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#172b4d] text-lg md:text-xl leading-relaxed mb-10 drop-shadow-sm font-medium bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20"
          >
            I engineer secure, scalable, and high-performance digital ecosystems. From architecting ISP networks and hardening security perimeters to deploying full-stack React and Rails applications, I bridge the gap between infrastructure and innovation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col space-y-5"
          >
            <p className="uppercase text-[#172b4d] font-extrabold tracking-widest text-sm drop-shadow-sm">Establish Connection</p>
            <ul className="flex space-x-6 text-[#505f79] text-2xl">
              {socialLinks.map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ scale: 1.2, color: '#6070ff', rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={link.url} target="_blank" rel="noreferrer" className="block p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/50">
                    {link.icon}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 3D Canvas Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full md:w-[40%] h-[400px] md:h-[600px] mt-10 md:mt-0 relative z-20"
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <AnimatedShape />
              <Environment preset="city" />
              <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary text-2xl hidden md:block z-20"
      >
        <a href="#work-card" className="bg-white/80 p-4 rounded-full backdrop-blur-md border border-white block shadow-lg hover:bg-white transition-colors"><FaArrowDown /></a>
      </motion.div>
    </section>
  );
};

export default Hero;