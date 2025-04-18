import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice.tsx';

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
export default store;
