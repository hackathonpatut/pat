import React, { Component } from 'react'
import glamorous from 'glamorous'

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

    const names = [
      'Donte Montalto',
      'Lionel Schlachter',
      'Randal Gautreaux',
      'Andria Beachy',
      'Sherrie Purinton',
      'Soila Hamblin',
      'Rickey Hentz',
      'Royal Saiki',
      'Leeanne Nicholas',
      'Coralee Bloss',
      'Napoleon Tai',
      'Lecia Shadwick',
      'Pura Dingle',
      'Annabel Kaczmarski',
      'Retha Erne',
      'Mitchell Hoadley',
      'Chantay Ponton',
      'Matilda Yocum',
      'Bibi Kegler',
      'Cindi Woodcock'
    ]

    for (let i = 0; i < 400; i++) {
      rows.push({
        name: names[parseInt(Math.random() * 20)],
        file: `${
          Math.random() > 0.3
            ? 'CV_file'
            : Math.random() > 0.3 ? 'cv' : 'curriculum-vitae'
        }.pdf`,
        score: (Math.random() * 90).toFixed(2),
        appliesFor: `sales manager${
          Math.random() > 0.6 ? ', sales assistant' : ''
        }`
      })
    }

    rows.sort((a, b) => b.score - a.score)

    return (
      <div style={{ padding: '32px', background: '#fff' }}>
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
          <tbody>
            {rows.map(row => (
              <Tr>
                <Td>{row.name}</Td>
                <Td>{row.appliesFor}</Td>
                <Td>
                  <a href="#">{row.file}</a>
                </Td>
                <Td>
                  <a href="#">Click to view</a>
                </Td>
                <Td>{row.score}</Td>
                <Td>
                  <a href="#">View</a>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default CvListing
