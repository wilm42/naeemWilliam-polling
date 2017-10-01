import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../actions";

import Results from "./dashboard/results";

export class Poll extends React.Component {
	constructor() {
		super();
		this.state = {
			selected: null,
			feedback: false,
			poll: {
				title: "",
				choices: {},
				text: "",
			},
		};
	}

	componentWillMount(nextProps) {
		const { params } = this.props.match;
		const poll = this.props.db.ref(
			`/polls/${params.authorId}/${params.pollId}`,
		);
		poll.on("value", snap => {
			this.setState({
				poll: snap.val(),
			});
		});
	}

	makeSelection(value) {
		this.setState({
			selected: value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { params } = this.props.match;
		const votes = this.props.db.ref(
			`/polls/${params.authorId}/${params.pollId}/choices/${this.state
				.selected}/votes`,
		);
		votes.push({
			meta: {
				date: new Date().toString(),
			},
		});
		this.setState({
			feedback: true,
		});
	}

	render() {
		const results = <Results choices={this.state.choices} />;
		let value;
		let choices = [];
		for (let choice in this.state.poll.choices) {
			choices.push(
				<div key={choice} className="radio-div">
					{" "}
					<input
						type="radio"
						name="pollChoice"
						value={choice}
						id={`button-${choice}`}
						onClick={e => this.makeSelection(e.target.value)}
					/>{" "}
					<label htmlFor={`button-${choice}`}>
						<div className="radio-circle" />
						{this.state.poll.choices[choice].choice}
					</label>
				</div>,
			);
		}
		return (
			<div>
				<h2 className="title"> {this.state.poll.title} </h2>
				<div className="section poll">
					<h3 className="question"> {this.state.poll.question} </h3>
					<form>
						{choices}
						<button type="submit" onClick={e => this.handleSubmit(e)}>
							Cast Vote
						</button>
					</form>
				</div>
				<div
					className={
						this.state.feedback ? "feedbackModal show" : "feedbackModal"
					}>
					<h2 className="feedback">Thanks for your input!</h2>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	db: state.db,
});

export default connect(mapStateToProps)(Poll);
