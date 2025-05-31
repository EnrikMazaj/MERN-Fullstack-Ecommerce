import request from 'supertest';
import { app } from '../server.js';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Route Endpoints', () => {
    describe('GET /api/routes', () => {
        test('should return all routes', async () => {
            const response = await request(app)
                .get('/api/routes')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });

        test('should return routes with correct structure', async () => {
            const response = await request(app)
                .get('/api/routes')
                .expect(200);

            if (response.body.length > 0) {
                const route = response.body[0];
                expect(route).toHaveProperty('origin');
                expect(route).toHaveProperty('destination');
                expect(route).toHaveProperty('price');
                expect(route).toHaveProperty('duration');
            }
        });
    });

    describe('GET /api/routes/:id', () => {
        test('should return 404 for non-existent route', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            await request(app)
                .get(`/api/routes/${nonExistentId}`)
                .expect(404);
        });

        test('should return route by id', async () => {
            // First create a route
            const createResponse = await request(app)
                .post('/api/routes')
                .send({
                    origin: 'Test Origin',
                    destination: 'Test Destination',
                    price: 50,
                    duration: 120
                })
                .expect(201);

            const routeId = createResponse.body._id;

            // Then fetch it
            const response = await request(app)
                .get(`/api/routes/${routeId}`)
                .expect(200);

            expect(response.body).toHaveProperty('origin', 'Test Origin');
            expect(response.body).toHaveProperty('destination', 'Test Destination');
        });
    });

    describe('POST /api/routes', () => {
        test('should create new route', async () => {
            const newRoute = {
                origin: 'New Origin',
                destination: 'New Destination',
                price: 75,
                duration: 90
            };

            const response = await request(app)
                .post('/api/routes')
                .send(newRoute)
                .expect(201);

            expect(response.body).toHaveProperty('origin', newRoute.origin);
            expect(response.body).toHaveProperty('destination', newRoute.destination);
            expect(response.body).toHaveProperty('price', newRoute.price);
            expect(response.body).toHaveProperty('duration', newRoute.duration);
        });

        test('should validate required fields', async () => {
            const invalidRoute = {
                origin: 'Test Origin'
                // Missing required fields
            };

            await request(app)
                .post('/api/routes')
                .send(invalidRoute)
                .expect(400);
        });
    });

    describe('PUT /api/routes/:id', () => {
        test('should update existing route', async () => {
            // First create a route
            const createResponse = await request(app)
                .post('/api/routes')
                .send({
                    origin: 'Original Origin',
                    destination: 'Original Destination',
                    price: 50,
                    duration: 120
                })
                .expect(201);

            const routeId = createResponse.body._id;

            // Then update it
            const updatedRoute = {
                origin: 'Updated Origin',
                destination: 'Updated Destination',
                price: 60,
                duration: 130
            };

            const response = await request(app)
                .put(`/api/routes/${routeId}`)
                .send(updatedRoute)
                .expect(200);

            expect(response.body).toHaveProperty('origin', updatedRoute.origin);
            expect(response.body).toHaveProperty('destination', updatedRoute.destination);
            expect(response.body).toHaveProperty('price', updatedRoute.price);
            expect(response.body).toHaveProperty('duration', updatedRoute.duration);
        });

        test('should return 404 for non-existent route', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            await request(app)
                .put(`/api/routes/${nonExistentId}`)
                .send({
                    origin: 'Test Origin',
                    destination: 'Test Destination',
                    price: 50,
                    duration: 120
                })
                .expect(404);
        });
    });

    describe('DELETE /api/routes/:id', () => {
        test('should delete existing route', async () => {
            // First create a route
            const createResponse = await request(app)
                .post('/api/routes')
                .send({
                    origin: 'To Delete Origin',
                    destination: 'To Delete Destination',
                    price: 50,
                    duration: 120
                })
                .expect(201);

            const routeId = createResponse.body._id;

            // Then delete it
            await request(app)
                .delete(`/api/routes/${routeId}`)
                .expect(200);

            // Verify it's deleted
            await request(app)
                .get(`/api/routes/${routeId}`)
                .expect(404);
        });

        test('should return 404 for non-existent route', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            await request(app)
                .delete(`/api/routes/${nonExistentId}`)
                .expect(404);
        });
    });
}); 
