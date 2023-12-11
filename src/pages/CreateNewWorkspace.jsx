/** @format */
import { useState } from "react";
import workspace_logo from "../assets/create-new-workspace-logo.png";
import { createData } from "../firebase/firebaseServices";
import { UserAuth } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
import { setActiveWorkspace } from "../utils/activeWorkspaceSlice";
import { useDispatch } from "react-redux";

function CreateNewWorkspace() {
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateNewWorkspace = async () => {
    if (!newWorkspaceTitle) {
      setErrorMessage("Title Required*");
      return;
    }
    try {
      const data = { title: newWorkspaceTitle, uid: user.uid };
      const createdWorkspaceData = await createData(data, "workspace");
      dispatch(setActiveWorkspace(createdWorkspaceData.id));
      navigate(`/landing-page/workspace/${createdWorkspaceData.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create_workspace_section">
      <h1 className="workspace_heading">
        What would you like to call your workspace?
      </h1>
      <p className="workspace_para">
        We&apos;ll streamline your setup experience accordingly.
      </p>
      <div className="create_workspace_box">
        <label className="title_label">Title:</label>
        <div className="input_and_button">
          <input
            type="text"
            value={newWorkspaceTitle}
            onChange={(e) => {
              setNewWorkspaceTitle(e.target.value);
              setErrorMessage(null);
            }}
          />
          <div>
            {errorMessage && (
              <span className="error_create_workspace" color="red.500">
                {errorMessage}
              </span>
            )}
            <button
              className="create_workspace_btn"
              onClick={handleCreateNewWorkspace}
            >
              Create Workspace
            </button>
          </div>
        </div>
      </div>
      <img
        style={{ marginTop: "10px" }}
        src={workspace_logo}
        alt="notion people"
      />
    </div>
  );
}

export default CreateNewWorkspace;
