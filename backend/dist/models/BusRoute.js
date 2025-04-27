import mongoose from 'mongoose';
const busRouteSchema = new mongoose.Schema({
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
    },
    dates: [{
            type: Date,
            required: true
        }],
    basePrice: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export const BusRoute = mongoose.model('BusRoute', busRouteSchema);
