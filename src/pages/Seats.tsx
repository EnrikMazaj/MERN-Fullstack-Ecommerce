import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SeatModal from '../components/SeatModal/SeatModal.tsx';
import './styles/Seats.css';
import { RootState } from '../redux/store.tsx';
import routeService, { Route } from '../services/routeService';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

interface LocationState {
  selectedRoute: string;
  selectedDates: Date | [Date, Date];
  isRoundTrip: boolean;
}

const Seats = () => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [routeDetails, setRouteDetails] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const location = useLocation();
  const { selectedRoute, selectedDates, isRoundTrip } = location.state as LocationState;
  const { language } = useTheme();
  const t = translations[language].seats;

  const bookings = useSelector((state: RootState) => state.cart.bookings);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        setLoading(true);
        const route = await routeService.getRouteById(selectedRoute);
        setRouteDetails(route);
      } catch (error) {
        toast.error(t.errors.loadRoute);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRoute) {
      fetchRouteDetails();
    }
  }, [selectedRoute, t.errors.loadRoute]);

  // Load booked seats from localStorage on component mount
  useEffect(() => {
    const storedBookedSeats = localStorage.getItem(`bookedSeats_${selectedRoute}`);
    if (storedBookedSeats) {
      setBookedSeats(JSON.parse(storedBookedSeats));
    } else {
      // Generate random booked seats if none exist
      const randomBookedSeats = generateRandomBookedSeats();
      setBookedSeats(randomBookedSeats);
      localStorage.setItem(`bookedSeats_${selectedRoute}`, JSON.stringify(randomBookedSeats));
    }
  }, [selectedRoute]);

  const generateRandomBookedSeats = () => {
    const totalSeats = 40;
    const bookedCount = Math.floor(Math.random() * 15) + 5; // Random number between 5 and 20
    const seats = new Set<number>();

    while (seats.size < bookedCount) {
      const seatNumber = Math.floor(Math.random() * totalSeats) + 1;
      seats.add(seatNumber);
    }

    return Array.from(seats);
  };

  const handleSeatClick = (seatNumber: number) => {
    if (!bookedSeats.includes(seatNumber) && !bookings.some((booking) => booking.seatNumber === seatNumber)) {
      setSelectedSeat(seatNumber);
    }
  };

  if (loading) {
    return (
      <div className="content">
        <h1>{t.loading}</h1>
      </div>
    );
  }

  if (!routeDetails) {
    return (
      <div className="content">
        <h1>{t.routeNotFound}</h1>
        <p>{t.routeNotFoundMessage}</p>
      </div>
    );
  }

  return (
    <div className="content">
      <h1>{t.title}</h1>
      <div className="route-info">
        <h2>{routeDetails.origin} → {routeDetails.destination}</h2>
        <div className="dates-container">
          <div className="date-info departure">
            <span className="date-label">{t.routeInfo.departure}</span>
            <span className="date-value">
              {Array.isArray(selectedDates) ? new Date(selectedDates[0]).toLocaleDateString() : new Date(selectedDates).toLocaleDateString()}
            </span>
          </div>
          {isRoundTrip && Array.isArray(selectedDates) && selectedDates[1] && (
            <>
              <div className="round-trip-separator">→</div>
              <div className="date-info return">
                <span className="date-label">{t.routeInfo.return}</span>
                <span className="date-value">
                  {new Date(selectedDates[1]).toLocaleDateString()}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="seats-container">
        <div className="bus">
          <div className="bus-container">
            {Array.from({ length: 40 }, (_, i) => (
              <p
                className={`bus-seat ${bookedSeats.includes(i + 1) || bookings.some((booking) => booking.seatNumber === i + 1)
                  ? 'disabled'
                  : ''
                  } ${selectedSeat === i + 1 ? 'selected' : ''}`}
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
              travelDate={selectedDates}
              isRoundTrip={isRoundTrip}
            />
          ) : (
            <div className="no-seat-selected">
              <h2>{t.selectSeat.title}</h2>
              <p>{t.selectSeat.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Seats;
