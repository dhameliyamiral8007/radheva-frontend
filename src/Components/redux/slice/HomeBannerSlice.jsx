// bannerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { homeBannerService } from "../service/HomeBannerService"

export const fetchBanner = createAsyncThunk(
    'banner/fetchBanner',
    async(_, { rejectWithValue }) => {
        try {
            const response = await homeBannerService();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// HomeBannerSlice.jsx
const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        loading: false,
        error: null,
        banners: [],
        sliderData: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBanner.fulfilled, (state, action) => {
                state.loading = false;
                // FIX: Extract the Data array from the response
                state.banners = action.payload.Data || action.payload.data || [];
                state.sliderData = action.payload;
            })
            .addCase(fetchBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = bannerSlice.actions;
export default bannerSlice.reducer;