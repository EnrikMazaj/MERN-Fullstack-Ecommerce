import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaLock, FaCreditCard } from 'react-icons/fa';

interface StripePaymentFormProps {
    amount: number; // in cents
    onSuccess: () => void;
    onError: (error: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ amount, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsProcessing(true);

        if (!stripe || !elements) {
            setError('Stripe has not loaded yet.');
            setIsProcessing(false);
            return;
        }

        try {
            // Call your backend to create a PaymentIntent
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            });
            const paymentIntent = await response.json();
            if (!paymentIntent.clientSecret) {
                throw new Error('Failed to create payment intent.');
            }

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error('Card element not found.');
            }

            const { error: stripeError, paymentIntent: confirmedIntent } = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (stripeError) {
                setError(stripeError.message || 'Payment failed.');
                onError(stripeError.message || 'Payment failed.');
                setIsProcessing(false);
                return;
            }

            if (confirmedIntent && confirmedIntent.status === 'succeeded') {
                setIsProcessing(false);
                onSuccess();
            } else {
                setError('Payment was not successful.');
                onError('Payment was not successful.');
                setIsProcessing(false);
            }
        } catch (err: any) {
            setError(err.message || 'Payment failed.');
            onError(err.message || 'Payment failed.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="stripe-payment-container">
            <div className="payment-header">
                <FaCreditCard className="payment-icon" />
                <h3>Card Payment</h3>
            </div>
            <form className="stripe-payment-form" onSubmit={handleSubmit}>
                <div className="payment-amount">
                    <span>Amount</span>
                    <span className="amount">€{(amount / 100).toFixed(2)}</span>
                </div>
                <div className="card-element-wrapper">
                    <label htmlFor="card-element">Card Details</label>
                    <div className="card-element-container">
                        <CardElement id="card-element" options={{ hidePostalCode: true }} />
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button
                    className="payment-button"
                    type="submit"
                    disabled={!stripe || isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                    <FaLock className="lock-icon" />
                </button>
                <div className="payment-security">
                    <FaLock className="security-icon" />
                    <span>Secure payment powered by Stripe</span>
                </div>
            </form>
        </div>
    );
};

export default StripePaymentForm; 
