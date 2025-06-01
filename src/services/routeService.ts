import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://bus-ecommerce.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000,
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
});

axiosInstance.interceptors.request.use(
    config => {
        if (config.method === 'get') {
            config.params = { ...config.params, _t: Date.now() };
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = '/login';
                return Promise.reject(error);
            }
            console.error('API Error Response:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            console.error('API Error Request:', error.request);
            if (error.code === 'ERR_NETWORK') {
                console.error('Network error - possible CORS issue');
            }
        } else {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

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
    getAllRoutes: async (): Promise<Route[]> => {
        try {
            const response = await axiosInstance.get('/api/routes');
            return response.data.data;
        } catch (error: any) {
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Network error - please check your connection and try again');
            }
            throw error;
        }
    },

    getRouteById: async (routeId: string): Promise<Route> => {
        try {
            const response = await axiosInstance.get(`/api/routes/${routeId}`);
            return response.data.data;
        } catch (error: any) {
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Network error - please check your connection and try again');
            }
            throw error;
        }
    }
};

export default routeService; 
