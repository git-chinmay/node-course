const fs = require('fs')

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
        console.log("New note added.");
    }
    else{
        console.log("Note title already exists.");
    }

}



function loadNotes(){
    try{

        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

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
    addNote: addNote
}