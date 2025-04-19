import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Tickets from './pages/Tickets.tsx';
import Contact from './pages/Contact.tsx';
import RoutesKtel from './pages/Routes.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import Seats from './pages/Seats.tsx';
import React from 'react';
import Cart from './components/Cart/Cart.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import MyBookings from './pages/MyBookings.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 99999 }}
          theme="light"
        />
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routes" element={<RoutesKtel />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/seats" element={<Seats />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
          <Cart />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
