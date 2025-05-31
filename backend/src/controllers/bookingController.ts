import { Request, Response } from 'express';
import { Booking } from '../models/Booking.js';
import mongoose from 'mongoose';
import { BusRoute } from '../models/BusRoute.js';

export const createBooking = async (req: Request, res: Response) => {
    try {
        const {
            seatNumber,
            totalPrice,
            passengerName,
            passengerPassport,
            userId,
            routeId,
            travelDate,
            isRoundTrip,
            arrivalDate
        } = req.body;

        if (!seatNumber || !totalPrice || !passengerName || !passengerPassport || !userId || !routeId || !travelDate) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        let userIdObj;
        let routeIdObj;

        try {
            if (mongoose.Types.ObjectId.isValid(userId)) {
                userIdObj = new mongoose.Types.ObjectId(userId);
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid user ID format'
                });
            }

            if (mongoose.Types.ObjectId.isValid(routeId)) {
                routeIdObj = new mongoose.Types.ObjectId(routeId);
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid route ID format'
                });
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: 'Invalid ID format'
            });
        }

        const route = await BusRoute.findById(routeIdObj);
        if (!route) {
            return res.status(404).json({
                success: false,
                error: 'Route not found'
            });
        }

        const booking = await Booking.create({
            seatNumber,
            totalPrice,
            passengerName,
            passengerPassport,
            userId: userIdObj,
            routeId: routeIdObj,
            travelDate: new Date(travelDate),
            isRoundTrip: isRoundTrip || false,
            arrivalDate: arrivalDate ? new Date(arrivalDate) : undefined,
            routeInfo: {
                origin: route.origin,
                destination: route.destination,
                departureTime: route.departureTime
            }
        });

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create booking',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find()
            .populate('userId', 'name email')
            .populate('routeId', 'from to departureTime arrivalTime');

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch bookings'
        });
    }
};

export const getBookingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id)
            .populate('userId', 'name email')
            .populate('routeId', 'from to departureTime arrivalTime');

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch booking'
        });
    }
};

export const getBookingsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const bookings = await Booking.find({ userId })
            .select('seatNumber totalPrice passengerName passengerPassport userId routeId travelDate arrivalDate isRoundTrip status routeInfo refundRequested refundStatus')
            .populate('routeId', 'origin destination departureTime');

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user bookings'
        });
    }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus } = req.body;

        if (!status || !['active', 'completed', 'cancelled', 'refunded'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status value'
            });
        }

        if (!paymentStatus || !['pending', 'completed', 'failed'].includes(paymentStatus)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid payment status value'
            });
        }

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        booking.status = status;
        booking.paymentStatus = paymentStatus;
        await booking.save();

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update booking status',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const cancelBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status: 'cancelled' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to cancel booking'
        });
    }
};

export const requestRefund = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        if (booking.status !== 'cancelled' && booking.status !== 'active') {
            return res.status(400).json({
                success: false,
                error: 'Only active or cancelled bookings can request refunds'
            });
        }

        if (booking.refundRequested) {
            return res.status(400).json({
                success: false,
                error: 'Refund already requested for this booking'
            });
        }

        booking.status = 'cancelled';
        booking.refundRequested = true;
        booking.refundStatus = 'pending';
        booking.refundDate = new Date();
        await booking.save();

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to request refund'
        });
    }
}; 
