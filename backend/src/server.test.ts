import { app } from './server.js';
import dotenv from 'dotenv';
import { describe, expect, test, afterAll, beforeAll, jest } from '@jest/globals';
import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/database.js';

jest.mock('redis', () => ({
    createClient: jest.fn(() => ({
        connect: jest.fn().mockResolvedValue(undefined as never),
        on: jest.fn()
    }))
}));

jest.mock('connect-redis', () => ({
    RedisStore: jest.fn().mockImplementation(() => ({
        client: {
            connect: jest.fn().mockResolvedValue(undefined as never)
        }
    }))
}));

dotenv.config();

interface MiddlewareLayer {
    name: string;
    handle: RequestHandler;
}

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Server Configuration', () => {
    test('should have CORS middleware configured', () => {
        const corsMiddleware = app._router.stack.find(
            (layer: MiddlewareLayer) => layer.name === 'corsMiddleware'
        );
        expect(corsMiddleware).toBeDefined();
    });

    test('should have session middleware configured', () => {
        const sessionMiddleware = app._router.stack.find(
            (layer: MiddlewareLayer) =>
                layer.name === 'session' ||
                layer.name === 'express-session' ||
                (layer.handle && layer.handle.toString().includes('session'))
        );
        expect(sessionMiddleware).toBeDefined();
    });
});

describe('Server Tests', () => {
    test('should connect to MongoDB', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    test('should have correct environment variables', () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(process.env.MONGODB_URL).toBeDefined();
        // Redis URL is optional in our new configuration
        // expect(process.env.REDIS_URL).toBeDefined();
    });
}); 
