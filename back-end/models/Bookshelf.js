const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookshelfSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    book_name:{
        type: String,
        required: true
    },
    book_author:{
        type: String,
        required: true
    },
    book_slug:{
        type: String,
        required: true,
        unique: true
    },
    book_desc:{
        type: String,
        required: true
    },
    book_img:{
        type: String,
        required: true
    },
    book_price:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('bookshelf', BookshelfSchema);