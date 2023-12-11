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

const Page = () => {
  const [data, setData] = React.useState();
  const [inputObject, setInputObject] = React.useState(null);
  const { workspaceId } = useParams();
  const [emoji, setEmoji] = React.useState("");
  const [banner, setBanner] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [fetchedEditorObject, setFetchedEditorObject] = React.useState();
  const [intialBlockId, setInitialBlockId] = React.useState();
  const [isInserted, setIsInserted] = React.useState(false);

  const object = [
    {
      id: "2d0aa259-1a76-4ba1-a2cf-4555cfd16d14",
      type: "table",
      props: {
        textColor: "default",
        backgroundColor: "default",
      },
      content: {
        type: "tableContent",
        rows: [
          {
            cells: [
              [
                {
                  type: "text",
                  text: "hello",
                  styles: {},
                },
              ],
              [
                {
                  type: "text",
                  text: "look",
                  styles: {},
                },
              ],
              [
                {
                  type: "text",
                  text: "table",
                  styles: {},
                },
              ],
            ],
          },
          {
            cells: [[], [], []],
          },
        ],
      },
      children: [],
    },
    {
      id: "c1d3af51-e210-4f11-beff-661fc6b2b342",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [],
      children: [],
    },
    {
      id: "910547b5-26e0-48a6-98c0-3a8efb009030",
      type: "image",
      props: {
        backgroundColor: "default",
        textAlignment: "left",
        url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5fe96a9b-6d92-451b-ad2f-6caf946793c3/danlwfv-885a5b0b-32ca-45b2-a360-a9c0951f65e1.png/v1/fit/w_828,h_1410/imga_baron_by_arttair_danlwfv-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjE4MCIsInBhdGgiOiJcL2ZcLzVmZTk2YTliLTZkOTItNDUxYi1hZDJmLTZjYWY5NDY3OTNjM1wvZGFubHdmdi04ODVhNWIwYi0zMmNhLTQ1YjItYTM2MC1hOWMwOTUxZjY1ZTEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.KtqNC1ZIUemWrOGl3tKNLKYtO2u4dcLyFazRvFtDDGA",
        caption: "",
        width: 512,
      },
      children: [],
    },
    {
      id: "38274bb0-e6b8-4229-9e71-1b98d7407063",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [],
      children: [],
    },
  ];

  const { pageId } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const pagesRef = doc(db, "pages", pageId);

      try {
        const pagesDoc = await getDoc(pagesRef);
        setData(pagesDoc.data());
        setEmoji(pagesDoc.data().headerEmoji);
        setBanner(pagesDoc.data().banner);
        setTitle(pagesDoc.data().pageTitle);
        setFetchedEditorObject(JSON.parse(pagesDoc.data().content));

        const blocks = editor.topLevelBlocks;
        setInitialBlockId(blocks[0].id);
        console.log(intialBlockId);
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
    await handleSave();
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
        workspaceId: workspaceId,
        content: JSON.stringify(inputObject),
        headerEmoji: emoji,
        banner: banner,
        pageTitle: title,
      };

      await createData(data, "pages");

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

          <LoadingButton
            size="small"
            color="secondary"
            loadingPosition="start"
            startIcon={<SaveAsIcon />}
            variant="contained"
            loading={loading}
            onClick={handleSave}
            sx={{
              backgroundColor: "black",
              position: "fixed",
              right: "60px",
              bottom: "40px",
              padding: "7px 10px",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            <span>Save</span>
          </LoadingButton>
        </div>
      </div>
    </>
  );
};

export default Page;
