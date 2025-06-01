import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBooking, clearCart } from '../../features/cartSlice';
import { FaShoppingCart, FaTrash, FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaChevronDown, FaBus, FaSpinner } from 'react-icons/fa';
import { RootState } from '../../redux/store';
import { useAuth } from '../../context/AuthContext';
import bookingService from '../../services/bookingService';
import routeService from '../../services/routeService';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from './StripePaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

interface RouteDetails {
  _id: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

const Cart = () => {
  const [isCartVisible, setCartVisibility] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassportForm, setShowPassportForm] = useState(false);
  const [passportNumber, setPassportNumber] = useState('');
  const [routeDetails, setRouteDetails] = useState<{ [key: string]: RouteDetails }>({});
  const [expandedTicket, setExpandedTicket] = useState<number | null>(null);
  const bookings = useSelector((state: RootState) => state.cart.bookings);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { language } = useTheme();
  const t = translations[language].cart;
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const totalBookings = bookings.length;

  useEffect(() => {
    const fetchRouteDetails = async () => {
      const uniqueRouteIds = [...new Set(bookings.map(booking => booking.routeId))];
      const routeDetailsPromises = uniqueRouteIds.map(async (routeId) => {
        try {
          const route = await routeService.getRouteById(routeId);
          return {
            [routeId]: {
              _id: route._id,
              origin: route.origin,
              destination: route.destination,
              departureTime: route.departureTime,
              arrivalTime: route.departureTime,
              price: route.basePrice
            }
          };
        } catch (error) {
          return { [routeId]: { _id: routeId, origin: 'Unknown', destination: 'Unknown', departureTime: '', arrivalTime: '', price: 0 } };
        }
      });

      const results = await Promise.all(routeDetailsPromises);
      const combinedRouteDetails = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setRouteDetails(combinedRouteDetails);
    };

    if (bookings.length > 0) {
      fetchRouteDetails();
    }
  }, [bookings]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const cartElement = document.querySelector('.cart-details');
      const cartIcon = document.querySelector('.cart-icon-container');

      if (isCartVisible && cartElement && cartIcon) {
        if (!cartElement.contains(event.target as Node) &&
          !cartIcon.contains(event.target as Node)) {
          setCartVisibility(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartVisible]);

  const toggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartVisibility(!isCartVisible);
    if (!isCartVisible) {
      setError(null);
    }
  };

  const calculateTotal = () => {
    return bookings.reduce((total, booking) => {
      return total + booking.totalPrice;
    }, 0).toFixed(2);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCheckout = async () => {
    setError(null);
    if (!isLoggedIn || !user) {
      setError('Please log in to complete your booking');
      return;
    }

    if (totalBookings === 0) {
      setError('Your cart is empty');
      return;
    }

    if (!bookings[0].passengerPassport || bookings[0].passengerPassport === 'N/A') {
      setShowPassportForm(true);
      return;
    }

    try {
      const bookingData = {
        seatNumber: bookings[0].seatNumber,
        totalPrice: bookings[0].totalPrice,
        passengerName: bookings[0].passengerName,
        passengerPassport: passportNumber || bookings[0].passengerPassport,
        userId: user.id,
        routeId: bookings[0].routeId,
        travelDate: new Date(bookings[0].travelDate),
        isRoundTrip: bookings[0].isRoundTrip || false,
        arrivalDate: bookings[0].arrivalDate ? new Date(bookings[0].arrivalDate) : undefined
      };

      const booking = await bookingService.createBooking(bookingData);

      if (booking.success && booking.data && booking.data._id) {
        setCreatedBookingId(booking.data._id);
        const totalAmount = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
        setPaymentAmount(Math.round(totalAmount * 100));
        setShowPaymentForm(true);
      } else {
        throw new Error('Invalid booking response');
      }
    } catch (error) {
      setError('Failed to create booking');
    }
  };

  const handlePaymentSuccess = async () => {
    setError(null);
    if (!createdBookingId) {
      setError('No booking found to confirm');
      return;
    }

    try {
      setIsProcessing(true);
      setIsPaymentProcessing(true);
      setPaymentStatus('Confirming your booking...');

      await bookingService.updateBookingStatus(createdBookingId, 'confirmed', user?.id || '');

      setPaymentStatus('Payment successful!');
      toast.success(t.ticket.purchaseSuccess);

      setShowPaymentForm(false);
      setCreatedBookingId(null);
      setIsPaymentProcessing(false);
      setPaymentStatus(null);

      setTimeout(() => {
        dispatch(removeBooking({ seatNumber: bookings[0].seatNumber }));
        dispatch(clearCart());
        navigate('/');
      }, 1000);
    } catch (error) {
      setError('Payment successful but failed to confirm booking. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setError(error);
    setShowPaymentForm(false);
    setIsPaymentProcessing(false);
    setPaymentStatus(null);
  };

  const handlePassportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (passportNumber.trim()) {
      setShowPassportForm(false);
      handleCheckout();
    } else {
      setError(t.passport.error);
    }
  };

  const toggleTicketExpansion = (seatNumber: number) => {
    setExpandedTicket(expandedTicket === seatNumber ? null : seatNumber);
  };

  return (
    <div className="cart-container">
      <div
        className="cart-icon-container"
        onClick={toggleCart}
      >
        <FaShoppingCart className="shoppingCart" />
        {totalBookings > 0 && <span className="cart-count">{totalBookings}</span>}
      </div>

      {isCartVisible && (
        <div className="cart-overlay" onClick={() => setCartVisibility(false)}>
          <div className="cart-details" onClick={(e) => e.stopPropagation()}>
            <button className="close-cart" onClick={() => setCartVisibility(false)}>
              <FaTimes />
            </button>
            <h3>{t.title}</h3>

            {error && <div className="error-message">{error}</div>}

            {showPassportForm ? (
              <form onSubmit={handlePassportSubmit} className="passport-form">
                <h4>{t.passport.title}</h4>
                <input
                  type="text"
                  placeholder={t.passport.placeholder}
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                />
                <button type="submit" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <FaSpinner className="spinner" /> Processing...
                    </>
                  ) : (
                    t.passport.submit
                  )}
                </button>
              </form>
            ) : showPaymentForm && createdBookingId ? (
              <div className="payment-form-container">
                {isPaymentProcessing && (
                  <div className="payment-processing-overlay">
                    <FaSpinner className="spinner" />
                    <p>{paymentStatus}</p>
                  </div>
                )}
                <Elements stripe={stripePromise}>
                  <StripePaymentForm
                    amount={paymentAmount}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
              </div>
            ) : totalBookings > 0 ? (
              <>
                <ul className="cart-items-list">
                  {bookings.map((booking) => {
                    const route = routeDetails[booking.routeId];
                    const isExpanded = expandedTicket === booking.seatNumber;
                    return (
                      <li key={booking.seatNumber} className="cart-item">
                        <div className="ticket-card">
                          <div className="ticket-header" onClick={() => toggleTicketExpansion(booking.seatNumber)}>
                            <div className="ticket-main">
                              <div className="passenger-info">
                                <span className="passenger-name">
                                  {booking.passengerName}
                                </span>
                                <span className="seat-number">
                                  <FaBus className="seat-icon" />
                                  {t.passenger.seat} {booking.seatNumber}
                                </span>
                              </div>
                              <div className="ticket-actions">
                                <span className="ticket-price">€{booking.totalPrice.toFixed(2)}</span>
                                <FaChevronDown className={`expand-icon ${expandedTicket === booking.seatNumber ? 'expanded' : ''}`} />
                              </div>
                            </div>
                            <button
                              className="remove-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeBooking({ seatNumber: booking.seatNumber }));
                                toast.info(t.ticket.removed);
                              }}
                            >
                              <FaTrash />
                            </button>
                          </div>

                          {isExpanded && (
                            <div className="ticket-body">
                              <div className="route-info">
                                <div className="route">
                                  <FaMapMarkerAlt className="route-icon" />
                                  <div className="route-details">
                                    <span className="origin">{route?.origin || 'Loading...'}</span>
                                    <span className="arrow">→</span>
                                    <span className="destination">{route?.destination || 'Loading...'}</span>
                                  </div>
                                </div>
                                <div className="journey-dates">
                                  <div className="date departure">
                                    <FaCalendarAlt className="date-icon" />
                                    <div className="date-details">
                                      <span className="departure-label">Departure</span>
                                      <span className="departure-date">{formatDate(booking.travelDate)}</span>
                                    </div>
                                  </div>
                                  {booking.isRoundTrip && booking.arrivalDate && (
                                    <>
                                      <div className="journey-separator">
                                        <div className="separator-line"></div>
                                        <div className="round-trip-label">Round Trip</div>
                                        <div className="separator-line"></div>
                                      </div>
                                      <div className="route return-route">
                                        <FaMapMarkerAlt className="route-icon" />
                                        <div className="route-details">
                                          <span className="origin">{route?.destination || 'Loading...'}</span>
                                          <span className="arrow">→</span>
                                          <span className="destination">{route?.origin || 'Loading...'}</span>
                                        </div>
                                      </div>
                                      <div className="date return">
                                        <FaCalendarAlt className="date-icon" />
                                        <div className="date-details">
                                          <span className="return-label">Return</span>
                                          <span className="return-date">{formatDate(booking.arrivalDate)}</span>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>{t.total}:</span>
                    <span>€{calculateTotal()}</span>
                  </div>
                  <button
                    className="checkout-btn"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <FaSpinner className="spinner" /> Processing...
                      </>
                    ) : (
                      t.checkout
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <p>{t.empty}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
