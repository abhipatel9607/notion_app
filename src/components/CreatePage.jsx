/** @format */
import PanoramaIcon from "@mui/icons-material/Panorama";
import React from "react";
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useNavigate } from "react-router-dom";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Button, TextField } from "@mui/material";

import { HiOutlineDocumentAdd } from "react-icons/hi";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { getAllById } from "../firebase/firebaseServices";

const CreatePage = () => {
  const [inputObject, setInputObject] = React.useState(null);
  const [emoji, setEmoji] = React.useState("");
  const [banner, setBanner] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const navigate = useNavigate();

  const activeWorkspace = useSelector((state) => state.activeWorkspace);
  const activePage = useSelector((state) => state.activePage);

  const insertNewPage = async () => {
    await handleSave();
  };

  const autosaveTimeoutRef = React.useRef(null);

  const autosave = async () => {
    try {
      inputObject.pop();
      const data = {
        workspaceId: activeWorkspace,
        content: JSON.stringify(inputObject),
        headerEmoji: emoji,
        banner: banner,
        pageTitle: title,
        childPages: [],
        children: [],
      };
      await createDataWithId(data, "pages");
      console.log("Autosaved!");
    } catch (error) {
      console.error(error);
    }
  };

  const resetAutosaveTimeout = () => {
    clearTimeout(autosaveTimeoutRef.current);

    autosaveTimeoutRef.current = setTimeout(autosave, 500);
  };

  React.useEffect(() => {
    resetAutosaveTimeout();
    return () => clearTimeout(autosaveTimeoutRef.current);
  }, [inputObject, autosave]);

  React.useEffect(() => {
    const resetTimeoutOnUserActivity = () => {
      resetAutosaveTimeout();
    };

    document.addEventListener("keydown", resetTimeoutOnUserActivity);
    return () => {
      clearTimeout(autosaveTimeoutRef.current);
      document.removeEventListener("keydown", resetTimeoutOnUserActivity);
    };
  }, [resetAutosaveTimeout]);

  const createDataWithId = async (data, tableName) => {
    try {
      const collectionRef = collection(db, tableName);
      const docRef = await addDoc(collectionRef, data);
      const docId = docRef.id;
      if (!activePage) {
        const updatedData = {
          ...data,
          parentId: data.parentId || activePage,
          createdAt: serverTimestamp(),
        };

        await updateDoc(doc(collectionRef, docId), updatedData);
        navigate(`/landing-page/page/${docId}`);

        return updatedData;
      } else {
        const updatedData = {
          ...data,
          parentId: data.parentId || activePage,
          createdAt: serverTimestamp(),
        };

        await updateDoc(doc(collectionRef, docId), updatedData);
        navigate(`/landing-page/page/${docId}`);
        return updatedData;
      }
    } catch (error) {
      console.error(`Error creating ${tableName} data:`, error);
      throw error;
    }
  };

  const insertNewPageItem = {
    name: "Page",
    execute: insertNewPage,
    aliases: ["insertpage", "ip"],
    group: "Other",
    icon: <HiOutlineDocumentAdd size={18} />,
    hint: "Used to insert a new page.",
  };

  const customSlashMenuItemList = [
    ...getDefaultReactSlashMenuItems(),
    insertNewPageItem,
  ];

  const editor = useBlockNote({
    slashMenuItems: customSlashMenuItemList,
  });

  editor.onEditorContentChange(() => {
    const blocks = editor.topLevelBlocks;
    setInputObject(blocks);
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const data = {
        workspaceId: activeWorkspace,
        content: JSON.stringify(inputObject),
        headerEmoji: emoji,
        banner: banner,
        pageTitle: title,
        childPages: [],
        children: [],
      };
      await createDataWithId(data, "pages");
      // const result = await getAllById("pages", "workspaceId", activeWorkspace);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomEmoji = () => {
    const emojis = ["😊", "🚀", "🌈", "🎉", "🍕", "🔥", "📚", "❤️", "🎸", "🐱"];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

  const getRandomBanner = () => {
    const banners = [
      "https://www.notion.so/images/page-cover/webb3.jpg",
      "https://www.notion.so/images/page-cover/webb1.jpg",
      "https://www.notion.so/images/page-cover/nasa_transonic_tunnel.jpg",
      "https://www.notion.so/images/page-cover/nasa_multi-axis_gimbal_rig.jpg",
      "https://www.notion.so/images/page-cover/nasa_space_shuttle_columbia.jpg",
      "https://www.notion.so/images/page-cover/nasa_space_shuttle_columbia.jpg",
      "https://www.notion.so/images/page-cover/nasa_fingerprints_of_water_on_the_sand.jpg",
      "https://www.notion.so/images/page-cover/nasa_earth_grid.jpg",
      "https://www.notion.so/images/page-cover/woodcuts_4.jpg",
      "https://www.notion.so/images/page-cover/woodcuts_sekka_3.jpg",
      "https://www.notion.so/images/page-cover/rijksmuseum_mignons_1660.jpg",
    ];

    const randomIndex = Math.floor(Math.random() * banners.length);
    return banners[randomIndex];
  };

  const generateRandomEmojiOnButtonClick = () => {
    setEmoji(getRandomEmoji());
  };

  const generateRandomBannerOnButtonClick = () => {
    setBanner(getRandomBanner());
  };

  return (
    <>
      <div className="create-page--container">
        <div className="create-page-banner">
          {banner && (
            <img
              className="create-page--banner-image"
              src={banner}
              alt="notion banner image"
            />
          )}

          {emoji !== "" && banner && (
            <div className="create-page--emoji-container">{emoji}</div>
          )}
        </div>

        {!banner && (
          <div className="create-page-no-banner">
            {emoji !== "" && (
              <div className="create-page--emoji-container">{emoji}</div>
            )}
          </div>
        )}

        <div className="create-page--content-container">
          <div className="create-page--button-container">
            <Button
              onClick={generateRandomEmojiOnButtonClick}
              variant="outlined"
              sx={{
                display: "flex",
                marginLeft: "40px",
                border: "none",
                color: "#a2a2a2",
                textTransform: "none",
                "&:hover": {
                  border: "none",
                },
              }}
              startIcon={<EmojiEmotionsIcon />}
            >
              {!emoji ? "Add icon" : "Shuffle icon"}
            </Button>

            <Button
              onClick={generateRandomBannerOnButtonClick}
              variant="outlined"
              sx={{
                display: "flex",
                border: "none",
                color: "#a2a2a2",
                textTransform: "none",
                "&:hover": {
                  border: "none",
                },
              }}
              startIcon={<PanoramaIcon />}
            >
              {!banner ? "Add cover" : "Shuffle cover"}
            </Button>
          </div>

          <TextField
            id="outlined-textarea"
            value={title}
            placeholder="Untitled"
            onChange={(e) => setTitle(e.target.value)}
            multiline
            sx={{
              marginLeft: "40px",
              width: "90%",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove the default border
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove the border on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #2196F3", // Customize border when focused
              },
            }}
            inputProps={{
              style: {
                fontSize: "50px",
                paddingTop: "10px",
                paddingBottom: 0,
                paddingLeft: "0px",
                margin: 0,
                lineHeight: "3rem",
              },
            }}
          />

          <BlockNoteView editor={editor} theme={"light"} />
        </div>
      </div>
    </>
  );
};

export default CreatePage;
