import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "../components/TextEditor/index.module.scss";

const TextEditor = () => {
  //   const [array, setArray] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  //   const handleClick = () => {
  //     setArray(convertedContent);
  //   };
  return (
    <div className={styles.container}>
      {/* <div dangerouslySetInnerHTML={{ __html: array }}></div> */}
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName={styles.wrapper_class}
        editorClassName={styles.editor_class}
        toolbarClassName={styles.toolbar_class}
      />
      <div
        className={styles.preview}
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
      {/* <div>
        <button onClick={handleClick}>Save</button>
      </div> */}
    </div>
  );
};
export default TextEditor;
