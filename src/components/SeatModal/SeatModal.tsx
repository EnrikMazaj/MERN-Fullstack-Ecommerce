import React, { useState } from "react";
import "./SeatModal.css";
import { addTicket } from "../../features/cartSlice.tsx";
import { useDispatch} from "react-redux"

function SeatModal({ selectedSeat, setSelectedSeat }) {
  const [isSeatModalOpen, setSeatModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [ticketType, setTicketType] = useState("");

  React.useEffect(() => {
    if (selectedSeat !== null) {
      setSeatModalOpen(true);
    }
  }, [selectedSeat]);

  const handleCloseModal = () => {
    setSeatModalOpen(false);
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
      )}
    </>
  );
}

export default SeatModal;
