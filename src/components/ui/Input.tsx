'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block font-header text-sm tracking-wider text-chrome uppercase">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'input-brutalist',
            error && 'border-warning',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-warning font-mono">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
