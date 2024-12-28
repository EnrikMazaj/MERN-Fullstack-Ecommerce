import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTicket, clearCart } from "../../features/cartSlice.tsx";
import { FaShoppingCart } from "react-icons/fa";
import { RootState } from '../../redux/store.tsx';
import "./Cart.css";

const Cart = () => {
  const [isCartVisible, setCartVisibility] = useState(false);
  const tickets = useSelector((state: RootState) => state.cart.tickets);
  const dispatch = useDispatch();

  const totalTickets = tickets.length;

  // Toggle cart visibility
  const toggleCart = (e) => {
    // Stop propagation to prevent the toggle from triggering when clicking inside the cart details
    e.stopPropagation();
    setCartVisibility(!isCartVisible);
  };

  return (
    <div className="cart-container">
      {/* Shopping Cart Icon with Ticket Count */}
      <div
        className="cart-icon-container"
        onClick={toggleCart} // Only toggle when the icon is clicked
      >
        <FaShoppingCart className="shoppingCart" />
        {totalTickets > 0 && <span className="cart-count">{totalTickets}</span>}
      </div>

      {/* Cart Details */}
      {isCartVisible && totalTickets > 0 && (
        <div className="cart-details" onClick={(e) => e.stopPropagation()}>
          {/* Prevent closing when clicking inside the cart details */}
          <h3>Your Cart</h3>
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.seatNumber} className="cart-item">
                <span>
                  Seat {ticket.seatNumber} - {ticket.ticketType}
                </span>
                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(removeTicket({ seatNumber: ticket.seatNumber }))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            className="clear-cart-btn"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

