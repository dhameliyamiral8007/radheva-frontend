// store.js
import { configureStore } from '@reduxjs/toolkit';
import navigationMenuReducer from './slice/NavigationMenuSlice';
import sliderReducer from './slice/sliderSlice';
import blogReducer from './slice/BlogSlice'
import diamondReducer from './slice/DiamondSlice'

export const store = configureStore({
    reducer: {
        navigationMenu: navigationMenuReducer,
        slider: sliderReducer,
        blog: blogReducer,
        diamonds: diamondReducer,

    },
});