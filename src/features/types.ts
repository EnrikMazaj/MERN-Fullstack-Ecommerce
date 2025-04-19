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
  paymentStatus: 'pending' | 'completed' | 'failed';
}
