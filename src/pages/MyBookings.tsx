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
    status: 'active' | 'completed' | 'cancelled' | 'refunded';
    routeInfo?: {
        origin: string;
        destination: string;
    };
    refundRequested?: boolean;
    refundStatus?: 'pending' | 'approved' | 'rejected';
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
                                routeInfo: {
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
            // First update the status to cancelled
            await bookingService.updateBookingStatus(bookingId, 'cancelled', 'completed');

            // Then request the refund
            await bookingService.requestRefund(bookingId);

            // Update status in frontend
            setBookings(bookings.map(booking =>
                booking._id === bookingId
                    ? {
                        ...booking,
                        status: 'cancelled' as const,
                        refundRequested: true,
                        refundStatus: 'pending'
                    }
                    : booking
            ));

            // Show success message
            alert('Refund requested successfully! The refund process will be completed shortly.');
        } catch (error) {
            console.error('Error processing refund request:', error);
            setError('Failed to process refund request. Please try again later.');
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
                            <div className="ticket-status">
                                <span className={`status ${booking.status}`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>
                            <div className="ticket-content">
                                <div className="ticket-header">
                                    <h3>Route</h3>
                                </div>
                                <div className="route-display">
                                    <div className="route-origin">{booking.routeInfo?.origin || 'Unknown'}</div>
                                    <div className="route-dots"></div>
                                    <div className="route-destination">{booking.routeInfo?.destination || 'Unknown'}</div>
                                </div>
                                <div className="ticket-separator">
                                    <div className="ticket-separator-line"></div>
                                </div>
                                <div className="ticket-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Passenger</span>
                                        <span className="detail-value">{booking.passengerName}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Seat</span>
                                        <span className="detail-value">{booking.seatNumber}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Price</span>
                                        <span className="detail-value">€{booking.totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                {booking.status === 'active' && (
                                    <div className="ticket-actions">
                                        <button
                                            className="refund-btn"
                                            onClick={() => handleCancelBooking(booking._id)}
                                        >
                                            <span className="refund-icon">↩</span>
                                            <span className="refund-text">Request Refund</span>
                                        </button>
                                    </div>
                                )}
                                <div className="ticket-footer">
                                    <span className="booking-id">ID: {booking._id}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBookings; 