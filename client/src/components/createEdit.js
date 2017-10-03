import React from "react";
import { connect } from "react-redux";

import "../styles/createPoll.css";

export class CreateEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: {
				author: null,
				title: "",
				question: "",
			},
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
				info: { ...this.state.info, author: user.uid },
			});
		});
	}

	handleOnChange(e) {
		this.setState({
			info: { ...this.state.info, [e.target.id]: e.target.value },
		});
	}

	handleChoiceChange(index, set) {
		let updated = [...this.state.choices];
		updated[index].choice = set;
		this.setState({ choices: updated });
	}

	compileAndPost(e) {
		e.preventDefault();
		let ref = this.props.db.ref(`/polls/${this.state.info.author}`);
		const newPoll = {
			...this.state.info,
			createdDate: new Date().toDateString(),
		};
		const pollKey = ref.push(newPoll).key;
		ref = this.props.db.ref(
			`/polls/${this.state.info.author}/${pollKey}/choices`,
		);
		this.state.choices.forEach(choice => {
			ref.push(choice);
		});
		this.props.history.push("/");
	}

	render() {
		return (
			<div>
				<label htmlFor="createEdit">
					<h2> Create a New Poll </h2>
				</label>
				<form id="createEdit">
					<div className="title-input">
						<label htmlFor="title">
							<h3>Poll Title</h3>
							<input
								type="text"
								id="title"
								placeholder="Vacation"
								value={this.state.title}
								onChange={e => this.handleOnChange(e)}
							/>
						</label>
					</div>
					<div className="section container create">
						<label htmlFor="question">
							<h3>Question</h3>

							<input
								type="text"
								id="question"
								placeholder="Where should I go on vacation this year?"
								value={this.state.text}
								onChange={e => this.handleOnChange(e)}
							/>
						</label>
						<ul className="choices">
							<li className="choiceInput">
								<label htmlFor="choice">
									<h3>First Choice</h3>
									<input
										type="text"
										id="choice-0"
										placeholder="Miami"
										value={this.state.choices[0].choice}
										onChange={e => this.handleChoiceChange(0, e.target.value)}
									/>
								</label>
							</li>
							<li className="choiceInput">
								<label htmlFor="choice">
									<h3>Second Choice</h3>
									<input
										type="text"
										id="choice-1"
										placeholder="Tokyo"
										value={this.state.choices[1].choice}
										onChange={e => this.handleChoiceChange(1, e.target.value)}
									/>
								</label>
							</li>
							<li className="choiceInput">
								<label htmlFor="choice">
									<h3>Third Choice</h3>
									<input
										type="text"
										id="choice-2"
										placeholder="Southern California"
										value={this.state.choices[2].choice}
										onChange={e => this.handleChoiceChange(2, e.target.value)}
									/>
								</label>
							</li>
							<li className="choiceInput">
								<label htmlFor="choice">
									<h3>Fourth Choice</h3>
									<input
										type="text"
										id="choice-3"
										placeholder="India"
										value={this.state.choices[3].choice}
										onChange={e => this.handleChoiceChange(3, e.target.value)}
									/>
								</label>
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
