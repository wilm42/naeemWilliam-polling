import React from "react";

export default class Buttons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			logIn: true,
		};
	}

	handleClick(e) {
		if (e.target.className === "primary") {
			if (e.target.id === "logIn") {
				this.props.logIn(e);
			} else if (e.target.id === "signUp") {
				this.props.signUp(e);
			}
		} else if (e.target.className === "secondary") {
			this.setState({
				logIn: !this.state.logIn,
			});
		}
	}

	render() {
		return (
			<div className="buttons">
				<button
					id="logIn"
					className={this.state.logIn ? "primary" : "secondary"}
					type="submit"
					onClick={e => this.handleClick(e)}>
					Log In
				</button>
				<button
					id="signUp"
					className={this.state.logIn ? "secondary" : "primary"}
					type="submit"
					onClick={e => this.handleClick(e)}>
					Sign Up
				</button>
			</div>
		);
	}
}
