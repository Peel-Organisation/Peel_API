const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
    last_message_content: String,
    nb_messages: { type: Number, default: 0 }
});

module.exports = mongoose.model('Conversation', conversationSchema);