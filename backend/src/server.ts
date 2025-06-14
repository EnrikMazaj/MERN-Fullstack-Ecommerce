import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { connectDB } from './config/database.js';
import routes from './routes/index.js';
import path from 'path';

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.connect().catch(console.error);

const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files without authentication
app.get('/manifest.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, '../../public/manifest.json'));
});

app.get('/favicon.ico', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, '../../public/favicon.ico'));
});

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }

        // Allow any Vercel domain, render.com domain, or localhost
        if (origin.endsWith('.vercel.app') ||
            origin.endsWith('.onrender.com') ||
            origin === 'http://localhost:10000' ||
            origin === 'http://localhost:3001' ||
            origin === 'http://localhost:3000') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use('/api', routes);

const startServer = async () => {
    try {
        await connectDB();

        // Use environment-specific port
        const port = process.env.NODE_ENV === 'production'
            ? (process.env.PORT || 10000)  // Production port
            : (process.env.PORT || 3000);  // Development port

        const server = app.listen(port, () => {
            if (process.env.NODE_ENV !== 'test') {
                console.log(`Server is running on port ${port}`);
                console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
                console.log(`Process ID: ${process.pid}`);
                console.log(`Server address: ${server.address()}`);
            }
        });

        return server;
    } catch (error) {
        console.error('Failed to start server:', error);
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
        throw error;
    }
};

// Only start the server if we're not in a test environment
if (process.env.NODE_ENV !== 'test') {
    startServer();
}

export { app, startServer }; 
