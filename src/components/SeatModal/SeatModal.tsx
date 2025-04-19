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

type TicketType = 'adult' | 'student' | 'child';

function SeatModal({ selectedSeat, setSelectedSeat, routeId, travelDate }: SeatModalProps) {
  const dispatch = useDispatch();
  const [passengerName, setPassengerName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [ticketType, setTicketType] = useState<TicketType>('adult');
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

  // Get base price based on seat type
  const getBasePrice = (seatNumber: number) => {
    if (seatNumber <= 10) return 20; // Premium seats
    if (seatNumber <= 20) return 16; // Standard seats
    return 12; // Economy seats
  };

  // Get final price based on ticket type
  const getFinalPrice = (basePrice: number, type: TicketType) => {
    switch (type) {
      case 'student':
        return basePrice * 0.8; // 20% discount for students
      case 'child':
        return basePrice * 0.5; // 50% discount for children
      default:
        return basePrice; // Full price for adults
    }
  };

  // ADD BOOKING FUNCTION
  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeat) {
      const basePrice = getBasePrice(selectedSeat);
      const finalPrice = getFinalPrice(basePrice, ticketType);

      const booking: Omit<Booking, 'id' | 'userId' | 'status' | 'bookingDate' | 'paymentStatus'> = {
        seatNumber: selectedSeat,
        totalPrice: finalPrice,
        passengerName,
        passengerPassport: passportNumber,
        routeId,
        travelDate
      };
      dispatch(addBooking(booking));
      handleCloseModal();
    }
  };

  const basePrice = getBasePrice(selectedSeat);
  const finalPrice = getFinalPrice(basePrice, ticketType);

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
              <div className="custom-select">
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value as TicketType)}
                  required
                >
                  <option value="adult">Adult - 20 €</option>
                  <option value="student">Student - 13 €</option>
                  <option value="child">Child - 10 €</option>
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
        <div className="custom-select">
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value as TicketType)}
            required
          >
            <option value="adult">Adult (Full Price)</option>
            <option value="student">Student (20% Off)</option>
            <option value="child">Child (50% Off)</option>
          </select>
        </div>
        <div className="price-display">
          <p>Base Price: €{basePrice.toFixed(2)}</p>
          <p>Final Price: €{finalPrice.toFixed(2)}</p>
        </div>
        <button type="submit">Add to Cart</button>
      </form>
    </div>
  );
}

export default SeatModal;
