import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBooking } from '../../features/cartSlice.tsx';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { RootState } from '../../redux/store.tsx';
import './Cart.css';

const Cart = () => {
  const [isCartVisible, setCartVisibility] = useState(false);
  const bookings = useSelector((state: RootState) => state.cart.bookings);
  const dispatch = useDispatch();

  const totalBookings = bookings.length;

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

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout...');
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

      {/* Cart Details */}
      {isCartVisible && (
        <div className="cart-details">
          <h3>Your Cart</h3>

          {totalBookings > 0 ? (
            <>
              <ul>
                {bookings.map((booking) => (
                  <li key={booking.seatNumber} className="cart-item">
                    <span>
                      Seat {booking.seatNumber} - {booking.passengerName}
                      <span className="ticket-price"> (€{booking.totalPrice.toFixed(2)})</span>
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() =>
                        dispatch(removeBooking({ seatNumber: booking.seatNumber }))
                      }
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart-total">
                <span>Total: €{calculateTotal()}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </>
          ) : (
            <div className="empty-cart">
              Your cart is empty
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
