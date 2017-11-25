import React, { Component } from 'react'
import request from 'superagent'
import glamorous from 'glamorous'

const Container = glamorous.div({
  marginTop: '40px'
})

const Title = glamorous.h2({
  color: '#2295c1',
  fontSize: '18px',
  textAlign: 'Left'
})

const Textarea = glamorous.textarea({
  width: '100%',
  minHeight: '250px',
  fontSize: '14px',
  color: '#333',
  border: 'none',
  outline: 'none',
  background: 'transparent'
})

const SubmitButton = glamorous.button({
  marginTop: '20px',
  minWidth: '180px',
  padding: '0 10px',
  height: '40px',
  borderRadius: '20px',
  border: '2px solid #2295c1',
  textAlign: 'center',
  color: '#2295c1',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#2295c1',
    color: 'white'
  }
})

const ButtonText = glamorous.p({
  padding: 0,
  margin: 0,
  fontSize: '14px',
  textAlign: 'center'
})

class ApplicationForm extends Component {
  sendApplication(text) {
    request
      .post('/api/application')
      .set('Content-Type', 'application/json')
      .send(`{"text":"${text.replace(/\r?\n/g, ' ')}"}`)
      .end()
    document.getElementById('applicationForm').reset()
  }

  render() {
    return (
      <Container>
        <Title>Cover Letter</Title>
        <form id="applicationForm">
          <Textarea
            placeholder="Type your cover letter here"
            name="application"
            id="application"
          />
          <SubmitButton
            type="submit"
            onClick={e => {
              e.preventDefault()
              this.sendApplication(document.getElementById('application').value)
            }}
          >
            <ButtonText>Submit</ButtonText>
          </SubmitButton>
        </form>
      </Container>
    )
  }
}

export default ApplicationForm
