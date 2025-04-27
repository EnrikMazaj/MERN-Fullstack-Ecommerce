import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck endpoint
app.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// Simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 