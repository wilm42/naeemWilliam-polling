import React, { Component } from 'react';
import Dashboard from './dashboard/dashboard.js';
import Recipient from './recipient';

class App extends Component {
  render() {
   return (
     <div>
      <Dashboard />
      {/*<Recipient />*/}
     </div>
   );
  }
}

export default App;

