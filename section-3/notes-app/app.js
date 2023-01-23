const msg = require("./notes");
const chalk = require("chalk");
const yargs = require("yargs");

console.log(msg());
console.log(process.argv);

//Run: node app.js --help to see the below command 
//Adding a new note
yargs.command({
    command: "add",
    describe: "Adding a new item to note.",
    handler: function(){
        console.log("New note added.")
    }
})

//Removing a note
yargs.command({
    command: "remove",
    describe: "Removing an item from note.",
    handler: function(){
        console.log("A note removed.")
    }
})

//Listing the note items
yargs.command({
    command: "list",
    describe: "Listing out all items in note.",
    handler: function(){
        console.log("List of all itsm in note.")
    }
})

// Read an item in note
yargs.command({
    command: "read",
    describe: "Reading an item in note.",
    handler: function(){
        console.log("Read an item in note.")
    }
})


console.log(yargs.argv);






