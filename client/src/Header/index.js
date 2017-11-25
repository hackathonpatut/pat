import React  from 'react';
import glamorous from 'glamorous';
import headerBackground from './header_bg.svg';

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

const Header = () => (
  <Container>
    <Title>Pat</Title>
  </Container>
)

export default Header;
