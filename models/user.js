const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    birthday: Date,
    gender: String,
    position: Object,
    favouriteMusic: String,
    favouriteMovie: String,
    questions: Array,
    interests: Array,
    gifLink: String,
    matches: Array,
    likes: Array,
    likedBy: Array,
    blocked: Array,
    preferences: Object,
    biographie: String,
});

module.exports = mongoose.model('User', userSchema);