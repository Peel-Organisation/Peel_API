const User = require("../models/user.js");

exports.getUser = async (req, res, next) => {
  try {
    User.findById(req.userToken.id)
      .populate('interests')
      .populate({ path: 'questions', populate: "question" })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not found",
          });
        }
        res.send(user);
      }).catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not found with id " + req.params.id,
          });
        }
        res.send(user);
      }).catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    User.findByIdAndUpdate(req.userToken.id, req.body)
      .populate('interests')
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User Not found",
          });
        }
        res.send(user);
      }).catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    User.findByIdAndDelete(req.userToken.id).then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found",
        });
      }
      res.send(user);
    }).catch((error) => {
      next(error);
    })
  } catch (error) {
    next(error)
  }
};

exports.getUserAdmin = async (req, res, next) => {
  try {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not found with id " + req.params.id,
          });
        }
        res.send(user);
      }).catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.updateUserAdmin = async (req, res, next) => {
  try {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User Not found with id " + req.params.id,
          });
        }
        User.findById(user._id).then(userupdated => {
          res.send(userupdated);
        }).catch((error) => {
          next(error);
        })
      }).catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.deleteUserAdmin = async (req, res, next) => {
  try {
    User.findByIdAndDelete(req.params.id).then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found with id " + req.params.id,
        });
      }
      res.send(user);
    }).catch((error) => {
      next(error);
    })
  } catch (error) {
    next(error)
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    User.find()
      .then(users => {
        res.send(users);
      }).catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};


exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.save()
      .then(user => {
        res.send(user);
      }).catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};