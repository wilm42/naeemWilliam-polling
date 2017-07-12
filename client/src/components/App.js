import React, { Component } from 'react';
import Dashboard from './dashboard/dashboard.js';
import Recipient from './recipient';
import CreateEdit from './createEdit';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
   return (
     <Router>
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/recipient" component={Recipient} />
        <Route exact path="/create" component={CreateEdit} />
      </div>
     </Router>
   );
  }
}

export default App;

