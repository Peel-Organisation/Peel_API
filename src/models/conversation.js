const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false
    }],
    messages: [{
        content: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: { type: Date, default: Date.now },
        Status: String,
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    last_message_content: String,
    nb_messages: { type: Number, default: 0 }
});

module.exports = mongoose.model('Conversation', conversationSchema);