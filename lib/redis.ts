import Redis from "ioredis";

// Create a Redis client connected to your Redis server
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost", // Replace with your Redis host
  port: 6379, // Default Redis port
  family: 4, // IPv4
  db: 0, // Select the default database
  connectTimeout: 100000, // 100 seconds
  keyPrefix: process.env.REDIS_PREFIX,
});

export default redis;
