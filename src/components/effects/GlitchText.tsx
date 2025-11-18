'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

export default function GlitchText({ text, className = '', trigger = false }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), 300);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        animate={isGlitching ? { x: [-2, 2, -2, 2, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.span>
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-cyber-blue"
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-warning"
            animate={{ x: [3, -3, 3] }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  );
}
