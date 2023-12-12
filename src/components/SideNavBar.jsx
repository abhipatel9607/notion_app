/** @format */
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import arrow_upAndDown from "../assets/arrow_updown.png";
import { useEffect, useState } from "react";
import { UserAuth } from "../firebase/authContext";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";
import { getAllById } from "../firebase/firebaseServices";
import { CollapsibleTree } from "./TreeNav";
import { useDispatch, useSelector } from "react-redux";
import { setWorkspace } from "../utils/workspaceSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { setActiveWorkspace } from "../utils/activeWorkspaceSlice";
import { setActivePage } from "../utils/activePageSlice";

const SideNavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const workspace = useSelector((state) => state.workspace);
  const activeWorkspace = useSelector((state) => state.activeWorkspace);
  const activePage = useSelector((state) => state.activePage);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Inside your component
  const handleActiveWorkspace = (id) => {
    setIsDropdownOpen(false);
    dispatch(setActiveWorkspace(id));
    localStorage.setItem("activeWorkspaceId", id);
    localStorage.setItem("currentPath", location.pathname);
    dispatch(setActivePage(""));
    localStorage.setItem("activePageId", "");
    navigate(`workspace/${id}`);
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const [data, setData] = useState([]);

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
        const result = await getAllById(
          "pages",
          "workspaceId",
          activeWorkspace
        );

        const idToNodeMap = {};
        // Create a mapping from id to node
        result.forEach((node) => {
          idToNodeMap[node.pagesId] = node;
          node.children = [];
        });
        // Build the tree structure
        const rootNodes = [];
        result.forEach((node) => {
          if (node.parentId) {
            // If the node has a parent, add it to the parent's children
            idToNodeMap[node.parentId].children.push(node);
          } else {
            // If the node has no parent, it is a root node
            rootNodes.push(node);
          }
        });
        setData(rootNodes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [activeWorkspace, activePage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.uid) {
          const workspaceData = await getAllById("workspace", "uid", user.uid);
          dispatch(setWorkspace(workspaceData));
          const lsActiveWorkspaceId = localStorage.getItem("activeWorkspaceId");
          if (lsActiveWorkspaceId) {
            const notionPath = localStorage.getItem("currentPath");
            dispatch(setActiveWorkspace(lsActiveWorkspaceId));
            dispatch(setActivePage(""));
            navigate(`${notionPath}`);
          } else if (!activeWorkspace) {
            dispatch(setActiveWorkspace(workspaceData[0].workspaceId));
            dispatch(setActivePage(""));
            navigate(`workspace/${workspaceData[0].workspaceId}`);
          } else if (workspaceData.length > 0) {
            dispatch(setActiveWorkspace(workspaceData[0].workspaceId));
            dispatch(setActivePage(""));
            navigate(`workspace/${workspaceData[0].workspaceId}`);
          }
        } else {
          return;
        }
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
        relative flex flex-col z-[99999] ${isMenuOpen ? "w-80" : "w-0"}`}
        style={{ position: "sticky", left: "0 ", top: "0", cursor: "pointer" }}
      >
        <div>
          <div className="sideBar_head relative" onClick={toggleDropdown}>
            <img className="userImg" src={user.photoURL} alt="UserImg" />
            <span className="p-2">{user.displayName}</span>
            <img
              className="up_down_logo"
              src={arrow_upAndDown}
              alt="Arrow Up Down Logo"
            />
            {isDropdownOpen && (
              <div className=" inline-block text-left">
                <div
                  className="absolute z-10 mt-4 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "96%",
                  }}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <button
                      className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to="/create-new-workspace">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 ml-2 mt-2 py-1 px-4 rounded">
              Create New Workspace
            </button>
          </Link>
          <div className="text-gray-700 block px-4 py-2 font-bold mt-4 text-sm">
            Your {workspace.length > 1 ? "Workspaces:" : "Workspace:"}
          </div>
          {workspace &&
            workspace.map((workspace) => (
              <div
                key={workspace.workspaceId}
                onClick={() => handleActiveWorkspace(workspace.workspaceId)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className={
                  activeWorkspace === workspace.workspaceId ? "bgGray" : ""
                }
              >
                <div className={`text-gray-700 block px-4 py-2 text-sm`}>
                  {workspace.title}
                </div>
                {activeWorkspace === workspace.workspaceId && (
                  <TaskAltIcon
                    style={{
                      color: "#555",
                      fontSize: "20px",
                      marginRight: "24px",
                    }}
                  />
                )}
              </div>
            ))}

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
        <div className="text-gray-700 block px-4 py-2 font-bold mt-4 text-sm">
          {workspace.length > 1 ? "Pages:" : "Pages:"}
        </div>
        <CollapsibleTree data={data}></CollapsibleTree>
        <div
          className="opacity-0 group-hover/sidebar:opacity-100 transition 
        cursor-ew-resize absolute h-[100vh] w-1 bg-gray-300 right-0 top-0"
        />
      </aside>

      {!isMenuOpen ? (
        <div
          onClick={() => toggleMenuHandler()}
          role="button"
          className="h-6 w-6  rounded-sm hover:bg-gray-50
         absolute top-2 left-0 z-10"
        >
          <ChevronsRight className="h-6 w-6" />
        </div>
      ) : null}
    </>
  );
};

export default SideNavBar;
