import { jest, beforeAll, afterAll } from '@jest/globals';
import mongoose from 'mongoose';

// Increase timeout for all tests
jest.setTimeout(10000);

// Add any global test setup here
beforeAll(() => {
    // Setup code that runs before all tests
});

// Global cleanup after all tests
afterAll(async () => {
    // Close MongoDB connection
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
}); 
