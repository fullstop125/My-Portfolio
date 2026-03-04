import React from 'react';
import { FaTimes, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/40 dark:border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 animate-[modal-swoop_0.4s_ease-out_forwards]">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-alegreya font-bold text-secondary dark:text-white">{project.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-2xl transition-colors">
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-wrap items-center text-[13px] font-semibold uppercase tracking-wide mb-6 space-x-3">
          <li className="text-secondary dark:text-blue-400">{project.role}</li>
          <li className="w-2 h-2 rounded-full bg-[#c1c7d0] dark:bg-slate-600"></li>
          <li className="text-[#7a869a] dark:text-gray-400">{project.clientName}</li>
          <li className="w-2 h-2 rounded-full bg-[#c1c7d0] dark:bg-slate-600"></li>
          <li className="text-[#7a869a] dark:text-gray-400">{project.clientYear}</li>
        </ul>

        <img 
          src={`${import.meta.env.BASE_URL}images/about-image/${project.imag}`} 
          alt={project.title} 
          className="w-full h-64 sm:h-[400px] object-cover rounded-xl mb-6 shadow-sm border border-gray-100 dark:border-slate-700"
        />

        <div className="flex flex-col sm:flex-row gap-8">
          <p className="sm:w-2/3 text-tertiary dark:text-gray-300 text-base leading-relaxed">
            {project.projectDescription}
          </p>

          <div className="sm:w-1/3 flex flex-col">
            <ul className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <li key={i} className="bg-primary/10 dark:bg-blue-900/30 border border-primary/20 dark:border-blue-400/20 text-primary dark:text-blue-300 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {tag}
                </li>
              ))}
            </ul>
            
            <hr className="border-gray-200 dark:border-slate-700 mb-6" />

            <div className="flex flex-col xl:flex-row gap-4">
              <a 
                href={project.seeLive} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white/50 dark:bg-slate-800/50 border border-white/70 dark:border-slate-600 text-primary dark:text-white font-semibold py-2 px-4 rounded-lg hover:bg-white dark:hover:bg-primary transition-all shadow-sm flex-1"
              >
                See Live <FaExternalLinkAlt size={14} />
              </a>
              <a 
                href={project.seeSource} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white/50 dark:bg-slate-800/50 border border-white/70 dark:border-slate-600 text-primary dark:text-white font-semibold py-2 px-4 rounded-lg hover:bg-white dark:hover:bg-primary transition-all shadow-sm flex-1"
              >
                See Source <FaGithub size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
