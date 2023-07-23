import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showEditDialog: false,
};
const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    enabled: (state) => {
      state.showEditDialog = true;
    },
    disabled: (state) => {
      state.showEditDialog = false;
    },
  },
});
export default dialogSlice.reducer;
export const { enabled, disabled } =
  dialogSlice.actions;
