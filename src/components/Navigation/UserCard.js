import React from 'react';
import './userCard.css';

const userCard = ({ user }) => {
	return <p className="userCard">{user.name}</p>;
};

export default userCard;
