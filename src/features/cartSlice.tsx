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
      state.bookings.push(action.payload);
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
