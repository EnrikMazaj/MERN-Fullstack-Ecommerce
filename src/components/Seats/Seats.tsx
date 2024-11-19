import React from "react";
import './Seats.css'
interface SeatsProps {
  selectedRoute: string;
  isRoundTrip: boolean;
  selectedDates: Date | [Date, Date] | null;
  onBack: () => void;
}

const Seats: React.FC<SeatsProps> = ({
  selectedRoute,
  isRoundTrip,
  selectedDates,
  onBack,
}) => {
  return (
    <div className="seats-content">
      <h2>Thank you for confirming your ticket!</h2>
      <p>Your selected route is: {selectedRoute}</p>
      <p>
        Departure Date:{" "}
        {selectedDates
          ? Array.isArray(selectedDates)
            ? `${selectedDates[0].toDateString()} to ${selectedDates[1].toDateString()}`
            : selectedDates.toDateString()
          : "Not selected"}
      </p>
      <p>
        Round Trip: {isRoundTrip ? "Yes" : "No"}
      </p>
      <button onClick={onBack} className="back-button">
        Back to Selection
      </button>
    </div>
  );
};

export default Seats;

