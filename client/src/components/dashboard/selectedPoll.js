import React from 'react';
import {connect} from 'react-redux';

export class SelectedPoll extends React.Component {

  countVotes(choices){
    console.log(choices);
    let total = 0;
    choices.forEach(choice=> {
      total += choice.vote
    });
    return total;
  }

  render(){
    console.log(this.props.myPolls);
    const selectedPoll = this.props.myPolls[this.props.selectedPoll];
    const totalVotes = this.countVotes(selectedPoll.choices);
    const results = selectedPoll.choices.map((option, index)=>{
      return <li key={index}> {option.choice} |  {option.vote} votes | {option.vote / totalVotes * 100}% </li>
    });
    return (
      <div>
        <h2> {selectedPoll.title} </h2>
        <h3> {selectedPoll.text} </h3>
        <span>poll created: {selectedPoll.createdDate || 'TBD'} | total votes: {totalVotes}</span>
        <ul>{results}</ul>
        <span> link to your poll: http://localhost:8080/recipient/{selectedPoll.id} </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myPolls: state.myPolls,
  selectedPoll: state.selectedPoll
});

export default connect(mapStateToProps)(SelectedPoll);