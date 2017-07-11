import React from 'react';
import {connect} from 'react-redux';

export class SelectedPoll extends React.Component {
  render(){
    const results = this.props.answers.map((answer, index)=>{
      return <li key={index}> {answer.text} | {answer.count / this.props.totalVotes * 100}% </li>
    });
    return (
      <div>
        <h2> {this.props.title} </h2>
        <h3> {this.props.question} </h3>
        <span>poll created: {this.props.createdDate} | total votes: {this.props.totalVotes}</span>
        <ul>{results}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  title: state.title,
  question: state.question,
  createdDate: state.createdDate,
  totalVotes: state.totalVotes,
  answers: state.answers
});

export default connect(mapStateToProps)(SelectedPoll);