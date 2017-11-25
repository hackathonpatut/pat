import React from 'react'

import InputField from './components/InputField'
import OccupationPills from './components/OccupationPills'
import Labels from './components/Labels'
import Result from './components/Result'

class JobSuggestions extends React.Component {
  state = {
    occupations: ['software developer'],
    autocomplete: ['software developer', 'web developer', 'teacher'],
    suggestions: [
      { title: 'ICT master', value: 20 },
      { title: 'Patu pööpötin', value: 45 },
      { title: 'Puutarhuri', value: 12 }
    ]
  }

  addOccupation = occupation => {
    const { occupations } = this.state
    occupations.push(occupation)
    this.setState({ occupations })
    this.triggerChange()
  }

  triggerChange = () => {
    const { suggestions } = this.state
    console.log(suggestions)
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
