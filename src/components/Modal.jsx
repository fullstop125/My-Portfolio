import React from 'react';
import { FaTimes, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-white/80 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl p-6 sm:p-8 animate-[modal-swoop_0.4s_ease-out_forwards]">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-alegreya font-bold text-secondary">{project.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl transition-colors">
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-wrap items-center text-[13px] font-semibold uppercase tracking-wide mb-6 space-x-3">
          <li className="text-secondary">{project.role}</li>
          <li className="w-2 h-2 rounded-full bg-[#c1c7d0]"></li>
          <li className="text-[#7a869a]">{project.clientName}</li>
          <li className="w-2 h-2 rounded-full bg-[#c1c7d0]"></li>
          <li className="text-[#7a869a]">{project.clientYear}</li>
        </ul>

        <img 
          src={`${import.meta.env.BASE_URL}images/about-image/${project.imag}`} 
          alt={project.title} 
          className="w-full h-64 sm:h-[400px] object-cover rounded-xl mb-6 shadow-sm"
        />

        <div className="flex flex-col sm:flex-row gap-8">
          <p className="sm:w-2/3 text-tertiary text-base leading-relaxed">
            {project.projectDescription}
          </p>

          <div className="sm:w-1/3 flex flex-col">
            <ul className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <li key={i} className="bg-[#ebebff] text-primary px-3 py-1 rounded-lg text-sm font-medium">
                  {tag}
                </li>
              ))}
            </ul>
            
            <hr className="border-gray-200 mb-6" />

            <div className="flex flex-col xl:flex-row gap-4">
              <a 
                href={project.seeLive} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white/50 border border-white/70 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-white transition-all shadow-sm flex-1"
              >
                See Live <FaExternalLinkAlt size={14} />
              </a>
              <a 
                href={project.seeSource} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white/50 border border-white/70 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-white transition-all shadow-sm flex-1"
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
