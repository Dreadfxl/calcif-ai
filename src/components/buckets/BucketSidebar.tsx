'use client';

import { Bucket } from '@/types';
import { useStore } from '@/lib/store';
import GeometricIcon from '../ui/GeometricIcon';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BucketSidebarProps {
  buckets: Bucket[];
}

export default function BucketSidebar({ buckets }: BucketSidebarProps) {
  const { selectedBucketId, setSelectedBucketId } = useStore();

  return (
    <div className="w-80 bg-concrete-dark border-r-brutalist-thick border-chrome h-screen overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="p-brutalist-lg border-b-brutalist-medium border-chrome/30">
        <h2 className="font-header text-brutalist-h3 text-chrome-effect uppercase">
          BUCKETS
        </h2>
      </div>

      {/* All Tasks Button */}
      <motion.button
        className={cn(
          'w-full p-brutalist-lg text-left border-b-2 border-chrome/20',
          'font-header uppercase tracking-widest transition-all',
          selectedBucketId === null
            ? 'bg-cyber-blue/20 border-l-brutalist-thick border-l-cyber-blue text-cyber-blue'
            : 'text-chrome hover:bg-chrome/10'
        )}
        onClick={() => setSelectedBucketId(null)}
        whileHover={{ x: 4 }}
      >
        <div className="flex items-center gap-brutalist-md">
          <GeometricIcon icon="square" color="#00FFFF" size={24} filled />
          <span>ALL TASKS</span>
        </div>
      </motion.button>

      {/* Bucket List */}
      <div className="divide-y-2 divide-chrome/20">
        {buckets.map((bucket) => (
          <motion.button
            key={bucket.id}
            className={cn(
              'w-full p-brutalist-lg text-left transition-all',
              'font-header uppercase tracking-widest',
              selectedBucketId === bucket.id
                ? 'border-l-brutalist-thick text-neon-blue'
                : 'text-chrome hover:bg-chrome/10'
            )}
            style={{
              borderLeftColor:
                selectedBucketId === bucket.id ? bucket.color : 'transparent',
              backgroundColor:
                selectedBucketId === bucket.id
                  ? `${bucket.color}20`
                  : undefined,
            }}
            onClick={() => setSelectedBucketId(bucket.id)}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center gap-brutalist-md">
              <GeometricIcon
                icon={bucket.icon}
                color={bucket.color}
                size={24}
                filled={selectedBucketId === bucket.id}
                animate
              />
              <div className="flex-1">
                <div style={{ color: bucket.color }}>{bucket.name}</div>
                {bucket.description && (
                  <div className="text-xs font-mono text-chrome/60 normal-case tracking-normal mt-1">
                    {bucket.description}
                  </div>
                )}
              </div>
              {bucket.tasks && (
                <span
                  className="px-2 py-1 bg-deep border-2 font-mono text-xs"
                  style={{ borderColor: bucket.color, color: bucket.color }}
                >
                  {bucket.tasks.length}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Add Bucket Button */}
      <motion.button
        className="w-full p-brutalist-lg border-t-brutalist-medium border-chrome/30 font-header text-chrome uppercase tracking-widest hover:bg-chrome/10 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        + NEW BUCKET
      </motion.button>
    </div>
  );
}
