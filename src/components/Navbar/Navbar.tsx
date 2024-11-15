import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import LoginModal from "../LoginModal/LoginModal.tsx";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <img src={`${process.env.PUBLIC_URL}/assets/ktel.png`} alt="Ktel Logo" />

      {/* The mobile menu */}
      <div className={`menu ${isMenuOpen ? "active" : ""}`}>
        <ul className="list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Routes">Routes</Link>
          </li>
          <li>
            <Link to="/Tickets">Tickets</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </div>

      <LoginModal />

      
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;

