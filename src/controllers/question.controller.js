const Question = require("../models/question.js");

exports.getAllQuestion = async (req, res, next) => {
  try {
    Question.find()
      .then(questions => {
        if (!Array.isArray(questions)) {
          const error = new Error("Internal server error")
          error.statusCode = 500
          throw error;
        }
        if (questions && (questions.length == 0)) {
          const error = new Error("questions not found")
          error.statusCode = 404
          throw error;
        }
        return res.status(200).json(
          {
            success: true,
            message: "questions successfully retrieved",
            questions: questions,
          }
        );
      }).catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
};

exports.getQuestion = async (req, res, next) => {
  try {
    if (req.params.id === undefined || req.params.id === null || typeof req.params.id === "integer") {
      const error = new Error("question id is not valid")
      error.statusCode = 400
      throw error;
    }
    Question.findById(req.params.id)
      .then(question => {
        if (question) {
          console.log(question)
          return res.status(200).json(
            {
              success: true,
              message: "question successfully retrieved",
              question: question,
            }
          );
        } else {
          const error = new Error("question not found")
          error.statusCode = 404
          throw error;
        }
      })
      .catch((error) => {
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
      res.status(200).json({
        message: "question " + question._id + " successfully added",
        questionId: question.id,
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
    Question.findByIdAndRemove(req.params.id)
      .then(question => {
        if (question) {
          res.status(200).json({
            message: "question " + question._id + " successfully deleted",
          });
        } else {
          res.status(404).send({
            message: "question not found",
          });
        }
      })
      .catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    Question.findByIdAndUpdate(req.params.id, req.body)
      .then(question => {
        if (question) {
          res.status(200).json({
            message: "question " + question._id + " successfully updated",
          });
        } else {
          res.status(404).send({
            message: "question not found",
          });
        }
      })
      .catch((error) => {
        next(error);
      })
  } catch (error) {
    next(error)
  }
};