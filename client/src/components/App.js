import React, { Component } from 'react';
import Dashboard from './dashboard/dashboard.js';
import Poll from './poll';
import CreateEdit from './createEdit';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
   return (
     <Router>
      <div className="app">  
          <header>
            <h1>Take The Poll</h1> 
            <Link to="/">Dashboard</Link>  

          </header>
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

export default App;

