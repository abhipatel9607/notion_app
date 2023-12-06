import { UserAuth } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import login_with_google from "../assets/web_light_rd_SI.svg";

function Login() {
	// Get the user and googleSignIn function from the authentication context
	const { googleSingIn, user } = UserAuth();
	const navigate = useNavigate();

	// Handle Google Sign In
	const handleGoogleSingin = async () => {
		try {
			await googleSingIn();
		} catch (err) {
			console.error(err);
		}
	};

	// Redirect to the board page if the user is already authenticated
	useEffect(() => {
		if (user != null) {
			navigate("/notes");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<div className="login_section">
			<div className="login_box">
				<h1 className="heading_one">Log in</h1>
				<img
					src={login_with_google}
					alt="login_with_google"
					onClick={handleGoogleSingin}
				/>
			</div>
		</div>
	);
}

export default Login;
