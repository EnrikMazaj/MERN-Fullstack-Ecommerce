import React, { useState } from 'react';
import './SeatModal.css';
import { useDispatch } from 'react-redux';
import { addBooking } from '../../features/cartSlice';
import { Booking } from '../../features/types';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

interface SeatModalProps {
  selectedSeat: number;
  setSelectedSeat: (seat: number | null) => void;
  routeId: string;
  travelDate: Date | [Date, Date];
  isRoundTrip?: boolean;
}

type TicketType = 'adult' | 'student' | 'child';

function SeatModal({ selectedSeat, setSelectedSeat, routeId, travelDate, isRoundTrip }: SeatModalProps) {
  const dispatch = useDispatch();
  const [passengerName, setPassengerName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [ticketType, setTicketType] = useState<TicketType>('adult');
  const { language } = useTheme();
  const t = translations[language].seats.passengerDetails;

  const departureDate = Array.isArray(travelDate) ? travelDate[0] : travelDate;
  const arrivalDate = Array.isArray(travelDate) ? travelDate[1] : undefined;

  const handleCloseModal = () => {
    setSelectedSeat(null);
  };

  const getBasePrice = (seatNumber: number) => {
    if (seatNumber <= 10) return 20; // Premium seats
    if (seatNumber <= 20) return 16; // Standard seats
    return 12; // Economy seats
  };

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

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeat) {
      const basePrice = getBasePrice(selectedSeat);
      const finalPrice = getFinalPrice(basePrice, ticketType);
      const totalPrice = isRoundTrip && arrivalDate ? finalPrice * 2 : finalPrice;

      const booking: Omit<Booking, 'id' | 'userId' | 'status' | 'bookingDate' | 'paymentStatus'> = {
        seatNumber: selectedSeat,
        totalPrice,
        passengerName,
        passengerPassport: passportNumber,
        routeId,
        travelDate: departureDate,
        arrivalDate,
        isRoundTrip: !!isRoundTrip && !!arrivalDate
      };
      dispatch(addBooking(booking));
      handleCloseModal();
    }
  };

  return (
    <div className="overlay" onClick={(e) => {
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="seat-details">
          <div className="seat-details-header">
            <h2>{t.title}</h2>
            <button className="close-btn" onClick={handleCloseModal}>
              <span>&times;</span>
            </button>
          </div>
          <form className="seatForm" onSubmit={handleAddToCart}>
            <input
              required
              type="text"
              placeholder={t.fullName}
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder={t.passportNumber}
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
            />
            <div className="custom-select">
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value as TicketType)}
                required
              >
                <option value="adult">{t.ticketTypes.adult}</option>
                <option value="student">{t.ticketTypes.student}</option>
                <option value="child">{t.ticketTypes.child}</option>
              </select>
            </div>
            <button type="submit">{t.addToCart}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SeatModal;
