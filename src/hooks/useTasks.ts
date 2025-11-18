import { useEffect, useState } from 'react';
import { Task } from '@/types';
import { useStore } from '@/lib/store';

export function useTasks() {
  const { tasks, setTasks, addTask, updateTask, deleteTask, completeTask, setLoading, setError } = useStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      fetchTasks();
    }
  }, [isInitialized]);

  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setIsInitialized(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  async function createTask(title: string, description?: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error('Failed to create task');
      const newTask = await response.json();
      addTask(newTask);
      return newTask;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function updateTaskStatus(id: string, updates: Partial<Task>) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTask = await response.json();
      updateTask(id, updatedTask);
      return updatedTask;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function removeTask(id: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      deleteTask(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    tasks,
    createTask,
    updateTask: updateTaskStatus,
    deleteTask: removeTask,
    completeTask,
    refetch: fetchTasks,
  };
}
