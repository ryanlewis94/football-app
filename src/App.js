import React, { Component } from 'react';
import NavTop from './components/Navigation/NavigationTop';
import NavSide from './components/Navigation/NavigationSide';
import Signin from './components/MainContent/Signin';
import Register from './components/MainContent/Register';
import MatchList from './components/MainContent/MatchList';
import MatchRoom from './components/MainContent/MatchRoom';
import './App.css';
import './components/MainContent/Main.css';

const initialState = {
	route: 'match',
	league: 'Select a League from the Menu',
	leagueid: 'aaa',
	isSignedIn: false,
	id: '',
	user: {
		id: '',
		name: '',
		email: '',
		password: '',
		entries: 0,
		joined: ''
	}
};
class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				password: data.password,
				entries: data.entries,
				joined: data.joined
			}
		});
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState);
		} else if (route === 'login') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	onLeagueChange = (league, leagueid) => {
		this.setState({
			league: league,
			leagueid: leagueid
		});
	};

	onMatchChoice = (id) => {
		this.setState({
			id: id
		});
	};

	onChange = (route, league, leagueid, id) => {
		this.onRouteChange(route);
		this.onLeagueChange(league, leagueid);
		this.onMatchChoice(id);
	};

	render() {
		const { route, isSignedIn, league, leagueid, id, user } = this.state;
		return (
			<div className="container">
				<NavSide isSignedIn={isSignedIn} onChange={this.onChange} user={user} />
				<div className="inner-container">
					<NavTop league={league} />
					<div className="main-content">
						{route === 'match' || route === 'login' ? (
							<MatchList leagueid={leagueid} isSignedIn={isSignedIn} onChange={this.onChange} />
						) : route === 'signin' || route === 'signout' ? (
							<Signin loadUser={this.loadUser} onChange={this.onChange} />
						) : route === 'register' ? (
							<Register loadUser={this.loadUser} onChange={this.onChange} />
						) : (
							<MatchRoom
								onChange={this.onChange}
								league={league}
								leagueid={leagueid}
								id={id}
								user={user}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
