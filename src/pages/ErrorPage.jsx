/** @format */

import { Link } from "react-router-dom";
// import Button from "./Button";

function ErrorPage() {
	return (
		<div style={styles.container}>
			<h1 style={styles.heading}>404 - Not Found</h1>
			<p style={styles.text}>
				Sorry, the page you are looking for might be in another castle.
			</p>
			<Link to="/" style={styles.link}>
				<button>Go Back To Home</button>
			</Link>
		</div>
	);
}

export default ErrorPage;

// Styles
const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "100vh",
		textAlign: "center",
	},
	heading: {
		fontSize: "3em",
		marginBottom: "10px",
		color: "#333",
	},
	text: {
		fontSize: "1.2em",
		color: "#666",
		marginBottom: "20px",
	},
	link: {
		fontSize: "1em",
		color: "#007BFF",
		textDecoration: "none",
	},
};
