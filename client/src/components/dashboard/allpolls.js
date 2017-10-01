import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

export class AllPolls extends React.Component {
	constructor() {
		super();
		this.state = {
			isMounted: false,
			polls: ["no polls yet, create your first one!"],
		};
	}

	componentDidMount() {
		let firstPoll;
		this.props.auth.onAuthStateChanged(user => {
			if (user) {
				user = user;
				const polls = this.props.db.ref(`/polls/${user.uid}`);
				polls.on("value", snap => {
					let set = { polls: snap.val() };
					firstPoll = Object.keys(snap.val())[0];
					set.selected = firstPoll;
					this.setState(set);
				});
			}
		});
		this.selectPoll(firstPoll);
	}

	selectPoll(pollId) {
		this.setState({
			selected: pollId,
		});
		this.props.dispatch(
			actions.selectPoll(pollId, this.props.auth.currentUser.uid),
		);
	}

	render() {
		let polls = [];
		for (let poll in this.state.polls) {
			let title = this.state.polls[poll].title;
			let key = poll;
			polls.push(
				<li
					key={key}
					className={key === this.state.selected ? "selected" : null}>
					<button
						value={key}
						onClick={e => {
							e.preventDefault();
							this.selectPoll(e.target.value);
						}}>
						{title}
					</button>
				</li>,
			);
		}
		return (
			<div className="allPolls-container">
				<h2 className="sectionTitle allPolls"> All Polls </h2>
				<div className="section allPolls">
					<ul>{polls}</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		db: state.db,
		auth: state.auth,
		selectedPoll: state.selectedPoll,
	};
};

export default connect(mapStateToProps)(AllPolls);
