import express from 'express';
import userRoutes from './userRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import routeRoutes from './routeRoutes.js';
import paymentRoutes from './paymentRoutes.js';

const router = express.Router();

router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

router.use('/users', userRoutes);

router.use('/bookings', bookingRoutes);

router.use('/routes', routeRoutes);

router.use('/payments', paymentRoutes);

export default router;
