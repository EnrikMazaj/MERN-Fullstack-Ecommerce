import express from 'express';
import {
    createBooking,
    getBookings,
    getBookingById,
    getBookingsByUserId,
    updateBookingStatus,
    cancelBooking,
    requestRefund
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);

router.get('/', getBookings);

router.get('/:id', getBookingById);

router.get('/user/:userId', getBookingsByUserId);

router.put('/:id/status', updateBookingStatus);

router.put('/:id/cancel', cancelBooking);

router.put('/:id/refund', requestRefund);

export default router; 
