import React from 'react';
import {connect} from 'react-redux';
const moment = require('moment')

export class SelectedPoll extends React.Component {

  countVotes(choices){
    //console.log('THIS IS CHOICES ====>',choices);
    let total = 0;
    choices.forEach(choice=> {
      total += choice.vote
    });
    return total;
  }

  render(){
    const selectedPoll = this.props.myPolls[this.props.selectedPoll];
    const totalVotes = this.countVotes(selectedPoll.choices);
    const results = selectedPoll.choices.map((option, index)=>{
      return <li key={index}> {option.choice} |  {option.vote} votes | {option.vote / totalVotes * 100}% </li>
    });
    return (
      <div>
        <h2> {selectedPoll.title} </h2>
        <h3> {selectedPoll.text} </h3>
        <span>poll created: {moment(`${selectedPoll.date}`).format('LL')} | total votes: {totalVotes}</span>
        <ul>{results}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myPolls: state.myPolls,
  selectedPoll: state.selectedPoll,
});

export default connect(mapStateToProps)(SelectedPoll);


// CUT FROM LINE 25 {selectedPoll.createdDate || 'TBD'}