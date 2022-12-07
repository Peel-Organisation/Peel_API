const model = require('../models/interet');




exports.getInteret = (req, res, next) => {
  model.getAllInteret()
  .then(response => {res.status(200).json(response);})
}