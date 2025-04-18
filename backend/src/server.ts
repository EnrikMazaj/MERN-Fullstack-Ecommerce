import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    console.log(`Server is running on port ${port}`);
}); 