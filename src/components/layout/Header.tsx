'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';

export default function Header() {
  const tasks = useStore((state) => state.tasks);
  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalCount = tasks.length;

  return (
    <header className="h-20 bg-deep border-b-brutalist-thick border-chrome flex items-center justify-between px-brutalist-xl relative overflow-hidden">
      {/* Matrix rain background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-matrix-green font-mono text-xs"
            style={{ left: `${i * 5}%` }}
            animate={{
              y: ['0vh', '100vh'],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            {Array.from({ length: 20 }, () =>
              Math.random() > 0.5 ? '1' : '0'
            ).join('')}
          </motion.div>
        ))}
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <motion.h1
          className="font-header text-4xl uppercase tracking-wider text-chrome-effect"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          CALCIF.AI
        </motion.h1>
        <motion.p
          className="font-mono text-xs text-cyber-blue tracking-widest mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          CLASSIFY. CALCIFY. COMPLETE.
        </motion.p>
      </div>

      {/* Stats */}
      <div className="relative z-10 flex gap-brutalist-lg">
        <div className="text-right">
          <div className="font-mono text-xs text-chrome/60 uppercase tracking-wider">
            TOTAL TASKS
          </div>
          <div className="font-header text-3xl text-cyber-blue">
            {totalCount}
          </div>
        </div>
        <div className="w-px bg-chrome/30" />
        <div className="text-right">
          <div className="font-mono text-xs text-chrome/60 uppercase tracking-wider">
            COMPLETED
          </div>
          <div className="font-header text-3xl text-matrix-green">
            {completedCount}
          </div>
        </div>
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(192,192,192,0.5) 10px, rgba(192,192,192,0.5) 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(192,192,192,0.5) 10px, rgba(192,192,192,0.5) 11px)',
        }}
      />
    </header>
  );
}
