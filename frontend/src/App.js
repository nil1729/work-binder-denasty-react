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
import PrivateRoute from "./routing/PrivateRoute";
import CustomSnackbar from "./components/utils/CustomSnackbar";
import PageLoader from "./components/utils/FullPageLoader";

import { loadUser } from "./store/actions/auth";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import TextEditor from "./pages/TextEditor";
import BlogDetails from "./pages/BlogDetails";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
const Page = styled.div`
  background-color: ${(props) => props.theme.pageBackground};
  transition: all 1.5s ease;
`;
const LightTheme = {
  pageBackground: "#FFFFFF",
  textColor: "#181C28",
  tagLineColor: "#fff",
  smallParaColor: "#646268",
  differentColor: "#242629",
  primaryColor: "#753eca",
  whiteColor: "#fff",
  secondBackground: "#FFF",
};

const DarkTheme = {
  primaryColor: "#753eca",
  pageBackground: "#181C28",
  secondBackground: "#2D3649",
  textColor: "#ffffff",
  tagLineColor: "#8e7d7d",
  smallParaColor: "#fff",
  differentColor: "#ffff",
  whiteColor: "#fff",
};

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};
const App = ({ loadUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Call load user on first load
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Page>
        <Router>
          <PageLoader />
          <Sidebar
            isOpen={isOpen}
            toggle={toggle}
            theme={theme}
            setTheme={setTheme}
          />
          <Navbar
            toggle={toggle}
            openStatus={isOpen}
            theme={theme}
            setTheme={setTheme}
          />
          <CustomSnackbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect from="/home" to="/" />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/rankings" component={PPR}></Route>
            <Route exact path="/select_players" component={Users}></Route>
            <Route exact path="/question" component={Question}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/forgot_password" component={Forgot}></Route>
            <Route
              exact
              path="/reset_password/:reset_token"
              component={Reset}
            ></Route>
            <Route exact path="/trade_calculator" component={Users}></Route>
            <Redirect from="/logout" to="/login" />
            <Route exact path="/blogs/:id" component={BlogDetails}></Route>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create_blog"
              component={TextEditor}
            ></PrivateRoute>
          </Switch>
        </Router>
      </Page>
    </ThemeProvider>
  );
};

export default connect(null, { loadUser })(App);
