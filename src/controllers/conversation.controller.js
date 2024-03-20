const Conversation = require("../models/conversation.js");
const User = require("../models/user.js");
const firebase = require("../firebase.js");
const conversation = require("../models/conversation.js");

exports.getAllConversation = (req, res, next) => {
  try {
    console.log("getAllConversation")
    User.findOne(
      { _id: req.userToken.id },
    )
      .populate({ path: 'matches', select: ["members", "updatedAt", "last_message_content", "nb_messages"], populate: { path: 'members', select: 'firstName' } })
      .then(user => {
        res.send(user.matches);
      }).catch((error) => {
        next(error)
      });
  } catch (error) {
    next(error)
  }
};


exports.createConversation = (req, res, next) => {
  try {
    const newConversation = new Conversation({
      messages: [],
    });

    //adding the conversation to the user's list of conversations
    User.findOneAndUpdate(
      { _id: req.body.user1 },
      { $push: { matches: [newConversation] } }
    ).then((User1) => {

      User.findOneAndUpdate(
        {
          _id:
            req.body.user2
        },
        { $push: { matches: [newConversation] } }
      ).then((User2) => {

        // Check if the conversation with the given members already exists
        Conversation.findOne({ members: { $all: [User1, User2] } })
          .then(existingConversation => {
            if (existingConversation) {
              // Conversation already exists
              res.send({
                message: "Conversation already exists",
                conversationId: existingConversation._id,
              });
            } else {
              // Conversation doesn't exist, so add new conversation
              console.log("new conversation")
              newConversation.members.push(User1);
              newConversation.members.push(User2);

              newConversation.save().then((conversation) => {
                res.send({
                  message: "conversation " + conversation._id + " successfully added",
                  conversationId: conversation._id,
                });
              }).catch((error) => {
                next(error);
              });
            }
          })
          .catch(error => {
            next(error);
          });
      }).catch((error) => {
        next(error)
      });
    }).catch((error) => {
      next(error)
    });
  } catch (error) {
    next(error)
  }
};

exports.createInstantConversation = (req, res, next) => {
  const newConversation = new Conversation({
    messages: [],
  });

  User.findOne({ _id: req.userToken.id })
    .then((user) => {
      if (user.nbInstantConversationPossibilities > 0) {
        user.nbInstantConversationPossibilities -= 1;
        user.save();
        User.findOneAndUpdate(
          { _id: req.userToken.id },
          { $push: { matches: [newConversation] } }
        )
          .then((User1) => {
            User.findOneAndUpdate(
              { _id: req.body.user2 },
              { $push: { matches: [newConversation] } }
            )
              .then((User2) => {
                // Check if the conversation with the given members already exists
                Conversation.findOne({ members: { $all: [User1, User2] } })
                  .then((existingConversation) => {
                    if (existingConversation) {
                      // Conversation already exists
                      res.send({
                        message: "Conversation already exists",
                        conversation: existingConversation,
                      });
                    } else {
                      // Conversation doesn't exist, so add new conversation
                      newConversation.members.push(User1);
                      newConversation.members.push(User2);
                      newConversation.save().then((conversation) => {
                        res.send({
                          message:
                            "conversation " + conversation._id + " successfully added", conversation: conversation,
                        });
                      })
                        .catch((error) => {
                          next(error);
                        });
                    }
                  })
                  .catch((error) => {
                    next(error);
                  });
              })
              .catch((error) => {
                next(error);
              });
          })
          .catch((error) => {
            next(error);
          });
      } else {
        res.status(400).send({
          message: "This user has no more instant conversation possibilities available",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteConversation = async (req, res, next) => {
  try {
    res.send("endpoint wip");
  } catch (error) {
    next(error)
  }
};

exports.BlockConversation = async (req, res, next) => {
  try {
    res.send("conversation bloqued");
  } catch (error) {
    next(error)
  }
};

exports.UnblockConversation = async (req, res, next) => {
  try {
    res.send("conversation unbloqued");
  } catch (error) {
    next(error)
  }
};

exports.ReportConversation = async (req, res, next) => {
  try {
    res.send("Conversation reported");
  } catch (error) {
    next(error)
  }
};


//---------messages---------

exports.getMessageConversation = async (req, res, next) => {
  try {
    console.log("getMessageConversation")
    const conversationId = req.params.id
    if (conversationId == null) return res.status(400).send({ message: "conversation id is missing" });
    Conversation.findOne({ _id: conversationId })
      .populate({ path: 'messages', select: ["content", "sender", "createdAt"] })
      .then(conversation => {
        res.send(conversation?.messages);
      }).catch((error) => {
        next(error)
      });
  } catch (error) {
    next(error)
  }
};


exports.sendMessage = async (req, res, next) => {
  try {
    const conversationId = req.params.id;
    const userId = req.userToken.id;
    const message = req.body.message;
    Conversation.findOneAndUpdate(
      { _id: conversationId },
      { $push: { messages: { content: message, sender: userId } }, $set: { last_message_content: message, updatedAt: Date.now() }, $inc: { nb_messages: 1 } },
      { new: true }
    ).populate({ path: 'members', select: 'firebaseToken' })
      .then((conversation) => {
        let last_message = conversation.messages[conversation.messages.length - 1];
        firebase.sendMessageToFirebase(conversation.members, userId, last_message);
        res.send({ message: "message successfully added" });
      }).catch((error) => {
        next(error)
      });
  } catch (error) {
    next(error)
  }
};

exports.getNbOfMessages = async (req, res, next) => {
  try {
    const conversationId = req.params.id;
    Conversation.findOne({ _id: conversationId })
      .then(conversation => {
        res.send({ nb_messages: conversation.nb_messages });
      }).catch((error) => {
        next(error)
      });
  } catch (error) {
    next(error)
  }
}


exports.deleteMessage = async (req, res, next) => {
  try {
    res.send("endpoint wip");
  } catch (error) {
    next(error)
  }
};

exports.sendVocal = async (req, res, next) => {
  try {
    res.send("endpoint wip");
  } catch (error) {
    next(error)
  }
};