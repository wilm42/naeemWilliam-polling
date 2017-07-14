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
    console.log(value);
    this.props.dispatch(actions.castVote());
    this.props.dispatch(actions.recipientMakeSelection(this.props.poll.id, this.props.poll.choices, value));
  };
  
  render(){
    let value;
    const choices = this.props.poll.choices.map((choice, index)=>{
      return <div key={index} className="radio-div"> <input type="radio" name="pollChoice" value={index} id={`button-${index}`} onClick={e=> this.makeSelection(e.target.value)}/> <label htmlFor={`button-${index}`}><div className="radio-circle"></div>{choice.choice}</label></div>
    });
    let feedbackModal;
    if(this.props.castVote){
      feedbackModal = <div className="feedbackModal"><h2>Thanks for your input!</h2><span><Link to="/create">Create your own poll</Link></span></div>
    }
    return (
      <div>
        <h2 className="title"> {this.props.poll.title} </h2>
        <div className="section poll">
          <h3 className="question"> {this.props.poll.text} </h3>
          <form>{choices}</form>
        </div>
        <div className={this.props.castVote ? 'feedbackModal show' : 'feedbackModal'}><h2 className="feedback">Thanks for your input!</h2><Link to="/create">Create your own poll</Link></div>
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