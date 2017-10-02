import React from "react";
import Nav from "./nav";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "../styles/header.css";

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			showNav: false,
		};
	}

	componentDidMount() {
		this.props.auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({ showNav: true });
			} else {
				this.setState({ showNav: false });
			}
		});
	}

	render() {
		let nav;
		if (this.state.showNav) {
			nav = <Nav />;
		}
		return (
			<header className="container">
				<Link to="/">
					<span className="logo">
						<img src="/images/pollicon.svg" alt=" " />
						<span className="logoText">Pollster</span>
					</span>
				</Link>
				{nav}
			</header>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Header);
