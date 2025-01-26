import redis from "@/lib/redis";

export async function getSession(userId: number) {
  const sessionKey = `session:${userId}`;
  const sessionData = await redis.get(sessionKey);

  if (sessionData) {
    return JSON.parse(sessionData); // Return the parsed user session data
  }

  return null;
}

export async function clearSession(userId: number) {
  const sessionKey = `session:${userId}`;

  await redis.del(sessionKey); // Delete the session data from Redis
}
