const fs = require('fs')
const chalk = require('chalk')


const getNotes = () => { console.log("Your Note...")}

const listNotes = () => {
    console.log(chalk.blue("Here is your list of note.."))
    return loadNotes().forEach(note => console.log(chalk.cyan(note.title)));


}

const addNote = (title, body) => {
    notes = loadNotes();
    const duplicateNote = notes.filter((note) => note.title === title);

    if (duplicateNote.length === 0){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen("New note added."));
    }
    else{
        console.log(chalk.bgYellow("Note title already exists."));
    }

}


const removeNote = (title) => {
    notes = loadNotes();
    const filteredNote = notes.filter((note) => note.title !== title);

    if (filteredNote.length < notes.length){
        console.log(chalk.bgGreen(`${title} note removed.`))
        saveNotes(filteredNote);
    }
    else{console.log(chalk.bgRed(`${title} not found.`))}

    
}


const loadNotes = () => {
    try{

        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        //console.log(JSON.parse(dataJSON));
        return JSON.parse(dataJSON);
        

    }catch(e){
        return [];

    }

}



const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

//module.exports = getNots;
// To export more than one element
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}