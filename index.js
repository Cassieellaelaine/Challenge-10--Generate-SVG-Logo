const inquirer = require('inquirer')
const fs = require("fs");
const { generateSVG } = require("./lib/svg");
const { genShape } = require("./lib/genShape");

inquirer
  .prompt([
    {
      type: "input",
      name: "logoName",
      message: "Enter 1-3 letters for your logo",
      valdiate: function(){
        if(logoName.length > 3){
          return true
        }
        return "no more than 3 characters!"
      }
    },
    {
      type: "list",
      name: "textColor",
      message: `Enter text color keyword or a hexadecimal number as the logo's text color`,
      choices: ['red', 'green', 'blue']
    },
    {
      type: "list",
      name: "logoColor",
      message: `Enter a color keyword or a hexadecimal number as the logo's background color`,
      choices: ['red', 'green', 'blue']
    },
    {
      type: "list",
      name: "logoShape",
      message: `Select your logo shape`,
      choices: ["triangle", "circle", "square"],
    },
  ])
  .then((data) => {
    const svgPath = "./Assets/circle.svg";
    const finalLogo = genShape(data);

    //Generate the svg shape logo.
    fs.writeFile(svgPath, generateSVG(finalLogo), (err) =>
      err ? console.error(err) : console.log("Generated shape logo.svg")
    );
  })
  .catch((err) => console.error(err));