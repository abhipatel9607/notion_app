import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import hero_img from "../assets/home-hero.webp";
import { Link } from "react-router-dom";

function Welcome() {
	return (
		<div className="hero_section">
			<h1 className="heading_one">
				Write, plan, share.
				<br /> With AI at your side.
			</h1>
			<p className="hero_para">
				Notion is the connected workspace where better, faster work happens.
			</p>

			<Link to="/login">
				<button className="get_notion_btn">
					Get Notion Free <FontAwesomeIcon icon={faArrowRight} />
				</button>
			</Link>
			<img
				className="login_with_google_img"
				src={hero_img}
				alt="Hero_section_img"
			/>
		</div>
	);
}

export default Welcome;
