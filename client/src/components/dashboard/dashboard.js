import React from "react";
import AllPolls from "./allpolls";
import SelectedPoll from "./selectedPoll";
import { connect } from "react-redux";
import * as actions from "../../actions";

export class Dashboard extends React.Component {
	componentDidMount() {
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

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
