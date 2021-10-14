import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { forgotPasswordRequest } from "../store/actions/auth";
import checker from "../components/utils/checkFields";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Nunito Sans ",
    height: "100vh",
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
    fontSize: "17px",
    outline: "none",
    cursor: "pointer",
    background: "#753eca",
    border: "none",
    borderRadius: "20px",
    marginTop: "1rem",
    padding: "8px 30px",
    fontWeight: "300",
    width: "100%",
    textDecoration: "none",
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
}));

const Forgot = ({ forgotPasswordRequest, ...rest }) => {
  const classes = useStyles();

  // Set Login initials Form state
  const [submitted, setSubmitted] = useState(false);
  const [userInput, setUserInput] = useState({ email: "" });
  const [wrongUserInput, setWrongUserInput] = useState({ email: false });
  const [attempt, setAttempt] = useState(false);

  // On change handler
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

  // on submit handler
  const submitHandler = async (e) => {
    // prevent the default behavior of form submission
    e.preventDefault();
    setSubmitted(true);

    // Validate email and password strength
    if (!validateInput(userInput.email)) return setSubmitted(false);

    // call redux action with data
    let reqBody = userInput;
    setUserInput({ email: "" });
    const isSuccess = await forgotPasswordRequest(reqBody);

    if (isSuccess) {
      setAttempt(true);
    } else {
      setSubmitted(false);
    }
  };

  // validate input
  const validateInput = (email) => {
    // check email
    if (!checker.email(email)) {
      setWrongUserInput({
        ...wrongUserInput,
        email: true,
      });
      return false;
    }
    return true;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {!attempt ? (
        <div className={classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            style={{
              fontFamily: "Nunito Sans",
              fontSize: "28px",
              color: "#753eca",
            }}
          >
            Forget Password
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
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
              autoFocus
              error={wrongUserInput.email}
            />

            <div className={classes.btn_container}>
              <button
                type="submit"
                variant="contained"
                className={classes.submit}
                disabled={submitted}
              >
                {" "}
                {submitted ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={classes.paper}>
          <Typography
            component="p"
            variant="h5"
            style={{
              fontFamily: "Nunito Sans",
              fontSize: "17px",
              marginBottom: "30px",
              backgroundColor: "#DFD9D9",
              padding: "15px",
              color: "#222",
              textAlign: "center",
            }}
          >
            If You provided a valid Email Address you will receive a password
            reset email. If you don't receive an email, you will need to try
            again. Also, please check your spam folder
          </Typography>

          <div className={classes.btn_container}>
            <Link to="/login" className={classes.submit}>
              Back To Sign In
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
};

export default connect(null, { forgotPasswordRequest })(Forgot);
