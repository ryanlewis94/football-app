import React from 'react';
import UserCard from './UserCard';
import './Nav.css';

const NavSide = ({ onChange, isSignedIn, user }) => {
	if (isSignedIn) {
		return (
			<div className="nav-side carbon-fibre dark-shadow">
				<h1 className="logo pointer">FC</h1>
				<UserCard user={user} />
				<div className="logReg">
					<div onClick={() => onChange('signout')}>Logout</div>
				</div>
				<div className="menu">
					<h1 className="space">LEAGUES</h1>
					<div className="league space">
						<div className="eng" onClick={() => onChange('match', 'Premier League', '25')}>
							<p>Premier League</p>
						</div>
						<div className="spain" onClick={() => onChange('match', 'La Liga', '74')}>
							<p>La Liga</p>
						</div>
						<div className="italy" onClick={() => onChange('match', 'Serie A', '73')}>
							<p>Serie A</p>
						</div>
						<div className="germ" onClick={() => onChange('match', 'Bundesliga', '114')}>
							<p>Bundesliga</p>
						</div>
						<div className="france" onClick={() => onChange('match', 'Ligue 1', '46')}>
							<p>Ligue 1</p>
						</div>
						<div className="neth" onClick={() => onChange('match', 'Eredivisie', '47')}>
							<p>Eredivisie</p>
						</div>
						<div className="port" onClick={() => onChange('match', 'Liga Nos', '49')}>
							<p>Liga Nos</p>
						</div>
						<div className="eur" onClick={() => onChange('match', 'Champions League', '513')}>
							<p>Champions League</p>
						</div>
						<div className="europa" onClick={() => onChange('match', 'Europa League', '515')}>
							<p>Europa League</p>
						</div>
					</div>
				</div>
				<div className="social-icons">Socials</div>
			</div>
		);
	} else {
		return (
			<div className="nav-side carbon-fibre dark-shadow">
				<h1 className="logo pointer">FC</h1>
				<div className="logReg">
					<div onClick={() => onChange('signin')}>Login</div>
					<div onClick={() => onChange('register')}>Register</div>
				</div>
				<div className="menu">
					<p>login to commentate on a game!</p>
					<h1 className="space">LEAGUES</h1>
					<div className="league space">
						<div className="eng" onClick={() => onChange('match', 'Premier League', '25')}>
							<p>Premier League</p>
						</div>
						<div className="spain" onClick={() => onChange('match', 'La Liga', '74')}>
							<p>La Liga</p>
						</div>
						<div className="italy" onClick={() => onChange('match', 'Serie A', '73')}>
							<p>Serie A</p>
						</div>
						<div className="germ" onClick={() => onChange('match', 'Bundesliga', '114')}>
							<p>Bundesliga</p>
						</div>
						<div className="france" onClick={() => onChange('match', 'Ligue 1', '46')}>
							<p>Ligue 1</p>
						</div>
						<div className="neth" onClick={() => onChange('match', 'Eredivisie', '47')}>
							<p>Eredivisie</p>
						</div>
						<div className="port" onClick={() => onChange('match', 'Liga Nos', '49')}>
							<p>Liga Nos</p>
						</div>
						<div className="eur" onClick={() => onChange('match', 'Champions League', '513')}>
							<p>Champions League</p>
						</div>
						<div className="europa" onClick={() => onChange('match', 'Europa League', '515')}>
							<p>Europa League</p>
						</div>
					</div>
				</div>
				<div className="social-icons">Socials</div>
			</div>
		);
	}
};

export default NavSide;
