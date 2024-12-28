import React, { useState } from "react";
import "./SeatModal.css";

function SeatModal({ selectedSeat, setSelectedSeat }) {
  const [isSeatModalOpen, setSeatModalOpen] = useState(false);


  React.useEffect(() => {
    if (selectedSeat !== null) {
      setSeatModalOpen(true);
    }
  }, [selectedSeat]);

  const handleCloseModal = () => {
    setSeatModalOpen(false);
    setSelectedSeat(null); 
  };

  return (
    <>
      {isSeatModalOpen && (
        <div className="overlay" onClick={handleCloseModal}>
          <div className="seatModal" onClick={(e) => e.stopPropagation()}>
            <div className="modalContent">
              <span className="closeBtn" onClick={handleCloseModal}>
                &times;
              </span>
              <h2>Passenger Details<br/> for Seat {selectedSeat}</h2>
              <form className="seatForm">
                <input required type="text" placeholder="Full Name" />
                <input required type="text" placeholder="Passport Number" />
                <div className="custom-select">
            <select required>
                <option value="" disabled selected>Select a ticket type</option>
                <option value="student">Student - $11</option>
                <option value="standard">Standard - $16</option>
                <option value="kids">Kids under 12 - $6</option>
            </select>
        </div>
                <button type="submit">Add to Cart</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SeatModal;
