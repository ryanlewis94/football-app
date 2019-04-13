import React from 'react';
import './Nav.css';

const NavTop = ({ league }) => {
	return (
		<div className="nav-top carbon-fibre dark-shadow">
			<h2 className="title space">{league}</h2>
		</div>
	);
};

export default NavTop;
