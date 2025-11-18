'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useStore } from '@/lib/store';

interface TaskFormProps {
  onSubmit: (title: string, description?: string) => Promise<void>;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = useStore((state) => state.isLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(title, description || undefined);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-concrete-dark border-brutalist-medium border-chrome shadow-brutalist-card p-brutalist-lg mb-brutalist-xl relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-concrete-texture opacity-50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 space-y-brutalist-md">
        <h2 className="font-header text-brutalist-h3 text-neon-blue uppercase mb-brutalist-lg">
          NEW TASK
        </h2>

        <Input
          label="TASK TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          required
          disabled={isSubmitting || isLoading}
        />

        <div>
          <label className="block font-header text-sm tracking-wider text-chrome uppercase mb-2">
            DESCRIPTION (OPTIONAL)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            className="w-full px-4 py-3 bg-concrete-dark border-brutalist-thin border-chrome font-mono text-chrome focus:border-cyber-blue focus:outline-none focus:shadow-neon-blue transition-all duration-150 min-h-[100px] resize-none"
            disabled={isSubmitting || isLoading}
          />
        </div>

        <div className="flex gap-brutalist-md pt-brutalist-md">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting || isLoading}
            disabled={!title.trim()}
            className="flex-1"
          >
            {isSubmitting ? 'CLASSIFYING...' : 'CREATE & CLASSIFY'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setTitle('');
              setDescription('');
            }}
            disabled={isSubmitting || isLoading}
          >
            CLEAR
          </Button>
        </div>
      </div>

      {/* Matrix rain effect on submit */}
      {isSubmitting && (
        <motion.div
          className="absolute inset-0 bg-matrix-rain pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.form>
  );
}
