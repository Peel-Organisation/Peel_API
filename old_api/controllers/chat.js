const Chat = require('../models/message');

exports.getMessageListById = (req, res, next) => {
    // console.log(req.headers)
  Chat.getMessageListById(req.headers.user_id, req.headers.target_id)
  .then(response => {res.status(200).json(response);})
}
