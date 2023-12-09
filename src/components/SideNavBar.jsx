/** @format */

import arrow_upAndDown from "../assets/arrow_updown.png";
import { UserAuth } from "../firebase/authContext";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllById } from "../firebase/firebaseServices";
import { useEffect, useState } from "react";

const SideNavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [workspace, setWorkspace] = useState([]);
  const { user, logOut } = UserAuth();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceData = await getAllById("workspace", "uid", user.uid);
        setWorkspace(workspaceData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <aside
        className={`group/sidebar h-[100vh] bg-gray-200 overflow-y-auto 
        relative flex flex-col z-[99999] ${isMenuOpen ? "w-60" : "w-0"}`}
      >
        <div>
          <div className="sideBar_head" onClick={toggleDropdown}>
            <img className="userImg" src={user.photoURL} alt="UserImg" />
            <span className="p-2">{user.displayName}</span>
            <img className="up_down_logo" src={arrow_upAndDown} alt="" />
            {isDropdownOpen && (
              <div className="relative inline-block text-left">
                <div
                  className="absolute  z-10 mt-4 w-48  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  style={{ right: "-26px" }}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    {workspace &&
                      workspace.map((workspace) => (
                        <div
                          key={workspace.workspaceId}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={`workspace/${workspace.workspaceId}`}
                            className="text-gray-700 block px-4 py-2 text-sm"
                          >
                            {workspace.title}
                          </Link>
                        </div>
                      ))}

                    <Link to="/create-new-workspace">
                      <button className="text-gray-700 block w-full px-4 py-2 text-left text-sm">
                        Create New Workspace
                      </button>
                    </Link>
                    <button
                      className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isMenuOpen && (
            <div
              onClick={() => toggleMenuHandler()}
              role="button"
              className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-gray-50
         absolute top-2 right-0 opacity-0 group-hover/sidebar:opacity-100 transition"
            >
              <ChevronsLeft className="h-6 w-6" />
            </div>
          )}
        </div>
      </aside>

      {!isMenuOpen ? (
        <div
          onClick={() => toggleMenuHandler()}
          role="button"
          className="h-6 w-6  rounded-sm hover:bg-gray-50
         absolute top-2 left-0"
        >
          <ChevronsRight className="h-6 w-6" />
        </div>
      ) : null}
    </>
  );
};

export default SideNavBar;
