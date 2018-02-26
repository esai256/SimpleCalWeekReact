import React, { Component } from 'react';
import './App.css';
import WeekPlanner from "./containers/weekPlanner/weekPlanner";

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeekPlanner />
      </div>
    );
  }
}

export default App;
