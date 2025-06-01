import axiosInstance from '../config/axios';

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
