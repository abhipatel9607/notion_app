import React from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

const CreatePage = () => {
  const editor = useBlockNote({});
  const [inputObject, setInputObject] = React.useState();
  const [isInserted, setIsInserted] = React.useState(false);
  const [intialBlockId, setInitialBlockId] = React.useState();

  editor.onEditorContentChange(() => {
    const blocks = editor.topLevelBlocks;
    setInputObject(blocks);
    setInitialBlockId(blocks[0].id);
  });

  const object = [
    {
      id: "0476faeb-8d95-4db4-9aa7-e5769e6d0c19",
      type: "heading",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
        level: 1,
      },
      content: [],
      children: [],
    },
    {
      id: "159b2da2-fc1e-47f4-8aa4-1cd739ece1d7",
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

  const blocksToInsert = object.map((block) => ({
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

  return (
    <div style={{ width: "90vw", marginTop: "100px", marginLeft: "100px" }}>
      <BlockNoteView editor={editor} theme={"light"} />
      <button
        onClick={() => console.log(inputObject)}
        style={{ marginTop: "100px" }}
      >
        Save
      </button>
    </div>
  );
};

export default CreatePage;
