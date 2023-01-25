const Interest = require("../models/interest.js");

exports.getAllinterest = async (req, res, next) => {
  Interest.find()
  .then(interests => {
    res.send(interests);
  })
  .catch(error => res.status(400).send(error));
};

exports.getinterest = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.addinterest = async (req, res, next) => {
  if (req.body.name === undefined) {
    return res.status(400).send({
      message: "name is required",
    });
  }
  const newInterest = new Interest({
    name: req.body.name,
  });
  await newInterest.save().then((interest) => {
    res.send({
      message: "interest " + interest._id + " successfully added",
      interest: interest,
    });
  });
};

exports.deleteinterest = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.updateinterest = async (req, res, next) => {
  res.send("successfully logged in");
};
