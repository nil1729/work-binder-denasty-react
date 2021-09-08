import React, { useState } from "react";
// import styles from "./ReplyForm.module.scss";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import styles from "../components/Dashboard/ReplyForm.module.scss";
import checker from "../components/utils/checkFields";
function ReplyForm() {
  const [userInput, setUserInput] = useState({
    comment: "",
    author: "",
    email: "",
    url: "",
    checkbox: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [wrongUserInput, setWrongUserInput] = useState({
    email: false,
    author: false,
    url: false,
  });
  const onChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
    setWrongUserInput({
      ...wrongUserInput,
      [e.target.name]: false,
    });
  };
  const submitHandler = async (e) => {
    // prevent the default behavior of form submission
    e.preventDefault();

    setSubmitted(true);

    // Validate email
    if (!validateInput(userInput.email)) return setSubmitted(false);
    if (!validateInput(userInput.author.trim())) return setSubmitted(false);
    if (!validateInput(userInput.url)) return setSubmitted(false);
    // call redux action with data
  };
  const validateInput = (email, author, url) => {
    if (!checker.alphabetic(author)) {
      setWrongUserInput({
        ...wrongUserInput,
        author: true,
      });
      return false;
    }
    // check email
    if (!checker.email(email)) {
      setWrongUserInput({
        ...wrongUserInput,
        email: true,
      });
      return false;
    }
    if (!checker.url(url)) {
      setWrongUserInput({
        ...wrongUserInput,
        url: true,
      });
      return false;
    }
    return true;
  };

  return (
    <div className={styles.form}>
      <Typography
        component="h3"
        variant="h5"
        style={{
          fontFamily: "Nunito Sans",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        LEAVE A REPLAY
      </Typography>
      <form onSubmit={submitHandler}>
        <p className={styles.comment_notes}>
          <span>Your email address will not be published.</span> Required fields
          are marked <span>*</span>
        </p>
        <p className={styles.comment_form_comment}>
          <label for="comment" className={styles.label}>
            Comment
          </label>
          <TextareaAutosize
            fullWidth
            maxRows="8"
            maxCols="45"
            className={styles.textarea}
            required="required"
            name="comment"
            onChange={onChange}
            value={userInput.comment}
            disabled={submitted}
          />
        </p>
        <div className={styles.InputContainer}>
          <p className={styles.comment_form_comment}>
            <label for="author" className={styles.label}>
              Name <span>*</span>
            </label>{" "}
            <TextField
              variant="outlined"
              required
              fullWidth
              name="author"
              type="text"
              onChange={onChange}
              value={userInput.author}
              disabled={submitted}
            />
            {wrongUserInput.author ? (
              <span style={{ color: "red" }}>
                Please use only english alphabetic characters!
              </span>
            ) : (
              <></>
            )}
          </p>
          <p className={styles.comment_form_comment}>
            <label for="email" className={styles.label}>
              Email <span>*</span>
            </label>{" "}
            <TextField
              variant="outlined"
              required
              fullWidth
              name="email"
              type="text"
              onChange={onChange}
              value={userInput.email}
              disabled={submitted}
              error={wrongUserInput.email}
            />
            {wrongUserInput.email ? (
              <span style={{ color: "red" }}>
                Please provide a valid email address
              </span>
            ) : (
              <></>
            )}
          </p>
          <p className={styles.comment_form_comment}>
            <label for="url" className={styles.label}>
              Website
            </label>{" "}
            <TextField
              variant="outlined"
              required
              name="url"
              type="text"
              onChange={onChange}
              value={userInput.url}
              disabled={submitted}
              error={wrongUserInput.url}
            />
            {wrongUserInput.url ? (
              <span style={{ color: "red" }}>
                Please provide a valid url address
              </span>
            ) : (
              <></>
            )}
          </p>
        </div>
        <p>
          <Checkbox name="checkbox" color="primary" />
          <label className={styles.label} s>
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </p>
        <p className={styles.form_submit}>
          <button
            type="submit"
            className={styles.submit}
            variant="contained"
            disabled={submitted}
          >
            {submitted ? "Posting comment.." : "Post Comment"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default ReplyForm;
