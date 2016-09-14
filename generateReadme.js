require('babel/register')({
  extensions: ['.js', '.jsx'],
  stage: 0,
  loose: true
});

const path = require('path');
const generateReadme = require('react-readme-generator').generateReadme;

generateReadme(path.resolve('src/TextareaAutosize.js'));
