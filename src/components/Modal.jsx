import React, { useEffect } from 'react';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaTerminal, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ project, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-secondary/80 dark:bg-black/80 backdrop-blur-md" 
          onClick={onClose}
        ></motion.div>

        {/* Modal Container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-[900px] max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(96,112,255,0.1)] border border-gray-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Terminal Window Header */}
          <div className="bg-gray-100 dark:bg-slate-800 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-slate-700 shrink-0">
            <div className="flex items-center gap-3">
              <FaTerminal className="text-primary dark:text-blue-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-secondary dark:text-gray-300">
                System_Query: {project.title.replace(/\s+/g, '_').toLowerCase()}.exe
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto custom-scrollbar p-6 sm:p-8 relative">
            {/* Grid Overlay inside modal */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10"></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
              <div>
                <h2 className="text-4xl sm:text-5xl font-alegreya font-bold text-secondary dark:text-white mb-3">
                  {project.title}
                </h2>
                <ul className="flex flex-wrap items-center text-xs font-mono font-semibold uppercase tracking-widest gap-3 text-gray-500 dark:text-gray-400">
                  <li className="text-primary dark:text-blue-400 bg-primary/10 dark:bg-blue-400/10 px-2 py-1 rounded">{project.role}</li>
                  <li>//</li>
                  <li>{project.clientName}</li>
                  <li>//</li>
                  <li>{project.clientYear}</li>
                </ul>
              </div>
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200 dark:border-green-500/20">
                <FaCheckCircle /> Status: Deployed
              </div>
            </div>

            {/* Image */}
            <div className="relative rounded-xl overflow-hidden mb-8 border border-gray-200 dark:border-slate-700 shadow-md group">
              <img 
                src={`${import.meta.env.BASE_URL}images/about-image/${project.imag}`} 
                alt={project.title} 
                className="w-full h-auto max-h-[450px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Two Column Layout for Details */}
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* Left Column: The Writeup */}
              <div className="lg:w-2/3 flex flex-col gap-8">
                <section>
                  <h3 className="text-xl font-mono font-bold text-secondary dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-primary dark:text-blue-400">&gt;</span> Overview
                  </h3>
                  <p className="text-tertiary dark:text-gray-300 text-lg leading-relaxed bg-gray-50 dark:bg-slate-800/50 p-5 rounded-xl border border-gray-100 dark:border-slate-700">
                    {project.projectDescription}
                  </p>
                </section>

                {project.keyFeatures && (
                  <section>
                    <h3 className="text-xl font-mono font-bold text-secondary dark:text-white mb-3 flex items-center gap-2">
                      <span className="text-primary dark:text-blue-400">&gt;</span> Key_Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-tertiary dark:text-gray-300">
                          <span className="text-primary dark:text-blue-400 mt-1">▹</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {project.challengesOvercome && (
                  <section>
                    <h3 className="text-xl font-mono font-bold text-secondary dark:text-white mb-3 flex items-center gap-2">
                      <span className="text-primary dark:text-blue-400">&gt;</span> Challenges_Overcome
                    </h3>
                    <p className="text-tertiary dark:text-gray-300 leading-relaxed border-l-2 border-primary dark:border-blue-400 pl-4 py-1">
                      {project.challengesOvercome}
                    </p>
                  </section>
                )}

                {project.architectureDecisions && (
                  <section>
                    <h3 className="text-xl font-mono font-bold text-secondary dark:text-white mb-3 flex items-center gap-2">
                      <span className="text-primary dark:text-blue-400">&gt;</span> Architecture
                    </h3>
                    <p className="text-tertiary dark:text-gray-300 leading-relaxed border-l-2 border-primary dark:border-blue-400 pl-4 py-1">
                      {project.architectureDecisions}
                    </p>
                  </section>
                )}
              </div>

              {/* Right Column: Tech Stack & Actions */}
              <div className="lg:w-1/3 flex flex-col gap-6">
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
                  <h3 className="text-lg font-mono font-bold text-secondary dark:text-white mb-4">Tech_Stack</h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <li key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 text-secondary dark:text-gray-300 px-3 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider shadow-sm hover:border-primary dark:hover:border-blue-400 hover:text-primary dark:hover:text-blue-400 transition-colors cursor-default">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <a 
                    href={project.seeLive} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-[#4053fc] transition-all shadow-md group"
                  >
                    <FaExternalLinkAlt className="group-hover:scale-110 transition-transform" /> Execute Live Demo
                  </a>
                  <a 
                    href={project.seeSource} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-secondary dark:text-white font-bold py-4 px-6 rounded-xl hover:border-primary dark:hover:border-blue-400 transition-all shadow-sm group"
                  >
                    <FaGithub className="text-xl group-hover:scale-110 transition-transform" /> View Source Code
                  </a>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
