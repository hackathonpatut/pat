import React from 'react'

import InputField from './components/InputField'
import OccupationPills from './components/OccupationPills'
import Labels from './components/Labels'
import Result from './components/Result'

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
    const { suggestions } = this.state

    if (suggestions.size < 1) return

    let query = `?title1=${suggestions[0]}`

    if (suggestions[1]) query += `&title2=${suggestions[1]}`
    if (suggestions[2]) query += `&title3=${suggestions[2]}`

    fetch(`/api/similarTitles${query}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          suggestions: res.map(x => {
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
      <div>
        <h2>Start by filling in your previous occupations</h2>
        <InputField
          suggestions={filteredAutocomplete}
          add={this.addOccupation}
        />
        <OccupationPills data={occupations} />
        <Labels data={suggestions} />
        <Result data={suggestions} />
      </div>
    )
  }
}

export default JobSuggestions
