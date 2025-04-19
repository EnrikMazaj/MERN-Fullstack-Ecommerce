import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export interface Route {
    _id: string;
    origin: string;
    destination: string;
    departureTime: string;
    basePrice: number;
    availableSeats: number;
    status: 'active' | 'cancelled';
}

const routeService = {
    // Get all routes
    getAllRoutes: async (): Promise<Route[]> => {
        try {
            const response = await axios.get(`${API_URL}/routes`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching routes:', error);
            throw error;
        }
    },

    // Get route by ID
    getRouteById: async (routeId: string): Promise<Route> => {
        try {
            const response = await axios.get(`${API_URL}/routes/${routeId}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching route with ID ${routeId}:`, error);
            throw error;
        }
    }
};

export default routeService; 