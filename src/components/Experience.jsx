import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const experiences = [
  {
    type: 'work',
    title: 'Full-Stack Developer',
    company: 'Microverse',
    date: '2022 - Present',
    description: 'Mentored junior developers and built full-stack applications in a remote, pair-programming environment. Collaborated with international teams to deliver high-quality software using React, Ruby on Rails, and PostgreSQL.',
  },
  {
    type: 'work',
    title: 'Web Developer',
    company: 'Nelium Systems',
    date: '2021 - 2022',
    description: 'Developed responsive user interfaces and optimized backend Python services. Implemented robust REST APIs and improved data processing pipelines, reducing response times significantly.',
  },
  {
    type: 'education',
    title: 'Diploma in Crop Protection',
    company: 'University of Nairobi',
    date: '2018',
    description: 'Developed a strong foundation in research, analytical thinking, and systematic problem-solving before transitioning fully into software engineering.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-[12%] bg-white dark:bg-slate-900 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-alegreya font-bold text-secondary dark:text-white mb-4">Experience & Education</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700 md:-translate-x-1/2"></div>

        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row items-start mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-4 border-primary shadow-sm flex items-center justify-center -translate-x-[1.1rem] md:-translate-x-1/2 z-10">
              {exp.type === 'work' ? <FaBriefcase className="text-primary text-sm" /> : <FaGraduationCap className="text-primary text-sm" />}
            </div>

            {/* Content Box */}
            <div className="ml-16 md:ml-0 w-full md:w-[calc(50%-2.5rem)] bg-[#f8f9fa] dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-sm font-bold mb-4">
                {exp.date}
              </span>
              <h3 className="text-2xl font-bold font-alegreya text-secondary dark:text-white mb-1">{exp.title}</h3>
              <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">{exp.company}</h4>
              <p className="text-tertiary dark:text-gray-300 leading-relaxed text-sm md:text-base">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;