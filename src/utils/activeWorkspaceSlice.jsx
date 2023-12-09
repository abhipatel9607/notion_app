/** @format */

// activeWorkspaceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const activeWorkspaceSlice = createSlice({
  name: "activeWorkspace",
  initialState: "",
  reducers: {
    setActiveWorkspace: (state, action) => {
      return action.payload !== undefined ? action.payload : state;
    },
  },
});

export const { setActiveWorkspace } = activeWorkspaceSlice.actions;
export default activeWorkspaceSlice.reducer;
