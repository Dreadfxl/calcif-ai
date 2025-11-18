import { useEffect, useState } from 'react';
import { Bucket } from '@/types';
import { useStore } from '@/lib/store';

export function useBuckets() {
  const { buckets, setBuckets, addBucket, updateBucket, deleteBucket, setLoading, setError } = useStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      fetchBuckets();
    }
  }, [isInitialized]);

  async function fetchBuckets() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/buckets');
      if (!response.ok) throw new Error('Failed to fetch buckets');
      const data = await response.json();
      setBuckets(data);
      setIsInitialized(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  async function createBucket(bucket: Omit<Bucket, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/buckets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bucket),
      });
      if (!response.ok) throw new Error('Failed to create bucket');
      const newBucket = await response.json();
      addBucket(newBucket);
      return newBucket;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    buckets,
    createBucket,
    updateBucket,
    deleteBucket,
    refetch: fetchBuckets,
  };
}
