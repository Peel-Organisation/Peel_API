const User = require('../models/user.js');


const saveToken = (req, res, next) => {
    console.log(req.userToken)
    if (!req.headers.firebasetoken) {
        return res.status('401').send({
            auth: false,
            message: 'No firebase token provided',
        });
    }
    User.findById(req.userToken.id)
        .then((user) => {
            if (!user) {
                return res.status('401').send({
                    auth: false,
                    message: 'User not found',
                });
            }
            if (!user.firebaseToken) {
                user.firebaseToken = []
            }
            const index = user.firebaseToken.findIndex(token => token.token === req.headers.firebasetoken)
            console.log(index)
            if (index !== -1) {
                console.log("token already exist")
                user.firebaseToken[index].lastLogin = Date.now()
                user.firebaseToken[index].nb_connexion += 1
            } else {
                console.log("new token")
                user.firebaseToken.push({
                    token: req.headers.firebasetoken,
                    lastLogin: Date.now(),
                    nb_connexion: 1,
                    firstLogin: Date.now()
                })
            }
            user.save();
            next()
        }).catch((error) => {
            return res.status('401').send({
                auth: false,
                message: 'error while saving token : ' + error.message || '',
            });
        });
    next()
};

module.exports = saveToken;
