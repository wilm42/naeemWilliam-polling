import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import "../../styles/allpolls.css";

export class AllPolls extends React.Component {
	constructor() {
		super();
		this.state = {
			firebase: false,
			polls: {
				newUser: {
					title: "Create a poll",
				},
			},
		};
	}

	componentDidMount() {
		this.props.auth.onAuthStateChanged(user => {
			if (user) {
				this.user = user;
				const polls = this.props.db.ref(`/polls/${user.uid}`);
				polls.on("value", snap => {
					if (snap.val()) {
						let set = { polls: snap.val() };
						set.firstPoll = Object.keys(snap.val())[0];
						if (!this.state.selected) {
							set.selected = set.firstPoll;
						}
						set.firebase = true;
						this.setState(set);
					}
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
		if (pollId === "newUser") {
			this.props.history.push("/create");
		}
		if (this.user) {
			this.setState({ selected: pollId });
		}
		this.props.dispatch(actions.toggle_dash_view());
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
			<div className={this.props.dashToggle ? "hide allPolls" : "allPolls"}>
				<h2 className="allPolls"> My Polls </h2>
				<ul className="allPolls">{polls}</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		db: state.db,
		auth: state.auth,
		selectedPoll: state.selectedPoll,
		dashToggle: state.dashToggle,
	};
};

export default connect(mapStateToProps)(AllPolls);
