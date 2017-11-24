import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import request from 'superagent';

class FileSender extends Component {
  sendFile(file) {
    request.post('/api/resume')
      .set("Content-Type", "application/octet-stream")
      .send(file[0])
      .end();
  }

  render() {
    return (
      <div>
        <p>
          Send file
        </p>
        <Dropzone onDrop={this.sendFile} />
      </div>
    )
  }
}

export default FileSender
