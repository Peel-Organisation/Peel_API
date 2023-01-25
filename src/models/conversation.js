const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    last_message_content: String,
});

module.exports = mongoose.model('Conversation', conversationSchema);