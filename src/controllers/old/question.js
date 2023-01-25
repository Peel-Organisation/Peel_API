const model = require('../../models/old/question');




exports.getAllQuestion = (req, res, next) => {
  model.getAllQuestion()
  .then(response => {res.status(200).json(response);})
}