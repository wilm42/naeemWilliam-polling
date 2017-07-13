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
    const selectedPoll = this.props.allPolls[this.props.selectedPoll];
    const totalVotes = this.countVotes(selectedPoll.choices);
    const results = selectedPoll.choices.map((option, index)=>{
      return <li key={index}> {option.choice} |  {option.vote} votes | {option.vote / totalVotes * 100}% </li>
    });
    return (
      <div className="section-container">
        <h2 className="sectionTitle selectedPoll">{selectedPoll.title}</h2>
        <div className="section selectedPoll">
          <div className="selectedPoll-header">
            <h3> {selectedPoll.text} </h3>
            <span className="pollInfo">poll created: {moment(`${selectedPoll.date}`).format('LL')} | total votes: {totalVotes}</span>
          </div>
          <ul>{results}</ul>
          <span>Link to your poll: http://localhost:8080/poll/{selectedPoll.id}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allPolls: state.allPolls,
  selectedPoll: state.selectedPoll,
});

export default connect(mapStateToProps)(SelectedPoll);


// CUT FROM LINE 25 {selectedPoll.createdDate || 'TBD'}