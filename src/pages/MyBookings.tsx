import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import bookingService from '../services/bookingService';
import routeService from '../services/routeService';
import { toast } from 'react-toastify';
import { successToastConfig, errorToastConfig } from '../config/toastConfig';
import './styles/MyBookings.css';
import axios from 'axios';
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEuroSign } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';

interface Booking {
    _id: string;
    routeId: string | { _id: string; origin: string; destination: string };
    seatNumber: number;
    totalPrice: number;
    passengerName: string;
    passengerPassport: string;
    userId: string;
    travelDate: Date;
    arrivalDate?: Date;
    isRoundTrip: boolean;
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
    const { language } = useTheme();
    const t = translations[language].bookings;

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user?.id) return;

            try {
                setLoading(true);
                setError(null);
                const response = await bookingService.getUserBookings(user.id);
                console.log('Raw bookings from API:', response.data);
                const bookingsWithRoutes = await Promise.all(
                    response.data.map(async (booking: Booking) => {
                        try {
                            if (typeof booking.routeId === 'string') {
                                const routeData = await routeService.getRouteById(booking.routeId);
                                const processedBooking = {
                                    ...booking,
                                    routeInfo: {
                                        origin: routeData.origin,
                                        destination: routeData.destination
                                    },
                                    isRoundTrip: booking.isRoundTrip,
                                    arrivalDate: booking.arrivalDate
                                };
                                console.log('Processed booking:', processedBooking);
                                return processedBooking;
                            }
                            return booking;
                        } catch (error) {
                            console.error('Error fetching route data:', error);
                            return booking;
                        }
                    })
                );
                console.log('Final bookings with routes:', bookingsWithRoutes);
                setBookings(bookingsWithRoutes);
            } catch (error) {
                setError(t.errors.load);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user?.id]);

    const handleCancelBooking = async (bookingId: string) => {
        try {
            setError(null);

            await bookingService.updateBookingStatus(bookingId, 'cancelled', 'completed');
            await bookingService.requestRefund(bookingId);

            setBookings(bookings.map(booking =>
                booking._id === bookingId
                    ? {
                        ...booking,
                        status: 'cancelled',
                        refundRequested: true,
                        refundStatus: 'pending'
                    }
                    : booking
            ));

            toast.success(t.refund.success, successToastConfig);
        } catch (error) {
            let errorMessage = t.refund.error;

            if (axios.isAxiosError(error)) {
                const errorData = error.response?.data;
                errorMessage += errorData?.error || errorData?.details || error.message;
            }

            setError(errorMessage);
            toast.error(errorMessage, errorToastConfig);
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    if (loading) {
        return (
            <div className="my-bookings-container">
                <h1>{t.title}</h1>
                <div className="loading">{t.loading}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-bookings-container">
                <h1>{t.title}</h1>
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="my-bookings-container">
            <h1>{t.title}</h1>
            <div className="bookings-list">
                {bookings.length === 0 ? (
                    <p className="no-bookings">{t.noBookings}</p>
                ) : (
                    bookings.map((booking) => {
                        console.log('Rendering booking:', booking._id, {
                            isRoundTrip: booking.isRoundTrip,
                            arrivalDate: booking.arrivalDate,
                            routeInfo: booking.routeInfo
                        });
                        return (
                            <div key={booking._id} className="booking-card">
                                <div className="ticket-status">
                                    <span className={`status ${booking.status}`}>
                                        {t.status[booking.status]}
                                    </span>
                                    {booking.refundRequested && (
                                        <span className={`refund-status ${booking.refundStatus}`}>
                                            {t.refundStatus[booking.refundStatus || 'pending']}
                                        </span>
                                    )}
                                </div>
                                <div className="ticket-content">
                                    <div className="ticket-header">
                                        <FaUser className="detail-icon" />
                                        <span className="passenger-name">{booking.passengerName}</span>
                                    </div>
                                    <div className="route-display">
                                        <div className="route-section">
                                            <div className="route-header">
                                                <span>{t.outboundJourney}</span>
                                            </div>
                                            <div className="route-details">
                                                <FaMapMarkerAlt className="route-icon" />
                                                <div className="route-origin">{booking.routeInfo?.origin || 'Unknown'}</div>
                                                <div className="route-arrow">→</div>
                                                <div className="route-destination">{booking.routeInfo?.destination || 'Unknown'}</div>
                                            </div>
                                            <div className="route-date">
                                                <FaCalendarAlt className="date-icon" />
                                                <span>{formatDate(booking.travelDate)}</span>
                                            </div>
                                        </div>
                                        {booking.isRoundTrip && booking.arrivalDate && (
                                            <>
                                                <div className="route-separator">
                                                    <div className="separator-line"></div>
                                                    <span className="round-trip-label">{t.returnJourney}</span>
                                                    <div className="separator-line"></div>
                                                </div>
                                                <div className="route-section">
                                                    <div className="route-header">
                                                        <span>{t.returnJourney}</span>
                                                    </div>
                                                    <div className="route-details">
                                                        <FaMapMarkerAlt className="route-icon" />
                                                        <div className="route-origin">{booking.routeInfo?.destination || 'Unknown'}</div>
                                                        <div className="route-arrow">→</div>
                                                        <div className="route-destination">{booking.routeInfo?.origin || 'Unknown'}</div>
                                                    </div>
                                                    <div className="route-date">
                                                        <FaCalendarAlt className="date-icon" />
                                                        <span>{formatDate(booking.arrivalDate)}</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="ticket-separator">
                                        <div className="ticket-separator-line"></div>
                                    </div>
                                    <div className="ticket-details">
                                        <div className="detail-row">
                                            <span className="detail-label">
                                                <FaBus className="detail-icon" />
                                                {t.seat}:
                                                <span className="detail-value">{booking.seatNumber}</span>
                                            </span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">
                                                <FaEuroSign className="detail-icon" />
                                                {t.totalPrice}:
                                                <span className="detail-value">€{booking.totalPrice.toFixed(2)}</span>
                                            </span>
                                        </div>
                                    </div>
                                    {booking.status === 'active' && (
                                        <div className="ticket-actions">
                                            <button
                                                className="refund-btn"
                                                onClick={() => handleCancelBooking(booking._id)}
                                            >
                                                <span className="refund-icon">↩</span>
                                                <span className="refund-text">{t.requestRefund}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MyBookings; 
