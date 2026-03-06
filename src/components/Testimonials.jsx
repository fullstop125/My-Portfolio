import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sami Ullah",
    role: "Full-Stack Software Developer",
    text: "There is no better colleague than Momanyi Hassan. He is one of the most dedicated professionals I’ve worked with and is willing to put in that extra help whenever you need it. His expertise as a developer is considerable, and it helped our team come up with more efficient solutions for different projects.",
    avatar: "https://ui-avatars.com/api/?name=Sami+Ullah&background=6070ff&color=fff"
  },
  {
    name: "Abel Gebeyehu",
    role: "Software Engineer",
    text: "Having worked with Hassan together on several projects, I find him a highly skilled and dedicated professional. His calm nature and positive vibe make him a joy to work with. I have no hesitation in recommending him to potential employers.",
    avatar: "https://ui-avatars.com/api/?name=Abel+Gebeyehu&background=22c1c3&color=fff"
  },
  {
    name: "Saeqa Sultani",
    role: "Software Developer",
    text: "I worked alongside Hassan while building several JavaScript and React projects, and in that time, he consistently gave great effort to the team... Watching him adapt to our ever-changing environment was an inspiration! His ability to overcome challenges with a smile made him stand out. Any company would be lucky to have Hassan.",
    avatar: "https://ui-avatars.com/api/?name=Saeqa+Sultani&background=fdbb2d&color=fff"
  },
  {
    name: "Marvellous Ibironke",
    role: "Senior Software Engineer",
    text: "Having worked with Hassan, I would recommend him as a person with profound knowledge and great abilities in full-stack web development. He is goal-oriented, focused, and highly ambitious. His knowledge is vast and extensive, and he possesses exceptional leadership skills.",
    avatar: "https://ui-avatars.com/api/?name=Marvellous+Ibironke&background=ff1ead&color=fff"
  },
  {
    name: "Aamir khan",
    role: "Software Engineer",
    text: "Momanyi Hassan is a stunning Leader. He is amazingly determined, educated, and strives to transform his vision into the real world. What makes his initiative exceptional is his certified energy for helping other people and needing every one of us to succeed.",
    avatar: "https://ui-avatars.com/api/?name=Aamir+khan&background=6070ff&color=fff"
  },
  {
    name: "Hamid Ali",
    role: "Full-stack Developer",
    text: "Hassan is a great software developer who is very driven in the execution of his tasks. I can also attest that he is a very fast learner and his desire to learn more and develop his skills is insatiable. I strongly recommend him for any position that matches his skills.",
    avatar: "https://ui-avatars.com/api/?name=Hamid+Ali&background=22c1c3&color=fff"
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