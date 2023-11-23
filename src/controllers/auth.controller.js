const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 11);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
    });
    newUser.save()
      .then((user) => {
        let userToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET
        );
        res.send({
          message: "User " + user._id + " successfully registered",
          auth: true,
          token: userToken,
          userId: user._id,
        });
      }).catch((error) => {
        next(error)
      });
  } catch (error) {
    next(error)
  }
};

exports.login = async (req, res, next) => {
  try {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .send({ message: "User Not found with email " + req.body.email });
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Password Is Not valid",
            auth: false,
          });
        }
        let userToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET
        );

        res.send({
          message: "User " + user._id + " successfully logged in",
          auth: true,
          userId: user._id,
          token: userToken,
        });
      })
      .catch((error) => {
        next(error)
      });
  } catch (error) {
    next(error)
  }
};

exports.getUserByToken = async (req, res, next) => {
  try {
    return res.send({
      message: "User " + req.userToken.id + " successfully logged in",
      auth: true,
      token: req.headers["authorization"],
      userId: req.userToken.id,
    });
  } catch (error) {
    next(error)
  }
};
