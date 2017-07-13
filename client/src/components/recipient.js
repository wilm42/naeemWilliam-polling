import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

export class Recipient extends React.Component {

  componentDidMount(){
    console.log('getting the polls')
    this.props.dispatch(actions.getPolls());
  }

  makeSelection(value){
    event.preventDefault();
    this.props.dispatch(actions.castVote());
    this.props.dispatch(actions.recipientMakeSelection(this.props.myPolls[1].id, this.props.myPolls[1].choices, value));
  };
  
  

  render(){
    let value;
    const choices = this.props.myPolls[1].choices.map((choice, index)=>{
      value = index;
      return <div> <input key={index} type="radio" name="pollChoice" value={index} /> {choice.choice} </div>
    });

    if(this.props.castVote === false){
         return (
      <div>
        <h2> {this.props.myPolls[1].title} </h2>
        <h3> {this.props.myPolls[1].text} </h3>
        <form>{choices}</form>
        <button onClick={e => {
          console.log(value)
          return this.makeSelection(value)}}>Submit</button>
        <h3></h3>  
      </div>
    );
    }return(
      <h2>Thanks for voting!</h2>
    )
   
  };
};

const mapStateToProps = state => ({
  myPolls: state.myPolls,
  hasSelected: state.recipientHasSelected,
  selectedChoice: state.recipientChoice,
  castVote: state.castVote

});

export default connect(mapStateToProps)(Recipient);