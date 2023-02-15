const Interest = require("../models/interest.js");

exports.getAllInterest = async (req, res, next) => {
  Interest.find()
  .then(interests => {
    res.send(interests);
  })
  .catch(error => res.status(400).send(error));
};

exports.getInterest = async (req, res, next) => {
  Interest.findById(req.params.id)
  .then(interest => {
    if (!interest) {
      return res.status(404).send({
        message: "Interest Not found with id " + req.params.id,
      });
    }
    res.send(interest);
  })
};

exports.addInterest = async (req, res, next) => {
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

exports.deleteInterest = async (req, res, next) => {
  Interest.findByIdAndDelete(req.params.id).then(interest => {
    if (!interest) {
      return res.status(404).send({
        message: "Interest Not found with id " + req.params.id,
      });
    }
    res.send(interest);
  })
  .catch(error => res.status(400).send(error));
};

exports.updateInterest = async (req, res, next) => {
  Interest.findByIdAndUpdate(req.params.id, req.body)
  .then((interest) => {
    if (!interest) {
      return res.status(404).send({
        message: "Interest Not found",
      });
    }
    res.send(interest);
  })
  .catch(error => res.status(400).send(error));
};