import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: '',
    email_address: '',
    comment: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('contactForm');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    localStorage.setItem('contactForm', JSON.stringify(newFormData));
    
    if (e.target.name === 'email_address') {
      if (e.target.value !== e.target.value.toLowerCase()) {
        setError('Please enter your email address in lowercase only.');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = (e) => {
    if (formData.email_address !== formData.email_address.toLowerCase()) {
      e.preventDefault();
      setError('Form not sent! Please enter your email address in lowercase.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-[12%] bg-secondary text-white relative">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg_Header.png)` }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-12 bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl"
      >
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-alegreya font-bold text-white mb-4">Let's work together</h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a project to discuss or just want to say hi, my inbox is open!
          </p>
          <div className="w-16 h-1 bg-primary rounded-full mb-8"></div>
        </div>

        <form 
          action="https://formspree.io/f/xbjwvonn" 
          method="post" 
          className="w-full md:w-1/2 flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Full Name"
              required
              maxLength="30"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 outline-none focus:border-primary focus:bg-white/10 transition-all"
            />
          </div>

          <div>
            <input
              type="email"
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
              placeholder="Email Address (lowercase)"
              required
              className={`w-full bg-white/5 border ${error ? 'border-red-400' : 'border-white/20'} rounded-xl px-5 py-4 text-white placeholder-white/50 outline-none focus:border-primary focus:bg-white/10 transition-all`}
            />
            {error && <p className="text-red-300 text-sm mt-2 font-medium">{error}</p>}
          </div>

          <div>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Your Message..."
              required
              maxLength="500"
              className="w-full h-32 bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 outline-none focus:border-primary focus:bg-white/10 transition-all resize-none"
            ></textarea>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-[#4053fc] transition-colors mt-2"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;