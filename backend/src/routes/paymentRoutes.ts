import express from 'express';
import {
    createPaymentIntent,
    confirmPayment,
    handleWebhook
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);

router.post('/confirm-payment', confirmPayment);

router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router; 
