const Question = require("../models/question.js");

exports.getAllQuestion = async (req, res, next) => {
  Question.find()
  .then(questions => {
    res.send(questions);
  })
  .catch(error => res.status(400).send(error));
};

exports.getQuestion = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.addQuestion = async (req, res, next) => {
  if (req.body.question === undefined) {
    return res.status(400).send({
      message: "question is required",
    });
  }
  const newQuestion = new Question({
    question: req.body.question,
  });
  await newQuestion.save().then((question) => {
    res.send({
      message: "question " + question._id + " successfully added",
      question: question,
    });
  });
};

exports.deleteQuestion = async (req, res, next) => {
  res.send("successfully logged in");
};

exports.updateQuestion = async (req, res, next) => {
  res.send("successfully logged in");
};