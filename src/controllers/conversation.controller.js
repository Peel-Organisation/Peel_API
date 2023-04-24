const Conversation = require("../models/conversation.js");
const User = require("../models/user.js");
const firebase = require("../firebase.js");

exports.getAllConversation = async (req, res, next) => {
  console.log("getAllConversation")
  User.findOne({_id : req.userToken.id})
  .populate({path : 'matches', select: ["members", "updatedAt", "last_message_content"], populate : {path : 'members', select : 'firstName'}})
  .then(user => {
    res.send(user.matches);
  })
};


exports.createConversation = async (req, res, next) => {
  console.log("createConversation")
  //création de la nouvelle conversation
  const newConversation = new Conversation({
    messages: [],
  });

  //ajout de la conversation dans la liste des conversations de l'utilisateur 1
  const User1 = User.findOneAndUpdate(
    { _id: req.body.user1 },
    { $push: { matches: [newConversation]}} 
  );
  

  //ajout de la conversation dans la liste des conversations de l'utilisateur 2
  const User2 = User.findOneAndUpdate(
    { _id:
      req.body.user2 },
    { $push: { matches: [newConversation] }}
  );

  //ajout des membres de la conversation
  newConversation.members.push(User1);
  newConversation.members.push(User2);

  await newConversation.save().then((conversation) => {
    res.send({
      message: "conversation " + conversation._id + " successfully added",
      conversation: conversation,
    });
  });
 
};

exports.deleteConversation = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.BlockConversation = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.UnblockConversation = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.ReportConversation = async (req, res, next) => {
  res.send("successfully logged in");
};


//---------messages---------

exports.getMessageConversation = async (req, res, next) => {
  console.log("getMessageConversation")
  const conversationId = req.headers.conversation_id
  if (conversationId == null) return res.status(400).send({message: "conversation id is missing"});
  Conversation.findOne({_id : conversationId})
  .populate({path : 'messages', select: ["content", "sender", "createdAt"], populate : {path : 'sender', select : 'firstName'}})
  .then(conversation => {
    res.send(conversation?.messages);
  })
};


exports.sendMessage = async (req, res, next) => {
  const conversationId = req.headers.conversation_id;
  const userId = req.userToken.id;
  const message = req.body.message;
  Conversation.findOneAndUpdate(
    { _id: conversationId },
    { $push: { messages: {content : message, sender : userId} }, $set: {last_message_content : message} }
  ).populate({path : 'members', select : 'firstName'})
  .then((conversation) => {
    firebase.sendMessageToFirebase(conversation.members, userId, message);
    res.send({message: "message successfully added"});
  })
};


exports.deleteMessage = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.sendVocal = async (req, res, next) => {
  res.send("successfully logged in");
};

 