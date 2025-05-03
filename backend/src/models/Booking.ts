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
    routeInfo: {
        origin: {
            type: String,
            required: true,
            trim: true
        },
        destination: {
            type: String,
            required: true,
            trim: true
        },
        departureTime: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        default: 'active'
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
    },
    refundRequested: {
        type: Boolean,
        default: false
    },
    refundStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    refundDate: {
        type: Date
    }
});

export const Booking = mongoose.model('Booking', bookingSchema); 