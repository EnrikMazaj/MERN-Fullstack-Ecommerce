import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

export const connectDB = async () => {
    try {
        if (!MONGODB_URL) {
            console.error('MongoDB URL is missing:', { NODE_ENV: process.env.NODE_ENV });
            throw new Error('MongoDB URL is not defined in environment variables');
        }

        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URL:', MONGODB_URL.replace(/\/\/[^:]+:[^@]+@/, '//****:****@')); // Hide credentials

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        };

        await mongoose.connect(MONGODB_URL, options);

        console.log('Connected to MongoDB successfully!');
        console.log('Database name:', mongoose.connection.name);
        console.log('Connection state:', mongoose.connection.readyState);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        console.error('Connection details:', {
            url: MONGODB_URL ? 'URL is set' : 'URL is missing',
            nodeEnv: process.env.NODE_ENV,
            mongooseState: mongoose.connection.readyState
        });
        throw error; // Don't exit process, let the error handler deal with it
    }
}; 
