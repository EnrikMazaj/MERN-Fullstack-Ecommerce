import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../components/Slideshow/Slideshow';
import './styles/Home.css';
import '../styles/common.css';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useTheme();
  const t = translations[language].home;

  return (
    <div className="base-content home-content">
      <div className="hero-section">
        <div className="hero-content">
          <h1>{t.welcome}</h1>
          <p className="hero-text">
            {t.heroText}
          </p>
          <button className="cta-button" onClick={() => navigate('/tickets')}>
            {t.bookJourney}
          </button>
        </div>
        <div className="hero-slideshow">
          <h2>{t.exploreRoutes}</h2>
          <Slideshow />
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🚌</div>
          <h3>{t.features.modernFleet.title}</h3>
          <p>{t.features.modernFleet.description}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎫</div>
          <h3>{t.features.easyBooking.title}</h3>
          <p>{t.features.easyBooking.description}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🗺️</div>
          <h3>{t.features.extensiveRoutes.title}</h3>
          <p>{t.features.extensiveRoutes.description}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>{t.features.safeTravel.title}</h3>
          <p>{t.features.safeTravel.description}</p>
        </div>
      </div>

      <div className="info-section">
        <div className="info-content">
          <h2>{t.whyChooseUs.title}</h2>
          <p>{t.whyChooseUs.paragraph1}</p>
          <p>{t.whyChooseUs.paragraph2}</p>
          <p>{t.whyChooseUs.paragraph3}</p>
        </div>
        <div className="quick-book-section">
          <h3>{t.readyToTravel.title}</h3>
          <p>{t.readyToTravel.description}</p>
          <button
            className="secondary-button"
            onClick={() => {
              navigate('/tickets');
            }}
            type="button"
          >
            {t.readyToTravel.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
