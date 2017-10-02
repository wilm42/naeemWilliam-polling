import React from "react";
import AllPolls from "./allpolls";
import SelectedPoll from "./selectedPoll";
import { connect } from "react-redux";

import '../../styles/dashboard.css';

export class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			user: null,
		};
	}
	componentWillMount() {
		this.props.auth.onAuthStateChanged(user => {
			if (!user) {
				this.props.history.push("/landing");
			}
		});
	}

	render() {
		return (
			<div className="container dashboard">
				<AllPolls />
				<SelectedPoll />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
