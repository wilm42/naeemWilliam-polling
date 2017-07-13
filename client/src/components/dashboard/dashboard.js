import React from 'react';
import AllPolls from './allpolls';
import SelectedPoll from './selectedPoll';
import {connect} from 'react-redux';
import * as actions from '../../actions';

export class Dashboard extends React.Component {

  componentDidMount(){
    console.log('getting the polls')
    this.props.dispatch(actions.getPolls());
    this.props.dispatch(actions.navStateDashboard());
    this.intervalId = setInterval(() => {this.props.dispatch(actions.getPolls())}, 5000)
  }

  render(){
    return(
      <div className="container dashboard">
        <AllPolls />
        <SelectedPoll />
      </div>
    );
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
}

export default connect()(Dashboard);