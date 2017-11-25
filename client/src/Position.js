import React, { Component } from 'react';
import glamorous from 'glamorous';

const Badge = glamorous.div({
  color: '#e46069',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  top: '-0.5em',
  right: '-0.5em',
  border: '2px solid #e46069',
  borderRadius: '50%',
  width: '2em',
  height: '2em',
  background: 'white'
});

// const PositionBox = glamorous.div({
//   backgroundImage: 'url('card_bg.svg')",
//   position: 'relative',
//   backgroundSize: 'cover',
//   display: 'inline-block',
//   padding: '0.2em 2em',
//   border: '2px solid #e46069',
//   borderRadius: '15%',
//   margin: '2em',
//   textAlign: 'left',
// });

export default class Position extends Component {
  render() {
    return (
      <div className="position">
        <Badge>
          <p>{this.props.newProfiles}</p>
        </Badge>
        <h2>{this.props.name}</h2>
        <p><b>{this.props.applicationAmount}</b> applications</p>
        <p><b>{this.props.newProfiles}</b> new profiles</p>
        <p><b>{this.props.scheduled.done + ' / ' + this.props.scheduled.max}</b> meetings scheduled</p>
      </div>
    )
  }
}
