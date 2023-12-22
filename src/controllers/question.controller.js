const Question = require("../models/question.js");

exports.getAllQuestion = async (req, res, next) => {
  try {
    Question.find()
      .then(questions => {
        res.send(questions);
      })
      .catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.getQuestion = async (req, res, next) => {
  try {
    Question.findById(req.params.id)
      .then(question => {
        if (!question) {
          return res.status(404).send({
            message: "Question Not found",
          });
        }
        res.send(question);
      }).catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.addQuestion = async (req, res, next) => {
  try {
    if (req.body.question === undefined) {
      return res.status(400).send({
        message: "question is required",
      });
    }
    const newQuestion = new Question({
      question: req.body.question,
    });
    newQuestion.save().then((question) => {
      res.send({
        message: "question " + question._id + " successfully added",
        question: question,
      });
    }).catch((error) => {
      next(error);
    })
  } catch (error) {
    next(error)
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    Question.findByIdAndDelete(req.params.id).then(question => {
      if (!question) {
        return res.status(404).send({
          message: "Question Not found",
        });
      }
      res.send({
        message: "Question " + question._id + " successfully deleted",
        question: question,
      }
      );
    }).catch((error) => {
      next(error);
    })
  } catch (error) {
    next(error)
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    Question.findByIdAndUpdate(req.params.id, req.body)
      .then((question) => {
        if (!question) {
          return res.status(404).send({
            message: "Question Not found",
          });
        }
        Question.findById(question._id).then(questionupdated => {
          res.send({
            message: "Question " + question._id + " successfully updated",
            question: questionupdated,
          });
        }).catch((error) => {
          next(error);
        })
      }).catch((error) => {
        next(error);
      })
  }
  catch (error) {
    next(error)
  }
};