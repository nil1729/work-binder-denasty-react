import React, { useState, useEffect } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { signInUser } from "../store/actions/auth";
import checker from "../components/utils/checkFields";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  submit: {
    // margin: theme.spacing(3, 0, 2),
    // fontFamily: "Nunito Sans",
    // backgroundColor: "#753eca",
    color: "#FFFFFF",
    fontSize: "20px",
    outline: "none",
    width: "100%",
    cursor: "pointer",
    background: "#753eca",
    border: "none",
    borderRadius: "20px",
    marginTop: "1.5rem",
    padding: "10px",
    "&:hover": {
      transform: "scale(1.05)",
      // background: "#6a3fa1",
    },
  },
}));
const SignIn = ({ authState: { isAuthenticated }, signInUser, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();

  // Set Login initials Form state
  const [submitted, setSubmitted] = useState(false);
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [wrongUserInput, setWrongUserInput] = useState({ email: false });
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      console.log(isAuthenticated);
      if (query.get("redirect")) {
        history.push(query.get("redirect"));
        return;
      }
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

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
    console.log(userInput);
    // Validate email and password strength
    if (!validateInput(userInput.email)) return;

    setSubmitted(true);

    // call redux action with data
    const isSuccess = await signInUser(userInput);

    if (!isSuccess) {
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
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography
          component="h1"
          variant="h5"
          style={{
            fontFamily: "Nunito Sans",
            fontSize: "32px",
            color: "#753eca",
          }}
        >
          Sign in
        </Typography>
        <form className={classes.form} Validate onSubmit={submitHandler}>
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
          />
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
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <button
            type="submit"
            variant="contained"
            className={classes.submit}
            disabled={submitted}
          >
            {" "}
            Sign In
          </button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authState: state.AUTH_STATE,
});

export default connect(mapStateToProps, { signInUser })(SignIn);
