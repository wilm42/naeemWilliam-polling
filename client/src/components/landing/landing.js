import React from "react";
import { connect } from "react-redux";

import Buttons from "./buttons";

import * as actions from "../../actions/";

import "../../styles/landing.css";

class Landing extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			logIn: true,
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
				<div className="form-container">
					<header>
						<h2>Create awesome polls.</h2>
						<h2>Watch the results in real time.</h2>
					</header>
					<form>
						<div>
							<label htmlFor="email">email</label>
							<input
								id="email"
								type="email"
								onChange={e => this.handleInput(e)}
								value={this.state.email}
								placeholder="you@gmail.com"
							/>
						</div>
						<div>
							<label htmlFor="password">password</label>
							<input
								id="password"
								type="password"
								onChange={e => this.handleInput(e)}
								value={this.state.password}
								placeholder="your password"
							/>
						</div>
						<div className="demoUser">
							Demo user: demo@email.com / password123
						</div>
					</form>
					<Buttons logIn={e => this.logIn(e)} signUp={e => this.signUp(e)} />
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
