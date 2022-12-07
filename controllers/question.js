const model = require('../models/question');




exports.getAllQuestion = (req, res, next) => {
  model.getAllQuestion()
  .then(response => {res.status(200).json(response);})
}