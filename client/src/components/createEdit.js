import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

export class CreateEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			author: null,
			title: "",
			text: "",
			choices: [
				{
					choice: "",
				},
				{
					choice: "",
				},
				{
					choice: "",
				},
				{
					choice: "",
				},
			],
		};
	}

	componentWillMount() {
		this.props.auth.onAuthStateChanged(user => {
			this.setState({
				author: user.uid,
			});
		});
	}

	handleOnChange(set) {
		this.setState(set);
	}

	handleChoiceChange(index, set) {
		let updated = [...this.state.choices];
		updated[index].choice = set;
		this.setState({ choices: updated });
	}

	handleRecipientChange(index, set) {
		let updated = { ...this.state.recipients };
		updated[index].email = set;
		this.setState({ recipients: updated });
	}

	compileAndPost(e) {
		e.preventDefault();
		const ref = this.props.db.ref(`/polls/${this.state.author}`);
		ref.push(this.state);
		this.props.history.push("/");
	}

	render() {
		return (
			<div>
				<label htmlFor="createEdit">
					<h2> Create / Edit Poll </h2>
				</label>
				<form id="createEdit">
					<label htmlFor="title">
						<h3>Title</h3>
					</label>
					<input
						type="text"
						id="title"
						placeholder="Enter Poll Title Here..."
						value={this.state.title}
						onChange={e => this.handleOnChange({ title: e.target.value })}
					/>
					<div className="section container create">
						<label htmlFor="Question">
							<h3>Question</h3>
						</label>
						<input
							type="text"
							id="question"
							placeholder="Enter Question Here..."
							value={this.state.text}
							onChange={e => this.handleOnChange({ text: e.target.value })}
						/>
						<label htmlFor="choice">
							<h3>Answer choices</h3>
						</label>
						<ul className="choices">
							<li className="choiceInput">
								<input
									type="text"
									id="choice-0"
									placeholder="Enter an answer choice..."
									value={this.state.choices[0].choice}
									onChange={e => this.handleChoiceChange(0, e.target.value)}
								/>
							</li>
							<li className="choiceInput">
								<input
									type="text"
									id="choice-1"
									placeholder="Enter an answer choice..."
									value={this.state.choices[1].choice}
									onChange={e => this.handleChoiceChange(1, e.target.value)}
								/>
							</li>
							<li className="choiceInput">
								<input
									type="text"
									id="choice-2"
									placeholder="Enter an answer choice..."
									value={this.state.choices[2].choice}
									onChange={e => this.handleChoiceChange(2, e.target.value)}
								/>
							</li>
							<li className="choiceInput">
								<input
									type="text"
									id="choice-3"
									placeholder="Enter an answer choice..."
									value={this.state.choices[3].choice}
									onChange={e => this.handleChoiceChange(3, e.target.value)}
								/>
							</li>
						</ul>
						<button id="submitPoll" onClick={e => this.compileAndPost(e)}>
							Save Poll
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	db: state.db,
	auth: state.auth,
});

export default connect(mapStateToProps)(CreateEdit);
