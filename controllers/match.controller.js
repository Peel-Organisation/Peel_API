const User = require('../models/user');


exports.getSwipeProfil = async (req, res, next) => {

    User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));

    //récupérer le profil de l'utilisateur
    // if (!req.userToken) return res.status(401).send({ message: 'Unauthorized' });
    // User.findById(req.userToken.id)
    // .then((user) => {
    // if (!user) {
    //     return res.status(404).send({
    //         message: 'user not found',
    //     });
    //     } else {


    //         res.send(user);
    //     }
    // })

};

exports.getSwipeVocal = async (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
};

exports.like = async (req, res, next) => {
  res.send("like success");
}; 
