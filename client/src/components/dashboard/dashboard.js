import React from 'react';
import MyPolls from './myPolls';
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
        {/*<MyPolls />*/}
        <SelectedPoll />
      </div>
    );
  }
}

export default connect()(Dashboard);