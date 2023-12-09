/** @format */

import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import workspaceSlice from "./workspaceSlice";
import activeWorkspaceSlice from "./activeWorkspaceSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    workspace: workspaceSlice,
    activeWorkspace: activeWorkspaceSlice,
  },
});

export default store;
