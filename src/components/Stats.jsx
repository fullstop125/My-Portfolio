import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

const Counter = ({ target, suffix, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const duration = 1800;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col items-center py-4">
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-blue-400 font-mono">
        {count}{suffix}
      </span>
      <span className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs font-semibold mt-2 uppercase tracking-wider text-center leading-tight">
        {label}
      </span>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { target: 6, suffix: '+', label: 'Years Experience' },
    { target: 350, suffix: '+', label: 'Design Projects Delivered' },
    { target: 8, suffix: '+', label: 'Certifications Earned' },
    { target: 10, suffix: '+', label: 'Countries Collaborated' },
  ];

  return (
    <section className="py-10 md:py-14 px-6 md:px-[12%] bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <Counter key={i} target={stat.target} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>
    </section>
  );
};

export default Stats;
