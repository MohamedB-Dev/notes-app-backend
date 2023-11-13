const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const NotesController = require('../controllers/notes');

router.post('/', checkAuth, NotesController.createNote);

router.get('/', checkAuth, NotesController.getNotes);

router.get('/count', checkAuth, NotesController.getCountNotes);

router.put('/:id', checkAuth , NotesController.updateNote);

router.delete('/:id', checkAuth, NotesController.deleteNote);

module.exports = router;
