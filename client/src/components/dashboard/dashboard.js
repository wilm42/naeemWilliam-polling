import React from "react";
import AllPolls from "./allpolls";
import SelectedPoll from "./selectedPoll";
import { connect } from "react-redux";

import "../../styles/dashboard.css";

export class Dashboard extends React.Component {
	componentWillMount() {
		this.props.auth.onAuthStateChanged(user => {
			if (!user) {
				this.props.history.push("/landing");
			}
		});
	}

	render() {
		return (
			<div className="dashboard grid">
				<AllPolls selectedPoll={this.props.selectedPoll} />
				<SelectedPoll selectedPoll={this.props.selectedPoll} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
