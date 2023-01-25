const fs = require('fs')
const chalk = require('chalk')

function getNotes() {
    return "My Notes!";
}

function addNote(title, body){
    notes = loadNotes();
    const duplicateNote = notes.filter(function(note){
        return note.title === title;
    });

    if (duplicateNote.length === 0){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen("New note added."));
    }
    else{
        console.log(chalk.bgYello("Note title already exists."));
    }

}


function removeNote(title){
    notes = loadNotes();
    const filteredNote = notes.filter(function(note){
        return note.title !== title;
    });


    if (filteredNote.length < notes.length){
        console.log(chalk.bgGreen(`${title} note removed.`))
        saveNotes(filteredNote);
    }
    else{console.log(chalk.bgRed(`${title} not found.`))}

    
}

function loadNotes(){
    try{

        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
        //console.log(JSON.parse(dataJSON));

    }catch(e){
        return [];

    }

}





function saveNotes(notes){
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

//module.exports = getNots;
// To export more than one element
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}