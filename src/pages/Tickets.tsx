import React, { useState } from "react";
import Calendar from "react-calendar";
import "./styles/Tickets.css";
import "react-calendar/dist/Calendar.css";

const Tickets = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false); 
  const locations = [
    "Athens", "Thessaloniki", "Patras", "Heraklion", "Chania", "Larissa", "Ioannina", "Kalamata", "Volos", "Rhodes"
  ];

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoute(e.target.value);
  };

  const handleTripTypeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoundTrip(e.target.checked);
  };

  return (
    <div className="content">
      <h1>Tickets</h1>
      <h3>Route</h3>
      <div className="selection">
      <select className="route-dropdown" value={selectedRoute} onChange={handleRouteChange}>
        <option value="" disabled>Select a route</option>
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
          <span>{isRoundTrip ? "Round Trip" : "One-Way"}</span>
        </label>
      </div>
      </div>

<div className="calendars-container">
      <div className="departure-calendar-container">
        <h3>Departure Date</h3>
        <Calendar  />
      </div>

      {isRoundTrip &&
      <div className="return-calendar-container">
        <h3>Return Date</h3>
        <Calendar   />
      </div>
    }
  </div>

      <div className="selected-info">
        {selectedRoute && (
          <p>
            Route Selected: {selectedRoute}
          </p>
        )}
        <p>
          Departure Date:
        </p>
        <p>
          Return Date:
        </p>
      </div>

    
      </div>
  );
};

export default Tickets;
