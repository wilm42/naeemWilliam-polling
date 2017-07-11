import React from 'react';
import {connect} from 'react-redux';

export class MyPolls extends React.Component{

  // selectPoll(e){
  //   e.preventDefault;
  //   this.props.dispatch(actions)
  // }

  render(){
    const myPolls = this.props.myPolls.map((poll, index) => (
      <li key={index}><button value={index} onClick={e=> {e.preventDefault; console.log(e.target.value)}}>{poll.title}</button></li>
    ));
    return(
      <div>
          <h2> My Polls </h2>
          <div>
            <ul>{myPolls}</ul>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myPolls: state.myPolls
});

export default connect(mapStateToProps)(MyPolls);