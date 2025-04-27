import { BusRoute } from '../models/BusRoute.js';
import mongoose from 'mongoose';
// Get all routes
export const getRoutes = async (req, res) => {
    try {
        console.log('Fetching all routes');
        const routes = await BusRoute.find({ status: 'active' });
        console.log(`Found ${routes.length} routes`);
        res.status(200).json({
            success: true,
            data: routes
        });
    }
    catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch routes'
        });
    }
};
// Get route by ID
export const getRouteById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching route with ID: ${id}`);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid route ID format'
            });
        }
        const route = await BusRoute.findById(id);
        if (!route) {
            console.log(`Route with ID ${id} not found`);
            return res.status(404).json({
                success: false,
                error: 'Route not found'
            });
        }
        console.log(`Route found: ${route._id}`);
        res.status(200).json({
            success: true,
            data: route
        });
    }
    catch (error) {
        console.error('Error fetching route:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch route'
        });
    }
};
// Create a new route
export const createRoute = async (req, res) => {
    try {
        const { origin, destination, departureTime, dates, basePrice, availableSeats } = req.body;
        // Validate required fields
        if (!origin || !destination || !departureTime || !dates || !basePrice || !availableSeats) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }
        const route = await BusRoute.create({
            origin,
            destination,
            departureTime,
            dates,
            basePrice,
            availableSeats
        });
        console.log('Route created successfully:', route);
        res.status(201).json({
            success: true,
            data: route
        });
    }
    catch (error) {
        console.error('Error creating route:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create route'
        });
    }
};
