import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './styles/Tickets.css';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [selectedDates, setSelectedDates] = useState<
    Date | [Date, Date] | null
  >(new Date());
  const navigate = useNavigate();

  const locations = [
    'Athens',
    'Thessaloniki',
    'Patras',
    'Heraklion',
    'Chania',
    'Larissa',
    'Ioannina',
    'Kalamata',
    'Volos',
    'Rhodes',
  ];

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoute(e.target.value);
  };

  const handleTripTypeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoundTrip(e.target.checked);
  };

  const handleDateChange = (value: Date | [Date, Date] | null) => {
    if (value !== null) {
      setSelectedDates(value);
    }
  };

  const handleConfirm = () => {
    if (!selectedRoute) {
      toast.error('Please select a route before confirming!');
      return;
    } else if (!selectedDates) {
      toast.error('Please select a route before confirming!');
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
        <h3>Route</h3>
        <div className="selection">
          <select
            className="route-dropdown"
            value={selectedRoute}
            onChange={handleRouteChange}
          >
            <option value="" disabled>
              Select a route
            </option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
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
              onChange={(value) => handleDateChange(value)}
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

      <ToastContainer />
    </div>
  );
};

export default Tickets;
