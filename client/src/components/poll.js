import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import SelectedPoll from './dashboard/selectedPoll';
import {Link} from 'react-router-dom';

export class Poll extends React.Component {

  componentDidMount(){
    this.props.dispatch(actions.navStateRecipient());
    this.props.dispatch(actions.getPollRecipient(this.props.match.params.pollId));
  }

  makeSelection(value){
    this.props.dispatch(actions.castVote());
    this.props.dispatch(actions.recipientMakeSelection(this.props.poll.id, this.props.poll.choices, value));
  };
  
  

  render(){
    let value;
    const choices = this.props.poll.choices.map((choice, index)=>{
      value = index;
      console.log("THIS IS CHOICE====>", choice)
      return <div> <input key={index} type="radio" name="pollChoice" value={index} /> {choice.choice} </div>
    });
    let feedbackModal;
    if(this.props.castVote){
      feedbackModal = <div><h2>Thanks for your input!</h2><span><Link to="/create">Create your own poll</Link></span></div>
    }
    return (
      <div>
        <h2> {this.props.poll.title} </h2>
        <h3> {this.props.poll.text} </h3>
        <form>{choices}</form>
        <button onClick={e => {
          return this.makeSelection(value)}}>Submit</button>
        {feedbackModal}
      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  poll: state.recipient,
  hasSelected: state.recipientHasSelected,
  selectedChoice: state.recipientChoice,
  id: props.match.params.pollId,
  castVote: state.castVote
});

export default connect(mapStateToProps)(Poll);