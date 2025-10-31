import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navigationID: null,
  collectionID: null,
  collectionItemID: null,
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setProductFilter: (state, action) => {
      const { navigationID = null, collectionID = null, collectionItemID = null } = action.payload || {};
      state.navigationID = navigationID;
      state.collectionID = collectionID;
      state.collectionItemID = collectionItemID;
    },
    clearProductFilter: (state) => {
      state.navigationID = null;
      state.collectionID = null;
      state.collectionItemID = null;
    },
  },
});

export const { setProductFilter, clearProductFilter } = productFilterSlice.actions;
export default productFilterSlice.reducer;


