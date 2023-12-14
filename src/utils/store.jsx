/** @format */

import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import workspaceSlice from "./workspaceSlice";
import activeWorkspaceSlice from "./activeWorkspaceSlice";
import activePageSlice from "./activePageSlice";
import activeParentSlice from "./activeParentSlice";
import { pagesApi } from "./getPagesQuery";

const store = configureStore({
  reducer: {
    app: appSlice,
    workspace: workspaceSlice,
    activeWorkspace: activeWorkspaceSlice,
    activePage: activePageSlice,
    activeParentId: activeParentSlice,
    [pagesApi.reducerPath]: pagesApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pagesApi.middleware, ),
});

export default store;

