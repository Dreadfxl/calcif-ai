export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  completedAt?: Date;
  userId: string;
  bucketId?: string;
  classificationStatus: 'pending' | 'classified' | 'manual';
  confidence?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bucket {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: GeometricIcon;
  keywords: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  tasks?: Task[];
}

export type GeometricIcon = 'square' | 'triangle' | 'circle' | 'diamond' | 'hexagon';

export interface ClassificationResult {
  bucketId: string;
  confidence: number;
  reasoning?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface GeminiClassificationRequest {
  taskTitle: string;
  taskDescription?: string;
  buckets: Array<{
    id: string;
    name: string;
    description?: string;
    keywords: string[];
  }>;
}

export interface GeminiClassificationResponse {
  bucketId: string;
  confidence: number;
  reasoning: string;
}
