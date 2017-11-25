import React, { Component } from 'react';
import glamorous from 'glamorous';
import cardBackground from './card_bg.svg';

const Badge = glamorous.div({
  color: '#2295c1',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  top: '-0.5em',
  right: '-0.5em',
  border: '2px solid #2295c1',
  borderRadius: '50%',
  width: '2em',
  height: '2em',
  background: 'white'
});

const PositionBox = glamorous.div({
  backgroundImage: `url(${cardBackground})`,
  position: 'relative',
  backgroundSize: 'cover',
  display: 'inline-block',
  padding: '0.2em 2em',
  border: '2px solid #2295c1',
  borderRadius: '15%',
  margin: '2em',
  textAlign: 'left'
});

const Title = glamorous.h2({
  color: 'white',
  fontSize: '20px',
  paddingBottom: '1em'
});

class Position extends Component {
  render() {
    return (
      <PositionBox>
        <Badge>
          <p>{this.props.newProfiles}</p>
        </Badge>
        <Title>{this.props.name}</Title>
        <p><b>{this.props.applicationAmount}</b> applications</p>
        <p><b>{this.props.newProfiles}</b> new profiles</p>
        <p><b>{this.props.scheduled.done + ' / ' + this.props.scheduled.max}</b> meetings scheduled</p>
      </PositionBox>
    )
  }
}

export default Position;
