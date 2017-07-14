import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

export class AllPolls extends React.Component{

  selectPoll(e){
    e.preventDefault();
    this.props.dispatch(actions.selectPoll(e.target.value));
    console.log(e.target.value);
  }

  render(){
    const allPolls = this.props.allPolls.map((poll, index) => {
      return (
      <li key={index} className={this.props.selectedPoll == index ? 'selected' : ''}><button value={index} onClick={e=> this.selectPoll(e)}>{poll.title}</button></li>
    )});
    return(
      <div className="allPolls-container">
          <h2 className="sectionTitle allPolls"> All Polls </h2>
          <div className="section allPolls">
            <ul>{allPolls}</ul>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  allPolls: state.allPolls,
  selectedPoll: state.selectedPoll
  }
};

export default connect(mapStateToProps)(AllPolls);