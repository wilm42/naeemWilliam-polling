import React from 'react';
import AllPolls from './allpolls';
import SelectedPoll from './selectedPoll';
import {connect} from 'react-redux';
import * as actions from '../../actions';

export class Dashboard extends React.Component {
  
  


  componentDidMount(){
    this.props.dispatch(actions.getPolls())
    this.interval =  setInterval(() =>{
      console.log('I work')
     this.props.dispatch(actions.getPolls())
    }, 5000)
    
  }  


  componentWillUnmount(){
    this.interval = this.interval.destroy()
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