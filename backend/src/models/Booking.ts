import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    seatNumber: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    passengerName: {
        type: String,
        required: true,
        trim: true
    },
    passengerPassport: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    routeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    travelDate: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
});

export const Booking = mongoose.model('Booking', bookingSchema); 