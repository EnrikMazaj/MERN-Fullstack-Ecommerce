import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { BusRoute } from '../models/BusRoute.js';
import { connectDB } from '../config/database.js';

dotenv.config();

const sampleBusRoutes = [
    {
        origin: 'Athens',
        destination: 'Thessaloniki',
        departureTime: '08:00',
        dates: [new Date('2024-05-01')],
        basePrice: 20,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Patras',
        departureTime: '09:30',
        dates: [new Date('2024-05-01')],
        basePrice: 20,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Heraklion',
        departureTime: '10:15',
        dates: [new Date('2024-05-01')],
        basePrice: 20,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Larissa',
        departureTime: '11:00',
        dates: [new Date('2024-05-01')],
        basePrice: 20,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Volos',
        departureTime: '12:00',
        dates: [new Date('2024-05-01')],
        basePrice: 20,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Rhodes',
        departureTime: '13:00',
        dates: [new Date('2024-05-01')],
        basePrice: 20,
        availableSeats: 50,
        status: 'active'
    }
];

async function seedBusRoutes() {
    try {
        await connectDB();

        await BusRoute.deleteMany({});

        await BusRoute.insertMany(sampleBusRoutes);

        await mongoose.disconnect();
    } catch (error) {
        process.exit(1);
    }
}

seedBusRoutes(); 
