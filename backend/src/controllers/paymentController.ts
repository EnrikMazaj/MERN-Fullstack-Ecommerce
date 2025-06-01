import { Request, Response } from 'express';
import Stripe from 'stripe';
import { Booking } from '../models/Booking.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-05-28.basil'
});

export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { amount, bookingId } = req.body;

        if (!amount || !bookingId) {
            return res.status(400).json({
                success: false,
                error: 'Amount and bookingId are required',
                receivedData: { amount, bookingId }
            });
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Amount must be a positive number',
                receivedData: { amount, bookingId }
            });
        }

        if (typeof bookingId !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Invalid bookingId format',
                receivedData: { amount, bookingId }
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
            metadata: {
                bookingId: bookingId
            }
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create payment intent',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];

    if (!sig) {
        return res.status(400).json({
            success: false,
            error: 'No signature found'
        });
    }

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET || ''
        );

        let paymentIntent: Stripe.PaymentIntent;
        let bookingId: string;

        switch (event.type) {
            case 'payment_intent.succeeded':
                paymentIntent = event.data.object as Stripe.PaymentIntent;
                bookingId = paymentIntent.metadata.bookingId;

                await Booking.findByIdAndUpdate(bookingId, {
                    paymentStatus: 'completed',
                    status: 'active'
                });

                break;
            case 'payment_intent.payment_failed':
                paymentIntent = event.data.object as Stripe.PaymentIntent;
                bookingId = paymentIntent.metadata.bookingId;

                await Booking.findByIdAndUpdate(bookingId, {
                    paymentStatus: 'failed'
                });

                break;
        }

        res.json({ received: true });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: 'Webhook error'
        });
    }
}; 
