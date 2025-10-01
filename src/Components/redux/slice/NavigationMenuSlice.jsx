// NavigationMenuSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNavigationMenuService } from "../service/navigationMenuService";

export const fetchNavigationMenu = createAsyncThunk(
  "navigationMenu/fetchNavigationMenu",
  async (_, { rejectWithValue }) => { // Remove payload parameter since your service doesn't use it
    try {
      const response = await fetchNavigationMenuService();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const navigationMenuSlice = createSlice({
  name: "navigationMenu",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetNavigation: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavigationMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNavigationMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchNavigationMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export const { resetNavigation } = navigationMenuSlice.actions;
export default navigationMenuSlice.reducer;