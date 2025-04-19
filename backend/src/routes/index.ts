import express from 'express';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Health check route
router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// User routes
router.use('/users', userRoutes);

export default router;