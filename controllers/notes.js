const Note = require('../models/note');


exports.createNote = (req, res, next) => {
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        creator: req.userData.userId
    });
    note.save().then(createdNote => {
        res.status(201).json({
            message: 'Note added successfully!',
            noteId: createdNote._id
        });
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
}

exports.getNotes = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const userId = req.userData.userId;

    const noteQuery = Note.find({ creator: userId });

    if (pageSize && currentPage) {
        noteQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    noteQuery.then(notes => {
        res.status(200).json({
            message: 'Notes fetched successfully!',
            data: notes
        });
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
}

exports.getCountNotes = async (req, res, next) => {
    const userId = req.userData.userId;
    const count = await Note.countDocuments({ creator: userId });
    res.status(200).json({
        message: 'Notes count fetched successfully!',
        data: count
    });
}

exports.updateNote = (req, res, next) => {
    const note = new Note({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        creator: req.userData.userId
    });
    Note.updateOne({ _id: req.params.id, creator: req.userData.userId }, note).then(result => {
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Update successful!' });
        } else {
            res.status(401).json({ message: 'Not authorized!' });
        }
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
}

exports.deleteNote = (req, res, next) => {
    Note.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Note deleted!' });
        } else {
            res.status(404).json({ message: 'Note not found or not authorized to delete!' });
        }
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
}