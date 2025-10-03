// redux/slice/LatestProductsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwelaryForEveryMoment } from "../service/JwelaryForEveryMomentService";

export const fetchJwelaryProducts = createAsyncThunk(
    'latestproducts/fetchJwelaryProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await jwelaryForEveryMoment();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const latestProductsSlice = createSlice({
    name: 'jwelary',
    initialState: {
        products: [],
        loading: false,
        error: null,
        isSuccess: false
    },
    reducers: {
        clearProducts: (state) => {
            state.products = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJwelaryProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isSuccess = false;
            })
            .addCase(fetchJwelaryProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = action.payload.IsSuccess;
                state.products = action.payload.Data || [];
                state.error = null;
            })
            .addCase(fetchJwelaryProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isSuccess = false;
                state.products = [];
            });
    }
});

export const { clearProducts } = latestProductsSlice.actions;
export default latestProductsSlice.reducer;