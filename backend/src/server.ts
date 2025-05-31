import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';
import routes from './routes/index.js';
import { sessionConfig } from './config/redis.js';
import session from 'express-session';

// Load environment variables from .env file
dotenv.config();

export const app = express();
const port = parseInt(process.env.PORT || '10000', 10);

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3001',
        'http://localhost:3000',
        'https://bus-ecommerce.vercel.app',
        'https://bus-ecommerce-frontend.vercel.app',
        'https://bus-ecommerce.onrender.com',
        process.env.RENDER_EXTERNAL_URL || '',
        process.env.FRONTEND_URL || ''
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session(sessionConfig));

// Routes
app.use('/api', routes);

// Start the server
console.log('Starting server initialization...');
console.log('Current working directory:', process.cwd());
console.log('Environment variables:', {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URL: process.env.MONGODB_URL ? 'Set' : 'Not set',
    REDIS_URL: process.env.REDIS_URL ? 'Set' : 'Not set'
});

// Connect to database
connectDB();

// Start the server
console.log(`Attempting to start server on port ${port}...`);
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Process ID: ${process.pid}`);
    console.log(`Server address: ${server.address()}`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
}); 
