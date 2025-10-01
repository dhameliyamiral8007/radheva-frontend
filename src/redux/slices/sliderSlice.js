import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSliders = createAsyncThunk(
  "slider/fetchSliders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/client/slider?slidertype=slider"
      );
      return response.data.Data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sliderSlice.reducer;
