const uuidv4 = require('uuid').v4;

const Conversation = require('./models/conversation');
const profileModel = require('./models/old/profile');


var messages = new Set();
const users = new Map();


class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    
    socket.on('getMessages', (Users) => this.getMessages(Users));
    socket.on('message', (message) => this.handleMessage(message));
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  
  sendMessage(message) {
    console.log("message sent : ", message);
    this.io.sockets.emit('message', message);
  }
  
  getMessages(msg) {
    console.log("getMessages : ", msg)
    Conversation.findOne({_id : msg.conversationId})
    .populate({path : 'messages', select: ["content", "sender", "createdAt"], populate : {path : 'sender', select : 'firstName'}})
    .then(conversation => {
      conversation.forEach((message) => this.sendMessage(message));
    })
    messageModel.getMessageListById(msg.user_id, msg.target_id).then(messages => {

        // console.log(messages)

        messages.forEach((message) => this.sendMessage(message));
    })
  }

  async handleMessage(msg) {
    console.log(msg)
    const message = msg.value
    const conversationId = msg.conversation_id 
    const userId = msg.user_id
    console.log(message)
    console.log(conversationId)
    console.log(userId)
    Conversation.findOneAndUpdate(
      { _id:
        conversationId },
      { $push: { messages: {content : message, sender : userId}}, $set: {last_message_content : message}}
    ).populate({path : 'messages', select: ["content", "sender", "createdAt"], populate : {path : 'sender', select : 'firstName'}})
    .then(conversation => {
      let message = conversation.messages[conversation.messages.length - 1];
      let newMessage = {"content": message.content, "sender": message.sender, "_id": message._id, "conversation_id": conversationId, "createdAt": message.createdAt};
      console.log(newMessage)
      this.sendMessage(newMessage);
    })

    setTimeout(() => {
        messages.delete(message);
        this.io.sockets.emit('deleteMessage', message.id);
      });
    }

    disconnect() {
      users.delete(this.socket);
    }
  }

  function chat(io) {
    io.on('connection', (socket) => {
      new Connection(io, socket);   
    });
  };

module.exports = chat;