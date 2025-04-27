import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database-mock.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'API test endpoint is working!' });
});

// Healthcheck endpoint
app.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// Connect to mock database
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Test server is running on port ${port}`);
}); 