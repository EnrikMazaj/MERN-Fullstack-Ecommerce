import React, { useState, useEffect } from "react";
import "./SeatModal.css";
import { addTicket } from "../../features/cartSlice.tsx";
import { useDispatch} from "react-redux"

function SeatModal({ selectedSeat, setSelectedSeat }) {
  const dispatch = useDispatch();
  const [ticketType, setTicketType] = useState("");
  const [isModal, setIsModal] = useState(false);

  // Check if we should use modal view based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsModal(window.innerWidth <= 900);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleCloseModal = () => {
    setSelectedSeat(null); 
  };

  // ADD TICKET FUNCTION
  const handleAddToCart =(e) =>{
    e.preventDefault();
    if(ticketType && selectedSeat){
        dispatch(
            addTicket({
                seatNumber: selectedSeat,
                ticketType: ticketType,
            })
        );
        handleCloseModal();
    }
  }

  // Modal view for smaller screens
  if (isModal) {
    return (
      <div className="overlay" onClick={handleCloseModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="seat-details">
            <div className="seat-details-header">
              <h2>Passenger Details for Seat {selectedSeat}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>
            <form className="seatForm" onSubmit={handleAddToCart}>
              <input required type="text" placeholder="Full Name" />
              <input required type="text" placeholder="Passport Number" />
              <div className="custom-select">
                <select required value={ticketType} onChange={(e)=>setTicketType(e.target.value)}>
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
    );
  }

  // Side panel view for larger screens
  return (
    <div className="seat-details">
      <div className="seat-details-header">
        <h2>Passenger Details for Seat {selectedSeat}</h2>
        <button className="close-btn" onClick={handleCloseModal}>
          <span>&times;</span>
        </button>
      </div>
      <form className="seatForm" onSubmit={handleAddToCart}>
        <input required type="text" placeholder="Full Name" />
        <input required type="text" placeholder="Passport Number" />
        <div className="custom-select">
          <select required value={ticketType} onChange={(e)=>setTicketType(e.target.value)}>
            <option value="" disabled selected>Select a ticket type</option>
            <option value="student">Student - $11</option>
            <option value="standard">Standard - $16</option>
            <option value="kids">Kids under 12 - $6</option>
          </select>
        </div>
        <button type="submit">Add to Cart</button>
      </form>
    </div>
  );
}

export default SeatModal;
