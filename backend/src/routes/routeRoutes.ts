import express from 'express';
import {
    getRoutes,
    getRouteById,
    createRoute
} from '../controllers/routeController.js';

const router = express.Router();

router.get('/', getRoutes);

router.get('/:id', getRouteById);

router.post('/', createRoute);

export default router; 
