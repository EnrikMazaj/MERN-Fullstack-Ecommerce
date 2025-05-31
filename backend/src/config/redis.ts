import { createClient } from 'redis';
import { RedisClientType } from '@redis/client';
import { RedisStore } from 'connect-redis';
import { Store } from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

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

if (process.env.NODE_ENV !== 'test') {
    redisClient.on('connect', () => {
    });

    redisClient.on('error', () => {
    });

    redisClient.connect().catch(() => {
    });
}

const store: Store = new RedisStore({
    client: redisClient,
    prefix: 'session:'
});

export const sessionConfig = {
    store,
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: 'none',
        domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined,
        path: '/'
    }
};
