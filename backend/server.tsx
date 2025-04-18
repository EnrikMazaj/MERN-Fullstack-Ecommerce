import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
    .connect(MONGODB_URL!)
    .then(() => {
        console.log('Connected to the mongoDB successfully!');
    })
    .catch((err) => {
        console.log(err);
    });

// Healthcheck endpoint
app.get('/api/healthcheck', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is running' });
});

// Test endpoint
app.get('/api/test', (req: Request, res: Response) => {
    res.status(200).json({ message: 'API is working correctly' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
