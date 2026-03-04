import React from 'react';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';

const Portfolio = ({ onOpenModal }) => {
  return (
    <section id="work-card" className="py-24 px-6 md:px-[12%] bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-alegreya font-bold text-secondary mb-4">Featured Projects</h2>
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
            className="group relative bg-[#f8f9fa] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/about-image/${project.imag})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Content Container */}
            <div className="p-8 flex flex-col flex-grow bg-white z-10 -mt-6 rounded-t-3xl border-t border-gray-100">
              <h4 className="text-2xl font-bold font-alegreya text-secondary mb-2 group-hover:text-primary transition-colors">{project.title}</h4>
              
              <ul className="flex flex-wrap items-center text-xs font-semibold uppercase tracking-wider mb-4 space-x-2 text-gray-500">
                <li className="text-primary">{project.role}</li>
                <li>•</li>
                <li>{project.clientName}</li>
                <li>•</li>
                <li>{project.clientYear}</li>
              </ul>
              
              <p className="text-tertiary text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                {project.projectDescription}
              </p>
              
              <ul className="flex flex-wrap gap-2 mb-8">
                {project.tags.slice(0, 4).map((tag, i) => (
                  <li key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-semibold">
                    {tag}
                  </li>
                ))}
                {project.tags.length > 4 && (
                  <li className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-semibold">
                    +{project.tags.length - 4}
                  </li>
                )}
              </ul>
              
              <button 
                onClick={() => onOpenModal(project)}
                className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-xl font-semibold transition-colors duration-300 shadow-sm"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;