'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'secondary';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    const variantStyles = {
      primary: 'border-cyber-blue hover:shadow-neon-blue',
      success: 'border-matrix-green hover:shadow-neon-green',
      warning: 'border-warning hover:shadow-[0_0_20px_#FF6B00]',
      secondary: 'border-chrome hover:shadow-brutalist-elevated',
    };

    return (
      <motion.button
        ref={ref}
        className={cn('btn-brutalist', variantStyles[variant], className)}
        whileHover={{ y: -4 }}
        whileTap={{ y: 0 }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="animate-pulse">LOADING</span>
            <span className="text-neon-blue">...</span>
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
