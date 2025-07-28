import express from 'express';
import userRoutes from './userRoutes.js';
import routeRoutes from './routeRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import paymentRoutes from './paymentRoutes.js';

const router = express.Router();

router.get('/healthcheck', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        redis: req.session ? 'Session available' : 'No session'
    });
});

router.use('/users', userRoutes);
router.use('/routes', routeRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);

export default router;
