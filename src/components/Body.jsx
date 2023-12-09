/** @format */

import { useState } from "react";
import createBtn from "../assets/CretateNewPage.png";
import { UserAuth } from "../firebase/authContext";
import CreatePage from "./CreatePage";
import Page from "./Page";

const Body = () => {
  const { user } = UserAuth();
  const [display, setDisplay] = useState(true);

  return display ? (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <div className="w-60 top-[10%] left-[40%]">
        <img alt="createpic" src={createBtn} className="invert"></img>
      </div>
      <div className="text-lg">
        Welcome to {user.displayName}&apos;s Notion!{" "}
      </div>
      <button className="get_notion_btn mt-6" onClick={() => setDisplay(false)}>
        + Create a Page
      </button>
    </div>
  ) : (
    <Page />
  );
};

export default Body;
