import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

const GitHubActivity = () => {
  const [colorScheme, setColorScheme] = useState('light');

  // Listen for dark mode class changes on the HTML element
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setColorScheme(isDark ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Initial check
    if (document.documentElement.classList.contains('dark')) {
      setColorScheme('dark');
    }

    return () => observer.disconnect();
  }, []);

  // Custom theme matching the portfolio's primary brand color (#6070ff)
  // Generating a beautiful monochromatic scale from light to dark blue
  const customTheme = {
    light: ['#ebedf0', '#c0c8ff', '#8f9eff', '#6070ff', '#3245d1'],
    dark: ['#161b22', '#1e2863', '#2d3b94', '#4053fc', '#6070ff'],
  };

  return (
    <section className="py-20 px-6 md:px-[12%] bg-[#f8f9fa] dark:bg-slate-800 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-alegreya font-bold text-secondary dark:text-white mb-2 text-center">Open Source Activity</h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10"></div>
        
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 flex justify-center">
          <div className="min-w-fit">
            <GitHubCalendar 
              username="fullstop125" 
              theme={customTheme}
              colorScheme={colorScheme}
              fontSize={14}
              blockSize={16}
              blockMargin={6}
              blockRadius={4}
              style={{ 
                color: colorScheme === 'dark' ? '#f1f5f9' : '#344563',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default GitHubActivity;