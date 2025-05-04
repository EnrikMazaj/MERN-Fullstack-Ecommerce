import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';
import routes from './routes/index.js';
import { sessionConfig } from './config/redis.js';
import session from 'express-session';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'https://bus-ecommerce.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    ...sessionConfig,
    cookie: {
        ...sessionConfig.cookie,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// Routes
app.use('/api', routes);

// Healthcheck endpoint
app.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// Connect to database
connectDB();

// Start the server
app.listen(port, () => {
    // Use process.stdout.write for server startup message
    process.stdout.write(`Server is running on port ${port}\n`);
}); 