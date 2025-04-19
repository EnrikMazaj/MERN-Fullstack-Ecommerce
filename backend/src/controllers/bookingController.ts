import { Request, Response } from 'express';
import { Booking } from '../models/Booking.js';
import mongoose from 'mongoose';

// Create a new booking
export const createBooking = async (req: Request, res: Response) => {
    try {
        console.log('Received booking request with body:', JSON.stringify(req.body, null, 2));

        const {
            seatNumber,
            totalPrice,
            passengerName,
            passengerPassport,
            userId,
            routeId,
            travelDate
        } = req.body;

        // Validate required fields
        if (!seatNumber || !totalPrice || !passengerName || !passengerPassport || !userId || !routeId || !travelDate) {
            console.error('Missing required fields:', {
                seatNumber: !!seatNumber,
                totalPrice: !!totalPrice,
                passengerName: !!passengerName,
                passengerPassport: !!passengerPassport,
                userId: !!userId,
                routeId: !!routeId,
                travelDate: !!travelDate
            });
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Convert string IDs to ObjectIds if they're not already
        let userIdObj;
        let routeIdObj;

        try {
            // Check if userId is a valid ObjectId
            if (mongoose.Types.ObjectId.isValid(userId)) {
                userIdObj = new mongoose.Types.ObjectId(userId);
            } else {
                console.error('Invalid userId format:', userId);
                return res.status(400).json({
                    success: false,
                    error: 'Invalid user ID format'
                });
            }

            // Check if routeId is a valid ObjectId
            if (mongoose.Types.ObjectId.isValid(routeId)) {
                routeIdObj = new mongoose.Types.ObjectId(routeId);
            } else {
                console.error('Invalid routeId format:', routeId);
                return res.status(400).json({
                    success: false,
                    error: 'Invalid route ID format'
                });
            }
        } catch (error) {
            console.error('Error converting IDs to ObjectId:', error);
            return res.status(400).json({
                success: false,
                error: 'Invalid ID format'
            });
        }

        console.log('Creating booking with validated data');

        const booking = await Booking.create({
            seatNumber,
            totalPrice,
            passengerName,
            passengerPassport,
            userId: userIdObj,
            routeId: routeIdObj,
            travelDate: new Date(travelDate)
        });

        console.log('Booking created successfully:', booking);

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error creating booking:', error);

        // Log more details about the error
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }

        res.status(500).json({
            success: false,
            error: 'Failed to create booking',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Get all bookings
export const getBookings = async (req: Request, res: Response) => {
    try {
        console.log('Fetching all bookings');
        const bookings = await Booking.find()
            .populate('userId', 'name email')
            .populate('routeId', 'from to departureTime arrivalTime');

        console.log(`Found ${bookings.length} bookings`);

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch bookings'
        });
    }
};

// Get booking by ID
export const getBookingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(`Fetching booking with ID: ${id}`);

        const booking = await Booking.findById(id)
            .populate('userId', 'name email')
            .populate('routeId', 'from to departureTime arrivalTime');

        if (!booking) {
            console.log(`Booking with ID ${id} not found`);
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        console.log(`Booking found: ${booking._id}`);

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch booking'
        });
    }
};

// Get bookings by user ID
export const getBookingsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        console.log(`Fetching bookings for user ID: ${userId}`);

        const bookings = await Booking.find({ userId })
            .populate('routeId', 'from to departureTime arrivalTime');

        console.log(`Found ${bookings.length} bookings for user ${userId}`);

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user bookings'
        });
    }
};

// Update booking status
export const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus } = req.body;

        console.log(`Updating booking status for ID: ${id}`, { status, paymentStatus });

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status, paymentStatus },
            { new: true }
        );

        if (!booking) {
            console.log(`Booking with ID ${id} not found`);
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        console.log(`Booking status updated successfully: ${booking._id}`);

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update booking status'
        });
    }
};

// Cancel booking
export const cancelBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(`Cancelling booking with ID: ${id}`);

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status: 'cancelled' },
            { new: true }
        );

        if (!booking) {
            console.log(`Booking with ID ${id} not found`);
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        console.log(`Booking cancelled successfully: ${booking._id}`);

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to cancel booking'
        });
    }
}; 