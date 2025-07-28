import axios from 'axios';

// Use localhost for development, production URL for production
const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'  // Development URL
    : 'https://bus-ecommerce.onrender.com';  // Production URL

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 30000,
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
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

interface BookingData {
    seatNumber: number;
    totalPrice: number;
    passengerName: string;
    passengerPassport: string;
    routeId: string;
    travelDate: Date;
    isRoundTrip?: boolean;
    arrivalDate?: Date;
}

interface PaymentIntentResponse {
    success: boolean;
    clientSecret: string;
    paymentIntentId: string;
}

interface ConfirmPaymentResponse {
    success: boolean;
    data: any[];
    paymentIntent: {
        id: string;
        status: string;
        amount: number;
    };
}

const paymentService = {
    createPaymentIntent: async (bookings: BookingData[], userId: string): Promise<PaymentIntentResponse> => {
        const response = await axiosInstance.post('/api/payments/create-payment-intent', {
            bookings,
            userId
        });

        if (!response.data.success) {
            throw new Error(response.data.error || 'Failed to create payment intent');
        }

        return response.data;
    },

    confirmPayment: async (paymentIntentId: string, bookings: BookingData[], userId: string): Promise<ConfirmPaymentResponse> => {
        const response = await axiosInstance.post('/api/payments/confirm-payment', {
            paymentIntentId,
            bookings,
            userId
        });

        if (!response.data.success) {
            throw new Error(response.data.error || 'Failed to confirm payment');
        }

        return response.data;
    }
};

export default paymentService;
export type { BookingData, PaymentIntentResponse, ConfirmPaymentResponse }; 
