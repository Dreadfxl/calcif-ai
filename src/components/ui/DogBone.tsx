'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DogBoneProps {
  state: 'unclassified' | 'classified' | 'completed';
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function DogBone({
  state,
  color = '#00FFFF',
  size = 48,
  className,
  onClick,
}: DogBoneProps) {
  const variants = {
    unclassified: {
      fill: 'none',
      stroke: '#C0C0C0',
      strokeWidth: 2,
      filter: 'none',
    },
    classified: {
      fill: color,
      stroke: color,
      strokeWidth: 2,
      filter: 'url(#metallic-gradient)',
    },
    completed: {
      fill: color,
      stroke: color,
      strokeWidth: 3,
      filter: 'url(#neon-glow)',
    },
  };

  const animationVariants = {
    unclassified: {},
    classified: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 },
    },
    completed: {
      scale: [1, 1.3, 1.1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={cn('inline-block', className)}
      initial="unclassified"
      animate={state}
      variants={animationVariants}
      onClick={onClick}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="metallic-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8E8E8" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor="#A0A0A0" />
          </linearGradient>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Geometric dog bone - brutalist angular design */}
        <motion.path
          d="M 20 35 L 20 65 L 15 70 L 15 80 L 25 80 L 30 75 L 30 55 L 70 55 L 70 75 L 75 80 L 85 80 L 85 70 L 80 65 L 80 35 L 85 30 L 85 20 L 75 20 L 70 25 L 70 45 L 30 45 L 30 25 L 25 20 L 15 20 L 15 30 L 20 35 Z"
          {...variants[state]}
          animate={variants[state]}
          transition={{ duration: 0.2 }}
        />

        {/* Neon pulse animation for completed state */}
        {state === 'completed' && (
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="2"
            opacity="0.5"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </svg>
    </motion.div>
  );
}
