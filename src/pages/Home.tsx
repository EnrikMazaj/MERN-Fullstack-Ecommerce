import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../components/Slideshow/Slideshow';
import './styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="content">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Ktel Attikis</h1>
          <p className="hero-text">
            Experience comfortable and reliable bus transportation services across Greece.
            Book your journey with us and travel with confidence.
          </p>
          <button className="cta-button" onClick={() => navigate('/tickets')}>
            Book Your Journey
          </button>
        </div>
        <div className="hero-slideshow">
          <h2>Explore Our Routes</h2>
          <Slideshow />
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🚌</div>
          <h3>Modern Fleet</h3>
          <p>Travel in comfort with our modern, well-maintained buses.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎫</div>
          <h3>Easy Booking</h3>
          <p>Book your tickets online with our simple and secure booking system.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🗺️</div>
          <h3>Extensive Routes</h3>
          <p>Connect to major cities and popular destinations across Greece.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Safe Travel</h3>
          <p>Your safety is our priority with professional drivers and regular maintenance.</p>
        </div>
      </div>

      <div className="info-section">
        <div className="info-content">
          <h2>Why Choose Ktel Attikis?</h2>
          <p>
            At Ktel Attikis, we pride ourselves on providing reliable and comfortable bus transportation services.
            Our modern fleet of buses is regularly maintained to ensure your safety and comfort throughout your journey.
          </p>
          <p>
            With extensive routes connecting major cities and popular destinations across Greece,
            we make it easy for you to explore this beautiful country. Our professional drivers
            are experienced and committed to providing a smooth and enjoyable travel experience.
          </p>
          <p>
            Book your tickets online through our user-friendly platform, and enjoy the convenience
            of secure payments and instant confirmation. We're here to make your journey memorable
            and hassle-free.
          </p>
        </div>
        <div className="quick-book-section">
          <h3>Ready to Travel?</h3>
          <p>Book your tickets now and enjoy our comfortable bus services.</p>
          <button className="secondary-button" onClick={() => navigate('/tickets')}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
