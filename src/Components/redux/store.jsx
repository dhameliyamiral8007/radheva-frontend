// store.js
import { configureStore } from '@reduxjs/toolkit';
import navigationMenuReducer from './slice/NavigationMenuSlice';
import sliderReducer from './slice/sliderSlice';
import blogReducer from './slice/BlogSlice'
import diamondReducer from './slice/DiamondSlice'
import bannerReducer from './slice/HomeBannerSlice'
import jwelaryReducer from './slice/jwelaryEveryMomentslice'

export const store = configureStore({
    reducer: {
        navigationMenu: navigationMenuReducer,
        slider: sliderReducer,
        blog: blogReducer,
        diamonds: diamondReducer,
        banner: bannerReducer,
        jwelary: jwelaryReducer,
    },
});