import React, { Suspense } from 'react';
import { FaTwitter, FaLinkedin, FaMedium, FaGithub, FaAngellist, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
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
      
      {/* Birds Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-50 md:opacity-100 z-0 overflow-hidden">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="drop-shadow-sm"
          >
            <h2 className="text-5xl md:text-7xl font-alegreya text-[#172b4d] font-bold mb-2 tracking-tight">
              Hey, I'm <span className="text-gradient drop-shadow-sm">Momanyi</span>
            </h2>
            <h3 className="text-3xl md:text-5xl font-alegreya text-[#172b4d] font-medium mb-8">
              Glad to see you!
            </h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#344563] text-lg md:text-xl leading-relaxed mb-10 drop-shadow-sm font-medium"
          >
            I am a versatile and experienced software developer with a passion for delivering innovative solutions. With a deep understanding of technologies like <strong>React, Ruby on Rails, Python,</strong> and <strong>2D/3D Media</strong>, I am equipped to tackle a wide range of projects and bring ideas to life with precision and creativity.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col space-y-5"
          >
            <p className="uppercase text-[#172b4d] font-extrabold tracking-widest text-sm drop-shadow-sm">Let's Connect</p>
            <ul className="flex space-x-6 text-[#505f79] text-2xl">
              {socialLinks.map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ scale: 1.2, color: '#6070ff' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={link.url} target="_blank" rel="noreferrer" className="block p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow border border-white/50">
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
        <a href="#work-card" className="bg-white/50 p-3 rounded-full backdrop-blur-sm border border-white block shadow-sm"><FaArrowDown /></a>
      </motion.div>
    </section>
  );
};

export default Hero;