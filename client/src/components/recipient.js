import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

export class Recipient extends React.Component {

  componentDidMount(){
    this.props.dispatch(actions.getPollRecipient(this.props.match.params.pollId));
  }

  makeSelection(v){
    this.props.dispatch(actions.recipientMakeSelection(this.props.poll.id, this.props.poll.choices, v));
  };
  
  render(){
    const choices = this.props.poll.choices.map((choice, index)=>{
      return <div> <input key={index} type="radio" name="pollChoice" value={index} onClick={e => this.makeSelection(e.target.value)} /> {choice.choice} </div>
    });
    return (
      <div>
        <h2> {this.props.poll.title} </h2>
        <h3> {this.props.poll.text} </h3>
        <form>{choices}</form>
      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  poll: state.recipient,
  hasSelected: state.recipientHasSelected,
  selectedChoice: state.recipientChoice,
  id: props.match.params.pollId,
});

export default connect(mapStateToProps)(Recipient);