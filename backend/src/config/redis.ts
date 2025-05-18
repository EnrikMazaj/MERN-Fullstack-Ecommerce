import { createClient } from 'redis';
import { RedisClientType } from '@redis/client';
import { RedisStore } from 'connect-redis';
import { Store } from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

// Create Redis client with retry strategy
const redisClient: RedisClientType = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 3) {
                return new Error('Max retries reached');
            }
            return Math.min(retries * 100, 3000);
        }
    }
});

// Only connect to Redis if we're not in a test environment
if (process.env.NODE_ENV !== 'test') {
    redisClient.on('connect', () => {
        // Connection success is handled silently
    });

    redisClient.on('error', () => {
        // Errors are handled by the application's error handling
    });

    // Connect to Redis
    redisClient.connect().catch(() => {
        // Connection errors are handled by the application's error handling
    });
}

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
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
    }
};
