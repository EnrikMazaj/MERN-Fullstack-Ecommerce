import React, { useState } from "react";
import SeatModal from "../components/SeatModal/SeatModal.tsx";
import './styles/Seats.css';

const Seats = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeat === seatNumber) {
      setSelectedSeat(null); 
    } else {
      setSelectedSeat(seatNumber); 
    }
  };

  return (
    <div className="content">
      <h1>Seats</h1>
      <div className="bus">
        <div className="bus-container">
          {Array.from({ length: 40 }, (_, i) => (
            <p
              className={`bus-seat ${selectedSeat === i + 1 ? "selected" : ""}`}
              key={i + 1}
              onClick={() => handleSeatClick(i + 1)}
            >
              {i + 1}
            </p>
          ))}
          <div className="divider"></div>
        </div>
      </div>
      <SeatModal 
        selectedSeat={selectedSeat}
        setSelectedSeat={setSelectedSeat}
      />
    </div>
  );
};

export default Seats;

