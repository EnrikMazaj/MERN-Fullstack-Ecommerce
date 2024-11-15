import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import LoginModal from "../LoginModal/LoginModal";
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={`${process.env.PUBLIC_URL}/assets/ktel.png`} alt="Ktel Logo" />
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
      <LoginModal />
    </div>
  );
};

export default Navbar;
