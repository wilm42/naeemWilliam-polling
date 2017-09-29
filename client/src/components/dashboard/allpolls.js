import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

export class AllPolls extends React.Component {
	constructor() {
		super();
		this.state = {
			polls: ["no polls yet, create your first one!"],
		};
	}

	componentWillMount() {
		this.props.auth.onAuthStateChanged(user => {
			if (user) {
				const polls = this.props.db.ref(`/polls/${user.uid}`);
				polls.on("value", snap => {
					this.setState({ polls: snap.val() });
				});
			}
		});
	}

	selectPoll(e) {
		e.preventDefault();
		this.props.dispatch(actions.selectPoll(e.target.value));
		console.log(e.target.value);
	}

	render() {
		console.log(this.state.polls);
		return (
			<div className="allPolls-container">
				<h2 className="sectionTitle allPolls"> All Polls </h2>
				{/* <div className="section allPolls">
					<ul>{allPolls}</ul>
				</div> */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		db: state.db,
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(AllPolls);
