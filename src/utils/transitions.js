export const terminalReveal = {
  hidden: { 
    opacity: 0, 
    clipPath: "inset(0% 0% 100% 0%)",
    y: 10
  },
  visible: { 
    opacity: 1, 
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 50, 
      damping: 15,
      duration: 0.8,
      staggerChildren: 0.1 
    }
  }
};

export const glitchItem = {
  hidden: { opacity: 0, x: -10, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { 
      type: "spring",
      stiffness: 100 
    }
  }
};

export const dataTrace = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: "100%", 
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};
