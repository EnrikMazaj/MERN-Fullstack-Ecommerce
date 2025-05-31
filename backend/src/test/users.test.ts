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

describe('User Endpoints', () => {
    describe('POST /api/users/register', () => {
        test('should register new user', async () => {
            const newUser = {
                email: 'newuser@example.com',
                password: 'password123',
                name: 'New User'
            };

            const response = await request(app)
                .post('/api/users/register')
                .send(newUser)
                .expect(201);

            expect(response.body).toHaveProperty('email', newUser.email);
            expect(response.body).toHaveProperty('name', newUser.name);
            expect(response.body).not.toHaveProperty('password'); // Password should not be returned
        });

        test('should validate required fields', async () => {
            const invalidUser = {
                email: 'test@example.com'
                // Missing required fields
            };

            await request(app)
                .post('/api/users/register')
                .send(invalidUser)
                .expect(400);
        });

        test('should not allow duplicate email', async () => {
            const user = {
                email: 'duplicate@example.com',
                password: 'password123',
                name: 'Duplicate User'
            };

            await request(app)
                .post('/api/users/register')
                .send(user)
                .expect(201);

            await request(app)
                .post('/api/users/register')
                .send(user)
                .expect(400);
        });
    });

    describe('POST /api/users/login', () => {
        test('should login with valid credentials', async () => {
            const user = {
                email: 'login@example.com',
                password: 'password123',
                name: 'Login User'
            };

            await request(app)
                .post('/api/users/register')
                .send(user)
                .expect(201);

            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: user.email,
                    password: user.password
                })
                .expect(200);

            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('email', user.email);
            expect(response.body.user).not.toHaveProperty('password');
        });

        test('should not login with invalid credentials', async () => {
            await request(app)
                .post('/api/users/login')
                .send({
                    email: 'wrong@example.com',
                    password: 'wrongpassword'
                })
                .expect(401);
        });
    });

    describe('GET /api/users/profile', () => {
        let authToken: string;

        beforeAll(async () => {
            const user = {
                email: 'profile@example.com',
                password: 'password123',
                name: 'Profile User'
            };

            await request(app)
                .post('/api/users/register')
                .send(user)
                .expect(201);

            const loginResponse = await request(app)
                .post('/api/users/login')
                .send({
                    email: user.email,
                    password: user.password
                })
                .expect(200);

            authToken = loginResponse.body.token;
        });

        test('should get user profile with valid token', async () => {
            const response = await request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('email');
            expect(response.body).toHaveProperty('name');
            expect(response.body).not.toHaveProperty('password');
        });

        test('should not get profile without token', async () => {
            await request(app)
                .get('/api/users/profile')
                .expect(401);
        });

        test('should not get profile with invalid token', async () => {
            await request(app)
                .get('/api/users/profile')
                .set('Authorization', 'Bearer invalidtoken')
                .expect(401);
        });
    });

    describe('PUT /api/users/profile', () => {
        let authToken: string;

        beforeAll(async () => {
            const user = {
                email: 'update@example.com',
                password: 'password123',
                name: 'Update User'
            };

            await request(app)
                .post('/api/users/register')
                .send(user)
                .expect(201);

            const loginResponse = await request(app)
                .post('/api/users/login')
                .send({
                    email: user.email,
                    password: user.password
                })
                .expect(200);

            authToken = loginResponse.body.token;
        });

        test('should update user profile', async () => {
            const updates = {
                name: 'Updated Name',
                email: 'updated@example.com'
            };

            const response = await request(app)
                .put('/api/users/profile')
                .set('Authorization', `Bearer ${authToken}`)
                .send(updates)
                .expect(200);

            expect(response.body).toHaveProperty('name', updates.name);
            expect(response.body).toHaveProperty('email', updates.email);
        });

        test('should not update profile without token', async () => {
            await request(app)
                .put('/api/users/profile')
                .send({ name: 'New Name' })
                .expect(401);
        });

        test('should validate update data', async () => {
            const invalidUpdates = {
                email: 'invalid-email'
            };

            await request(app)
                .put('/api/users/profile')
                .set('Authorization', `Bearer ${authToken}`)
                .send(invalidUpdates)
                .expect(400);
        });
    });
}); 
