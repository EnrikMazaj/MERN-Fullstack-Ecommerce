import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice.tsx";

const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
});
export default store;