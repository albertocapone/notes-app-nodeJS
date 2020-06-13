const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
    try {
        const notes = JSON.parse(fs.readFileSync('notes.json').toString())
        return notes
    } catch(err) {
        return []
    }
}

const storeNotes = (notes) => {
    notes = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notes)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    let isNew = true
    for(let note of notes) {
        if(note.title == title) isNew = false
    }
    if(isNew) {
        const newNote = {
            title: title,
            body: body
        }
        notes.push(newNote)
        storeNotes(notes)
        console.log(chalk.green.bold("NOTE ADDED!"))
    } else {
         console.log(chalk.red.bold("A note with Title '") + chalk.yellow(title) + chalk.red.bold("' already exists!"))
    }
}

const removeNote = (title) => {
    let notes = loadNotes()
    const startingLength = notes.length;
    notes = notes.filter((note) => note.title != title)
    if (startingLength > notes.length) {
        storeNotes(notes)
        console.log(chalk.red.bold("NOTE REMOVED!"))
    } else {
        console.log(chalk.red.bold("No note with the Title: ") + chalk.yellow(title))
    }   
}

const readNote = (title) => {
    const notes = loadNotes()
    if (notes.length) {
        for(let note of notes){
            if(note.title == title) { 
                console.log(chalk.green.bold(note.title) + chalk.yellow(note.body))
                return
            } 
        } console.log(chalk.red.bold("No note with the Title: ") + chalk.yellow(title))
    } else {
        console.log(chalk.red.bold("You have no note yet!"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if(notes.length){
        for(let note of notes){
            console.log(chalk.green(note.title))
        }   
    } else {
        console.log(chalk.red.bold("You have no note yet!"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes
}