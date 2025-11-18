import { create } from 'zustand';
import { Task, Bucket } from '@/types';

interface AppState {
  tasks: Task[];
  buckets: Bucket[];
  selectedBucketId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;

  setBuckets: (buckets: Bucket[]) => void;
  addBucket: (bucket: Bucket) => void;
  updateBucket: (id: string, updates: Partial<Bucket>) => void;
  deleteBucket: (id: string) => void;

  setSelectedBucketId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  tasks: [],
  buckets: [],
  selectedBucketId: null,
  isLoading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) => set((state) => ({
    tasks: [task, ...state.tasks]
  })),

  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) => 
      task.id === id ? { ...task, ...updates } : task
    )
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),

  completeTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id 
        ? { ...task, isCompleted: true, completedAt: new Date() }
        : task
    )
  })),

  setBuckets: (buckets) => set({ buckets }),

  addBucket: (bucket) => set((state) => ({
    buckets: [...state.buckets, bucket]
  })),

  updateBucket: (id, updates) => set((state) => ({
    buckets: state.buckets.map((bucket) =>
      bucket.id === id ? { ...bucket, ...updates } : bucket
    )
  })),

  deleteBucket: (id) => set((state) => ({
    buckets: state.buckets.filter((bucket) => bucket.id !== id)
  })),

  setSelectedBucketId: (id) => set({ selectedBucketId: id }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
