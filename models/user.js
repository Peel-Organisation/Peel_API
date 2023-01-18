const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    birthday: Date,
    position: Object,
    favourite_music: String,
    favourite_movie: String,
    questions: Array,
    interests: Array,
    gif_link: String,
    matches: Array,
    likes: Array,
    liked_by: Array,
    blocked: Array,
    preferences: Object,
    bio: String,
});

module.exports = mongoose.model('User', userSchema);