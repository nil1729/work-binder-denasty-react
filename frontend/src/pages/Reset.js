import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { resetPasswordRequest } from "../store/actions/auth";

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
    fontSize: "18px",
    outline: "none",
    cursor: "pointer",
    background: "#753eca",
    border: "none",
    borderRadius: "20px",
    marginTop: "1rem",
    padding: "8px 20px",
    fontWeight: "300",
    width: "100%",
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
const Reset = ({ resetPasswordRequest, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const { reset_token } = useParams();

  // Set Login initials Form state
  const [submitted, setSubmitted] = useState(false);
  const [userInput, setUserInput] = useState({
    confirm_password: "",
    password: "",
  });
  const [wrongUserInput, setWrongUserInput] = useState({
    password: false,
    confirm_password: false,
  });
  const [attempt, setAttempt] = useState(0);

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

    // Validate password and confirm_password strength
    if (
      (userInput.password && userInput.password.trim().length === 0) ||
      userInput.password.length < 6
    ) {
      setWrongUserInput({
        ...wrongUserInput,
        password: true,
      });
      return setSubmitted(false);
    }
    if (userInput.password !== userInput.confirm_password) {
      setWrongUserInput({
        ...wrongUserInput,
        confirm_password: true,
      });
      return setSubmitted(false);
    }

    // call redux action with data
    let reqBody = { password: userInput.password, reset_token: reset_token };
    setUserInput({ confirm_password: "", password: "" });
    const isSuccess = await resetPasswordRequest(reqBody);

    if (!isSuccess) {
      history.push("/forgot_password");
    } else {
      history.push("/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            disabled={submitted}
            name="password"
            label="Password"
            type="password"
            onChange={onChange}
            value={userInput.password}
            autoFocus
            helperText="Please choose a password of minimum length 6"
            error={wrongUserInput.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            disabled={submitted}
            name="confirm_password"
            label="Confirm Password"
            type="password"
            onChange={onChange}
            value={userInput.confirm_password}
            error={wrongUserInput.confirm_password}
            helperText="Confirm password must be same as password"
          />
          <div className={classes.btn_container}>
            <button
              type="submit"
              variant="contained"
              className={classes.submit}
              disabled={submitted}
            >
              {" "}
              {submitted ? "Resetting  ..." : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default connect(null, { resetPasswordRequest })(Reset);
