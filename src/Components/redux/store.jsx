// store.js
import { configureStore } from '@reduxjs/toolkit';
import navigationMenuReducer from './slice/NavigationMenuSlice';
import sliderReducer from './slice/sliderSlice';

export const store = configureStore({
    reducer: {
        navigationMenu: navigationMenuReducer,
        slider: sliderReducer,
    },
});