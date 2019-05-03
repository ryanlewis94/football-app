import React from 'react';
import socketIOClient from 'socket.io-client';
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

	send = () => {
		const socket = socketIOClient('http://localhost:3000');
	};

	async componentDidMount() {
		try {
			const socket = socketIOClient('http://localhost:3000');
			socket.on('comment', (data) => {
				console.log(data);
				this.setState({ isLoaded: true, comments: data });
			});

			fetch(`https://fc-football-server.herokuapp.com/arsenal`).then((res) => res.json()).then((json) => {
				const filterArray = json.data.data.match.filter((fixture) => {
					return fixture.id === this.props.id;
				});
				this.setState({ live: filterArray[0] });
			});

			this.interval = setInterval(async () => {
				fetch(`https://fc-football-server.herokuapp.com/arsenal`).then((res) => res.json()).then((json) => {
					const filterArray = json.data.data.match.filter((fixture) => {
						return fixture.id === this.props.id;
					});
					this.setState({ live: filterArray[0] });
				});
			}, 30000);

			/*this.interval2 = setInterval(async () => {
				fetch(`https://fc-football-server.herokuapp.com/getComment/${this.props.id}`)
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							isLoaded: true,
							comments: json
						});
					});
			}, 1000);*/
		} catch (e) {
			console.log(e);
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		clearInterval(this.interval2);
	}

	onCommentChange = (event) => {
		this.setState({ comment: event.target.value });
	};

	onSubmitComment = (event) => {
		event.preventDefault();
		if (this.state.comment) {
			const socket = socketIOClient('http://localhost:3000');
			socket.emit('comment', [
				{
					user: this.props.user.name,
					time: this.state.live.time,
					message: this.state.comment
				}
			]);
			/*fetch('https://fc-football-server.herokuapp.com/comment', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: {
					comment: this.state.comment,
					userid: this.props.user.id,
					matchid: this.props.id
				}
			});*/

			fetch('https://fc-football-server.herokuapp.com/entries', {
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
									name={comments[i].user}
									time={comments[i].time}
									comment={comments[i].message}
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
