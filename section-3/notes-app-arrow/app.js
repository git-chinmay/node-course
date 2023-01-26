const note = require("./notes");
const chalk = require("chalk");
const yargs = require("yargs");
const { argv } = require("yargs");

// console.log(note.getNotes());
// console.log(process.argv);

//Run: node app.js --help to see the below command 
//Adding a new note
yargs.command({
    command: "add",
    describe: "Adding a new item to note.",
    builder: {
        title:{
            describe: "Title of the note.",
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: "Body of the added element.",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        note.addNote(argv.title, argv.body);
    }
})

//Removing a note
yargs.command({
    command: "remove",
    describe: "Removing an item from note.",
    builder: {
        title:{
            describe: "Title of the note.",
            demandOption: true,
            type: 'string'
        }
    },
    handler(){
        note.removeNote(argv.title);
    }
})

//Listing the note items
yargs.command({
    command: "list",
    describe: "Listing out all items in note.",
    handler(){
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


//console.log(yargs.argv); below parse command will take care
yargs.parse();






