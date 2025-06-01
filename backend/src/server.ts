import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';
import routes from './routes/index.js';
import { sessionConfig } from './config/redis.js';
import session from 'express-session';

dotenv.config();

export const app = express();
const port = parseInt(process.env.PORT || '10000', 10);

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

app.use((req, res, next) => {
    if (req.originalUrl === '/api/payments/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use('/api', routes);

connectDB();

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
        default:
            throw error;
    }
});

process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
}); 
