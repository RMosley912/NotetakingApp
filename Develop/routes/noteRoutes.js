const express = require('express');
const { v4: generateUUID } = require('uuid');
const {
    fetchFromFile, 
    fetchAndAppend,
    saveToFile,
} = require('../helpers/fileHelpers');

let notesRouter = express.Router();

// Route for retrieving notes
notesRouter.get('/', (request, response) => {
  fetchFromFile('./db/db.json').then((data) => {
    response.json(JSON.parse(data));
  })
});

// Route for retrieving a specific note
notesRouter.get('/:id', (request, response) => {
  const noteId = request.params.id;
  fetchFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((jsonData) => {
      const foundNote = jsonData.filter((note) => note.id === noteId);
      return foundNote.length > 0
        ? response.json(foundNote)
        : response.json('No note found with the given ID');
    });
});

// Route for deleting a specific note
notesRouter.delete('/:id', (request, response) => {
  const noteId = request.params.id;
  fetchFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((jsonData) => {
      const updatedNotes = jsonData.filter((note) => note.id !== noteId);
      saveToFile('./db/db.json', updatedNotes);
      response.json(`Deleted note ${noteId}`);
    });
});

// Route for adding a new note
notesRouter.post('/', (request, response) => {
  console.log(request.body);
  const { noteTitle, noteText } = request.body;
  if (request.body) {
    const newNote = {
      title: noteTitle,
      text: noteText,
      id: generateUUID(),
    };
    fetchAndAppend(newNote, './db/db.json');
    response.json(`Added a new note`);
  } else {
    response.error('Failed to add note');
  }
});

module.exports = notesRouter;
