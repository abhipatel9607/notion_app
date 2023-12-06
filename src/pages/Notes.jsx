import { UserAuth } from "../firebase/authContext";

function Notes() {
	const { user, logOut } = UserAuth();
	console.log(user);

	const handleLogOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Notes Page</h1>
			<button style={{ color: "red" }} onClick={handleLogOut}>
				Click Here For LogOut
			</button>
			<div>SideBar</div>
			<div>Notes Section</div>
			<p>{user.displayName}</p>
			<img src={user.photoURL} alt="" />
		</div>
	);
}

export default Notes;
