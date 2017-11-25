const express = require('express')
const path = require('path')
const Sequelize = require('sequelize')
const fs = require('fs')
const bodyParser = require('body-parser')
const spawn = require('child_process').spawn

const models = require('./models')
const cvParser = require('./scripts/cvParser')

const app = express()
app.use(bodyParser.json())

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

const { applications, resumes, skills } = models(sequelize)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Put all API endpoints under '/api'
app.get('/api/applications', (req, res) => {
  applications.findAll().then(data => res.send(data))
})

app.post('/api/resume', (req, res) => {
  let data = []
  req.on('data', chunk => data.push(chunk))
  req.on('end', () =>
    fs.writeFile('cv.pdf', Buffer.concat(data), () => {
      res.send('OK');
      cvParser();
    })
  )
})

app.post('/api/skills', (req, res) => {
  const { skill } = req.body

  if (skill) {
    skills.create({ skill }).then(() => res.send('OK'))
  } else {
    res.send('fug uuuu')
  }
});

app.post('/api/application', (req, res) => {
  const { text } = req.body;
  fs.writeFile('application.txt', text, () => {
    res.send('OK');
    const shell = spawn('python', ['scripts/summarize.py']);
    shell.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port)

console.log(`Backend listening on ${port}`)
