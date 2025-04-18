import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './styles/MyBookings.css';

interface Booking {
    id: string;
    route: string;
    date: string;
    seats: string[];
    price: number;
    status: 'active' | 'completed' | 'cancelled';
}

const MyBookings = () => {
    const { isLoggedIn } = useAuth();

    // If user is not logged in, redirect to home page
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    // Mock data - replace with actual API call later
    const bookings: Booking[] = [
        {
            id: '1',
            route: 'Athens - Thessaloniki',
            date: '2024-04-20',
            seats: ['A1', 'A2'],
            price: 45.00,
            status: 'active'
        },
        {
            id: '2',
            route: 'Thessaloniki - Athens',
            date: '2024-04-25',
            seats: ['B3'],
            price: 45.00,
            status: 'active'
        }
    ];

    return (
        <div className="my-bookings-container">
            <h1>My Bookings</h1>
            <div className="bookings-list">
                {bookings.length === 0 ? (
                    <p className="no-bookings">You don't have any bookings yet.</p>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-header">
                                <h3>{booking.route}</h3>
                                <span className={`status ${booking.status}`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>
                            <div className="booking-details">
                                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                                <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
                                <p><strong>Price:</strong> €{booking.price.toFixed(2)}</p>
                            </div>
                            <div className="booking-actions">
                                <button className="view-details-btn">View Details</button>
                                {booking.status === 'active' && (
                                    <button className="cancel-btn">Cancel Booking</button>
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