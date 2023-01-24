const Conversation = require("../models/conversation.js");
const User = require("../models/user.js");

exports.BlockMatch = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.getAllConversation = async (req, res, next) => {
  console.log(req.userToken)
  userId = req.userToken.id

  User.findOne({_id : req.userToken.id})
  .populate({path : 'matches', select: ["members", "updatedAt", "last_message_content"], populate : {path : 'members', select : 'firstName'}})
  .then(user => {
    res.send(user.matches);
  })
};

exports.getMessageConversation = async (req, res, next) => {
    console.log(req.headers.conversation_id)
    conversationId = req.headers.conversation_id
    Conversation.findOne({_id : conversationId})
    .populate({path : 'messages', select: ["content", "sender", "createdAt"], populate : {path : 'sender', select : 'firstName'}})
    .then(conversation => {
      res.send(conversation?.messages);
    })
};

exports.createConversation = async (req, res, next) => {
  console.log(req.body)
  //création de la nouvelle conversation
  const newConversation = new Conversation({
    messages: [],
  });

  //ajout de la conversation dans la liste des conversations de l'utilisateur 1
  User1 = await User.findOneAndUpdate(
    { _id: req.body.user1 },
    { $push: { matches: [newConversation]}}
  );
  

  //ajout de la conversation dans la liste des conversations de l'utilisateur 2
  User2 = await User.findOneAndUpdate(
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

exports.deleteMessage = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.sendMessage = async (req, res, next) => {
  message = req.body.message
  conversationId = req.body.conversationId 
  userId = req.userToken.id
  console.log(message)
  Conversation.findOneAndUpdate(
    { _id:
      conversationId },
    { $push: { messages: {content : message, sender : userId} }}
  ).then(conversation => {
    res.send("message sent");
  })
};

exports.sendVocal = async (req, res, next) => {
  res.send("successfully logged in");
};

 