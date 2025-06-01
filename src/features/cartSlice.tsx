import { createSlice } from '@reduxjs/toolkit';
import { Booking } from './types';

interface CartState {
  bookings: Booking[];
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    bookings: [],
  } as CartState,
  reducers: {
    addBooking: (state, action) => {
      const payload = { ...action.payload };
      if (payload.travelDate instanceof Date) {
        payload.travelDate = payload.travelDate.toISOString();
      }
      if (payload.arrivalDate instanceof Date) {
        payload.arrivalDate = payload.arrivalDate.toISOString();
      }
      state.bookings.push(payload);
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.seatNumber !== action.payload.seatNumber
      );
    },
    clearCart: (state) => {
      state.bookings = [];
    },
  },
});

export const { addBooking, removeBooking, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
