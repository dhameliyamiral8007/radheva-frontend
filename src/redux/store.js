import { configureStore } from '@reduxjs/toolkit';
// Import your slices here
import sliderReducer from './slices/sliderSlice';
// import cartReducer from './slices/cartSlice';
// import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    slider: sliderReducer,
    // cart: cartReducer,
    // user: userReducer,
  },
});

export default store;
