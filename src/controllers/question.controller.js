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
    res.send("successfully logged in");
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
        message: "Question " + question._id + " successfully created",
        questionId: question._id,
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
    res.send("successfully logged in");
  } catch (error) {
    next(error)
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    res.send("successfully logged in");
  } catch (error) {
    next(error)
  }
};

exports.getIceBreaker = async (req, res, next) => {
  try {
    // on recupère 3 questions au hasard
    const questions = await Question.aggregate([{ $sample: { size: 3 } }])
    // on les envoies au client
    res.send(questions)
  } catch (error) {
    next(error)
  }
}