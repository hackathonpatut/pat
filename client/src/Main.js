import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import glamorous from 'glamorous'
import JobSuggestions from './JobSuggestions'
import CvListing from './CvListing'
import Rating from './RatingView'

const Container = glamorous.div({
  padding: '20px 40px'
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
