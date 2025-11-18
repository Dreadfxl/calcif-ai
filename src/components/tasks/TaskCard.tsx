'use client';

import { Task, Bucket } from '@/types';
import { motion } from 'framer-motion';
import DogBone from '../ui/DogBone';
import { formatDate, getConfidenceColor } from '@/lib/utils';
import { useStore } from '@/lib/store';

interface TaskCardProps {
  task: Task;
  bucket?: Bucket;
}

export default function TaskCard({ task, bucket }: TaskCardProps) {
  const completeTask = useStore((state) => state.completeTask);

  const handleComplete = () => {
    if (!task.isCompleted) {
      completeTask(task.id);
    }
  };

  const dogBoneState = task.isCompleted
    ? 'completed'
    : task.classificationStatus === 'classified'
    ? 'classified'
    : 'unclassified';

  return (
    <motion.div
      className="bg-concrete-dark border-brutalist-medium p-brutalist-lg shadow-brutalist-card relative"
      style={{ borderColor: bucket?.color || '#C0C0C0' }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      layout
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-concrete-texture opacity-50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-brutalist-sm">
          <h3 className="font-header text-lg uppercase tracking-wider text-chrome">
            {task.title}
          </h3>
          <DogBone
            state={dogBoneState}
            color={bucket?.color || '#00FFFF'}
            size={32}
            onClick={handleComplete}
            className="cursor-pointer"
          />
        </div>

        {/* Description */}
        {task.description && (
          <p className="font-mono text-sm text-chrome/80 mb-brutalist-md">
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-brutalist-md pt-brutalist-sm border-t-2 border-chrome/20">
          <div className="flex items-center gap-brutalist-sm">
            {bucket && (
              <span
                className="px-3 py-1 bg-deep border-2 font-mono text-xs uppercase tracking-wider"
                style={{ borderColor: bucket.color, color: bucket.color }}
              >
                {bucket.name}
              </span>
            )}
            {task.confidence !== undefined && (
              <span
                className={`font-mono text-xs ${
                  getConfidenceColor(task.confidence)
                }`}
              >
                {Math.round(task.confidence * 100)}% CONFIDENCE
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-chrome/60">
            {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      {/* Completion flash effect */}
      {task.isCompleted && (
        <motion.div
          className="absolute inset-0 bg-matrix-green pointer-events-none"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}
