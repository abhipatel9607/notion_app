/** @format */
import PanoramaIcon from "@mui/icons-material/Panorama";
import React from "react";
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Button, TextField } from "@mui/material";
import { createData } from "../firebase/firebaseServices";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { updateData } from "../firebase/firebaseServices";

const Page = () => {
  const [data, setData] = React.useState();
  const [inputObject, setInputObject] = React.useState(null);
  const activeWorkspace = useSelector((state) => state.activeWorkspace);
  const [emoji, setEmoji] = React.useState("");
  const [banner, setBanner] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [fetchedEditorObject, setFetchedEditorObject] = React.useState();
  const [intialBlockId, setInitialBlockId] = React.useState();
  const [isInserted, setIsInserted] = React.useState(false);
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(true);

  const { pageId } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const pagesRef = doc(db, "pages", pageId);

      try {
        const pagesDoc = await getDoc(pagesRef);
        setData(pagesDoc.data());
        setEmoji(pagesDoc.data()?.headerEmoji);
        setBanner(pagesDoc.data()?.banner);
        setTitle(pagesDoc.data()?.pageTitle);
        setFetchedEditorObject(JSON.parse(pagesDoc.data()?.content));

        const blocks = editor.topLevelBlocks;
        setInitialBlockId(blocks[0].id);
        setLoader(false);
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchData();
  }, []);

  const blocksToInsert = fetchedEditorObject?.map((block) => ({
    id: block.id,
    type: block.type,
    props: block.props,
    content: block.content,
    children: block.children,
  }));

  React.useEffect(() => {
    if (!isInserted && intialBlockId) {
      editor.insertBlocks(blocksToInsert, intialBlockId, "before");
      setIsInserted(true);
    }
  }, [intialBlockId]);

  const insertNewPage = async () => {
    await handleSave("6yZyJ0edPGVNUxxjEg7Z");
    navigate(`/landing-page/workspace/${activeWorkspace}`);
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

  const handleSave = async (pid) => {
    setLoading(true);

    try {
      const data = {
        workspaceId: activeWorkspace,
        content: JSON.stringify(inputObject),
        headerEmoji: emoji,
        banner: banner,
        pageTitle: title,
        parentId: "",
      };
      await updateData("pages", pageId, data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const autosaveTimeoutRef = React.useRef(null);

  const autosave = async () => {
    try {
      const data = {
        workspaceId: activeWorkspace,
        content: JSON.stringify(inputObject),
        headerEmoji: emoji,
        banner: banner,
        pageTitle: title,
        parentId: "",
      };
      await updateData("pages", pageId, data);

      console.log("Autosaved!");
    } catch (error) {
      console.error(error);
    }
  };

  const resetAutosaveTimeout = () => {
    clearTimeout(autosaveTimeoutRef.current);

    autosaveTimeoutRef.current = setTimeout(autosave, 5000);
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
    document.addEventListener("mousemove", resetTimeoutOnUserActivity);

    return () => {
      clearTimeout(autosaveTimeoutRef.current);
      document.removeEventListener("keydown", resetTimeoutOnUserActivity);
      document.removeEventListener("mousemove", resetTimeoutOnUserActivity);
    };
  }, [resetAutosaveTimeout]);

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

  if (loader) {
    return <Loader />;
  }

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
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #2196F3",
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

export default Page;
