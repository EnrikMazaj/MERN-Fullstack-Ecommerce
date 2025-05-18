import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://bus-ecommerce.onrender.com';

// Create axios instance with default config
const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

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
            const response = await axiosInstance.get(`${API_URL}/api/routes`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching routes:', error);
            throw error;
        }
    },

    // Get route by ID
    getRouteById: async (routeId: string): Promise<Route> => {
        try {
            const response = await axiosInstance.get(`${API_URL}/api/routes/${routeId}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching route with ID ${routeId}:`, error);
            throw error;
        }
    }
};

export default routeService; 
