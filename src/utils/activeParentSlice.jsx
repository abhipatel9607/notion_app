/** @format */

// activeWorkspaceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const activeParentSlice = createSlice({
  name: "parentId",
  initialState: "",
  reducers: {
    setActiveParentId: (state, action) => {
      return action.payload !== undefined ? action.payload : state;
    },
  },
});

export const { setActiveParentId } = activeParentSlice.actions;
export default activeParentSlice.reducer;
