'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = '#00FFFF' 
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 16,
    md: 32,
    lg: 48,
  };

  const dimension = sizes[size];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        style={{
          width: dimension,
          height: dimension,
          border: `3px solid ${color}30`,
          borderTop: `3px solid ${color}`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
