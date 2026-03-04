import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

const GitHubActivity = () => {
  // Using explicit theme object for react-github-calendar v4+
  const explicitTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
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
        
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex justify-center">
          {/* Replace 'fullstop125' with actual GitHub username if different */}
          <GitHubCalendar 
            username="fullstop125" 
            theme={explicitTheme}
            colorScheme="light" // Handled by CSS vars dynamically or we can force match
            fontSize={14}
            blockSize={15}
            blockMargin={5}
            style={{ color: 'var(--tw-prose-body)' }} // Inherits dark mode text color via tailwind if wrapped in prose, or just hardcode text color
          />
        </div>
      </motion.div>
    </section>
  );
};

export default GitHubActivity;