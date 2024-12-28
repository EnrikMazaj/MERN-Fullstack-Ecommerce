import { createSlice } from "@reduxjs/toolkit";
import {Ticket} from "./types"


interface CartState{
  tickets:Ticket[];
}
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    tickets: [], 
  } as CartState,
  reducers: {
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.seatNumber !== action.payload.seatNumber
      );
    },
    clearCart: (state) => {
      state.tickets = [];
    },
  },
});

export const { addTicket, removeTicket, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
