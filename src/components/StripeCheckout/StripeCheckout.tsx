import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAuth } from '../../context/AuthContext';
import { clearCart } from '../../features/cartSlice';
import paymentService, { BookingData } from '../../services/paymentService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';
import './StripeCheckout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

interface StripeCheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    passportNumber?: string;
}

const CheckoutForm: React.FC<{ onClose: () => void; passportNumber?: string }> = ({ onClose, passportNumber }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string>('');
    const [paymentIntentId, setPaymentIntentId] = useState<string>('');

    const bookings = useSelector((state: RootState) => state.cart.bookings);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { language } = useTheme();
    const t = translations[language].payment;

    useEffect(() => {
        if (bookings.length > 0 && user?.id) {
            createPaymentIntent();
        }
    }, [bookings, user?.id]);

    const createPaymentIntent = async () => {
        try {
            const bookingData: BookingData[] = bookings.map(booking => ({
                seatNumber: booking.seatNumber,
                totalPrice: booking.totalPrice,
                passengerName: booking.passengerName,
                passengerPassport: passportNumber || booking.passengerPassport,
                routeId: booking.routeId,
                travelDate: booking.travelDate,
                isRoundTrip: booking.isRoundTrip,
                arrivalDate: booking.arrivalDate
            }));

            const response = await paymentService.createPaymentIntent(bookingData, user!.id);
            setClientSecret(response.clientSecret);
            setPaymentIntentId(response.paymentIntentId);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to initialize payment');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError('Card element not found');
            setIsProcessing(false);
            return;
        }

        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if (stripeError) {
                setError(stripeError.message || 'Payment failed');
                setIsProcessing(false);
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                const bookingData: BookingData[] = bookings.map(booking => ({
                    seatNumber: booking.seatNumber,
                    totalPrice: booking.totalPrice,
                    passengerName: booking.passengerName,
                    passengerPassport: passportNumber || booking.passengerPassport,
                    routeId: booking.routeId,
                    travelDate: booking.travelDate,
                    isRoundTrip: booking.isRoundTrip,
                    arrivalDate: booking.arrivalDate
                }));

                await paymentService.confirmPayment(paymentIntentId, bookingData, user!.id);

                dispatch(clearCart());
                toast.success(t.success);
                onClose();
                navigate('/my-bookings');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Payment processing failed');
        } finally {
            setIsProcessing(false);
        }
    };

    const calculateTotal = () => {
        return bookings.reduce((total, booking) => total + booking.totalPrice, 0).toFixed(2);
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <div className="payment-header">
                <h3>{t.cardDetails}</h3>
                <div className="total-amount">
                    <strong>{t.total}: €{calculateTotal()}</strong>
                </div>
            </div>

            <div className="card-element-container">
                <CardElement
                    id="card-element"
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
                        hidePostalCode: true,
                    }}
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
                <button type="button" onClick={onClose} className="cancel-btn">
                    {t.cancel}
                </button>
                <button
                    type="submit"
                    disabled={!stripe || isProcessing || !clientSecret}
                    className="pay-btn"
                >
                    {isProcessing ? t.processing : `${t.pay} €${calculateTotal()}`}
                </button>
            </div>
        </form>
    );
};

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ isOpen, onClose, passportNumber }) => {
    if (!isOpen) return null;

    return (
        <div className="stripe-checkout-overlay">
            <div className="stripe-checkout-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <Elements stripe={stripePromise}>
                    <CheckoutForm onClose={onClose} passportNumber={passportNumber} />
                </Elements>
            </div>
        </div>
    );
};

export default StripeCheckout; 
