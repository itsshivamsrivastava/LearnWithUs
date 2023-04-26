const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    blog_title:{
        type: String,
        required: true
    },
    blog_subTitle:{
        type: String,
        required: true
    },
    blog_slug:{
        type: String,
        required: true,
        unique: true
    },
    blog_content:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('blogs', BlogSchema);