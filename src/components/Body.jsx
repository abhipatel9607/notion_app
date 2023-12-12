/** @format */

import { useState } from "react";
import createBtn from "../assets/CretateNewPage.png";
import { UserAuth } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
// import Page from "./Page";
import CreatePage from "./CreatePage";
import { useSelector } from "react-redux";

const Body = () => {
  const activeWorkspace = useSelector((state) => state.activeWorkspace);
  const { user } = UserAuth();
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();

  const handleCreatePage = () => {
    setDisplay(false);
    navigate(`/landing-page/workspace/${activeWorkspace}`);
  };

  return display ? (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <div className="w-60 top-[10%] left-[40%]">
        <img alt="createpic" src={createBtn} className="invert"></img>
      </div>
      <div className="text-lg">
        Welcome to {user.displayName}&apos;s Notion!{" "}
      </div>
      <button className="get_notion_btn mt-6" onClick={handleCreatePage}>
        + Create a Page
      </button>
    </div>
  ) : (
    <CreatePage />
  );
};

export default Body;
