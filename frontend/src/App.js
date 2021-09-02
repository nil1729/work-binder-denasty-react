import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Index";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PPR from "./pages/PPR";
import Users from "./pages/Users";
import Question from "./pages/Question";
import Login from "./pages/Login";
import { connect } from "react-redux";

import SignUp from "./pages/Signup";
import CustomSnackbar from "./components/utils/CustomSnackbar";
const App = ({ authState: { isAuthenticated } }) => {
  console.log(isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} openStatus={isOpen} />
      <CustomSnackbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect from="/home" to="/" />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/rankings" component={PPR}></Route>
        <Route exact path="/users" component={Users}></Route>
        <Route exact path="/question" component={Question}></Route>
        {/* <Route exact path="/register" component={SignUp}></Route> */}
        <Route exact path="/login" component={Login}></Route>
        <Redirect from="/logout" to="/login" />
      </Switch>
    </Router>
  );
};
const mapStateToProps = (state) => ({
  authState: state.AUTH_STATE,
});

export default connect(mapStateToProps)(App);
