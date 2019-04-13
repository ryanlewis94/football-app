import React from 'react';
import './Main.css';

const Match = ({ id, league_name, league_id, homeT, awayT, time, score, isSignedIn, onChange }) => {
	if (isSignedIn) {
		return (
			<div
				className="match-card grow paper"
				onClick={() => onChange('matchRoom', league_name, league_id, id, homeT, awayT, score, time)}
			>
				<div className="match-teams">
					<div className="HomeTeam">
						<p>{homeT}</p>
					</div>
					<div className="score">
						<p>{score}</p>
					</div>
					<div className="AwayTeam">
						<p>{awayT}</p>
					</div>
				</div>

				<div className="match-time">
					<p className="status">{time}</p>
					<p className="match-id">{id}</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className="match-card grow paper">
				<div className="match-teams">
					<div className="HomeTeam">
						<p>{homeT}</p>
					</div>
					<div className="score">
						<p>{score}</p>
					</div>
					<div className="AwayTeam">
						<p>{awayT}</p>
					</div>
				</div>

				<div className="match-time">
					<p className="status">{time}</p>
				</div>
			</div>
		);
	}
};

export default Match;
