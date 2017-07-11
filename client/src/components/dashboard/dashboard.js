import React from 'react';
import MyPolls from './myPolls';
import SelectedPoll from './selectedPoll';

export default class Dashboard extends React.Component {
  render(){
    return(
      <SelectedPoll />
    );
  }
}