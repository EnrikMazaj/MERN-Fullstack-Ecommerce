import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './styles/Tickets.css';
import '../styles/common.css';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import routeService, { Route } from '../services/routeService';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';
import CustomSelect from '../components/CustomSelect/CustomSelect';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Tickets = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Value>(new Date());
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { language } = useTheme();
  const t = translations[language].tickets;

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedRoutes = await routeService.getAllRoutes();
        if (Array.isArray(fetchedRoutes)) {
          setRoutes(fetchedRoutes);
        } else {
          console.error('Invalid response format:', fetchedRoutes);
          setError(t.errors.load);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
        setError(t.errors.load);
        toast.error(t.errors.load);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [t.errors.load]);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const handleRouteChange = (value: string) => {
    setSelectedRoute(value);
  };

  const handleDateChange = (value: Value) => {
    setSelectedDates(value);
  };

  const handleConfirm = () => {
    if (!selectedRoute) {
      toast.error(t.errors.noRoute);
      return;
    } else if (!selectedDates) {
      toast.error(t.errors.noDate);
      return;
    }

    navigate('/seats', {
      state: {
        selectedRoute,
        isRoundTrip,
        selectedDates,
      },
    });
  };

  const routeOptions = Array.isArray(routes) ? routes.map((route) => ({
    value: route._id,
    label: `${route.origin} → ${route.destination} (${route.departureTime})`
  })) : [];

  if (error) {
    return (
      <div className="base-content tickets-content">
        <h1>{t.title}</h1>
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="base-content tickets-content">
      <h1>{t.title}</h1>

      <div className="tickets-container">
        <div className="selection">
          <div className="route-selection-container">
            <CustomSelect
              options={routeOptions}
              value={selectedRoute}
              onChange={handleRouteChange}
              placeholder={loading ? t.loading : t.selectRoute}
              disabled={loading}
            />

            <div className="trip-type-container">
              <button
                className={`trip-type-btn ${!isRoundTrip ? 'active' : ''}`}
                onClick={() => {
                  setIsRoundTrip(false);
                  setSelectedDates(new Date());
                }}
              >
                <span className="trip-icon">→</span>
                {t.oneWay}
              </button>
              <button
                className={`trip-type-btn ${isRoundTrip ? 'active' : ''}`}
                onClick={() => {
                  setIsRoundTrip(true);
                  setSelectedDates(new Date());
                }}
              >
                <span className="trip-icon">↔</span>
                {t.roundTrip}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="calendars-container">
        <div className="departure-calendar-container">
          <h3>{t.departureDate}</h3>
          <Calendar
            onChange={handleDateChange}
            tileDisabled={({ date }) => date <= yesterday}
            selectRange={isRoundTrip}
            value={selectedDates}
          />
        </div>
      </div>

      <button className="confirm-button" onClick={handleConfirm}>
        {t.confirm}
      </button>
    </div>
  );
};

export default Tickets;
