// store/slices/diamondSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DiamondService } from '../service/DiamondService';

// Async thunk for fetching diamonds
export const fetchDiamonds = createAsyncThunk(
  'diamonds/fetchDiamonds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await DiamondService();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const diamondSlice = createSlice({
  name: 'diamonds',
  initialState: {
    diamonds: [],
    loading: false,
    error: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiamonds.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDiamonds.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.diamonds = action.payload.Data || [];
      })
      .addCase(fetchDiamonds.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError } = diamondSlice.actions;
export default diamondSlice.reducer;