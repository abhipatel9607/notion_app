/** @format */
import { useState } from "react";
import workspace_logo from "../assets/create-new-workspace-logo.png";

function CreateNewWorkspace() {
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState("");

  const handleCreateNewWorkspace = () => {
    console.log("CreateWorkspace Button Clicked");
    console.log("Title:", newWorkspaceTitle);
    return;
  };

  return (
    <div className="create_workspace_section">
      <h1 className="workspace_heading">How are you planning to use Notion?</h1>
      <p className="workspace_para">
        We'll streamline your setup experience accordingly.
      </p>
      <div className="create_workspace_box">
        <label className="title_label">Title:</label>
        <div className="input_and_button">
          <input
            type="text"
            value={newWorkspaceTitle}
            onChange={(e) => setNewWorkspaceTitle(e.target.value)}
          />
          <button
            className="create_workspace_btn"
            onClick={handleCreateNewWorkspace}
          >
            Create Workspace
          </button>
        </div>
      </div>
      <img src={workspace_logo} alt="" />
    </div>
  );
}

export default CreateNewWorkspace;
