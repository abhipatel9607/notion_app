/** @format */

import React, { useState } from "react";
import workspace_logo from "../assets/create-new-workspace-logo.png";
import { createData } from "../firebase/firebaseServices";
import { UserAuth } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
import { setActiveWorkspace } from "../utils/activeWorkspaceSlice";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import ArticleIcon from "@mui/icons-material/Article";

function CreateNewWorkspace() {
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleCreateNewWorkspace = async () => {
    setLoading(true);
    if (!newWorkspaceTitle) {
      setErrorMessage("Title Required*");
      return;
    }
    try {
      const data = { title: newWorkspaceTitle, uid: user.uid };
      const createdWorkspaceData = await createData(data, "workspace");
      dispatch(setActiveWorkspace(createdWorkspaceData.id));
      localStorage.setItem("activeWorkspaceId", createdWorkspaceData.id);
      setLoading(false);
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

            <LoadingButton
              size="small"
              color="secondary"
              loadingPosition="start"
              variant="contained"
              startIcon={<ArticleIcon />}
              loading={loading}
              onClick={handleCreateNewWorkspace}
              sx={{
                backgroundColor: "black",

                padding: "7px 10px",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              <span>Create Workspace</span>
            </LoadingButton>
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
