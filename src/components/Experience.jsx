import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { terminalReveal, glitchItem, dataTrace } from '../utils/transitions';

const experiences = [
  {
    type: 'work',
    title: 'Network Architect',
    company: 'Kraftnet',
    date: 'Mar 2024 - Mar 2025',
    description: 'Architected and deployed ISP network stack with MikroTik routers and EPON OLTs for reliable internet delivery. Implemented secure client provisioning with PPPoE and static IP configurations, and developed automation scripts for payment-triggered client activation and backend integrations.',
  },
  {
    type: 'work',
    title: 'Graphics Designer',
    company: 'HeyDelegate',
    date: 'Feb 2022 - Present',
    description: 'Led a team of three designers, increasing productivity by 30%. Delivered over 350 graphic design projects, implementing best practices that increased user engagement by 20%. Created and managed a design library and style guide, improving consistency and efficiency by 25%.',
  },
  {
    type: 'work',
    title: 'Full-stack Developer',
    company: 'Microverse',
    date: 'Jun 2022 - Present',
    description: 'Collaborated remotely with a diverse team of engineers worldwide. Led the development of a reservation web app (Eventify) with React and Ruby on Rails. Improved performance of a recipe web app resulting in a 15% increase in daily active users. Built multiple full-stack applications focusing on API integration and UI performance.',
  },
  {
    type: 'work',
    title: 'Student Mentor',
    company: 'Microverse',
    date: 'Aug 2022 - Mar 2024',
    description: 'Mentored students through a rigorous software engineering curriculum, increasing student retention and graduation rates. Provided guidance on improving code quality, time management, and overall technical performance in pair-programming environments.',
  },
  {
    type: 'work',
    title: 'Quality Analyst',
    company: 'CloudFactory',
    date: 'Aug 2019 - Nov 2023',
    description: 'Identified and resolved production-process flaws to increase dataset production efficiency. Compiled and analyzed statistical data, utilizing data visualization and predictive modeling to aid decision-making and improve product quality standards.',
  },
  {
    type: 'work',
    title: 'IT Technician',
    company: 'Zetech University',
    date: 'Jan 2019 - Jun 2019',
    description: 'Developed and maintained local networks, optimizing performance and increasing network uptime. Implemented security measures, set up workstations, and provided technical support to ensure system functionality and user productivity.',
  },
  {
    type: 'education',
    title: 'Computer Software Engineering',
    company: 'Microverse',
    date: 'Jun 2022 - Feb 2023',
    description: 'Earned multiple certifications including Full-Stack Web Development, Front-End Web Development, Ruby on Rails, JavaScript, and ReactJS. Mastered building complex web applications through remote pair-programming.',
  },
  {
    type: 'education',
    title: "Bachelor's degree, Information Technology",
    company: 'Zetech University',
    date: 'Graduated',
    description: 'Earned a BSIT with a comprehensive understanding of programming, data management, networking, and software development. Learned to design and implement IT systems using various modern technologies.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-[12%] bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <motion.div 
        variants={terminalReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-alegreya font-bold text-secondary dark:text-white mb-4 uppercase tracking-wider">System Logs: Experience</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </motion.div>

      <motion.div 
        variants={terminalReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Animated Data Trace Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-800 md:-translate-x-1/2">
          <motion.div 
            variants={dataTrace}
            className="w-full bg-gradient-to-b from-primary via-[#ff1ead] to-transparent rounded-full shadow-[0_0_10px_#4053fc]"
          />
        </div>

        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            variants={glitchItem}
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
      </motion.div>
    </section>
  );
};

export default Experience;