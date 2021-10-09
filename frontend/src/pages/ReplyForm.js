import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { signInUser } from "../store/actions/auth";
import checker from "../components/utils/checkFields";
import { addComment } from "../store/actions/blogs";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    fontFamily: "Nunito Sans ",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontFamily: "Nunito Sans",
  },
  btn_container: {
    width: "100%",
    textAlign: "center",
  },
  submit: {
    fontFamily: "Nunito Sans",
    color: "#FFFFFF",
    fontSize: "18px",
    outline: "none",
    cursor: "pointer",
    background: "#753eca",
    border: "none",
    borderRadius: "20px",
    marginTop: "1rem",
    padding: "8px 20px",
    fontWeight: "300",
    width: "30%",
    "&:hover": {
      background: "#5b30a0",
      transition: "all 0.3s",
    },
  },
  my_divider: {
    width: "100%",
    margin: "15px 0 10px",
    borderBottom: "1px dashed rgba(0, 0, 0, 0.25)",
    backgroundColor: "transparent",
  },
  my_forgot_password: {
    fontFamily: "Nunito Sans",
    color: "#753eca",
    fontSize: "15px",
    cursor: "pointer",
    textDecoration: "none",
  },
  my_font: {
    fontFamily: "Nunito Sans",
    letterSpacing: "0.3px",
    fontSize: "15px",
  },
}));

function ReplyForm({ addComment, blogId }) {
  const classes = useStyles();
  const [userInput, setUserInput] = useState({
    email: "",
    full_name: "",
    comment_text: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [wrongUserInput, setWrongUserInput] = useState({
    email: false,
    full_name: false,
    comment_text: false,
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

    // Validate email
    if (!checker.email(userInput.email)) {
      setWrongUserInput({
        ...wrongUserInput,
        email: true,
      });
      return;
    }
    if (userInput.comment_text.trim().length < 10) {
      setWrongUserInput({
        ...wrongUserInput,
        comment_text: true,
      });
      return;
    }
    if (userInput.full_name.trim().length === 0) {
      setWrongUserInput({
        ...wrongUserInput,
        full_name: true,
      });
      return;
    }
    setSubmitted(true);
    // call redux action with data
    const isSuccess = await addComment({
      name: userInput.full_name,
      emailAddress: userInput.email,
      bodyText: userInput.comment_text,
      blogID: blogId,
    });

    if (isSuccess) {
      setSubmitted(false);
      setUserInput({
        email: "",
        full_name: "",
        comment_text: "",
      });
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          style={{
            fontFamily: "Nunito Sans",
            fontSize: "25px",
            color: "#753eca",
            marginBottom: "1rem",
          }}
        >
          Leave a Reply
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            id="outlined-textarea"
            label="Comments"
            placeholder="Write your feedback here ..."
            multiline
            required
            fullWidth
            variant="outlined"
            inputProps={{
              className: classes.my_font,
            }}
            onChange={onChange}
            value={userInput.comment_text}
            error={wrongUserInput.comment_text}
            name="comment_text"
            disabled={submitted}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            disabled={submitted}
            name="full_name"
            type="text"
            onChange={onChange}
            value={userInput.full_name}
            error={wrongUserInput.full_name}
            placeholder="John Doe"
            inputProps={{
              className: classes.my_font,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            disabled={submitted}
            name="email"
            type="email"
            onChange={onChange}
            value={userInput.email}
            autoComplete="email"
            error={wrongUserInput.email}
            placeholder="john.doe@gmail.com"
            inputProps={{
              className: classes.my_font,
            }}
          />
          <div className={classes.btn_container}>
            <button
              type="submit"
              variant="contained"
              className={classes.submit}
              disabled={submitted}
            >
              {" "}
              {submitted ? "Signing In ..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default connect(null, { addComment })(ReplyForm);
