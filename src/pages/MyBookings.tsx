import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import bookingService from '../services/bookingService';
import routeService from '../services/routeService';
import './styles/MyBookings.css';

interface Booking {
    _id: string;
    routeId: string;
    seatNumber: number;
    totalPrice: number;
    passengerName: string;
    passengerPassport: string;
    userId: string;
    travelDate: Date;
    status: 'active' | 'completed' | 'cancelled';
    route?: {
        origin: string;
        destination: string;
    };
}

const MyBookings = () => {
    const { isLoggedIn, user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user?.id) return;

            try {
                setLoading(true);
                setError(null);
                const response = await bookingService.getUserBookings(user.id);
                const bookingsWithRoutes = await Promise.all(
                    response.data.map(async (booking: Booking) => {
                        try {
                            const routeData = await routeService.getRouteById(booking.routeId);
                            return {
                                ...booking,
                                route: {
                                    origin: routeData.origin,
                                    destination: routeData.destination
                                }
                            };
                        } catch (error) {
                            console.error(`Error fetching route for booking ${booking._id}:`, error);
                            return booking;
                        }
                    })
                );
                setBookings(bookingsWithRoutes);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to load bookings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user?.id]);

    const handleCancelBooking = async (bookingId: string) => {
        try {
            await bookingService.cancelBooking(bookingId);
            // Update the local state to reflect the cancellation
            setBookings(bookings.map(booking =>
                booking._id === bookingId
                    ? { ...booking, status: 'cancelled' as const }
                    : booking
            ));
        } catch (error) {
            console.error('Error cancelling booking:', error);
            setError('Failed to cancel booking. Please try again later.');
        }
    };

    // If user is not logged in, redirect to home page
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    if (loading) {
        return (
            <div className="my-bookings-container">
                <h1>My Bookings</h1>
                <div className="loading">Loading your bookings...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-bookings-container">
                <h1>My Bookings</h1>
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="my-bookings-container">
            <h1>My Bookings</h1>
            <div className="bookings-list">
                {bookings.length === 0 ? (
                    <p className="no-bookings">You don't have any bookings yet.</p>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking._id} className="booking-card">
                            <div className="booking-header">
                                <h3>{booking.route
                                    ? `${booking.route.origin} - ${booking.route.destination}`
                                    : `Booking #${booking._id}`}</h3>
                                <span className={`status ${booking.status}`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>
                            <div className="booking-details">
                                <p><strong>Date:</strong> {new Date(booking.travelDate).toLocaleDateString()}</p>
                                <p><strong>Passenger:</strong> {booking.passengerName}</p>
                                <p><strong>Seat:</strong> {booking.seatNumber}</p>
                                <p><strong>Price:</strong> €{booking.totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="booking-actions">
                                {booking.status === 'active' && (
                                    <button
                                        className="cancel-btn"
                                        onClick={() => handleCancelBooking(booking._id)}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBookings; 