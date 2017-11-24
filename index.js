const express = require('express')
const path = require('path')
const Sequelize = require('sequelize')
const models = require('./models')

const app = express()

let sequelize

if (process.env.DATABASE_URL != undefined) {
  sequelize = new Sequelize(process.env.DATABASE_URL)
} else {
  sequelize = new Sequelize('sequelize', '', '', {
    dialect: 'sqlite',
    storage: path.join(__dirname, './db.sqlite'),
    logging: false
  })
}

const { applications } = models(sequelize)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Put all API endpoints under '/api'
app.get('/api/applications', (req, res) => {
  applications.findAll().then(data => res.send(data))
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port)

console.log(`Backend listening on ${port}`)
