import React from 'react'
import { Bubble } from 'react-chartjs-2'

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

class Result extends React.Component {
  render() {
    const { data } = this.props

    const dataToGraph = generateData(data)

    const options = {
      tooltips: false,
      legend: false,
      scales: {
        yAxes: [
          {
            display: false,
            ticks: {
              max: 1000,
              min: -1000
            }
          }
        ],
        xAxes: [
          {
            display: false,
            ticks: {
              max: 2000,
              min: 0
            }
          }
        ]
      }
    }

    return (
      <div>
        <Bubble data={dataToGraph} options={options} height={100} />
      </div>
    )
  }
}

function generateData(data) {
  return {
    datasets: generateBubbles(data)
  }
}

function generateBubbles(data) {
  const colors = ['#ff5722', '#9c27b0', '#4caf50']
  let colorIndex = 0

  const r = []

  for (let i = 0; i < data.length; i++) {
    const d = data[i]

    const radius = d.value * 3
    const xCoord = i * 450 + 100

    r.push({
      fill: true,
      backgroundColor: colors[colorIndex],
      data: [{ x: xCoord, y: 0, r: radius }]
    })

    colorIndex = colorIndex + 1 < colors.length ? colorIndex + 1 : colorIndex
  }

  return r
}

export default Result
