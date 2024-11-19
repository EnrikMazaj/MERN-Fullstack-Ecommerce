import React, { useState } from "react";
import Calendar from "react-calendar";
import "./styles/Tickets.css";
import "react-calendar/dist/Calendar.css";
import Seats from "../components/Seats/Seats.tsx"; // Import the Seats component
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

const Tickets = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date | [Date, Date] | null>(new Date());
  const [isConfirmed, setIsConfirmed] = useState(false);

  const locations = [
    "Athens",
    "Thessaloniki",
    "Patras",
    "Heraklion",
    "Chania",
    "Larissa",
    "Ioannina",
    "Kalamata",
    "Volos",
    "Rhodes",
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
    if (!selectedRoute || !selectedDates) {
      // Show toast notification for missing route or dates
      toast.error("Please select both a route and a departure date before confirming!");
      return; // Don't proceed if the validation fails
    }

    setIsConfirmed(true);
  };

  const handleBack = () => {
    setIsConfirmed(false); // Go back to the initial selection page
  };

  return (
    <div className="content">
      <h1>Tickets</h1>

      {isConfirmed ? (
        <Seats
          selectedRoute={selectedRoute}
          isRoundTrip={isRoundTrip}
          selectedDates={selectedDates}
          onBack={handleBack} // Passing the back function to allow user to go back
        />
      ) : (
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
                <span>{isRoundTrip ? "Round Trip" : "One-Way"}</span>
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

          <div className="selected-info">
            {selectedRoute && <p>Route Selected: {selectedRoute}</p>}
            <p>
              Departure Date:{" "}
              {selectedDates
                ? Array.isArray(selectedDates)
                  ? `${selectedDates[0].toDateString()} to ${selectedDates[1].toDateString()}`
                  : selectedDates.toDateString()
                : "Not selected"}
            </p>
          </div>

          <button className="confirm-button" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      )}

      {/* Toast Container to display the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Tickets;

