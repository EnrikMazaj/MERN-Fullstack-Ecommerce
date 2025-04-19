import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import LoginModal from '../LoginModal/LoginModal.tsx';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/assets/ktel.png`}
          alt="Ktel Logo"
        />
      </Link>
      {/* The mobile menu */}
      <div ref={menuRef} className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <ul className="list">
          <li>
            <Link
              to="/"
              onClick={handleLinkClick}
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/routes"
              onClick={handleLinkClick}
              className={isActive('/routes') ? 'active' : ''}
            >
              Routes
            </Link>
          </li>
          <li>
            <Link
              to="/tickets"
              onClick={handleLinkClick}
              className={isActive('/tickets') ? 'active' : ''}
            >
              Tickets
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className={isActive('/contact') ? 'active' : ''}
            >
              Contact
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link
                to="/my-bookings"
                onClick={handleLinkClick}
                className={isActive('/my-bookings') ? 'active' : ''}
              >
                My Bookings
              </Link>
            </li>
          )}
        </ul>
      </div>

      <LoginModal />

      <div
        ref={hamburgerRef}
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
