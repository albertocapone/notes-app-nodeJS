const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const notesUtils = require('./notesUtils.js');

yargs.version('1.1.0')


yargs.command({
    command: 'add',
    describe: 'You can add a new note',
    builder: {
             title: {
                 describe: 'Note Title',
                 demandOption: true,
                 type: 'string'
             },
             content: {
                 describe: 'Note Content',
                 demandOption: true,
                 type: 'string'
             }
         },
    handler(input) {
        notesUtils.addNote(input.title, input.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'You can remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(input) {
        notesUtils.removeNote(input.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'You can ist all of your notes',
    handler() {
        notesUtils.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'You can read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(input) {
        notesUtils.readNote(input.title)
    }
})

yargs.parse()