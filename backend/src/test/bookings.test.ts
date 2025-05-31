import request from 'supertest';
import { app } from '../server.js';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let testRouteId: string;
let testUserId: string;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    const routeResponse = await request(app)
        .post('/api/routes')
        .send({
            origin: 'Test Origin',
            destination: 'Test Destination',
            price: 50,
            duration: 120
        });
    testRouteId = routeResponse.body._id;

    const userResponse = await request(app)
        .post('/api/users/register')
        .send({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User'
        });
    testUserId = userResponse.body._id;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Booking Endpoints', () => {
    describe('POST /api/bookings', () => {
        test('should create new booking', async () => {
            const newBooking = {
                routeId: testRouteId,
                userId: testUserId,
                seatNumber: 1,
                passengerName: 'John Doe',
                travelDate: new Date().toISOString(),
                isRoundTrip: false
            };

            const response = await request(app)
                .post('/api/bookings')
                .send(newBooking)
                .expect(201);

            expect(response.body).toHaveProperty('routeId', testRouteId);
            expect(response.body).toHaveProperty('userId', testUserId);
            expect(response.body).toHaveProperty('seatNumber', 1);
            expect(response.body).toHaveProperty('passengerName', 'John Doe');
        });

        test('should validate required fields', async () => {
            const invalidBooking = {
                routeId: testRouteId
            };

            await request(app)
                .post('/api/bookings')
                .send(invalidBooking)
                .expect(400);
        });

        test('should validate seat availability', async () => {
            const booking = {
                routeId: testRouteId,
                userId: testUserId,
                seatNumber: 2,
                passengerName: 'Jane Doe',
                travelDate: new Date().toISOString(),
                isRoundTrip: false
            };

            await request(app)
                .post('/api/bookings')
                .send(booking)
                .expect(201);

            await request(app)
                .post('/api/bookings')
                .send(booking)
                .expect(400);
        });
    });

    describe('GET /api/bookings', () => {
        test('should return all bookings for a user', async () => {
            const response = await request(app)
                .get('/api/bookings')
                .query({ userId: testUserId })
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            if (response.body.length > 0) {
                expect(response.body[0]).toHaveProperty('routeId');
                expect(response.body[0]).toHaveProperty('userId');
                expect(response.body[0]).toHaveProperty('seatNumber');
            }
        });
    });

    describe('GET /api/bookings/:id', () => {
        test('should return booking by id', async () => {
            const createResponse = await request(app)
                .post('/api/bookings')
                .send({
                    routeId: testRouteId,
                    userId: testUserId,
                    seatNumber: 3,
                    passengerName: 'Test Passenger',
                    travelDate: new Date().toISOString(),
                    isRoundTrip: false
                })
                .expect(201);

            const bookingId = createResponse.body._id;

            const response = await request(app)
                .get(`/api/bookings/${bookingId}`)
                .expect(200);

            expect(response.body).toHaveProperty('_id', bookingId);
            expect(response.body).toHaveProperty('routeId', testRouteId);
            expect(response.body).toHaveProperty('userId', testUserId);
        });

        test('should return 404 for non-existent booking', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            await request(app)
                .get(`/api/bookings/${nonExistentId}`)
                .expect(404);
        });
    });

    describe('PUT /api/bookings/:id', () => {
        test('should update existing booking', async () => {
            const createResponse = await request(app)
                .post('/api/bookings')
                .send({
                    routeId: testRouteId,
                    userId: testUserId,
                    seatNumber: 4,
                    passengerName: 'Original Name',
                    travelDate: new Date().toISOString(),
                    isRoundTrip: false
                })
                .expect(201);

            const bookingId = createResponse.body._id;

            const updatedBooking = {
                passengerName: 'Updated Name',
                seatNumber: 5
            };

            const response = await request(app)
                .put(`/api/bookings/${bookingId}`)
                .send(updatedBooking)
                .expect(200);

            expect(response.body).toHaveProperty('passengerName', 'Updated Name');
            expect(response.body).toHaveProperty('seatNumber', 5);
        });

        test('should return 404 for non-existent booking', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            await request(app)
                .put(`/api/bookings/${nonExistentId}`)
                .send({
                    passengerName: 'Test Name'
                })
                .expect(404);
        });
    });

    describe('DELETE /api/bookings/:id', () => {
        test('should delete existing booking', async () => {
            const createResponse = await request(app)
                .post('/api/bookings')
                .send({
                    routeId: testRouteId,
                    userId: testUserId,
                    seatNumber: 6,
                    passengerName: 'To Delete',
                    travelDate: new Date().toISOString(),
                    isRoundTrip: false
                })
                .expect(201);

            const bookingId = createResponse.body._id;

            await request(app)
                .delete(`/api/bookings/${bookingId}`)
                .expect(200);
                
            await request(app)
                .get(`/api/bookings/${bookingId}`)
                .expect(404);
        });

        test('should return 404 for non-existent booking', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            await request(app)
                .delete(`/api/bookings/${nonExistentId}`)
                .expect(404);
        });
    });
}); 
