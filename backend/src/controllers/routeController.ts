import { Request, Response } from 'express';
import { BusRoute } from '../models/BusRoute.js';
import mongoose from 'mongoose';

export const getRoutes = async (req: Request, res: Response) => {
    try {
        const routes = await BusRoute.find({ status: 'active' });

        res.status(200).json({
            success: true,
            data: routes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch routes'
        });
    }
};

export const getRouteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid route ID format'
            });
        }

        const route = await BusRoute.findById(id);

        if (!route) {
            return res.status(404).json({
                success: false,
                error: 'Route not found'
            });
        }


        res.status(200).json({
            success: true,
            data: route
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch route'
        });
    }
};

export const createRoute = async (req: Request, res: Response) => {
    try {
        const {
            origin,
            destination,
            departureTime,
            dates,
            basePrice,
            availableSeats
        } = req.body;

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

        res.status(201).json({
            success: true,
            data: route
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create route'
        });
    }
}; 
