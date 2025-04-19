import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTicket } from '../../features/cartSlice.tsx';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { RootState } from '../../redux/store.tsx';
import './Cart.css';

const Cart = () => {
  const [isCartVisible, setCartVisibility] = useState(false);
  const tickets = useSelector((state: RootState) => state.cart.tickets);
  const dispatch = useDispatch();

  const totalTickets = tickets.length;

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
    return tickets.reduce((total, ticket) => {
      const price = typeof ticket.price === 'number' ? ticket.price : 0;
      return total + price;
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout...');
  };

  return (
    <div className="cart-container">
      {/* Shopping Cart Icon with Ticket Count */}
      <div
        className="cart-icon-container"
        onClick={toggleCart}
      >
        <FaShoppingCart className="shoppingCart" />
        {totalTickets > 0 && <span className="cart-count">{totalTickets}</span>}
      </div>

      {/* Cart Details */}
      {isCartVisible && (
        <div className="cart-details">
          <h3>Your Cart</h3>

          {totalTickets > 0 ? (
            <>
              <ul>
                {tickets.map((ticket) => (
                  <li key={ticket.seatNumber} className="cart-item">
                    <span>
                      Seat {ticket.seatNumber} - {ticket.ticketType}
                      {ticket.price && <span className="ticket-price"> (€{ticket.price.toFixed(2)})</span>}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() =>
                        dispatch(removeTicket({ seatNumber: ticket.seatNumber }))
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
