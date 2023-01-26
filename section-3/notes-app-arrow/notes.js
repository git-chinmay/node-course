const fs = require('fs')
const chalk = require('chalk')



const listNotes = () => {
    console.log(chalk.blue("Here is your list of note.."))
    return loadNotes().forEach(note => console.log(chalk.cyan(note.title)));


}



const addNote = (title, body) => {
    notes = loadNotes();
    //const duplicateNote = notes.filter((note) => note.title === title);
    //filter: will loop through all the elements even if a match found, where find: stopped at first match
    const duplicateNote = notes.find((note) => note.title === title);

    //if (duplicateNote.length === 0){
    if (!duplicateNote){
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


const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);
    if (findNote){
        console.log(`Note title: ${chalk.bold.green(findNote.title)}`)
        console.log(`Note body: ${chalk.italic.magenta(findNote.body)}`)
    }
    else{
        console.log(chalk.bgRed(`"${title}" titled note not found.`));
    }
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
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}