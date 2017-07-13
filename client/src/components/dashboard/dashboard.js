import React from 'react';
import AllPolls from './allpolls';
import SelectedPoll from './selectedPoll';
import {connect} from 'react-redux';
import * as actions from '../../actions';

export class Dashboard extends React.Component {

  componentDidMount(){
    console.log('getting the polls')
    this.props.dispatch(actions.getPolls());
  }

  render(){
    return(
      <div>
        <AllPolls />
        <SelectedPoll />
      </div>
    );
  }
}

export default connect()(Dashboard);