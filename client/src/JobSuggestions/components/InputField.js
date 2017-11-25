import React from 'react'
import Autosuggest from 'react-autosuggest'

import './InputField.css'

function getSuggestionValue(suggestion) {
  return suggestion
}

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>
}

class InputField extends React.Component {
  state = {
    value: ''
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
    const { suggestions } = this.props

    const inputProps = {
      placeholder: 'Tell what you have done and press enter',
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    }

    return (
      <Autosuggest
        suggestions={suggestions}
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
