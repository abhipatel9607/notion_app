/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import hero_img from "../assets/home-hero.webp";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../firebase/authContext";

function Welcome() {
  const { user } = UserAuth();
  const navigate = useNavigate();
  if (user !== null) {
    navigate("/landing-page");
  }

  return (
    <div className="hero_section">
      <h1 className="heading_one ">Write, plan, share.</h1>
      <p className="hero_para">
        Notion is the connected workspace where better, faster work happens.
      </p>

      <Link to="/login">
        <button className="get_notion_btn">
          Get Notion Free <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </Link>
      <img
        className="hero_section_img"
        src={hero_img}
        alt="hero image"
        style={{ marginTop: "70px" }}
      />
    </div>
  );
}

export default Welcome;
