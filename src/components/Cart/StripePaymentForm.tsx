import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaLock } from 'react-icons/fa';
import './StripePaymentForm.css';

interface StripePaymentFormProps {
    amount: number;
    onSuccess: () => void;
    onError: (error: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
    amount,
    onSuccess,
    onError
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-confirmation`,
                },
                redirect: 'if_required',
            });

            if (stripeError) {
                setError(stripeError.message || 'An error occurred during payment');
                onError(stripeError.message || 'Payment failed');
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                onSuccess();
            } else {
                setError('Payment failed. Please try again.');
                onError('Payment failed');
            }
        } catch (err) {
            setError('An unexpected error occurred');
            onError('Payment failed');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="stripe-payment-container">
            <div className="payment-header">
                <h3>Complete Your Payment</h3>
            </div>
            <form onSubmit={handleSubmit} className="stripe-payment-form">
                <div className="payment-amount">
                    <span>Total Amount:</span>
                    <span className="amount">€{(amount / 100).toFixed(2)}</span>
                </div>
                <div className="card-element-wrapper">
                    <label>Card Details</label>
                    <div className="card-element-container">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button
                    type="submit"
                    className="payment-button"
                    disabled={!stripe || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <span className="spinner"></span>
                            Processing...
                        </>
                    ) : (
                        <>
                            <FaLock className="lock-icon" />
                            Pay €{(amount / 100).toFixed(2)}
                        </>
                    )}
                </button>
                <div className="payment-security">
                    <FaLock className="security-icon" />
                    Your payment information is secure and encrypted
                </div>
            </form>
        </div>
    );
};

export default StripePaymentForm; 
