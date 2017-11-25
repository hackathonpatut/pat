import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import glamorous from 'glamorous'

const Container = glamorous.div({
  display: 'inline-block',
  float: 'right'
})

const dropzoneStyle = {
  minWidth: '180px',
  padding: '0 10px',
  height: '40px',
  borderRadius: '30px',
  border: '2px solid #fff',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const DropzoneText = glamorous.p({
  color: '#fff',
  fontSize: '14px',
  maxWidth: '220px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  userSelect: 'none',
  padding: 0,
  margin: 0
})

const Title = glamorous.h2({
  color: '#fff',
  fontSize: '18px',
  textAlign: 'center'
})

class FileSender extends Component {
  state = {
    fileName: ''
  }

  sendFile = file => {
    console.log(file)
    request
      .post('/api/resume')
      .set('Content-Type', 'application/octet-stream')
      .send(file[0])
      .end()
    this.setState({
      fileName: file[0].name
    })
  }

  render() {
    return (
      <Container>
        <Title>Or, send your CV.</Title>
        <Dropzone style={dropzoneStyle} onDrop={this.sendFile}>
          <DropzoneText>
            {this.state.fileName !== '' ? this.state.fileName : 'Upload CV'}
          </DropzoneText>
        </Dropzone>
      </Container>
    )
  }
}

export default FileSender
