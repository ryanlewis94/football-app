import React from 'react';
import Comment from './Comment';
import './Main.css';

class MatchRoom extends React.Component {
	constructor(props) {
		super();
		this.state = { live: {} };
	}

	async componentDidMount() {
		try {
			fetch(
				`http://livescore-api.com/api-client/scores/live.json?key=8uoqtmuaQ1s4bRe4&secret=M2baUvmhpyZunhzvLYVekqpbrRgCJuHv`
			)
				.then((res) => res.json())
				.then((json) => {
					const filterArray = json.data.match.filter((fixture) => {
						return fixture.id === this.props.id;
					});
					this.setState({ live: filterArray[0] });
				});

			setInterval(async () => {
				fetch(
					`http://livescore-api.com/api-client/scores/live.json?key=8uoqtmuaQ1s4bRe4&secret=M2baUvmhpyZunhzvLYVekqpbrRgCJuHv`
				)
					.then((res) => res.json())
					.then((json) => {
						const filterArray = json.data.match.filter((fixture) => {
							return fixture.id === this.props.id;
						});
						this.setState({ live: filterArray[0] });
					});
			}, 30000);
		} catch (e) {
			console.log(e);
		}
	}

	render() {
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
						<p>{this.state.live.home_name}</p>
					</div>
					<div className="score">
						<p>{this.state.live.score}</p>
					</div>
					<div className="AwayTeam">
						<p>{this.state.live.away_name}</p>
					</div>
				</div>
				<p>{this.state.live.time}</p>
				<div>
					<div className="comments-area paper">
						<Comment />
					</div>
					<br />
					<br />
					<label>Comment Here: </label>
					<input />
					<button>Enter</button>
					<button>Mic</button>
				</div>
			</div>
		);
	}
}

export default MatchRoom;
