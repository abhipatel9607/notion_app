import notion_logo from "../assets/notion_logo.png";
import { Link, useLocation } from "react-router-dom";

function Header() {
	const location = useLocation();
	const isLoginPage = location.pathname === "/login"; // Corrected line
	console.log("Current path:", location.pathname);

	return (
		<div className="flex justify-between p-4">
			<Link to="/">
				<img className="w-24" src={notion_logo} alt="" />
			</Link>
			{!isLoginPage && (
				<div className="header--buttons">
					<Link to="/login">
						<button className="px-[12px] py-[4px] rounded-md hover:bg-gray-100 mr-2">
							Login
						</button>
					</Link>
					<Link to="/login">
						<button className="get_notion_btn" style={{ padding: "4px 16px" }}>
							Get Notion Free
						</button>
					</Link>
				</div>
			)}
		</div>
	);
}

export default Header;
