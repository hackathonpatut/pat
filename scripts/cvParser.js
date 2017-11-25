const pdfParser = require('pdf2json');
const fs = require('fs');

// Only lower case ples
const degrees = ['associate', 'bachelor', 'student', 'master', 'doctor', 'matriculation'];
const wantedTitles = ['software developer', 'junior developer', 'web developer', 'summer worker'];
const companyEnds = ['oy', 'ltd'];

const parser = new pdfParser();

parser.on("pdfParser_dataError", err => console.log(err));

parser.on("pdfParser_dataReady", pdfData => {
  const pages = pdfData.formImage.Pages;
  const text = pages.map(p =>
    p.Texts.map(t => decodeURIComponent(t.R[0].T)))
      .reduce((res, cur) =>
        res.concat(cur),
      [])
      .filter(line => line.length > 3);
  const lower = text.map(t => t.toLowerCase());
  const singleLine = lower.join(' ');

  let i = 0;
  let degree = null;
  let company = null;
  let titles = [];

  while (i < text.length) {
    const words = lower[i].split(' ');
    if (!degree) {
      words.filter(w => {
        if (degrees.indexOf(w) >= 0) {
          degree = text[i];
        }
      });
    }

    if (!company) {
      const found = words.filter(w => companyEnds.indexOf(w) >= 0);
      if (found.length > 0) {
        company = lower[i].split(',').filter(section => section.split(' ').indexOf(found[0]) >= 0)[0];
      }
    }

    const matchedTitles = wantedTitles.filter(wt => lower[i].indexOf(wt) >= 0);
    if (matchedTitles.length > 0) {
      titles.push(matchedTitles[0]);
    }

    i += 1;
  }

  const filteredTitles = titles.filter((t, i) => titles.indexOf(t) === i);

  // TODO: REPLACE WITH DB SCRIPTS
  console.log('Education: ' + degree);
  console.log('Last company: ' + company);
  console.log('Titles: ' + filteredTitles.join(', '));

  fs.unlinkSync(__dirname + '/../cv.pdf');
});

const parse = () => {
  const filePath = __dirname + '/../cv.pdf';
  parser.loadPDF(filePath);
}

module.exports = parse;
