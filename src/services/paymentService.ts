import axiosInstance from '../config/axios';

const paymentService = {
    createPaymentIntent: async (amount: number, bookingId: string) => {
        const response = await axiosInstance.post('/api/payments/create-payment-intent', {
            amount,
            bookingId
        });
        return response.data;
    }
};

export default paymentService; 
