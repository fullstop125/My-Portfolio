import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaShieldAlt, FaNetworkWired } from 'react-icons/fa';
import { terminalReveal, glitchItem } from '../utils/transitions';

const services = [
  {
    icon: <FaCode className="text-4xl text-primary dark:text-blue-400" />,
    title: 'Full-Stack Development',
    items: [
      'React & Next.js SPAs',
      'Ruby on Rails APIs',
      'PostgreSQL & MongoDB',
      'Redux state management',
      'RESTful & GraphQL APIs',
    ],
  },
  {
    icon: <FaShieldAlt className="text-4xl text-primary dark:text-blue-400" />,
    title: 'Cybersecurity',
    items: [
      'Network hardening & firewalls',
      'CyberOps & threat analysis',
      'Vulnerability assessment',
      'Penetration testing basics',
      'pfSense & Fail2Ban',
    ],
  },
  {
    icon: <FaNetworkWired className="text-4xl text-primary dark:text-blue-400" />,
    title: 'Network Engineering',
    items: [
      'ISP stack deployment',
      'MikroTik configuration',
      'EPON/GPON provisioning',
      'PPPoE automation scripts',
      'BGP & OSPF routing',
    ],
  },
];

const Services = () => (
  <section className="py-16 md:py-24 px-6 md:px-[12%] bg-[#f8f9fa] dark:bg-slate-800 transition-colors duration-300">
    <motion.div
      variants={terminalReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-alegreya font-bold text-secondary dark:text-white mb-4 uppercase tracking-wider">
        What I Do
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
    </motion.div>

    <motion.div
      variants={terminalReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {services.map((service, i) => (
        <motion.div
          key={i}
          variants={glitchItem}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-primary/30 dark:hover:border-blue-500/50"
        >
          <div className="mb-5">{service.icon}</div>
          <h3 className="text-xl font-bold font-alegreya text-secondary dark:text-white mb-4">
            {service.title}
          </h3>
          <ul className="space-y-2">
            {service.items.map((item, j) => (
              <li key={j} className="flex items-center gap-2 text-tertiary dark:text-gray-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-blue-400 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Services;
