const express = require('express')
const path = require('path')
const Sequelize = require('sequelize')
const models = require('./models')
const fs = require('fs');
const cvParser = require('./scripts/cvParser');

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

const { applications, resumes } = models(sequelize)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Put all API endpoints under '/api'
app.get('/api/applications', (req, res) => {
  applications.findAll().then(data => res.send(data))
});

app.post('/api/resume', (req, res) => {
  let data = [];
  req.on('data', (chunk) => data.push(chunk));
  req.on('end', () => fs.writeFile('cv.pdf', Buffer.concat(data), () => {
    res.send('OK');
    cvParser();
  }));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port)

console.log(`Backend listening on ${port}`)
