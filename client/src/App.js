import React, { Component } from 'react';
import Header from './Header/index'; // For some reason the index file cannot be found automatically here
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
      </div>
    )
  }
}

export default App
