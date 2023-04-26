const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    notesTitle:{
        type: String,
        required: true
    },
    notesSlug:{
        type: String,
        required: true,
        unique: true
    },
    notesThumbnail:{
        type: String,
        required: true
    },
    notesPdf:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('notes', notesSchema);