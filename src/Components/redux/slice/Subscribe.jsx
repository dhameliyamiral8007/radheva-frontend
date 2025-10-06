import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subscribeEmail } from '../service/Subscribe';

export const submitSubscription = createAsyncThunk(
  'subscribe/submit',
  async (email, { rejectWithValue }) => {
    try {
      const response = await subscribeEmail(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to subscribe');
    }
  }
);

const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: null,
    subscribedEmail: null,
  },
  reducers: {
    clearSubscribeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.subscribedEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSubscription.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
        state.subscribedEmail = null;
      })
      .addCase(submitSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.success = !!(action.payload?.IsSuccess);
        state.error = null;
        state.message = action.payload?.Message || null;
        state.subscribedEmail = action.payload?.Data?.email || null;
      })
      .addCase(submitSubscription.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to subscribe';
        state.message = null;
        state.subscribedEmail = null;
      });
  },
});

export const { clearSubscribeState } = subscribeSlice.actions;
export default subscribeSlice.reducer;


