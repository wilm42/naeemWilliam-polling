import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Nav extends React.Component {
	signOut() {
		this.props.auth.signOut();
	}

	render() {
		return (
			<nav className="container">
				<Link to="/create">+ Create New Poll </Link>
				<button type="signOut" id="signOut" onClick={() => this.signOut()}>
					Sign Out
				</button>
			</nav>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Nav);
