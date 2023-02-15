const Question = require("../models/question.js");

exports.getAllQuestion = async (req, res, next) => {
  Question.find()
  .then(questions => {
    res.send(questions);
  })
  .catch(error => res.status(400).send(error));
};

exports.getQuestion = async (req, res, next) => {
  Question.findById(req.params.id)
  .then(question => {
    if (!question) {
      return res.status(404).send({
        message: "Question Not found with id " + req.params.id,
      });
    }
    res.send(question);
  })
  .catch(error => res.status(400).send(error));
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
      message: "Question " + question._id + " successfully added",
      question: question,
    });
  });
};

exports.deleteQuestion = async (req, res, next) => {
  Question.findByIdAndDelete(req.params.id).then(question => {
    if (!question) {
      return res.status(404).send({
        message: "Question Not found with id " + req.params.id,
      });
    }
    res.send(question);
  })
  .catch(error => res.status(400).send(error));
};

exports.updateQuestion = async (req, res, next) => {
  Question.findByIdAndUpdate(req.params.id, req.body)
  .then((question) => {
    if (!question) {
      return res.status(404).send({
        message: "Question Not found",
      });
    }
    res.send(question);
  })
  .catch(error => res.status(400).send(error));
};

exports.getRandomQuestion = async (req, res, next) => {
  Question.countDocuments().exec(function (err, count) {
    var random = Math.floor(Math.random() * count);
    Question.findOne().skip(random).exec(
      function (err, result) {
        res.send(result);
      }
    );
  });
};
