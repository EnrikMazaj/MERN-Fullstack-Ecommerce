import { createClient } from 'redis';
import { RedisClientType } from '@redis/client';
import { RedisStore } from 'connect-redis';
import { Store } from 'express-session';

// Create Redis client with retry strategy
const redisClient: RedisClientType = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 3) {
                console.log('Max retries reached. Could not connect to Redis.');
                return new Error('Max retries reached');
            }
            return Math.min(retries * 100, 3000);
        }
    }
});

redisClient.on('error', (err: Error) => {
    console.error('Redis Client Error:', err.message);
});

redisClient.on('connect', () => {
    console.log('Successfully connected to Redis');
});

// Connect to Redis with retry logic
const connectToRedis = async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        // Don't throw here, let the application continue without Redis
    }
};

// Initialize the connection
connectToRedis();

// Configure session store
const store: Store = new RedisStore({
    client: redisClient,
    prefix: 'session:'
});

// Session configuration
export const sessionConfig = {
    store,
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'lax'
    }
};
