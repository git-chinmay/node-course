const fs = require('fs')
fs.writeFileSync("notes.txt", "This file was created using node.")

////Code Challenge////
//Append the file
fs.appendFileSync("notes.txt", "My name is chinmay.")

/////Importing own file////

const utilName = require('./utils')
//console.log(utilName);
console.log(utilName(2,3));


////CODE Challeneg: Define and use a function in new file ////
const getnote = require('./notes')
console.log(getnote())

