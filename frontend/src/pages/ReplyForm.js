import React, { useState } from "react";
// import styles from "./ReplyForm.module.scss";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontFamily: "Nunito Sans",
  },

  comment_notes: {
    marginBottom: "20px",
  },
  comment_form_comment: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    marginRight: "5px",
  },
  form_submit: {
    margin: "15px 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  submit: {
    padding: "10px",
    background: "#753eca",
    outline: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  InputContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    "&:@media(minWidth: 600px)": {
      flexDirection: "row",
    },
  },
  label: {
    marginBottom: "10px",
  },
}));

function ReplyForm() {
  const [userInput, setUserInput] = useState({
    comment: "",
    author: "",
    email: "",
    url: "",
    checkbox: "",
  });
  const classes = useStyles();
  const onChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    // prevent the default behavior of form submission
    e.preventDefault();
  };
  return (
    <>
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
      <form className={classes.form} onSubmit={submitHandler}>
        <p className={classes.comment_notes}>
          <span>Your email address will not be published.</span> Required fields
          are marked <span>*</span>
        </p>
        <p className={classes.comment_form_comment}>
          <label for="comment" className={classes.label}>
            Comment
          </label>
          <TextareaAutosize
            rows={8}
            cols={45}
            aria-label="maximum height"
            maxlength="65525"
            required="required"
            name="comment"
            onChange={onChange}
            value={userInput.comment}
          />
        </p>
        <div className={classes.InputContainer}>
          <p className={classes.comment_form_comment}>
            <label for="author" className={classes.label}>
              Name <span>*</span>
            </label>{" "}
            <TextField
              variant="outlined"
              padding="0"
              required
              fullWidth
              name="author"
              type="text"
              onChange={onChange}
              value={userInput.author}
            />
          </p>
          <p className={classes.comment_form_comment}>
            <label for="email" className={classes.label}>
              Email <span>*</span>
            </label>{" "}
            <TextField
              variant="outlined"
              padding="0"
              required
              fullWidth
              name="email"
              type="text"
              onChange={onChange}
              value={userInput.email}
            />
          </p>
          <p className={classes.comment_form_comment}>
            <label for="url" className={classes.label}>
              Website
            </label>{" "}
            <TextField
              variant="outlined"
              padding="0"
              required
              fullWidth
              name="url"
              type="text"
              onChange={onChange}
              value={userInput.email}
            />
          </p>
        </div>
        <p>
          <Checkbox name="checkbox" color="primary" />
          <label className={classes.label} s>
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </p>
        <p className={classes.form_submit}>
          <button type="submit" className={classes.submit}>
            Post Comment
          </button>
        </p>
      </form>
    </>
  );
}

export default ReplyForm;
