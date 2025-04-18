import express from 'express';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Health check route
router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// Test route
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'API is working correctly' });
});

// User routes
router.use('/users', userRoutes);

export default router;