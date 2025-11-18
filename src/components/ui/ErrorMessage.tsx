'use client';

import { motion } from 'framer-motion';
import Button from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      className="card-brutalist border-warning p-brutalist-xl text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-brutalist-md">
        <svg
          className="mx-auto"
          width="64"
          height="64"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 10 L 90 90 L 10 90 Z"
            fill="none"
            stroke="#FF6B00"
            strokeWidth="4"
          />
          <text
            x="50"
            y="70"
            textAnchor="middle"
            fill="#FF6B00"
            fontSize="48"
            fontWeight="bold"
          >
            !
          </text>
        </svg>
      </div>
      <h3 className="font-header text-xl text-warning uppercase tracking-wider mb-brutalist-sm">
        ERROR
      </h3>
      <p className="font-mono text-sm text-chrome/80 mb-brutalist-lg">
        {message}
      </p>
      {onRetry && (
        <Button variant="warning" onClick={onRetry}>
          RETRY
        </Button>
      )}
    </motion.div>
  );
}
