import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

export class AllPolls extends React.Component{

  selectPoll(e){
    e.preventDefault;
    this.props.dispatch(actions.selectPoll(e.target.value));
  }

  render(){
    const allPolls = this.props.allPolls.map((poll, index) => (
      <li key={index}><button value={index} onClick={e=> this.selectPoll(e)}>{poll.title}</button></li>
    ));
    return(
      <div>
          <h2> All Polls </h2>
          <div>
            <ul>{allPolls}</ul>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allPolls: state.allPolls
});

export default connect(mapStateToProps)(AllPolls);