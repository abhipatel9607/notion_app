import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./firebase/authContext";
import appRouter from "./routes";
import "./index.css";
import store from "./utils/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);
