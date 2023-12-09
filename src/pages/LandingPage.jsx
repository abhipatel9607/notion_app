/** @format */

import SideNavBar from "../components/SideNavBar";
import { Outlet } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex">
      <SideNavBar />
      <Outlet />
    </div>
  );
}

export default LandingPage;
