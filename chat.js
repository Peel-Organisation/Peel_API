const uuidv4 = require('uuid').v4;

const messageModel = require('./models/message');
const profileModel = require('./models/profile');


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
    this.io.sockets.emit('message', message);
  }
  
  getMessages(msg) {
    // console.log(msg)
    messageModel.getMessageListById(msg.user_id, msg.target_id).then(messages => {

        // console.log(messages)

        messages.forEach((message) => this.sendMessage(message));
    })
  }

  async handleMessage(msg) {
    var user = await profileModel.getProfileById(msg.user_id);
    // console.log(user)
    const message = {
      id: uuidv4(),
      user_id: msg.user_id,
      target_id: msg.target_id,
      message_value: msg.value,
      message_time: Date.now(),
      firstname: user[0].firstname
    };  

    // console.log(message);

    messageModel.addMessage(message.user_id, message.target_id, message.message_value, message.message_time);

    
    // messages.add(message);
    this.sendMessage(message);

    setTimeout(
      () => {
        messages.delete(message);
        this.io.sockets.emit('deleteMessage', message.id);
      },
      
    );
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