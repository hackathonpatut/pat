import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  state = {
    test: null
  }

  componentDidMount() {
    this.fetchTest()
  }

  fetchTest = () => {
    fetch('/api/test')
      .then(res => res.json())
      .then(test => this.setState({ test }))
  }

  render() {
    console.log(this.state.test)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Return:{' '}
          {Object.keys(this.state.test || {}).map(
            key => this.state.test[key]
          ) || 'null'}
        </p>
      </div>
    )
  }
}

export default App
