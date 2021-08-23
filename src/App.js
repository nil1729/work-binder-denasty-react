import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Index';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PPR from './pages/PPR';

function App() {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<Router>
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} openStatus={isOpen} />
			<Switch>
				<Route exact path='/' component={Home} />
				<Redirect from='/home' to='/' />
				<Route exact path='/blog' component={Blog} />
				<Route exact path='/rankings' component={PPR}></Route>
			</Switch>
		</Router>
	);
}

export default App;
