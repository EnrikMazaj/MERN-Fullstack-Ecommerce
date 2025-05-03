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
    routeInfo?: {
        origin: string;
        destination: string;
    };
    refundRequested?: boolean;
}

const MyBookings = () => {
    const { isLoggedIn, user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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
            await bookingService.cancelBooking(bookingId);
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

    const handleRequestRefund = async (bookingId: string) => {
        if (window.confirm('Are you sure you want to request a refund for this cancelled booking?')) {
            try {
                await bookingService.requestRefund(bookingId);
                setBookings(bookings.map(booking =>
                    booking._id === bookingId
                        ? { ...booking, refundRequested: true }
                        : booking
                ));
            } catch (error) {
                console.error('Error requesting refund:', error);
                setError('Failed to request refund. Please try again later.');
            }
        }
    };

    const handleMenuClick = (bookingId: string) => {
        setOpenMenuId(openMenuId === bookingId ? null : bookingId);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openMenuId && !(event.target as Element).closest('.ticket-actions-menu')) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openMenuId]);

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
                                <div className="ticket-actions-menu">
                                    <button
                                        className="menu-trigger"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuClick(booking._id);
                                        }}
                                    >
                                        <span className="menu-dots">...</span>
                                    </button>
                                    <div className={`menu-dropdown ${openMenuId === booking._id ? 'show' : ''}`}>
                                        {booking.status === 'cancelled' && !booking.refundRequested && (
                                            <button
                                                className="menu-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRequestRefund(booking._id);
                                                    setOpenMenuId(null);
                                                }}
                                            >
                                                Request Refund
                                            </button>
                                        )}
                                        {booking.status === 'cancelled' && booking.refundRequested && (
                                            <div className="menu-item disabled">
                                                Refund Requested
                                            </div>
                                        )}
                                    </div>
                                </div>
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
                                            className="cancel-btn"
                                            onClick={() => handleCancelBooking(booking._id)}
                                        >
                                            Cancel Booking
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