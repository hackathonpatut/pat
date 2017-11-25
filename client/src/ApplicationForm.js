import React, { Component } from 'react';
import request from 'superagent';

class ApplicationForm extends Component {
  sendApplication(text) {
    request.post('/api/application')
      .set("Content-Type", "application/json")
      .send(`{"text":"${ text.replace(/\r?\n/g, ' ') }"}`)
      .end();
    document.getElementById('applicationForm').reset();
  }

  render() {
    return (
      <form id="applicationForm">
        <textarea name="application" id="application" />
        <button type="submit" onClick={e => {
          e.preventDefault();
          this.sendApplication(document.getElementById('application').value);
        }}>Submit</button>
      </form>
    );
  }
}

export default ApplicationForm;
