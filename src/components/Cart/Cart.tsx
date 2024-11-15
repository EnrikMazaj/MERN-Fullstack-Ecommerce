import React from "react";
import { FaShoppingCart } from "react-icons/fa"; 
import "./Cart.css"; 

const Cart = () => {
  return (
    <div className="cart-icon-container">
      <FaShoppingCart className="shoppingCart"/> 
    </div>
  );
};

export default Cart;
