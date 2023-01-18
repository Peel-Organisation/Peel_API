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
    isAdmin: { type: Boolean, default: False },
    isPremium: { type: Boolean, default: False },
    isVerified: { type: Boolean, default: False },
    isBanned: { type: Boolean, default: False },
    isDeleted: { type: Boolean, default: False },
    isFake: { type: Boolean, default: False },
});

module.exports = mongoose.model('User', userSchema);