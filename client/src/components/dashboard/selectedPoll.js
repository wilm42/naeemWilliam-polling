import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
      let perc;
      console.log(option.choice, option.vote);
      if(option.vote == 0){
        perc = `0%`
      }
      else{
        perc = `${Math.round(option.vote / totalVotes * 100)}%`
      }
      return <li key={index} className="result"> <div className="choice">{option.choice}</div><div className="bar-container"><div className="bar" style={{width: perc}}></div><span className="percentage">{perc}</span></div> <div className="voteCount">{option.vote} votes</div></li>
    });
    return (
      <div className="section-container">
        <h2 className="sectionTitle selectedPoll">{selectedPoll.title}</h2>
        <div className="section selectedPoll">
          <div className="selectedPoll-header">
            <h3> {selectedPoll.text} </h3>
            <span className="pollInfo">poll created: {moment(`${selectedPoll.date}`).format('LL')} | total votes: {totalVotes}</span>
          </div>
          <div className="bottomHalf">
            <ul className="results">{results}</ul>
          </div>
          <div className="link"><Link to={`/poll/${selectedPoll.id}`}>Link to your poll</Link></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
return({
  allPolls: state.allPolls,
  selectedPoll: state.selectedPoll,
});
}

export default connect(mapStateToProps)(SelectedPoll);


// CUT FROM LINE 25 {selectedPoll.createdDate || 'TBD'}