const User = require("/models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
});

  try {
    const newUserToSave = await newUser.save();
    return res.send(newUserToSave);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Password Is Not valid",
        auth: false,
      })
    }
    let userToken = jwt.sign({
      id: user._id,

    }, )
    res.send({
      message: "User successfully logged in",
      auth: true,
      token: userToken,
    })
  })
  .catch(error => res.Status(400).send(error))
};

exports.getUserByToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  User.findById(decoded.id)
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.send(user);
  })
  .catch(error => res.Status(400).send(error))
};