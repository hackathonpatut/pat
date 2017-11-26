import React, { Component } from 'react';
import { TagCloud } from "react-tagcloud";

const colorList = [
  '#e46069',
  '#2295C1',
  '#6AC17B',
  '#7FC6A4',
  '#DBD56E',
  '#9D44B5',
  '#4B296B',
  '#4C2C72',
  '#FF7733',
  '#E15634',
  '#E5B181',
  '#8B1E3F',
  '#DDAE7E',
  '#5F5566',
]

function getRandomColor() {
  return colorList[Math.floor(Math.random() * colorList.length)];
}

const customRenderer = (tag, size, color) => (
  <span key={tag.value}
    style={{
      margin: '16px 16px 16px 0',
      fontSize: `${size}px`,
      fontFamily: 'Helvetica, sans-serif',
      color: getRandomColor(),
    }}>
      {tag.value}
  </span>
);

class Wordcloud extends Component {
  render() {
    return (
      <TagCloud minSize={16}
                maxSize={42}
                renderer={customRenderer}
                tags={this.props.data.map((pair) => {
                  return {value: pair.title, count: pair.value}
                })}
                //onClick={tag => alert(`'${tag.value}' was selected!`)}
      />
    )
  }
}

export default Wordcloud;
