import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import Cart from './components/Cart/Cart.tsx';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop.tsx';
import ToastConfig from './components/ToastConfig.tsx';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home.tsx'));
const Tickets = lazy(() => import('./pages/Tickets.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const RoutesKtel = lazy(() => import('./pages/Routes.tsx'));
const Seats = lazy(() => import('./pages/Seats.tsx'));
const MyBookings = lazy(() => import('./pages/MyBookings.tsx'));

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <ToastConfig />
          <div className="App">
            <Navbar />
            <Suspense fallback={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                fontSize: '1.2rem',
                color: '#666'
              }}>
                Loading...
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/routes" element={<RoutesKtel />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/seats" element={<Seats />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/my-bookings" element={<MyBookings />} />
              </Routes>
            </Suspense>
            <Cart />
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
