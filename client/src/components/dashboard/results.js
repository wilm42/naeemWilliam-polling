import React from "react";

export default class Results extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			choices: {},
			results: [],
			total: 0,
		};
	}

	componentWillMount() {
		if (this.props.choices) {
			this.formatResults(this.props.choices);
		}
	}

	componentWillReceiveProps(props) {
		if (this.props.choices !== props.choices) {
			this.formatResults(props.choices);
		}
	}

	formatResults(choices) {
		let results = [];
		let total = 0;
		for (let choice in choices) {
			let result = {
				choice: choices[choice].choice,
				votes: 0,
			};
			for (let vote in choices[choice].votes) {
				// TODO: There is definitely a better way of counting these. Object.keys?
				total++;
				result.votes++;
			}
			results.push(result);
		}
		this.props.setCount(total);
		this.setState({
			choices,
			results,
			total,
		});
	}

	getPercentage(count) {
		let percentage;
		if (count === 0) {
			percentage = "0%";
		} else {
			percentage = `${Math.round(count / this.state.total * 100)}%`;
		}
		return percentage;
	}

	render() {
		return (
			<ul className="results">
				{this.state.results.map((result, index) => {
					const percentage = this.getPercentage(result.votes);
					return (
						<li key={index} className="result">
							{" "}
							<div className="choice">{result.choice}</div>
							<div className="bar-container">
								<div className="bar" style={{ width: percentage }} />
								<span className="percentage">{percentage}</span>
							</div>{" "}
							<div className="voteCount">{result.votes} votes</div>
						</li>
					);
				})}
			</ul>
		);
	}
}
