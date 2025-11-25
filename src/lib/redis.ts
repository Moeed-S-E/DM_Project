import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const getRedis = async (key: string) => {
  return await redis.get(key);
};

export const setRedis = async (key: string, value: any, ttl = 300) => {
  return await redis.set(key, value, { ex: ttl });
};

export const delRedis = async (key: string) => {
  try {
    return await redis.del(key);
  } catch (err) {
    console.error('Failed to delete redis key', key, err);
    return null;
  }
};
