import React from 'react'
import glamorous from 'glamorous'
import { withRouter } from 'react-router-dom'

const Container = glamorous.div({
  height: '100px',
  color: 'white',
  position: 'relative',
  fontWeight: '600 !important',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontSize: '34px',
  maxWidth: '860px',
  margin: '0 auto',
  padding: '8% 40px 0'
})

const Title = glamorous.h1({
  color: 'white',
  textAlign: 'left'
})

class Header extends React.Component {
  render() {
    if (this.props.location.pathname === '/reboot') {
      return null
    }
    return (
      <Container>
        <Title>Reboot your career.</Title>
      </Container>
    )
  }
}

export default withRouter(Header)
