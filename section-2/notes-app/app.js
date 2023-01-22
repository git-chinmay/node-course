//// NODE CORE MODULE ////
const fs = require('fs')
fs.writeFileSync("notes.txt", "This file was created using node.")



//// CODE CHALLENGE ////
//Append the file
fs.appendFileSync("notes.txt", "My name is chinmay.")




///// IMPORTING OWN FILE ////
const utilName = require('./utils')
//console.log(utilName);
console.log(utilName(2,3));



//// CODE CHALLENEG: Define and use a function in new file ////
const getnote = require('./notes')
console.log(getnote())




//// IMPORTING NPM MODULE ////
const validator = require("validator");
//import validator from 'validator';//Node for now supporting the import
console.log(validator.isEmail("botacct111@gmail.com"));
console.log(validator.isEmail("@gmaill.com"));



//// PRINTING IN COLOR ////
const chalk = require("chalk");
console.log(chalk.green("Success!"));
//To make it bold : Black background green text
console.log(chalk.green.bold("Bold Success!"));
//Inversing it : Green backgound black text
console.log(chalk.green.inverse.bold("Bold Success Inversed!"));


