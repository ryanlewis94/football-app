import React from 'react';
import './Main.css';

const Comment = ({ name, time, comment }) => {
	return (
		<div className="comment">
			<div className="user-comment-info">
				<p>
					{name} <span className="entries">{time}</span>
				</p>
			</div>
			<div className="comment-content">
				<p>{comment}</p>
			</div>
		</div>
	);
};

export default Comment;
