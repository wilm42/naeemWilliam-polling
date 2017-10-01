import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Results from "./results";

export class SelectedPoll extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			poll: {
				title: "null",
				question: "null",
				choices: {},
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
		//console.log('THIS IS CHOICES ====>',choices);
		let total = 0;
		choices.forEach(choice => {
			total += choice.vote;
		});
		return total;
	}

	render() {
		console.log(this.state);
		const { poll, count } = this.state;
		return (
			<div className="section-container">
				<h2 className="sectionTitle selectedPoll">{poll.title}</h2>
				<div className="section selectedPoll">
					<div className="selectedPoll-header">
						<h3> {poll.question} </h3>
						<span className="pollInfo">
							poll created: {poll.createdDate} | total votes: {count}
						</span>
					</div>
					<div className="bottomHalf">
						<Results
							choices={poll.choices}
							setCount={count => this.setCount(count)}
						/>
					</div>
					<div className="link">
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
	};
};

export default connect(mapStateToProps)(SelectedPoll);
