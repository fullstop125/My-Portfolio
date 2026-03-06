import React, { useState, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

const GlitchText = ({ text, as: Component = 'span', className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovering) {
      let iterations = 0;
      interval = setInterval(() => {
        setDisplayText(_prev =>
          text.split('').map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          }).join('')
        );
        
        if (iterations >= text.length) {
          clearInterval(interval);
        }
        
        iterations += 1 / 3;
      }, 30);
    } else {
      setDisplayText(text);
    }
    
    return () => clearInterval(interval);
  }, [isHovering, text]);

  return (
    <Component 
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </Component>
  );
};

export default GlitchText;
