import { app } from './server.js';
import dotenv from 'dotenv';
import { describe, expect, test, afterAll, jest } from '@jest/globals';
import { RequestHandler } from 'express';

// Mock Redis module
jest.mock('./config/redis.js', () => ({
    sessionConfig: {
        secret: 'test-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        }
    }
}));

// Load environment variables from .env file
dotenv.config();

interface MiddlewareLayer {
    name: string;
    handle: RequestHandler;
}

describe('Server Configuration', () => {
    afterAll(async () => {
        // Close the Express server
        await new Promise<void>((resolve) => {
            app.listen().close(() => {
                resolve();
            });
        });
    });

    test('should have CORS middleware configured', () => {
        const corsMiddleware = app._router.stack.find(
            (layer: MiddlewareLayer) => layer.name === 'corsMiddleware'
        );
        expect(corsMiddleware).toBeDefined();
    });

    test('should have JSON middleware configured', () => {
        const jsonMiddleware = app._router.stack.find(
            (layer: MiddlewareLayer) => layer.name === 'jsonParser'
        );
        expect(jsonMiddleware).toBeDefined();
    });

    test('should have session middleware configured', () => {
        const sessionMiddleware = app._router.stack.find(
            (layer: MiddlewareLayer) => layer.name === 'session'
        );
        expect(sessionMiddleware).toBeDefined();
    });
}); 
