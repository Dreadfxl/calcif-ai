'use client';

import { motion } from 'framer-motion';
import { GeometricIcon as IconType } from '@/types';
import { getGeometricIconPath } from '@/lib/utils';

interface GeometricIconProps {
  icon: IconType;
  color?: string;
  size?: number;
  filled?: boolean;
  animate?: boolean;
}

export default function GeometricIcon({
  icon,
  color = '#00FFFF',
  size = 32,
  filled = false,
  animate = false,
}: GeometricIconProps) {
  const path = getGeometricIconPath(icon);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={animate ? { scale: 1.1, rotate: 5 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <path
        d={path}
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="miter"
      />
    </motion.svg>
  );
}
