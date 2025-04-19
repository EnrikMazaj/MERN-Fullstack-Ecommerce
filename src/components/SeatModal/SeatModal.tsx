import React, { useState, useEffect } from 'react';
import './SeatModal.css';
import { useDispatch } from 'react-redux';
import { addBooking } from '../../features/cartSlice';
import { Booking } from '../../features/types';

interface SeatModalProps {
  selectedSeat: number;
  setSelectedSeat: (seat: number | null) => void;
  routeId: string;
  travelDate: Date;
}

function SeatModal({ selectedSeat, setSelectedSeat, routeId, travelDate }: SeatModalProps) {
  const dispatch = useDispatch();
  const [passengerName, setPassengerName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
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

  // Get price based on seat type (you can modify this based on your pricing logic)
  const getSeatPrice = (seatNumber: number) => {
    // Example pricing logic - you can modify this based on your requirements
    if (seatNumber <= 10) return 20; // Premium seats
    if (seatNumber <= 20) return 16; // Standard seats
    return 12; // Economy seats
  };

  // ADD BOOKING FUNCTION
  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeat) {
      const booking: Omit<Booking, 'id' | 'userId' | 'status' | 'bookingDate' | 'paymentStatus'> = {
        seatNumber: selectedSeat,
        totalPrice: getSeatPrice(selectedSeat),
        passengerName,
        passengerPassport: passportNumber,
        routeId,
        travelDate
      };
      dispatch(addBooking(booking));
      handleCloseModal();
    }
  };

  // Modal view for smaller screens
  if (isModal) {
    return (
      <div className="overlay" onClick={handleCloseModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="seat-details">
            <div className="seat-details-header">
              <h2>Passenger Details</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>
            <form className="seatForm" onSubmit={handleAddToCart}>
              <input
                required
                type="text"
                placeholder="Full Name"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Passport Number"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
              />
              <div className="price-display">
                <p>Seat Price: €{getSeatPrice(selectedSeat)}</p>
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
        <input
          required
          type="text"
          placeholder="Full Name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Passport Number"
          value={passportNumber}
          onChange={(e) => setPassportNumber(e.target.value)}
        />
        <div className="price-display">
          <p>Seat Price: €{getSeatPrice(selectedSeat)}</p>
        </div>
        <button type="submit">Add to Cart</button>
      </form>
    </div>
  );
}

export default SeatModal;
