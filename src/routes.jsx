/** @format */

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Protected from "./firebase/Protected";
import Welcome from "./pages/Welcome";
import LandingPage from "./pages/LandingPage";
import CreateNewWorkspace from "./pages/CreateNewWorkspace";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Welcome /> },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/landing-page",
    element: (
      <Protected>
        <LandingPage />
      </Protected>
    ),
  },
  {
    path: "/create-new-workspace",
    element: (
      <Protected>
        <CreateNewWorkspace />
      </Protected>
    ),
  },
]);

export default appRouter;
