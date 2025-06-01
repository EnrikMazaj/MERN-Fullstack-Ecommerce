import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Handle Stripe webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router; 
