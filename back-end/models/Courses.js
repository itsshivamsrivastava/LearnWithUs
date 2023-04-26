const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    courseId:{
        type: Number,
        required: true,
        unique: true
    },
    courseTitle:{
        type: String,
        required: true
    },
    courseDesc:{
        type: String,
        required: true
    },
    courseContent:{
        type: String,
        required: true
    },
    courseSlug:{
        type: String,
        required: true,
        unique: true
    },
    courseLink:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    courseNotesLink:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('courses', courseSchema);