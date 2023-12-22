const Interest = require("../models/interest.js");

exports.getAllInterest = async (req, res, next) => {
  try {
    Interest.find()
      .then(interests => {
        res.send(interests);
      })
      .catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.getInterest = async (req, res, next) => {
  try {
    Interest.findById(req.params.id)
      .then(interest => {
        if (!interest) {
          return res.status(404).send({
            message: "Interest Not found with id " + req.params.id,
          });
        }
        res.send(interest);
      }).catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.addInterest = async (req, res, next) => {
  try {
    if (req.body.name === undefined) {
      return res.status(400).send({
        message: "name is required",
      });
    }
    const newInterest = new Interest({
      name: req.body.name,
    });
    newInterest.save().then((interest) => {
      res.send({
        message: "interest " + interest._id + " successfully added",
        interestId: interest._id,
      });
    }).catch((error) => {
      next(error)
    });
  } catch (error) {
    next(error)
  }
};

exports.deleteInterest = async (req, res, next) => {
  try {
    Interest.findByIdAndDelete(req.params.id).then(interest => {
      if (!interest) {
        return res.status(404).send({
          message: "Interest Not found with id " + req.params.id,
        });
      }
      res.send({
        message: "Interest " + interest._id + " successfully deleted",
        interestId: interest._id,
      });
    }).catch((error) => {
      next(error);
    })
  } catch (error) {
    next(error)
  }
};

exports.updateInterest = async (req, res, next) => {
  try {
    Interest.findByIdAndUpdate(req.params.id, req.body)
      .then((interest) => {
        if (!interest) {
          return res.status(404).send({
            message: "Interest Not found",
          });
        }
        res.send({
          message: "Interest " + interest._id + " successfully updated",
          interestId: interest._id,
        });
      })
      .catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};