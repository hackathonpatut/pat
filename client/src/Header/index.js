import React from 'react'
import glamorous from 'glamorous'
import {withRouter} from 'react-router-dom';

const Container = glamorous.div({
  height: '100px',
  //padding: '20px',
  color: 'white',
  //backgroundImage: `url(${headerBackground})`,
  //backgroundRepeat: 'no-repeat',
  //marginLeft: '-10%',
  //width: '130%', //FIXME
  background: '#e46069',
  position: 'relative'
})

const Title = glamorous.h1({
  color: 'white',
  margin: '0 0 0 40px',
  paddingTop: '0.8em',
  textAlign: 'left'
})

class Header extends React.Component {
  render() {
    if (this.props.location.pathname === '/reboot') {
      return null;
    }
    return (
      <Container>
        <Title>Reboot your career</Title>
      </Container>
    )
  }
}

export default withRouter(Header);
