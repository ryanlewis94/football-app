import React from 'react';
import './userCard.css';

const userCard = ({ user }) => {
	console.log(user);
	return (
		<p className="userCard">
			#1 {user.name} <span className="entries">{user.entries}</span>
		</p>
	);
};

export default userCard;
