import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import SelectedPoll from './dashboard/selectedPoll';

export class Poll extends React.Component {

  componentDidMount(){
    this.props.dispatch(actions.getPollRecipient(this.props.match.params.pollId));
  }

  makeSelection(value){
    this.props.dispatch(actions.castVote());
    this.props.dispatch(actions.recipientMakeSelection(this.props.poll.id, this.props.poll.choices, value));
  };
  
  

  render(){
    let value;
    const choices = this.props.allPolls[1].choices.map((choice, index)=>{
      value = index;
      console.log("THIS IS CHOICE====>", choice)
      return <div> <input key={index} type="radio" name="pollChoice" value={index} /> {choice.choice} </div>
    });

    if(this.props.castVote === false){
         return (
      <div>
        <h2> {this.props.allPolls[1].title} </h2>
        <h3> {this.props.allPolls[1].text} </h3>
        <form>{choices}</form>
        <button onClick={e => {
          console.log(value)
          return this.makeSelection(value)}}>Submit</button>
        <h3></h3>  
      </div>
    );
    }return(
      <div>
      <h2>Thanks for voting!</h2>
      <SelectedPoll />  
      </div>
    )
   
  };
};

const mapStateToProps = state => ({
  poll: state.recipient,
  hasSelected: state.recipientHasSelected,
  selectedChoice: state.recipientChoice,
  id: props.match.params.pollId,
  castVote: state.castVote
});

export default connect(mapStateToProps)(Poll);