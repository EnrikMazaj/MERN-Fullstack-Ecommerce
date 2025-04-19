import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SeatModal from '../components/SeatModal/SeatModal.tsx';
import './styles/Seats.css';
import { RootState } from '../redux/store.tsx';

interface LocationState {
  selectedRoute: string;
  selectedDates: Date | [Date, Date];
}

const Seats = () => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const location = useLocation();
  const { selectedRoute, selectedDates } = location.state as LocationState;

  const bookings = useSelector((state: RootState) => state.cart.bookings);

  const handleSeatClick = (seatNumber: number) => {
    if (!bookings.some((booking) => booking.seatNumber === seatNumber)) {
      setSelectedSeat(seatNumber);
    }
  };

  // Get the travel date from selectedDates
  const travelDate = Array.isArray(selectedDates) ? selectedDates[0] : selectedDates;

  return (
    <div className="content">
      <h1>Seats</h1>
      <div className="seats-container">
        <div className="bus">
          <div className="bus-container">
            {Array.from({ length: 40 }, (_, i) => (
              <p
                className={`bus-seat ${bookings.some((booking) => booking.seatNumber === i + 1) ? 'disabled' : ''} ${selectedSeat === i + 1 ? 'selected' : ''}`}
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
            <SeatModal
              selectedSeat={selectedSeat}
              setSelectedSeat={setSelectedSeat}
              routeId={selectedRoute}
              travelDate={travelDate}
            />
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
