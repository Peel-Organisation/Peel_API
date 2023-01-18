const User = require("../models/user");

exports.getSwipeProfil = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.getSwipeVocal = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.like = async (req, res, next) => {
  res.send("successfully logged in");
}; 


exports.getUser = async (req, res, next) => {
  User.findById(req.userToken.id)
  .then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found",
      });
    }
    res.send(user);
  })
  .catch(error => res.status(400).send(error));
};


exports.updateUser = async (req, res, next) => {
  User.findByIdAndUpdate(req.userToken.id, req.body)
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found",
      });
    }
    User.findById(user._id).then(userupdated => {
      res.send(userupdated);
    })
  })
  .catch(error => res.status(400).send(error));
};

exports.deleteUser = async (req, res, next) => {
  User.findByIdAndDelete(req.userToken.id).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found",
      });
    }
    res.send(user);
  })
  .catch(error => res.status(400).send(error));
};

exports.getUserAdmin = async (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found with id " + req.params.id,
      });
    }
    res.send(user);
  })
  .catch(error => res.status(400).send(error));
};

exports.updateUserAdmin = async (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found with id " + req.params.id,
      });
    }
    User.findById(user._id).then(userupdated => {
      res.send(userupdated);
    })
  })
  .catch(error => res.status(400).send(error));
};

exports.deleteUserAdmin = async (req, res, next) => {
  User.findByIdAndDelete(req.params.id).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found with id " + req.params.id,
      });
    }
    res.send(user);
  })
  .catch(error => res.status(400).send(error));
};

exports.getAllUsers = async (req, res, next) => {
  User.find()
  .then(users => {
    res.send(users);
  })
  .catch(error => res.status(400).send(error));
};
