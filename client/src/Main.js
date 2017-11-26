import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import glamorous from 'glamorous'
import JobSuggestions from './JobSuggestions'
import CvListing from './CvListing'

const Container = glamorous.div({
})

class Main extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route path="/reboot" component={JobSuggestions} />
          <Route path="/cvs" component={CvListing} />
        </Switch>
      </Container>
    )
  }
}

export default Main
