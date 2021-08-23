import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Index';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

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
			</Switch>
		</Router>
	);
}

export default App;
