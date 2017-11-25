import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import BrowseView from './BrowseView'
import Application from './Application'
import Rating from './RatingView'

const Container = glamorous.div({
  padding: '60px 40px 20px 40px',
  background: 'linear-gradient(to bottom, #f4ece1 0%,#ffffff 100%)',
});

class Main extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route exact path="/" component={BrowseView} />
          <Route path="/send" component={Application} />
          <Route path="/rate" component={Rating} />
        </Switch>
      </Container>
    )
  }
}

export default Main
