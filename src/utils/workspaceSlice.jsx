/** @format */

import { createSlice } from "@reduxjs/toolkit";

const workspace = createSlice({
  name: "workspace",
  initialState: [],
  reducers: {
    setWorkspace: (state, action) => {
      return action.payload;
    },
  },
});
export const { setWorkspace } = workspace.actions;
export default workspace.reducer;
