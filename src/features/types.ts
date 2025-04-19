// Define a type for each booking
export interface Booking {
  id?: string;
  seatNumber: number;
  totalPrice: number;
  passengerName: string;
  passengerPassport: string;
  userId: string;
  routeId: string;
  status: 'confirmed' | 'cancelled';
  bookingDate: Date;
  travelDate: Date;
  arrivalDate?: Date; // Optional arrival date for round trips
  paymentStatus: 'pending' | 'completed' | 'failed';
  isRoundTrip?: boolean; // Flag to indicate if this is a round trip
}
