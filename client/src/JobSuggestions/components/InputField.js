import React from 'react'
import Autosuggest from 'react-autosuggest'

import './InputField.css'

function getSuggestionValue(suggestion) {
  return suggestion
}

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>
}

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

class InputField extends React.Component {
  state = {
    value: ''
  }

  getSuggestions = value => {
    const { suggestions } = this.props
    const escapedValue = escapeRegexCharacters(value.trim())

    if (escapedValue === '') return []

    const regex = new RegExp(escapedValue, 'i')

    return suggestions.filter(str => regex.test(str))
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    })
  }

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.props.add(event.target.value)
      this.setState({ value: '' })
    }
  }

  render() {
    const { value } = this.state
    const suggestions = this.getSuggestions(value)

    const inputProps = {
      placeholder: 'Tell what you have done and press enter',
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        getSuggestions={this.getSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionsFetchRequested={() => null}
        onSuggestionsClearRequested={() => null}
        inputProps={inputProps}
      />
    )
  }
}

export default InputField
