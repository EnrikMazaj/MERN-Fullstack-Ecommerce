import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LoginModal from '../LoginModal/LoginModal.tsx';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="navbar">
      <Link to={'/'}>
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
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/Routes" onClick={handleLinkClick}>
              Routes
            </Link>
          </li>
          <li>
            <Link to="/Tickets" onClick={handleLinkClick}>
              Tickets
            </Link>
          </li>
          <li>
            <Link to="/Contact" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
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
    </div>
  );
};

export default Navbar;
