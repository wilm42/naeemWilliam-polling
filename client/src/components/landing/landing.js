import React from "react";
import { connect } from "react-redux";

import * as actions from "../../actions/";

class Landing extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
		};
	}

	componentDidMount() {
		this.props.auth.onAuthStateChanged(user => {
			if (user) {
				this.props.dispatch(actions.user_validated(user));
				if (user) {
					this.props.history.push("/");
				}
			}
		});
	}

	handleInput(e) {
		this.setState({
			[e.target.id]: e.target.value,
		});
	}

	logIn(e) {
		e.preventDefault();
		this.props.auth.signInWithEmailAndPassword(
			this.state.email,
			this.state.password,
		);
	}

	signUp(e) {
		e.preventDefault();
		this.props.auth.createUserWithEmailAndPassword(
			this.state.email,
			this.state.password,
		);
	}

	render() {
		return (
			<div className="landing">
				<h1>Hi, Welcome to Pollster!</h1>
				<h2>Log in or Sign up to start creating polls</h2>
				<form>
					<div>
						<label htmlFor="email">email</label>
						<input
							id="email"
							type="email"
							onChange={e => this.handleInput(e)}
							value={this.state.email}
						/>
					</div>
					<div>
						<label htmlFor="password">password</label>
						<input
							id="password"
							type="password"
							onChange={e => this.handleInput(e)}
							value={this.state.password}
						/>
					</div>
				</form>
				<div>
					<button type="submit" onClick={e => this.logIn(e)}>
						Log In
					</button>
					<button type="submit" onClick={e => this.signUp(e)}>
						Sign Up
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps)(Landing);
