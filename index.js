const express = require('express')
const path = require('path')
const Sequelize = require('sequelize')
const fs = require('fs')
const bodyParser = require('body-parser')
const spawn = require('child_process').spawn
const Map = require('immutable').Map

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

const { applications, resumes, similarTitles } = models(sequelize)

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
      res.send('OK')
      cvParser()
    })
  )
});

app.get('/api/similarTitles', (req, res) => {
  const { title1, title2, title3 } = req.query;

  let similarTitles = [];

  sequelize.query(`SELECT t2.title, similarity FROM titles as t1
      JOIN similarTitles ON t1.id = similarTitles.titleId
      JOIN titles as t2 ON t2.id = similarTitles.otherTitleId
      WHERE t1.title ='${title1 ? title1 : ''}' OR
      t1.title = '${title2 ? title2 : ''}' OR
      t1.title = '${title3 ? title3 : ''}'`,
      { type: Sequelize.QueryTypes.SELECT })
    .then(sim1 => {
      similarTitles = sim1;
      return sim1.map(s => {
        return sequelize.query(`SELECT t2.title, similarity FROM titles as t1
            JOIN similarTitles ON t1.id = similarTitles.titleId
            JOIN titles as t2 ON t2.id = similarTitles.otherTitleId
            WHERE t1.title ='${s.title}'`,
            { type: Sequelize.QueryTypes.SELECT })
          .then(sim2 => {
            return new Promise((resolve, reject) => {
              const result = sim2
              const titles = sim2.map(s => `'${s.title}'`)
              const shell = spawn('python', ['scripts/skillSearch/get-skills.py'].concat(titles))
              shell.stdout.on('data', data => {
                const usefulSkills = data.toString().split('\n').map(d => {
                  const s = d.split(':')
                  return { skill: s[0], count: parseInt(s[1], 10) }
                });

                resolve(usefulSkills);
              });
            });
          });
      });
    }).then(promises => Promise.all(promises).then(values => {
      const objs = values.reduce((acc, cur) => acc.concat(cur), [])
        .filter(a => Number.isInteger(a.count));
      let map = Map({});
      objs.forEach(o => {
        if (map.get(o.skill)) {
          map = map.set(o.skill, map.get(o.skill) + o.count)
        } else {
          map = map.set(o.skill, o.count)
        }
      });
      map = map.sort().entrySeq().toArray().map(m => ({ skill: m[0], count: m[1] }));
      return map.slice((map.length - 10), map.length);
    }))
    .then(usefulSkills => {
      res.send({ similars: similarTitles, skills: usefulSkills });
    });
});

app.post('/api/similarTitles', (req, res) => {
  const { titleId, otherTitleId, similarity } = req.body

  if (titleId && otherTitleId && similarity) {
    similarTitles
      .create({ titleId, otherTitleId, similarity })
      .then(() => res.send('OK'))
  } else {
    res.send('fug uuuu')
  }
})

app.post('/api/application', (req, res) => {
  const { text } = req.body
  fs.writeFile('application.txt', text, () => {
    res.send('OK')
    const shell = spawn('python', ['scripts/summarize.py'])
    shell.stdout.on('data', data => {
      console.log(data.toString())
    })
  })
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port)

console.log(`Backend listening on ${port}`)
