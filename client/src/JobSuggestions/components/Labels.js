import React from 'react'
import glamorous from 'glamorous'

const Label = glamorous.div({
  display: 'inline-block',
  fontSize: '0.85em',
  margin: '1em 0 0',
  fontWeight: 'bold',
  width: 270
})

const Labels = ({ data }) => {
  return <div>{data.map((d, key) => <Label key={key}>{d.title}</Label>)}</div>
}

export default Labels
