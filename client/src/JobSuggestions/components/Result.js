import React from 'react'
import glamorous from 'glamorous'

const Block = glamorous.div({
  display: 'inline-block',
  margin: '1em 1% 0 0',
  width: '19%'
})

class Result extends React.Component {
  render() {
    const { data } = this.props

    if (!data || data.length < 1) return null

    const Bubbles = () => {
      const colors = ['#ff5722', '#9c27b0', '#4caf50']
      let colorIndex = 0

      const r = []

      for (let i = 0; i < Math.min(5, data.length); i++) {
        const d = data[i]

        const diameter = d.value * 7

        r.push(
          <Block key={i}>
            {d.title}
            <div
              style={{
                display: 'block',
                width: diameter,
                height: diameter,
                background: colors[colorIndex],
                borderRadius: '100%',
                margin: '1em 0'
              }}
            />
            {d.value} skills
          </Block>
        )
        // {
        //   fill: true,
        //   backgroundColor: colors[colorIndex],
        //   data: [{ x: xCoord, y: 0, r: radius }]
        // })

        colorIndex =
          colorIndex + 1 < colors.length ? colorIndex + 1 : colorIndex
      }

      return r
    }

    return (
      <div
        style={{
          background: '#fff',
          padding: '10px 30px 30px',
          marginTop: '2em',
          borderRadius: '2px'
        }}
      >
        <h3
          style={{
            fontWeight: 800,
            textTransform: 'uppercase'
          }}
        >
          Recommended professions
        </h3>
        <Bubbles />
      </div>
    )
  }
}

export default Result
