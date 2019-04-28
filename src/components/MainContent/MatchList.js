import React from 'react';
import Match from './Match';

class MatchList extends React.Component {
	constructor({ leagueid, isSignedIn, onChange }) {
		super();
		this.state = {
			error: null,
			isLoaded: false,
			fixtures: [],
			live: [],
			leagueid: leagueid,
			date: '',
			isSignedIn: isSignedIn,
			onChange: onChange
		};
	}

	async componentDidMount() {
		try {
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear();

			today = yyyy + '-' + mm + '-' + dd;
			this.setState({ date: today });

			if (!this.state.leagueid) {
				fetch(`http://localhost:3000/arsenal`).then((res) => res.json()).then((json) => {
					this.setState({ live: json.data.data.match });
				});
			} else {
				fetch(`http://localhost:3000/arsenalFixtures/${this.state.leagueid}`)
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							isLoaded: true,
							fixtures: json.data.data.fixtures
						});
					});

				fetch(`http://localhost:3000/arsenalLive/${this.state.leagueid}`)
					.then((res) => res.json())
					.then((json) => {
						this.setState({ live: json.data.data.match });
					});
			}

			/*setInterval(async () => {
				fetch(
					`http://livescore-api.com/api-client/scores/live.json?key=8uoqtmuaQ1s4bRe4&secret=M2baUvmhpyZunhzvLYVekqpbrRgCJuHv&league=${this
						.state.leagueid}`
				)
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							isLoaded: true,
							items: json.data.match
						});
					});
			}, 60000);*/
		} catch (e) {
			console.log(e);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.leagueid !== this.state.leagueid) {
			this.setState({ isLoaded: false });

			if (!nextProps.leagueid) {
				fetch(`http://localhost:3000/arsenal`).then((res) => res.json()).then((json) => {
					this.setState({ isLoaded: true, live: json.data.data.match });
				});
			} else {
				fetch(`http://localhost:3000/arsenalFixtures/${nextProps.leagueid}`)
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							isLoaded: true,
							fixtures: json.data.data.fixtures
						});
					});

				fetch(`http://localhost:3000/arsenalLive/${nextProps.leagueid}`)
					.then((res) => res.json())
					.then((json) => {
						this.setState({ live: json.data.data.match });
					});
			}
		}
	}

	render() {
		var { isLoaded, fixtures, live, date, isSignedIn, onChange } = this.state;
		if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
					<h1>Live Games</h1>
					<div className="fixture-list">
						{live.map((fixture, i) => {
							return (
								<Match
									key={i}
									id={live[i].id}
									league_name={live[i].league_name}
									league_id={live[i].league_id}
									homeT={live[i].home_name}
									awayT={live[i].away_name}
									score={live[i].score}
									time={live[i].time}
									isSignedIn={isSignedIn}
									onChange={onChange}
								/>
							);
						})}
					</div>
					<h1>Upcoming Fixtures</h1>
					<div className="fixture-list">
						{fixtures.map((fixture, i) => {
							if (fixtures[i].date === date) {
								return (
									<Match
										key={fixtures[i].id}
										homeT={fixtures[i].home_name}
										awayT={fixtures[i].away_name}
										score="v"
										time={fixtures[i].time.slice(0, -3)}
										isSignedIn={isSignedIn}
									/>
								);
							}
						})}
					</div>
				</div>
			);
		}
	}
}

export default MatchList;
