'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import Header from '@/components/layout/Header';
import BucketSidebar from '@/components/buckets/BucketSidebar';
import TaskForm from '@/components/tasks/TaskForm';
import TaskCard from '@/components/tasks/TaskCard';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { tasks, buckets, selectedBucketId, setTasks, setBuckets, setLoading } =
    useStore();

  useEffect(() => {
    // Fetch initial data
    async function fetchData() {
      setLoading(true);
      try {
        const [tasksRes, bucketsRes] = await Promise.all([
          fetch('/api/tasks'),
          fetch('/api/buckets'),
        ]);

        if (tasksRes.ok) {
          const tasksData = await tasksRes.json();
          setTasks(tasksData);
        }

        if (bucketsRes.ok) {
          const bucketsData = await bucketsRes.json();
          setBuckets(bucketsData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [setTasks, setBuckets, setLoading]);

  const handleCreateTask = async (title: string, description?: string) => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const newTask = await response.json();
    useStore.getState().addTask(newTask);
  };

  const filteredTasks = selectedBucketId
    ? tasks.filter((task) => task.bucketId === selectedBucketId)
    : tasks;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <BucketSidebar buckets={buckets} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-brutalist-xl">
          <div className="max-w-6xl mx-auto">
            {/* Task Form */}
            <TaskForm onSubmit={handleCreateTask} />

            {/* Task List */}
            <div className="space-y-brutalist-lg">
              {filteredTasks.length === 0 ? (
                <motion.div
                  className="text-center py-brutalist-xxl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="font-header text-2xl text-chrome/50 uppercase tracking-widest">
                    NO TASKS FOUND
                  </p>
                  <p className="font-mono text-sm text-chrome/30 mt-brutalist-md">
                    Create your first task to get started
                  </p>
                </motion.div>
              ) : (
                filteredTasks.map((task) => {
                  const bucket = buckets.find((b) => b.id === task.bucketId);
                  return <TaskCard key={task.id} task={task} bucket={bucket} />;
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
