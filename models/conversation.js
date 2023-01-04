const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: Object,
    messages: Array,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    last_message_content: String,
});

module.exports = mongoose.model('Conversation', conversationSchema);