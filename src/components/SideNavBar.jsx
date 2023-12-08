/** @format */

import { UserAuth } from "../firebase/authContext";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  const { user, logOut } = UserAuth();
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <aside
        className={`group/sidebar h-[100vh] bg-gray-200 overflow-y-auto 
        relative flex flex-col z-[99999] ${isMenuOpen ? "w-60" : "w-0"}`}
      >
        <div>
          <div>
            <div className="p-2">{user.displayName}</div>
          </div>
          {isMenuOpen ? (
            <div
              onClick={() => toggleMenuHandler()}
              role="button"
              className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-gray-50
         absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
            >
              <ChevronsLeft className="h-6 w-6" />
            </div>
          ) : null}
        </div>

        {/* <div className="mt-4 p-2"> Create a new WorkSpace</div> */}
        <Link to="/create-new-workspace">
          <button>Create a new WorkSpace</button>
        </Link>
        <div
          className="opacity-0 group-hover/sidebar:opacity-100 transition 
        cursor-ew-resize absolute h-[100vh] w-1 bg-gray-300 right-0 top-0"
        />
        <button onClick={handleLogout}>LogOut</button>
      </aside>
      {!isMenuOpen ? (
        <div
          onClick={() => toggleMenuHandler()}
          role="button"
          className="h-6 w-6  rounded-sm hover:bg-gray-50
         absolute top-0 left-0"
        >
          <ChevronsRight className="h-6 w-6" />
        </div>
      ) : null}
    </>
  );
};

export default SideNavBar;
