// positionSlice.js

import { createSlice } from "@reduxjs/toolkit";

const positionSlice = createSlice({
  name: "position",
  initialState: {
    selectedPositionId: null,
  },
  reducers: {
    setSelectedPositionId: (state, action) => {
      state.selectedPositionId = action.payload;
    },
  },
});

export const { setSelectedPositionId } = positionSlice.actions;

export default positionSlice.reducer;
