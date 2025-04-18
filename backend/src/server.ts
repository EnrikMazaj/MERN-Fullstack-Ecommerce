import express, { Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/heathcheck',(res:Response) => {
    res.send(200);
});

// Connect to database
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 