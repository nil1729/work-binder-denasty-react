import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Index';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PPR from './pages/PPR';
import Users from './pages/Users';
import Question from './pages/Question';
import Login from './pages/Login';
import { connect } from 'react-redux';
import PrivateRoute from './routing/PrivateRoute';
import CustomSnackbar from './components/utils/CustomSnackbar';
import PageLoader from './components/utils/FullPageLoader';

import { loadUser } from './store/actions/auth';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';
import TextEditor from './pages/TextEditor';
import BlogDetails from './pages/BlogDetails';

const App = ({ loadUser }) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => {
		setIsOpen(!isOpen);
	};

	// Call load user on first load
	useEffect(() => {
		loadUser();
		//eslint-disable-next-line
	}, []);

	return (
		<Router>
			<PageLoader />
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} openStatus={isOpen} />
			<CustomSnackbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Redirect from='/home' to='/' />
				<Route exact path='/blog' component={Blog} />
				<Route exact path='/rankings' component={PPR}></Route>
				<Route exact path='/users' component={Users}></Route>
				<Route exact path='/question' component={Question}></Route>
				<Route exact path='/login' component={Login}></Route>
				<Route exact path='/forgot_password' component={Forgot}></Route>
				<Route exact path='/reset_password/:reset_token' component={Reset}></Route>
				<Redirect from='/logout' to='/login' />
				<Route exact path='/blogs/:id' component={BlogDetails}></Route>
				<PrivateRoute exact path='/dashboard' component={Home} />
				<PrivateRoute exact path='/create_blog' component={TextEditor}></PrivateRoute>
			</Switch>
		</Router>
	);
};

export default connect(null, { loadUser })(App);
