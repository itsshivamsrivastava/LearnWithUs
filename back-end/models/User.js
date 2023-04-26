const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    // userId:{
    //     type: Number,
    //     unique: true,
    //     autoIncrement: true
    // },
    fullname: {
        type: String,
        required: true
    },
    profileHeadline: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String
    }
});

const user = mongoose.model('user', UserSchema);

module.exports = user;