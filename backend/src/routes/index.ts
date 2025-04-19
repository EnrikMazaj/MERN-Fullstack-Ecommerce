import express from 'express';
import userRoutes from './userRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import routeRoutes from './routeRoutes.js';

const router = express.Router();

// Health check route
router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// User routes
router.use('/users', userRoutes);

// Booking routes
router.use('/bookings', bookingRoutes);

// Route routes
router.use('/routes', routeRoutes);

export default router;