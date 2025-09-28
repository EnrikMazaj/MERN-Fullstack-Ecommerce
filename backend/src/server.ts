import express from 'express';
import cors from 'cors';
import session from 'express-session';
import compression from 'compression';
import { connectDB } from './config/database.js';
import { sessionConfig } from './config/redis.js';
import routes from './routes/index.js';
import path from 'path';

const app = express();

app.use(compression({
    level: 6, // Compression level (1-9)
    threshold: 1000, // Only compress responses >= 1KB
    filter: (req, res) => {
        // Don't compress if the request includes a cache-control header to not compress
        if (req.headers['x-no-compression']) {
            return false;
        }
        // Use compression filter function
        return compression.filter(req, res);
    }
}));

// Cache control middleware for static assets
const setCacheHeaders = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Set caching headers for static assets
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|avif|webp)$/)) {
        const cacheTime = req.path.includes('static/') ? '31536000' : '86400';
        res.setHeader('Cache-Control', `public, max-age=${cacheTime}, immutable`);
        res.setHeader('Expires', new Date(Date.now() + parseInt(cacheTime) * 1000).toUTCString());
    }
    next();
};

app.use(setCacheHeaders);

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files without authentication
app.get('/manifest.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    res.sendFile(path.join(__dirname, '../../public/manifest.json'));
});

app.get('/favicon.ico', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
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

app.use((req, res, next) => {
    session(sessionConfig)(req, res, (err) => {
        if (err) {
            console.error('Session middleware error:', err);
            return next();
        }
        next();
    });
});

app.use('/api', routes);

const startServer = async () => {
    try {
        await connectDB();

        const port = process.env.NODE_ENV === 'production'
            ? (process.env.PORT || 10000)
            : (process.env.PORT || 3000);

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

if (process.env.NODE_ENV !== 'test') {
    startServer();
}

export { app, startServer }; 
