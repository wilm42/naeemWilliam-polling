import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

export class Recipient extends React.Component {
  makeSelection(v){
    this.props.dispatch(actions.recipientMakeSelection(v));
  };
  
  render(){
    const choices = this.props.myPolls[1].choices.map((choice, index)=>{
      return <div> <input key={index} type="radio" name="pollChoice" value={index} onClick={e => this.makeSelection(e.target.value)} /> {choice.choice} </div>
    });
    return (
      <div>
        <h2> {this.props.myPolls[1].title} </h2>
        <h3> {this.props.myPolls[1].question} </h3>
        <form>{choices}</form>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  myPolls: state.myPolls,
  hasSelected: state.recipientHasSelected,
  selectedChoice: state.recipientChoice
});

export default connect(mapStateToProps)(Recipient);