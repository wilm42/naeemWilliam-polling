import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Results from "./results";

import "../../styles/selectedPoll.css";

export class SelectedPoll extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			poll: {
				title: "New User",
				question: "Nothing to see here",
				createdDate: "Tue Oct 3, 2017",
				choices: {
					newuser: {
						choice: "What are you waiting for? Make your first poll!",
						votes: {
							placeHolder: {
								placeHolder: true,
							},
						},
					},
				},
			},
		};
	}

	componentWillMount() {
		if (this.props.selectedPoll) {
			const poll = this.props.db.ref(`/polls/${this.props.selectedPoll}`);
			poll.on("value", snap => {
				if (snap) {
					this.setState({
						poll: snap.val(),
						pollId: this.props.selectedPoll,
					});
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		const poll = nextProps.db.ref(`/polls/${nextProps.selectedPoll}`);
		poll.on("value", snap => {
			if (snap) {
				this.setState({
					poll: snap.val(),
					pollId: nextProps.selectedPoll,
				});
			}
		});
	}

	setCount(count) {
		this.setState({
			count: count,
		});
	}

	countVotes(choices) {
		let total = 0;
		choices.forEach(choice => {
			total += choice.vote;
		});
		return total;
	}

	render() {
		const { poll, count } = this.state;
		return (
			<div
				className={
					this.props.dashToggle
						? "selectedPoll parent"
						: "hide selectedPoll parent"
				}>
				<h2 className="sectionTitle selectedPoll">{poll.title}</h2>

				<div className="section selectedPoll grid">
					<div className="selectedPoll-header grid">
						<h3> {poll.question} </h3>
						<span className="pollInfo container">
							poll created: {poll.createdDate} | total votes: {count}
						</span>
					</div>

					<Results
						choices={poll.choices}
						setCount={count => this.setCount(count)}
					/>

					<div className="link container">
						<Link to={`/poll${this.state.pollId}`}>Link to your poll</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		db: state.db,
		selectedPoll: state.selectedPoll,
		dashToggle: state.dashToggle,
	};
};

export default connect(mapStateToProps)(SelectedPoll);
