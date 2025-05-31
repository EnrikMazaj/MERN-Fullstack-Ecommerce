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
    error => {
        return Promise.reject(error);
    }
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
        } else {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export interface BookingData {
    seatNumber: number;
    totalPrice: number;
    passengerName: string;
    passengerPassport: string;
    userId: string;
    routeId: string;
    travelDate: Date;
}

const bookingService = {

    createBooking: async (bookingData: BookingData) => {
        const response = await axiosInstance.post('/api/bookings', bookingData);
        return response.data;
    },

    getUserBookings: async (userId: string) => {
        const response = await axiosInstance.get(`/api/bookings/user/${userId}`);
        return response.data;
    },

    getBookingById: async (bookingId: string) => {
        const response = await axiosInstance.get(`/api/bookings/${bookingId}`);
        return response.data;
    },

    updateBookingStatus: async (bookingId: string, status: string, paymentStatus: string) => {
        const response = await axiosInstance.put(`/api/bookings/${bookingId}/status`, {
            status,
            paymentStatus
        });
        return response.data;
    },

    requestRefund: async (bookingId: string) => {
        const response = await axiosInstance.put(`/api/bookings/${bookingId}/refund`);
        return response.data;
    },
};

export default bookingService; 
