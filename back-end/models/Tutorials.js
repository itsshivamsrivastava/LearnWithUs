const mongoose = require('mongoose');
const { Schema } = mongoose;

const TutorialSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true,
        default: "General"
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('tutorials', TutorialSchema);