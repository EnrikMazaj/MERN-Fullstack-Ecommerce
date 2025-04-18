import React, { useState } from "react";
import { useSelector } from "react-redux";
import SeatModal from "../components/SeatModal/SeatModal.tsx";
import './styles/Seats.css';
import { RootState } from "../redux/store.tsx";

const Seats = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const tickets = useSelector((state:RootState) => state.cart.tickets);

  const handleSeatClick = (seatNumber) => {
    if (!tickets.some(ticket=> ticket.seatNumber === seatNumber)) {
      setSelectedSeat(seatNumber); 
    } 
  };

  return (
    <div className="content">
      <h1>Seats</h1>
      <div className="seats-container">
        <div className="bus">
          <div className="bus-container">
            {Array.from({ length: 40 }, (_, i) => (
              <p
                className={`bus-seat ${tickets.some(ticket =>ticket.seatNumber === i + 1) ? "disabled" : ""} ${selectedSeat === i + 1 ? "selected" : ""}`}
                key={i + 1}
                onClick={() => handleSeatClick(i + 1)}
              >
                {i + 1}
              </p>
            ))}
            <div className="divider"></div>
          </div>
        </div>
        <div className="seat-details-panel">
          {selectedSeat ? (
            <SeatModal selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} />
          ) : (
            <div className="no-seat-selected">
              <h2>Select a Seat</h2>
              <p>Click on an available seat to book it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Seats;

