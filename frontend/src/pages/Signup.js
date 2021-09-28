// import React, { useState, useEffect } from "react";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";

// import { Link } from "react-router-dom";
// import Grid from "@material-ui/core/Grid";

// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";

// import { useHistory } from "react-router-dom";
// import { connect } from "react-redux";
// import { signUpUser } from "../store/actions/auth";
// import checker from "../components/utils/checkFields";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const SignUp = ({ signUpUser, authState: { isAuthenticated } }) => {
//   const classes = useStyles();
//   const history = useHistory();

//   useEffect(() => {
//     if (isAuthenticated) history.push("/dashboard");
//     // eslint-disable-next-line
//   }, [isAuthenticated]);
//   // Set Login initials Form state
//   const [submitted, setSubmitted] = useState(false);
//   const [userInput, setUserInput] = useState({
//     email: "",
//     password: "",
//     confirm_password: "",
//     first_name: "",
//     last_name: "",
//   });
//   const [wrongUserInput, setWrongUserInput] = useState({
//     email: false,
//     password: false,
//     first_name: false,
//     last_name: false,
//     confirm_password: false,
//   });
//   // On change handler
//   const onChange = (e) => {
//     setUserInput({
//       ...userInput,
//       [e.target.name]: e.target.value,
//     });
//     setWrongUserInput({
//       ...wrongUserInput,
//       [e.target.name]: false,
//     });
//   };
//   // on submit handler
//   const submitHandler = async (e) => {
//     // prevent the default behavior of form submission
//     e.preventDefault();

//     // Validate email and password strength
//     if (
//       !validateInput(
//         userInput.first_name.trim(),
//         userInput.last_name.trim(),
//         userInput.email,
//         userInput.password
//       )
//     )
//       return;

//     // Password Confirmation
//     if (userInput.password !== userInput.confirm_password)
//       return setWrongUserInput({ ...wrongUserInput, confirm_password: true });

//     // create user registration data
//     let userRegistrationData = {
//       name: `${userInput.first_name.trim()} ${userInput.last_name.trim()}`,
//       email: userInput.email,
//       password: userInput.password,
//     };

//     setSubmitted(true);

//     // call redux action with data
//     const isSuccess = await signUpUser(userRegistrationData);

//     if (!isSuccess) setSubmitted(false);
//   };

//   // validate input
//   const validateInput = (first_name, last_name, email, password) => {
//     // check first_name
//     if (!checker.alphabetic(first_name)) {
//       setWrongUserInput({
//         ...wrongUserInput,
//         first_name: true,
//       });
//       return false;
//     }

//     // check last_name
//     if (!checker.alphabetic(last_name)) {
//       setWrongUserInput({
//         ...wrongUserInput,
//         last_name: true,
//       });
//       return false;
//     }

//     // check email
//     if (!checker.email(email)) {
//       setWrongUserInput({
//         ...wrongUserInput,
//         email: true,
//       });
//       return false;
//     }

//     // check password strength
//     if (!checker.password(password)) {
//       setWrongUserInput({
//         ...wrongUserInput,
//         password: true,
//       });
//       return false;
//     }

//     return true;
//   };

//   //errors
//   const [open, setOpen] = React.useState(false);

//   //   const handleClick = () => {
//   //     setOpen(true);
//   //   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form} Validate onSubmit={submitHandler}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="fname"
//                 disabled={submitted}
//                 name="first_name"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 autoFocus
//                 value={userInput.first_name}
//                 onChange={onChange}
//               />
//               {wrongUserInput.first_name ? (
//                 <span style={{ color: "red" }}>
//                   Please use only english alphabetic characters!
//                 </span>
//               ) : (
//                 <></>
//               )}
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 disabled={submitted}
//                 name="last_name"
//                 autoComplete="lname"
//                 value={userInput.last_name}
//                 onChange={onChange}
//               />
//               {wrongUserInput.last_name ? (
//                 <span style={{ color: "red" }}>
//                   Please use only english alphabetic characters!
//                 </span>
//               ) : (
//                 <></>
//               )}
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 disabled={submitted}
//                 type="email"
//                 autoComplete="email"
//                 value={userInput.email}
//                 onChange={onChange}
//               />
//               {wrongUserInput.email ? (
//                 <span style={{ color: "red" }}>
//                   Please provide a valid email address
//                 </span>
//               ) : (
//                 <></>
//               )}
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 disabled={submitted}
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={userInput.password}
//                 onChange={onChange}
//               />
//               {wrongUserInput.password ? (
//                 <span style={{ color: "red" }}>
//                   Please use a password with minimum 8 characters. Contains at
//                   least 1 symbol, 1 uppercase, 1 number, 1 lowercase{" "}
//                 </span>
//               ) : (
//                 <></>
//               )}
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 disabled={submitted}
//                 name="confirm_password"
//                 label="Conform Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={userInput.confirm_password}
//                 onChange={onChange}
//               />
//               {wrongUserInput.confirm_password ? (
//                 <span style={{ color: "red" }}>
//                   Please make sure your password match
//                 </span>
//               ) : (
//                 <></>
//               )}
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             disabled={submitted}
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign Up
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link to="/login" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       {/* <Box mt={5}>
//         <Copyright />
//       </Box> */}
//     </Container>
//   );
// };

