import React from "react"
import { Link } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Routes">Routes</Link></li>
        <li><Link to="/Tickets">Tickets</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
      </ul>
    </div>
  )
};

export default Navbar;
