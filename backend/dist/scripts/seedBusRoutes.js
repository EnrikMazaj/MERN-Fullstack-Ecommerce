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
        basePrice: 35,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Patras',
        departureTime: '09:30',
        dates: [new Date('2024-05-01')],
        basePrice: 40,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Heraklion',
        departureTime: '10:15',
        dates: [new Date('2024-05-01')],
        basePrice: 45,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Larissa',
        departureTime: '11:00',
        dates: [new Date('2024-05-01')],
        basePrice: 30,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Volos',
        departureTime: '12:00',
        dates: [new Date('2024-05-01')],
        basePrice: 25,
        availableSeats: 50,
        status: 'active'
    },
    {
        origin: 'Athens',
        destination: 'Rhodes',
        departureTime: '13:00',
        dates: [new Date('2024-05-01')],
        basePrice: 50,
        availableSeats: 50,
        status: 'active'
    }
];
async function seedBusRoutes() {
    try {
        // Use the same database connection function as the main application
        await connectDB();
        console.log('Connected to MongoDB successfully');
        // Clear existing bus routes
        await BusRoute.deleteMany({});
        console.log('Cleared existing bus routes');
        // Insert new bus routes
        const insertedRoutes = await BusRoute.insertMany(sampleBusRoutes);
        console.log(`Successfully inserted ${insertedRoutes.length} bus routes`);
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
    catch (error) {
        console.error('Error details:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        process.exit(1);
    }
}
seedBusRoutes();
