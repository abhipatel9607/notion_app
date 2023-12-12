/** @format */

import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import workspaceSlice from "./workspaceSlice";
import activeWorkspaceSlice from "./activeWorkspaceSlice";
import activePageSlice from "./activePageSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    workspace: workspaceSlice,
    activeWorkspace: activeWorkspaceSlice,
    activePage: activePageSlice,
  },
});

export default store;
