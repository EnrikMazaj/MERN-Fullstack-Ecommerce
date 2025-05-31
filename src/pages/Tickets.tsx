import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './styles/Tickets.css';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import routeService, { Route } from '../services/routeService';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Tickets = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Value>(new Date());
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const fetchedRoutes = await routeService.getAllRoutes();
        setRoutes(fetchedRoutes);
      } catch (error) {
        toast.error('Failed to load routes. Please try again later.');
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

  const handleTripTypeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoundTrip(e.target.checked);
  };

  const handleDateChange = (value: Value) => {
    setSelectedDates(value);
  };

  const handleConfirm = () => {
    if (!selectedRoute) {
      toast.error('Please select a route before confirming!');
      return;
    } else if (!selectedDates) {
      toast.error('Please select a date before confirming!');
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
      <h1>Tickets</h1>

      <div>
        <div className="selection">
          <select
            className="route-dropdown"
            value={selectedRoute}
            onChange={handleRouteChange}
            disabled={loading}
          >
            <option value="" disabled>
              {loading ? 'Loading routes...' : 'Select a route'}
            </option>
            {routes.map((route) => (
              <option key={route._id} value={route._id}>
                {route.origin} → {route.destination} ({route.departureTime})
              </option>
            ))}
          </select>

          <div className="trip-toggle-container">
            <label>
              <input
                type="checkbox"
                checked={isRoundTrip}
                onChange={handleTripTypeToggle}
              />
              <span>{isRoundTrip ? 'Round Trip' : 'One-Way'}</span>
            </label>
          </div>
        </div>

        <div className="calendars-container">
          <div className="departure-calendar-container">
            <h3>Departure Date</h3>
            <Calendar
              onChange={handleDateChange}
              tileDisabled={({ date }) => date <= yesterday}
              selectRange={isRoundTrip}
              value={selectedDates}
            />
          </div>
        </div>

        <button className="confirm-button" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Tickets;
