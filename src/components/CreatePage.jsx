import React from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { UserAuth } from "../firebase/authContext";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Button, TextField } from "@mui/material";

const CreatePage = () => {
  const editor = useBlockNote({});
  const [inputObject, setInputObject] = React.useState();
  const [emoji, setEmoji] = React.useState("");

  const [loading, setLoading] = React.useState();

  const { user } = UserAuth();

  editor.onEditorContentChange(() => {
    const blocks = editor.topLevelBlocks;
    setInputObject(blocks);
  });

  const handleClick = () => {
    console.log(inputObject);
  };

  const getRandomEmoji = () => {
    const emojis = ["😊", "🚀", "🌈", "🎉", "🍕", "🔥", "📚", "❤️", "🎸", "🐱"];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

  const generateRandomEmojiOnButtonClick = () => {
    setEmoji(getRandomEmoji());
  };

  return (
    <>
      <div className="create-page--container">
        <Button
          onClick={generateRandomEmojiOnButtonClick}
          variant="outlined"
          sx={{
            display: "flex",
            marginLeft: "40px",
            border: "none",
            color: "#a2a2a2",
            "&:hover": {
              border: "none",
            },
          }}
          startIcon={<EmojiEmotionsIcon />}
        >
          Set Emoji
        </Button>

        {emoji !== "" && (
          <TextField
            id="emoji-textarea"
            multiline
            value={emoji}
            sx={{
              marginBottom: 0,
              marginLeft: "40px",
              "& .MuiInputBase-root": {
                paddingBottom: 0,
              },
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
                fontSize: "60px",
                paddingTop: "10px",
                paddingBottom: 0,
                paddingLeft: "0px",
                margin: 0,
                lineHeight: "3rem",
              },
            }}
          />
        )}

        <TextField
          id="outlined-textarea"
          placeholder="Untitled"
          multiline
          sx={{
            marginLeft: "40px",
            width: "60vw",
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

        <LoadingButton
          size="small"
          color="secondary"
          loadingPosition="start"
          startIcon={<SaveAsIcon />}
          variant="contained"
          // loading={loading}
          onClick={handleClick}
          sx={{
            backgroundColor: "black",
            position: "absolute",
            right: "60px",
            top: "40px",
            padding: "7px 10px",

            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          <span>Save</span>
        </LoadingButton>
      </div>
    </>
  );
};

export default CreatePage;
