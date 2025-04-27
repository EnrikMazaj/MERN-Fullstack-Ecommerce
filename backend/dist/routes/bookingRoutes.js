import express from 'express';
import { createBooking, getBookings, getBookingById, getBookingsByUserId, updateBookingStatus, cancelBooking } from '../controllers/bookingController.js';
const router = express.Router();
// Create a new booking
router.post('/', createBooking);
// Get all bookings
router.get('/', getBookings);
// Get booking by ID
router.get('/:id', getBookingById);
// Get bookings by user ID
router.get('/user/:userId', getBookingsByUserId);
// Update booking status
router.patch('/:id/status', updateBookingStatus);
// Cancel booking
router.patch('/:id/cancel', cancelBooking);
export default router;
