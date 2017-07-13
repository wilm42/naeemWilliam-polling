import React, { Component } from 'react';
import Dashboard from './dashboard/dashboard.js';
import Poll from './poll';
import CreateEdit from './createEdit';
import Nav from './nav';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export class App extends Component {
  render() {
  let nav = <Link to={this.props.navState.link}> {this.props.navState.text} </Link>;
   return (
     <Router>
      <div className="app">
          <header>{nav}</header>
          <main>
            
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/poll/:pollId" component={Poll} />
              <Route exact path="/create" component={CreateEdit} />
          
          </main>
        </div> 
     </Router>
   );
  }
}

const mapStateToProps = state => ({
  navState: state.navState
});

export default connect(mapStateToProps)(App);

