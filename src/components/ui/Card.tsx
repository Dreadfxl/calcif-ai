'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  borderColor?: string;
  glowColor?: string;
  animate?: boolean;
}

export default function Card({
  children,
  className,
  borderColor = 'border-chrome',
  glowColor,
  animate = false,
  ...props
}: CardProps) {
  const Component = animate ? motion.div : 'div';
  const motionProps = animate
    ? {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.4 },
      }
    : {};

  return (
    <Component
      className={cn('card-brutalist', borderColor, className)}
      style={glowColor ? { boxShadow: `0 0 20px ${glowColor}` } : undefined}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}
