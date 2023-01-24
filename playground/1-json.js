const fs = require("fs");

const book = {
    book: "Ego is the enemy",
    author: "Ryan Holiday"
}

//JSON.stringify - converts an object into JSON
//JSON.parsedData - convertes an JSON into a object

const bookJSON = JSON.stringify(book);
// console.log("JS Object: ",book);
// console.log("JSON Object: ",bookJSON);
// const parsedData = JSON.parse(bookJSON);
// console.log("Parsed Object: ", parsedData);

//fs.writeFileSync('1-json.json', bookJSON);

// Reading the JSON file
const dataBuffer = fs.readFileSync('1-json.json');
console.log(dataBuffer); //Its in binary format

const dataJSON = dataBuffer.toString() //COnverting into JSON
console.log(dataJSON);

const dataObject = JSON.parse(dataJSON);
console.log(dataObject); //COnverting into object

console.log(dataObject.book);