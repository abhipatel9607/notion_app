/** @format */

// activeWorkspaceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const activePageSlice = createSlice({
  name: "activePage",
  initialState: "",
  reducers: {
    setActivePage: (state, action) => {
      return action.payload !== undefined ? action.payload : state;
    },
  },
});

export const { setActivePage } = activePageSlice.actions;
export default activePageSlice.reducer;
