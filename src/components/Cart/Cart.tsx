import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBooking } from '../../features/cartSlice.tsx';
import { FaShoppingCart, FaTrash, FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaChevronDown, FaBus } from 'react-icons/fa';
import { RootState } from '../../redux/store.tsx';
import { useAuth } from '../../context/AuthContext';
import routeService from '../../services/routeService';
import StripeCheckout from '../StripeCheckout/StripeCheckout';
import './Cart.css';

import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

interface RouteDetails {
  _id: string;
  origin: string;
  destination: string;
}

const Cart = () => {
  const [isCartVisible, setCartVisibility] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassportForm, setShowPassportForm] = useState(false);
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
  const [passportNumber, setPassportNumber] = useState('');
  const [routeDetails, setRouteDetails] = useState<{ [key: string]: RouteDetails }>({});
  const [expandedTicket, setExpandedTicket] = useState<number | null>(null);
  const bookings = useSelector((state: RootState) => state.cart.bookings);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useAuth();
  const { language } = useTheme();
  const t = translations[language].cart;

  const totalBookings = bookings.length;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      const uniqueRouteIds = [...new Set(bookings.map(booking => booking.routeId))];
      const routeDetailsPromises = uniqueRouteIds.map(async (routeId) => {
        try {
          const route = await routeService.getRouteById(routeId);
          return { [routeId]: route };
        } catch (error) {
          return { [routeId]: { _id: routeId, origin: 'Unknown', destination: 'Unknown' } };
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
  };

  const calculateTotal = () => {
    return bookings.reduce((total, booking) => {
      return total + booking.totalPrice;
    }, 0).toFixed(2);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCheckout = async () => {
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

    // Open Stripe checkout instead of processing directly
    setShowStripeCheckout(true);
    setCartVisibility(false);
  };



  const handlePassportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passportNumber.trim()) {
      setShowPassportForm(false);
      setShowStripeCheckout(true);
      setCartVisibility(false);
    } else {
      setError(t.passport.error);
    }
  };

  const toggleTicketExpansion = (seatNumber: number) => {
    setExpandedTicket(expandedTicket === seatNumber ? null : seatNumber);
  };

  const handleStripeCheckoutClose = () => {
    setShowStripeCheckout(false);
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

            {error && (
              <div className="error-message">
                <span>{error}</span>
                <button
                  className="error-close-btn"
                  onClick={() => setError(null)}
                  type="button"
                >
                  ×
                </button>
              </div>
            )}

            {showPassportForm ? (
              <form onSubmit={handlePassportSubmit} className="passport-form">
                <h4>{t.passport.title}</h4>
                <input
                  type="text"
                  placeholder={t.passport.placeholder}
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                />
                <button type="submit">{t.passport.submit}</button>
              </form>
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
                  >
                    {t.checkout}
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

      <StripeCheckout
        isOpen={showStripeCheckout}
        onClose={handleStripeCheckoutClose}
        passportNumber={passportNumber}
      />
    </div>
  );
};

export default Cart;
