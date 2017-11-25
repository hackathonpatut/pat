import React, { Component } from 'react';
import Position from './Position';

class BrowseView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      applications: null,
      scheduled: {
        done: 17,
        max: 40
      }
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
    return (
      <Position name="Sales Manager" applicationAmount={200} newProfiles={27} scheduled={this.state.scheduled} />
    )
  }
}

export default BrowseView
