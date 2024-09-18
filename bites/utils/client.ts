import { createClient, type RedisClientType } from "redis";

// Initializing Redis Client
let client: RedisClientType | null = null;

const initializeRedisClient = async () => {
  if (!client) {
    client = createClient();
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.on("connect", () => console.log("Connected to Redis"));
    await client.connect();
  }

  return client;
};

export { initializeRedisClient };
