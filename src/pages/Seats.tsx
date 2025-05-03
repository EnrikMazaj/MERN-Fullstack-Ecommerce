import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SeatModal from '../components/SeatModal/SeatModal.tsx';
import './styles/Seats.css';
import { RootState } from '../redux/store.tsx';
import routeService, { Route } from '../services/routeService';
import { toast } from 'react-toastify';

interface LocationState {
  selectedRoute: string;
  selectedDates: Date | [Date, Date];
  isRoundTrip: boolean;
}

const Seats = () => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [routeDetails, setRouteDetails] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { selectedRoute, selectedDates, isRoundTrip } = location.state as LocationState;

  const bookings = useSelector((state: RootState) => state.cart.bookings);

  // Fetch route details
  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        setLoading(true);
        const route = await routeService.getRouteById(selectedRoute);
        setRouteDetails(route);
      } catch (error) {
        console.error('Error fetching route details:', error);
        toast.error('Failed to load route details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedRoute) {
      fetchRouteDetails();
    }
  }, [selectedRoute]);

  const handleSeatClick = (seatNumber: number) => {
    if (!bookings.some((booking) => booking.seatNumber === seatNumber)) {
      setSelectedSeat(seatNumber);
    }
  };

  if (loading) {
    return (
      <div className="content">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!routeDetails) {
    return (
      <div className="content">
        <h1>Route not found</h1>
        <p>The selected route could not be found. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div className="content">
      <h1>Seats</h1>
      <div className="route-info">
        <h2>{routeDetails.origin} → {routeDetails.destination}</h2>
        <p>Departure: {Array.isArray(selectedDates) ? new Date(selectedDates[0]).toLocaleDateString() : new Date(selectedDates).toLocaleDateString()}</p>
        {isRoundTrip && Array.isArray(selectedDates) && selectedDates[1] && (
          <p>Return: {new Date(selectedDates[1]).toLocaleDateString()}</p>
        )}
      </div>
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
              travelDate={selectedDates}
              isRoundTrip={isRoundTrip}
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
