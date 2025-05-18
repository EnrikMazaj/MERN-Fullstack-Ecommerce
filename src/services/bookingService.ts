import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://bus-ecommerce.onrender.com';

// Create axios instance with default config
const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

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
    // Create a new booking
    createBooking: async (bookingData: BookingData) => {
        try {
            console.log('Sending booking data to server:', JSON.stringify(bookingData, null, 2));
            const response = await axiosInstance.post(`${API_URL}/api/bookings`, bookingData);
            console.log('Booking response:', response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error creating booking:', {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data,
                    message: error.message,
                    config: {
                        url: error.config?.url,
                        method: error.config?.method,
                        headers: error.config?.headers,
                        data: error.config?.data
                    }
                });
            } else {
                console.error('Non-Axios error creating booking:', error);
            }
            throw error;
        }
    },

    // Get all bookings for a user
    getUserBookings: async (userId: string) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/api/bookings/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user bookings:', error);
            throw error;
        }
    },

    // Get a specific booking by ID
    getBookingById: async (bookingId: string) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/api/bookings/${bookingId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching booking:', error);
            throw error;
        }
    },

    // Update booking status
    updateBookingStatus: async (bookingId: string, status: string, paymentStatus: string) => {
        try {
            const response = await axiosInstance.patch(`${API_URL}/api/bookings/${bookingId}/status`, {
                status,
                paymentStatus
            });
            return response.data;
        } catch (error) {
            console.error('Error updating booking status:', error);
            throw error;
        }
    },

    // Request refund for a booking
    requestRefund: async (bookingId: string) => {
        try {
            const response = await axiosInstance.put(`${API_URL}/api/bookings/${bookingId}/refund`);
            return response.data;
        } catch (error) {
            console.error('Error requesting refund:', error);
            throw error;
        }
    },
};

export default bookingService; 