// const mapStateToProps = (state) => ({
//   authState: state.AUTH_STATE,
// });

// export default connect(mapStateToProps, { signUpUser })(SignUp);

// import React, { useState, useEffect } from "react";
// import styles from "../components/Question/index.module.scss";
// import Sortable from "../components/Question/Sortable";
// import Sorted from "../components/Question/Sorted";
// import ListItem from "../components/Question/listItem";
// import { connect } from "react-redux";
// import { getAllPlayers } from "../store/actions/dynasty/rankings";
// const Question = ({ getAllPlayers }) => {
//   const [count, setCount] = useState(1);
//   const [newId, setId] = useState("");
//   const [percentage, setPercentage] = useState(0);
//   const [question, setQuestion] = useState(1);
//   const [allPlayers, setAllPlayers] = useState([]);
//   const [myList, setMyList] = useState([
//     // {
//     //   id: "1",
//     //   name: "Aaron Jones",
//     // },
//     // {
//     //   id: "2",
//     //   name: "David Moore",
//     // },
//     // {
//     //   id: "3",
//     //   name: "Allen Lazard",
//     // },
//     // {
//     //   id: "4",
//     //   name: "Kawaan Baker",
//     // },
//     // {
//     //   id: "5",
//     //   name: "Kenneth Gainwell",
//     // },
//     // {
//     //   id: "6",
//     //   name: "Logan Thomas",
//     // },
//   ]);

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line
//   }, []);

//   function increment() {
//     if (count < 7) {
//       setCount((prev) => prev + 1);
//     }
//   }
//   function decrement() {
//     setCount((prev) => prev - 1);
//   }

//   const handlePrev = () => {
//     if (count == 1 || count == 7) {
//       if (percentage > 0.5) {
//         setPercentage((prev) => prev - 100 / 150);
//       }
//       if (question > 1) {
//         setQuestion((prev) => prev - 1);
//         setCount(7);
//       }
//       // pageData(question);

//       // setId("");
//     }
//   };
//   const handleNext = () => {
//     if (count == 7) {
//       if (percentage < 100) {
//         setPercentage((prev) => prev + 100 / 150);
//       }
//       if (question < 150) {
//         setQuestion((prev) => prev + 1);
//       }
//       // pageData(question);
//       setCount(1);
//       // setId("");
//     }
//   };
//   const fetchData = async () => {
//     // setFetchingList(true);
//     const dt = await getAllPlayers();
//     console.log(dt.data);
//     setAllPlayers(dt.data);
//     // const x = [];
//     // for (let index = 0; index < 6; index++) {
//     //   x.push(allPlayers[index]);
//     // }

//     // setFetchingList(false);
//   };
//   // const pageData = (q) => {
//   //   const x = [];
//   //   for (let index = q * 6; index < 6; index++) {
//   //     x.push(allPlayers[index]);
//   //   }
//   //   console.log(x);
//   //   setMyList(x);
//   // };
//   return (
//     <div className={styles.container}>
//       <div className={styles.top_progress}>
//         <div
//           className={styles.top_progress_bar}
//           style={{ width: ` ${percentage}%` }}
//         ></div>
//       </div>
//       <div className={styles.question_header}>
//         <h3 className={styles.question_num}>Question {question}</h3>
//         <h2 className={styles.question_text}>
//           Rank these players from best to worst
//         </h2>
//       </div>
//       {/* <Sortable /> */}
//       {/* <Sorted /> */}
//       <div className={styles.sortable_container}>
//         <ul className={styles.draggable_container2}>
//           {console.log(myList)}
//           {allPlayers
//             .slice((question - 1) * 6, 6 * question)
//             .map((item, index) => (
//               <ListItem
//                 key={index}
//                 data={item}
//                 count={count}
//                 incr={increment}
//                 decre={decrement}
//                 id={newId}
//               />
//             ))}
//         </ul>
//       </div>
//       <div className={styles.action_btn_container2}>
//         {question !== 1 && (
//           <button className={styles.btn} onClick={handlePrev}>
//             Prev
//           </button>
//         )}
//         {question === 150 ? (
//           <button className={styles.btn}>Submit</button>
//         ) : (
//           <button className={styles.btn} onClick={handleNext}>
//             Next
//           </button>
//         )}
//         {/* <div className={styles.reset_btn} onClick={handleReset}>
//           prev
//         </div>
//         <div className={styles.next_btn}>next</div> */}
//       </div>
//     </div>
//   );
// };

// export default connect(null, { getAllPlayers })(Question);
