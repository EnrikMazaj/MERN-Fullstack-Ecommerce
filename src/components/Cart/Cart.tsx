import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBooking } from '../../features/cartSlice.tsx';
import { FaShoppingCart, FaTrash, FaTimes, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { RootState } from '../../redux/store.tsx';
import { useAuth } from '../../context/AuthContext';
import bookingService from '../../services/bookingService';
import routeService from '../../services/routeService';
import './Cart.css';

interface RouteDetails {
  _id: string;
  origin: string;
  destination: string;
}

const Cart = () => {
  const [isCartVisible, setCartVisibility] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassportForm, setShowPassportForm] = useState(false);
  const [passportNumber, setPassportNumber] = useState('');
  const [routeDetails, setRouteDetails] = useState<{ [key: string]: RouteDetails }>({});
  const bookings = useSelector((state: RootState) => state.cart.bookings);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useAuth();

  const totalBookings = bookings.length;

  // Fetch route details for all bookings
  useEffect(() => {
    const fetchRouteDetails = async () => {
      const uniqueRouteIds = [...new Set(bookings.map(booking => booking.routeId))];
      const routeDetailsPromises = uniqueRouteIds.map(async (routeId) => {
        try {
          const route = await routeService.getRouteById(routeId);
          return { [routeId]: route };
        } catch (error) {
          console.error(`Error fetching route details for ${routeId}:`, error);
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

  // Close cart when clicking outside
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

  // Toggle cart visibility
  const toggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartVisibility(!isCartVisible);
  };

  // Calculate total price
  const calculateTotal = () => {
    return bookings.reduce((total, booking) => {
      return total + booking.totalPrice;
    }, 0).toFixed(2);
  };

  // Format date to a readable string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCheckout = async () => {
    // Check if user is logged in
    if (!isLoggedIn || !user) {
      setError('Please log in to complete your booking');
      // You might want to redirect to login page or show login modal here
      return;
    }

    // Check if cart is empty
    if (totalBookings === 0) {
      setError('Your cart is empty');
      return;
    }

    // Check if passport information is needed
    if (!bookings[0].passengerPassport || bookings[0].passengerPassport === 'N/A') {
      setShowPassportForm(true);
      return;
    }

    await processCheckout();
  };

  const processCheckout = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      console.log('Starting checkout process with bookings:', bookings);
      console.log('User information:', user);

      if (!user?.id) {
        throw new Error('User ID not found. Please log in again.');
      }

      // Create bookings for each item in the cart
      const bookingPromises = bookings.map(booking => {
        const bookingData = {
          seatNumber: booking.seatNumber,
          totalPrice: booking.totalPrice,
          passengerName: booking.passengerName,
          passengerPassport: passportNumber || booking.passengerPassport,
          userId: user.id, // Using the MongoDB _id from the user object
          routeId: booking.routeId,
          travelDate: booking.travelDate
        };

        console.log('Creating booking with data:', bookingData);
        return bookingService.createBooking(bookingData);
      });

      console.log('Waiting for all booking promises to resolve...');
      await Promise.all(bookingPromises);
      console.log('All bookings created successfully');

      // Clear the cart after successful booking
      bookings.forEach(booking => {
        dispatch(removeBooking({ seatNumber: booking.seatNumber }));
      });

      // Close the cart modal
      setCartVisibility(false);

      // Show success message
      alert('Bookings created successfully!');
    } catch (error) {
      console.error('Error in checkout process:', error);

      // Extract error message from different error types
      let errorMessage = 'Failed to create bookings. Please try again.';

      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      } else if (typeof error === 'object' && error !== null) {
        const axiosError = error as any;
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = `Server error (${axiosError.response.status}): ${JSON.stringify(axiosError.response.data)}`;
        } else if (axiosError.request) {
          // The request was made but no response was received
          errorMessage = 'No response from server. Please check your connection.';
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = `Request error: ${axiosError.message}`;
        }
      }

      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePassportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passportNumber.trim()) {
      setShowPassportForm(false);
      processCheckout();
    } else {
      setError('Please enter a valid passport number');
    }
  };

  return (
    <div className="cart-container">
      {/* Shopping Cart Icon with Booking Count */}
      <div
        className="cart-icon-container"
        onClick={toggleCart}
      >
        <FaShoppingCart className="shoppingCart" />
        {totalBookings > 0 && <span className="cart-count">{totalBookings}</span>}
      </div>

      {/* Cart Overlay and Details */}
      {isCartVisible && (
        <div className="cart-overlay" onClick={() => setCartVisibility(false)}>
          <div className="cart-details" onClick={(e) => e.stopPropagation()}>
            <button className="close-cart" onClick={() => setCartVisibility(false)}>
              <FaTimes />
            </button>
            <h3>Your Cart</h3>

            {error && <div className="error-message">{error}</div>}

            {showPassportForm ? (
              <div className="passport-form">
                <h4>Passport Information Required</h4>
                <p>Please enter your passport number to complete the booking:</p>
                <form onSubmit={handlePassportSubmit}>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="Enter passport number"
                    required
                  />
                  <div className="form-buttons">
                    <button type="button" onClick={() => setShowPassportForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" disabled={isProcessing}>
                      {isProcessing ? 'Processing...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            ) : totalBookings > 0 ? (
              <>
                <ul>
                  {bookings.map((booking) => {
                    const route = routeDetails[booking.routeId];
                    return (
                      <li key={booking.seatNumber} className="cart-item">
                        <div className="cart-item-details">
                          <div className="passenger-info">
                            <span className="passenger-name">
                              {booking.passengerName}
                            </span>
                            <span className="seat-number">
                              Seat {booking.seatNumber}
                            </span>
                          </div>
                          <div className="route-info">
                            <div className="route">
                              <FaMapMarkerAlt className="route-icon" />
                              <span>{route ? `${route.origin} → ${route.destination}` : 'Loading route...'}</span>
                            </div>
                            <div className="date">
                              <FaCalendarAlt className="date-icon" />
                              <span>Departure: {formatDate(booking.travelDate)}</span>
                            </div>
                            {booking.isRoundTrip && booking.arrivalDate && (
                              <div className="date return-date">
                                <FaCalendarAlt className="date-icon" />
                                <span>Return: {formatDate(booking.arrivalDate)}</span>
                              </div>
                            )}
                          </div>
                          <div className="price">
                            <span className="ticket-price">€{booking.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() =>
                            dispatch(removeBooking({ seatNumber: booking.seatNumber }))
                          }
                        >
                          <FaTrash />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-price">€{calculateTotal()}</span>
                </div>
                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Checkout'}
                </button>
              </>
            ) : (
              <div className="empty-cart">
                <p>Your cart is empty</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
