import React from 'react';
import './Main.css';

const Comment = () => {
	return (
		<div className="comment">
			<div className="user-comment-info">
				<p>
					Ryan <span className="entries">112</span>
				</p>
			</div>
			<div className="comment-content">
				<p>Goallllaassssoooooo!!!!!</p>
			</div>
		</div>
	);
};

export default Comment;
