import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../actions/";

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: false,
		};
	}

	signOut() {
		this.menu();
		this.props.auth.signOut();
	}

	showMyPolls() {
		this.props.dispatch(actions.toggle_dash_view());
		this.menu();
	}

	menu() {
		this.setState({
			menu: !this.state.menu,
		});
	}

	render() {
		return (
			<div className="nav-container">
				<button className="showNav" onClick={() => this.menu()}>
					<div />
					<div />
					<div />
				</button>
				<nav className={this.state.menu ? "show container" : "container"}>
					<button className="myPolls" onClick={() => this.showMyPolls()}>
						<Link to="/">My Polls</Link>
					</button>
					<Link to="/create" onClick={() => this.menu()}>
						+ Create New Poll{" "}
					</Link>
					<button type="signOut" id="signOut" onClick={() => this.signOut()}>
						Sign Out
					</button>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Nav);
