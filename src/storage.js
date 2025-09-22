import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';
import orderSlice from './orderSlice.js';

export default configureStore({
    reducer: {
        cart: cartReducer,
        orderProcess: orderSlice
    },
});