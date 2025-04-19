import axios from 'axios';
import { Booking } from '../features/types';

const API_URL = 'http://localhost:3000/api';

export const bookingService = {
    // Get all bookings for a user
    getUserBookings: async (userId: string) => {
        const response = await axios.get(`${API_URL}/bookings/user/${userId}`);
        return response.data;
    },

    // Get booking by ID
    getBookingById: async (id: string) => {
        const response = await axios.get(`${API_URL}/bookings/${id}`);
        return response.data;
    },

    // Create a new booking
    createBooking: async (bookingData: Omit<Booking, 'id'>) => {
        const response = await axios.post(`${API_URL}/bookings`, bookingData);
        return response.data;
    },

    // Update a booking
    updateBooking: async (id: string, bookingData: Partial<Booking>) => {
        const response = await axios.put(`${API_URL}/bookings/${id}`, bookingData);
        return response.data;
    },

    // Cancel a booking
    cancelBooking: async (id: string) => {
        const response = await axios.put(`${API_URL}/bookings/${id}/cancel`);
        return response.data;
    }
}; 