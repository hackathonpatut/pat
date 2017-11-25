import React from 'react'
import glamorous from 'glamorous'

const Pill = glamorous.div({
  height: '2em',
  lineHeight: '2em',
  padding: '0 15px',
  color: 'white',
  background: '#2295C1',
  display: 'inline-block',
  fontSize: '1.1em',
  margin: '1em 1em 1em 0'
})

const Pills = ({ data }) => {
  return <div>{data.map((str, key) => <Pill key={key}>{str}</Pill>)}</div>
}

export default Pills
