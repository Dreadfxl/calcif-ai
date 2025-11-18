import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.8) return 'text-matrix-green';
  if (confidence >= 0.6) return 'text-cyber-yellow';
  return 'text-warning';
}

export function getGeometricIconPath(icon: string): string {
  const paths: Record<string, string> = {
    square: 'M 10 10 L 90 10 L 90 90 L 10 90 Z',
    triangle: 'M 50 10 L 90 90 L 10 90 Z',
    circle: 'M 50 50 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0',
    diamond: 'M 50 10 L 90 50 L 50 90 L 10 50 Z',
    hexagon: 'M 30 10 L 70 10 L 90 50 L 70 90 L 30 90 L 10 50 Z',
  };
  return paths[icon] || paths.square;
}
