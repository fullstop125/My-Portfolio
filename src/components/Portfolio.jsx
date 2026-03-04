import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import projectsData from '../data/projects.json';

const Portfolio = ({ onOpenModal }) => {
  return (
    <section id="work-card" className="py-24 px-6 md:px-[12%] bg-white dark:bg-slate-900 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-alegreya font-bold text-secondary dark:text-white mb-4">Featured Projects</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projectsData.map((project, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative bg-[#f8f9fa] dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 dark:border-slate-700 hover:border-primary/30 dark:hover:border-blue-500/50 flex flex-col h-full"
          >
            {/* Image Container with Interactive Overlay */}
            <div 
              className="relative h-64 md:h-80 w-full overflow-hidden cursor-pointer"
              onClick={() => onOpenModal(project)}
            >
              <img 
                src={`${import.meta.env.BASE_URL}images/about-image/${project.imag}`}
                alt={`Screenshot of ${project.title}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 dark:group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-sm">
                <span className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white dark:bg-slate-900 text-primary dark:text-blue-400 font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2">
                  View Details <FaArrowRight />
                </span>
              </div>
            </div>
            
            {/* Content Container */}
            <div className="p-8 flex flex-col flex-grow bg-white dark:bg-slate-800 z-10 relative">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-3xl font-bold font-alegreya text-secondary dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {project.title}
                </h4>
              </div>
              
              <ul className="flex flex-wrap items-center text-[11px] font-bold uppercase tracking-widest mb-5 space-x-2 text-gray-500 dark:text-gray-400">
                <li className="text-primary dark:text-blue-400">{project.role}</li>
                <li className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"></li>
                <li>{project.clientName}</li>
                <li className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"></li>
                <li>{project.clientYear}</li>
              </ul>
              
              <p className="text-tertiary dark:text-gray-300 text-base leading-relaxed mb-8 line-clamp-3 flex-grow">
                {project.projectDescription}
              </p>
              
              <ul className="flex flex-wrap gap-2 mb-8 mt-auto">
                {project.tags.slice(0, 4).map((tag, i) => (
                  <li key={i} className="bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 text-secondary dark:text-gray-300 px-4 py-1.5 rounded-lg text-xs font-semibold hover:border-primary hover:text-primary dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors cursor-default">
                    {tag}
                  </li>
                ))}
                {project.tags.length > 4 && (
                  <li className="bg-gray-50 dark:bg-slate-700/50 border border-transparent text-gray-500 dark:text-gray-400 px-4 py-1.5 rounded-lg text-xs font-semibold">
                    +{project.tags.length - 4} more
                  </li>
                )}
              </ul>
              
              <button 
                onClick={() => onOpenModal(project)}
                className="w-full bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-blue-500 dark:hover:text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 group/btn"
              >
                Read Case Study 
                <FaArrowRight className="transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;