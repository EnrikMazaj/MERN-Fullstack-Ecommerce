// Define a type for each booking
export interface Booking {
  id?: string;
  seatNumber: number;
  totalPrice: number;
  passengerName: string;
  passengerPassport: string;
  userId: string;
  routeId: string;
  status: 'confirmed' | 'cancelled' | 'refunded';
  bookingDate: string;
  travelDate: string;
  arrivalDate?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  isRoundTrip?: boolean;
  refundRequested?: boolean;
  refundStatus?: 'pending' | 'approved' | 'rejected' | 'completed';
  refundDate?: string;
}
