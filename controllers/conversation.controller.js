
exports.BlockMatch = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.getAllConversation = async (req, res, next) => {
  console.log("get all conversation")
  User.find()
    .then((users) => res.send(users.matches))
    .catch((err) => res.status(400).send(err));
};

exports.getMessageConversation = async (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
};

exports.deleteConversation = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.deleteMessage = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.sendMessage = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.sendVocal = async (req, res, next) => {
  res.send("successfully logged in");
};

