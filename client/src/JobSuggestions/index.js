import React from 'react'
import glamorous from 'glamorous'

import InputField from './components/InputField'
import OccupationPills from './components/OccupationPills'
import Result from './components/Result'
import FileSender from './components/FileSender'

import './style.css'

const Wrapper = glamorous.div({
  maxWidth: '860px',
  margin: '2em auto'
})

class JobSuggestions extends React.Component {
  state = {
    occupations: [],
    autocomplete: [],
    suggestions: []
  }

  componentDidMount() {
    fetch('/api/titles')
      .then(res => res.json())
      .then(autocomplete => this.setState({ autocomplete }))
  }

  addOccupation = occupation => {
    const { occupations } = this.state
    occupations.push(occupation)
    this.setState({ occupations })
    this.triggerChange()
  }

  triggerChange = () => {
    const { occupations } = this.state

    if (occupations.size < 1) return

    let query = `?title1=${occupations[0]}`

    if (occupations[1]) query += `&title2=${occupations[1]}`
    if (occupations[2]) query += `&title3=${occupations[2]}`

    fetch(`/api/similarTitles${query}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          suggestions: res.similars
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, Math.max(20, res.similars.length))
            .map(x => {
              return {
                title: x.title,
                value: x.similarity
              }
            })
        })
      })
  }

  render() {
    const { occupations, autocomplete, suggestions } = this.state

    const filteredAutocomplete = autocomplete.filter(
      str => occupations.indexOf(str) < 0
    )

    return (
      <Wrapper>
        <FileSender />
        <h3
          style={{
            color: '#fff',
            fontSize: '24px',
            letterSpacing: '1.5px',
            marginTop: '2.5em'
          }}
        >
          Start by filling in your previous occupations.
        </h3>
        <InputField
          suggestions={filteredAutocomplete}
          add={this.addOccupation}
        />
        <OccupationPills data={occupations} />
<<<<<<< HEAD
        <Wordcloud data={suggestions}/>
      </div>
=======
        <Result data={suggestions} />
      </Wrapper>
>>>>>>> desingin stuff
    )
  }
}

export default JobSuggestions
