import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './styles/Tickets.css';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import routeService, { Route } from '../services/routeService';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Tickets = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Value>(new Date());
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useTheme();
  const t = translations[language].tickets;

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const fetchedRoutes = await routeService.getAllRoutes();
        setRoutes(fetchedRoutes);
      } catch (error) {
        toast.error(t.errors.load);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoute(e.target.value);
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

  return (
    <div className="content">
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <h1>{t.title}</h1>

      <div>
        <div className="selection">
          <select
            className="route-dropdown"
            value={selectedRoute}
            onChange={handleRouteChange}
            disabled={loading}
          >
            <option value="" disabled>
              {loading ? t.loading : t.selectRoute}
            </option>
            {routes.map((route) => (
              <option key={route._id} value={route._id}>
                {route.origin} → {route.destination} ({route.departureTime})
              </option>
            ))}
          </select>

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
    </div>
  );
};

export default Tickets;
