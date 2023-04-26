const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Notes = require('../models/Notes');

// Router 1: Add new notes using: POST "/api/notes/addnotes". No Login required
router.post('/addnotes', async (req, res) => {
    try {
        // const { notesTitle, notesSlug, notesThumbnail, notesPdf } = req.body;
        const notesTitle = req.body.notesTitle;
        const notesSlug = req.body.notesSlug;
        const notesThumbnail = req.body.notesThumbnail;
        const notesPdf = req.body.notesPdf;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            notesTitle, notesSlug, notesThumbnail, notesPdf
        });
        const savedNotes = await notes.save();
        res.json(savedNotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Router 2: Get all notes using: GET "/api/notes/fetchnotes". No Login required
router.get('/fetchnotes', async (req, res) => {
    try {
        const notes = await Notes.find();
        res.send(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Router 3: Update notes using: PUT "/api/notes/updatenotes". No Login required
router.put('/updatenotes/:urlNotesSlug', async (req, res) => {
    try {
        const { notesTitle, notesSlug, notesThumbnail, notesPdf } = req.body;
        const newNotes = {};
        if (notesTitle) newNotes.notesTitle = notesTitle;
        if (notesSlug) newNotes.notesSlug = notesSlug;
        if (notesThumbnail) newNotes.notesThumbnail = notesThumbnail;
        if (notesPdf) newNotes.notesPdf = notesPdf;
        let notes = await Notes.findOneAndUpdate({ notesSlug: req.params.urlNotesSlug }, { $set: newNotes }, { new: true });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Router 4: Delete notes using: DELETE "/api/notes/deletenotes". No Login required
router.delete('/deletenotes/:slug', async (req, res) => {
    try {
        let notes = await Notes.findOneAndDelete({ notesSlug: req.params.slug });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Router 5: Get notes using: GET "/api/notes/fetchnotes/:urlNotesSlug". No Login required
router.get('/fetchnotes/:urlNotesSlug', async (req, res) => {
    try {
        let notes = await Notes.findOne({ notesSlug: req.params.urlNotesSlug });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;