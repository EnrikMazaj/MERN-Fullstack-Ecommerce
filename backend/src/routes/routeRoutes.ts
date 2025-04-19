import express from 'express';
import {
    getRoutes,
    getRouteById,
    createRoute
} from '../controllers/routeController.js';

const router = express.Router();

// Get all routes
router.get('/', getRoutes);

// Get route by ID
router.get('/:id', getRouteById);

// Create a new route
router.post('/', createRoute);

export default router; 