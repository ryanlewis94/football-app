import React from 'react';
import Comment from './Comment';
import './Main.css';

class MatchRoom extends React.Component {
	constructor(props) {
		super();
		this.state = {
			live: {},
			comments: [],
			isLoaded: false,
			comment: ''
		};
	}

	async componentDidMount() {
		try {
			fetch(`http://localhost:3000/arsenal`).then((res) => res.json()).then((json) => {
				const filterArray = json.data.data.match.filter((fixture) => {
					return fixture.id === this.props.id;
				});
				this.setState({ live: filterArray[0] });
			});

			this.interval = setInterval(async () => {
				fetch(`http://localhost:3000/arsenal`).then((res) => res.json()).then((json) => {
					const filterArray = json.data.data.match.filter((fixture) => {
						return fixture.id === this.props.id;
					});
					this.setState({ live: filterArray[0] });
				});
			}, 30000);

			this.interval = setInterval(async () => {
				fetch(`http://localhost:3000/getComment/${this.props.id}`).then((res) => res.json()).then((json) => {
					this.setState({
						isLoaded: true,
						comments: json
					});
				});
			}, 1000);
		} catch (e) {
			console.log(e);
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onCommentChange = (event) => {
		this.setState({ comment: event.target.value });
	};

	onSubmitComment = (event) => {
		event.preventDefault();
		if (this.state.comment) {
			fetch('http://localhost:3000/comment', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					comment: this.state.comment,
					userid: this.props.user.id,
					matchid: this.props.id
				})
			});

			fetch('http://localhost:3000/entries', {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: this.props.user.id
				})
			});
			/*.then((response) => response.json())
				.then((count) => {
					this.props.updateUserEntries(count);
				});*/

			document.getElementById('comment-form').reset();
			this.setState({
				comment: ''
			});
		}
	};

	render() {
		var { comments, live } = this.state;
		return (
			<div className="match-room">
				<div
					className="backBtn"
					onClick={() => this.props.onChange('match', this.props.league, this.props.leagueid)}
				>
					Back
				</div>
				<div className="score-board">
					<div className="HomeTeam">
						<p>{live.home_name}</p>
					</div>
					<div className="score">
						<p>{live.score}</p>
					</div>
					<div className="AwayTeam">
						<p>{live.away_name}</p>
					</div>
				</div>
				<p>{live.time}</p>
				<div>
					<div className="comments-area paper">
						{comments.map((comment, i) => {
							return (
								<Comment
									key={i}
									name={comments[i].name}
									entries={comments[i].entries}
									comment={comments[i].comment}
								/>
							);
						})}
					</div>
					<br />
					<br />
					<form id="comment-form">
						<label>Comment Here: </label>
						<input onChange={this.onCommentChange} id="mainInput" />
						<input onClick={this.onSubmitComment} type="submit" value="Enter" />
						<button>Mic</button>
					</form>
				</div>
			</div>
		);
	}
}

export default MatchRoom;
