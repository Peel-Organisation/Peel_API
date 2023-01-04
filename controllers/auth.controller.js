exports.register = async (req, res, next) => {
  res.send("successfully registered");
};

exports.login = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.getUserByToken = async (req, res, next) => {
  res.send("successfully logged");
};