import React, { useState } from 'react';
import './sidebar.css';
import {
	SidebarContainer,
	Icon,
	CloseIcon,
	SidebarWrapper,
	SidebarLink,
	SidebarMenu,
} from './SidebarElements';

import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle }) => {
	const sideMenus = [
		{
			title: 'home',
			path: '/',
		},
		{
			title: 'blog',
			path: '/blog',
		},
		{
			title: 'trade calculator',
			path: '/trade-calculator',
		},
		{
			title: 'rankings',
			path: '/rankings',
		},
		{
			title: 'login',
			path: '/login',
		},
	];
	return (
		<nav className={isOpen ? 'nav-menu active' : 'nav-menu'}>
			<ul className='nav-menu-items' onClick={toggle}>
				{sideMenus.map((item, index) => {
					return (
						<li key={index} className='nav-text'>
							<Link to={item.path}>{item.title}</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Sidebar;
