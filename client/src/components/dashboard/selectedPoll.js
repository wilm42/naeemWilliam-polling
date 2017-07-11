import React from 'react';
import {connect} from 'react-redux';

export class SelectedPoll extends React.Component {
  render(){
    console.log(this.props.myPolls[1]);
    const results = this.props.myPolls[1].choices.map((option, index)=>{
      return <li key={index}> {option.choice} |  {option.vote} votes | {option.vote / 100 * 100}% </li>
    });
    return (
      <div>
        <h2> {this.props.myPolls[1].title} </h2>
        <h3> {this.props.myPolls[1].question} </h3>
        <span>poll created: TBD | total votes: TBD</span>
        <ul>{results}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myPolls: state.myPolls
});

export default connect(mapStateToProps)(SelectedPoll);