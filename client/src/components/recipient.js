import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

export class Recipient extends React.Component {
  makeSelection(v){
    this.props.dispatch(actions.recipientMakeSelection(v));
  };
  
  render(){
    const choices = this.props.answers.map((answer, index)=>{
      return <div> <input key={index} type="radio" name="pollChoice" value={index} onClick={e => this.makeSelection(e.target.value)} /> {answer.text} </div>
    });
    return (
      <div>
        <h2> {this.props.title} </h2>
        <h3> {this.props.question} </h3>
        <form>{choices}</form>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  title: state.title,
  question: state.question,
  createdDate: state.createdDate,
  totalVotes: state.totalVotes,
  answers: state.answers,
  hasSelected: state.recipientHasSelected,
  selectedChoice: state.recipientChoice
});

export default connect(mapStateToProps)(Recipient);