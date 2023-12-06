/** @format */

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Protected from "./firebase/Protected";
import Welcome from "./pages/Welcome";
import Notes from "./pages/Notes";

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
		path: "/notes",
		element: (
			<Protected>
				<Notes />
			</Protected>
		),
	},
]);

export default appRouter;
