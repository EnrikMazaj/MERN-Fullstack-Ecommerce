import { createClient } from 'redis';
import { RedisClientType } from '@redis/client';
import { RedisStore } from 'connect-redis';
import { Store } from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

let redisClient: RedisClientType | null = null;
let isRedisAvailable = false;

try {
    redisClient = createClient({
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

    if (process.env.NODE_ENV !== 'test') {
        redisClient.on('connect', () => {
            console.log('Redis client connected');
            isRedisAvailable = true;
        });

        redisClient.on('error', (error) => {
            console.error('Redis client error:', error.message);
            isRedisAvailable = false;
        });

        redisClient.on('end', () => {
            console.log('Redis client disconnected');
            isRedisAvailable = false;
        });

        redisClient.connect().then(() => {
            isRedisAvailable = true;
        }).catch((error) => {
            console.log('Redis not available, using memory store for sessions');
            isRedisAvailable = false;
        });
    }
} catch (error) {
    console.log('Redis client creation failed, using memory store for sessions');
    isRedisAvailable = false;
}

let store: Store | undefined;

if (redisClient && isRedisAvailable) {
    try {
        store = new RedisStore({
            client: redisClient,
            prefix: 'session:'
        });
    } catch (error) {
        console.log('Redis store creation failed, using memory store');
        store = undefined;
    }
}

const baseSessionConfig = {
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
        domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined,
        path: '/'
    }
};

export const sessionConfig = {
    ...baseSessionConfig,
    store
};
