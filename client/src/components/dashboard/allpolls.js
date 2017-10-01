import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

export class AllPolls extends React.Component {
	constructor() {
		super();
		this.state = {
			firebase: false,
			polls: ["no polls yet, create your first one!"],
		};
	}

	componentDidMount() {
		this.props.auth.onAuthStateChanged(user => {
			if (user) {
				console.log("in the auth block");
				this.user = user;
				const polls = this.props.db.ref(`/polls/${user.uid}`);
				polls.on("value", snap => {
					let set = { polls: snap.val() };
					set.firstPoll = Object.keys(snap.val())[0];
					if (!this.state.selected) {
						set.selected = set.firstPoll;
					}
					set.firebase = true;
					this.setState(set);
				});
			}
		});
	}

	componentDidUpdate() {
		if (this.state.selected && this.state.firebase) {
			this.props.dispatch(
				actions.selectPoll(this.state.selected, this.user.uid),
			);
		}
	}

	selectPoll(pollId) {
		if (this.user) {
			this.setState({ selected: pollId });
		}
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
