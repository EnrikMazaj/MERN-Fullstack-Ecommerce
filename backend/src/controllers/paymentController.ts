import { Request, Response } from 'express';
import Stripe from 'stripe';
import { Booking } from '../models/Booking.js';
import { BusRoute } from '../models/BusRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-05-28.basil',
    })
    : null;

export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        if (!stripe) {
            return res.status(500).json({
                success: false,
                error: 'Payment service not configured'
            });
        }

        const { bookings, userId } = req.body;

        if (!bookings || !Array.isArray(bookings) || bookings.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Bookings array is required'
            });
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'User ID is required'
            });
        }

        const totalAmount = bookings.reduce((sum: number, booking: any) => {
            return sum + booking.totalPrice;
        }, 0);

        const amountInCents = Math.round(totalAmount * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'eur',
            metadata: {
                userId,
                bookingCount: bookings.length.toString(),
                bookingData: JSON.stringify(bookings)
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create payment intent',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const confirmPayment = async (req: Request, res: Response) => {
    try {
        if (!stripe) {
            return res.status(500).json({
                success: false,
                error: 'Payment service not configured'
            });
        }

        const { paymentIntentId, bookings, userId } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({
                success: false,
                error: 'Payment intent ID is required'
            });
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({
                success: false,
                error: 'Payment not completed'
            });
        }
        const createdBookings = [];
        for (const bookingData of bookings) {
            // Fetch route information
            const route = await BusRoute.findById(bookingData.routeId);
            if (!route) {
                throw new Error(`Route not found for ID: ${bookingData.routeId}`);
            }

            const booking = new Booking({
                seatNumber: bookingData.seatNumber,
                totalPrice: bookingData.totalPrice,
                passengerName: bookingData.passengerName,
                passengerPassport: bookingData.passengerPassport,
                userId: userId,
                routeId: bookingData.routeId,
                travelDate: bookingData.travelDate,
                isRoundTrip: bookingData.isRoundTrip,
                arrivalDate: bookingData.arrivalDate,
                paymentStatus: 'completed',
                status: 'active',
                routeInfo: {
                    origin: route.origin,
                    destination: route.destination,
                    departureTime: route.departureTime
                },
                stripePaymentIntentId: paymentIntentId
            });

            const savedBooking = await booking.save();
            createdBookings.push(savedBooking);
        }

        res.status(201).json({
            success: true,
            data: createdBookings,
            paymentIntent: {
                id: paymentIntent.id,
                status: paymentIntent.status,
                amount: paymentIntent.amount
            }
        });
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to confirm payment',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    if (!stripe) {
        return res.status(500).json({
            success: false,
            error: 'Payment service not configured'
        });
    }

    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('Payment succeeded:', paymentIntent.id);

            try {
                const userId = paymentIntent.metadata.userId;

                // You can add additional logic here to update booking status
                console.log('Processing successful payment for user:', userId);
            } catch (error) {
                console.error('Error processing webhook:', error);
            }
            break;
        }

        case 'payment_intent.payment_failed': {
            const failedPayment = event.data.object as Stripe.PaymentIntent;
            console.log('Payment failed:', failedPayment.id);
            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}; 
