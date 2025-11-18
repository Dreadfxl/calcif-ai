import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

let isConnected = false;

export async function getRedisClient() {
  if (!isConnected) {
    await redisClient.connect();
    isConnected = true;
  }
  return redisClient;
}

export async function cacheClassification(
  taskId: string,
  result: { bucketId: string; confidence: number }
) {
  const client = await getRedisClient();
  await client.setEx(
    `classification:${taskId}`,
    3600, // 1 hour cache
    JSON.stringify(result)
  );
}

export async function getCachedClassification(taskId: string) {
  const client = await getRedisClient();
  const cached = await client.get(`classification:${taskId}`);
  return cached ? JSON.parse(cached) : null;
}
