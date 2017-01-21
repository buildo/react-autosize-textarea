require('babel-core/register')({
  extensions: ['.js', '.jsx']
});

const path = require('path');
const generateReadme = require('react-readme-generator').generateReadme;

generateReadme(path.resolve('src/TextareaAutosize.js'));
