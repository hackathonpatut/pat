import React, { Component } from 'react'
import glamorous from 'glamorous'
import './style.css'

const Table = glamorous.table({
  width: '100%',
  borderCollapse: 'collapse'
})

const Tr = glamorous.tr({
  textAlign: 'left',
  height: '20px'
})

const Td = glamorous.td({
  padding: '7px 17px 7px 7px',
  border: '1px solid #ccc'
})

const Th = glamorous.th({
  padding: '7px 17px 7px 7px',
  border: '1px solid #ccc',
  background: '#2196f3',
  color: '#fff'
})

class CvListing extends Component {
  state = {}

  render() {
    const rows = []

    for (let i = 0; i < 20; i++) {
      rows.push(
        <Tr>
          <Td>Patu Patukka</Td>
          <Td>Superman's job</Td>
          <Td>
            <a href="#">file.pdf</a>
          </Td>
          <Td>
            <a href="#">Click to view</a>
          </Td>
          <Td>87.0</Td>
          <Td>
            <a href="#">View</a>
          </Td>
        </Tr>
      )
    }
    return (
      <div>
        <h2>Job applications for: sales manager</h2>
        <Table>
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Applied for</Th>
              <Th>CV</Th>
              <Th>Cover Letter</Th>
              <Th>CV score</Th>
              <Th>Actions</Th>
            </Tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    )
  }
}

export default CvListing
