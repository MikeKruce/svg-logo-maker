const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo:',
    validate: function(input) {
      if (input.length > 3) {
        return 'Please enter no more than three characters.';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (keyword or hexadecimal):'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['circle', 'triangle', 'square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (keyword or hexadecimal):'
  }
];

async function init() {
  try {
    const answers = await inquirer.prompt(questions);
    const { text, textColor, shape, shapeColor } = answers;
    const svgContent = generateSVG(text, textColor, shape, shapeColor);
    fs.writeFile('logo.svg', svgContent, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
  } catch (error) {
    console.error('Error generating SVG:', error);
  }
}

function generateSVG(text, textColor, shape, shapeColor) {
  let shapeElement = '';
  switch (shape) {
    case 'circle':
      shapeElement = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
      break;
    case 'triangle':
      shapeElement = `<polygon points="150,18 244,182 56,182" fill="${shapeColor}" />`;
      break;
    case 'square':
      shapeElement = `<rect x="70" y="20" width="160" height="160" fill="${shapeColor}" />`;
      break;
  }
  
  return `
  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeElement}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
}

init();
