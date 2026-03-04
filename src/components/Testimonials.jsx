import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: "Ahmad Zaki Yousufi",
    role: "Full-Stack Developer",
    text: "Hassan is a fantastic JavaScript developer. We worked together on several complex projects at Microverse, and his ability to solve problems quickly and write clean, maintainable code is truly impressive. He is a great team player.",
    avatar: "https://ui-avatars.com/api/?name=Ahmad+Zaki&background=6070ff&color=fff"
  },
  {
    name: "Jane Doe",
    role: "Senior Engineer",
    text: "Working with Momanyi was a game-changer for our architecture. He has a deep understanding of how to build scalable backend systems while keeping the frontend performant and accessible.",
    avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=22c1c3&color=fff"
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-[12%] bg-gradient-to-br from-[#b1e1ff]/30 to-[#fdbb2d]/10 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-alegreya font-bold text-secondary dark:text-white mb-4">Peer Recommendations</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-sm border border-white/50 dark:border-slate-700 relative hover:-translate-y-2 transition-transform duration-300"
          >
            <FaQuoteLeft className="absolute top-6 left-6 text-4xl text-primary/10 dark:text-blue-500/10" />
            <p className="text-tertiary dark:text-gray-300 relative z-10 leading-relaxed italic mb-8 pt-4">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-4">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full shadow-sm" />
              <div>
                <h4 className="font-bold text-secondary dark:text-white text-lg">{testimonial.name}</h4>
                <span className="text-primary dark:text-blue-400 text-sm font-medium uppercase tracking-wide">{testimonial.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;