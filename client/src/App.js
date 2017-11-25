import React, { Component } from 'react'
import Position from './Position.js'
import './App.css'
import FileSender from './FileSender';


class App extends Component {
  state = {
    applications: null,
    scheduled: {
      done: 17,
      max: 40
    }
  }

  componentDidMount() {
    this.fetchApplications()
  }

  fetchApplications = () => {
    fetch('/api/applications')
      .then(res => res.json())
      .then(applications => this.setState({ applications }))
  }

  render() {
    console.log(this.state.applications)
    return (
      <div className="App">
        <header className="Header">
          <h1>Pat</h1>
        </header>
        <FileSender />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Position name="Sales Manager" applicationAmount={200} newProfiles={27} scheduled={this.state.scheduled} />
      </div>
    )
  }
}

export default App
