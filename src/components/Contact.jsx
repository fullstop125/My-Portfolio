import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: '',
    email_address: '',
    comment: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('contactForm');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    localStorage.setItem('contactForm', JSON.stringify(newFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch("https://formspree.io/f/xbjwvonn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ username: '', email_address: '', comment: '' });
        localStorage.removeItem('contactForm');
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError('Oops! There was a problem submitting your form.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-[12%] bg-secondary text-white relative overflow-hidden transition-colors duration-300">
      {/* Background with dedicated shapes and gradient */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10 mix-blend-overlay"
        style={{ 
          backgroundImage: `url(${import.meta.env.BASE_URL}images/contact-form-background-shapes.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/90 dark:from-blue-900/80 dark:to-slate-900/90 pointer-events-none"></div>
      
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

        <div className="w-full md:w-1/2 relative">
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-secondary/95 backdrop-blur-md rounded-2xl border border-green-500/50"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 text-white text-3xl">✓</div>
                <h3 className="text-2xl font-bold font-alegreya text-white mb-2">Message Sent!</h3>
                <p className="text-white/80 text-center px-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form 
            onSubmit={handleSubmit}
            className={`flex flex-col gap-5 transition-opacity duration-300 ${isSuccess ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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
                placeholder="Email Address"
                required
                className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 outline-none focus:border-primary focus:bg-white/10 transition-all"
              />
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

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isSubmitting}
              className={`bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all mt-2 flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#4053fc]'}`}
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Send Message'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;