

import User from "../models/user";
        





const verifyAdmin = (req, res, next) => {
    try {
        User.findById(req.userToken.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                message: "User Not found",
                });
            }   
            if (user.preferences?.age?.min === null || user.preferences?.age?.min === undefined || user.preferences?.age?.min === 0) {
                return res.status(400).send({   
                message: "User min age not found",
                });
            }
            if (user.preferences?.age?.max === null || user.preferences?.age?.max === undefined || user.preferences?.age?.max === 0) {
                return res.status(400).send({   
                message: "User max age not found",
                }); 
            }
            if (user.preferences?.sexual_orientation === null || user.preferences?.sexual_orientation === undefined || user.preferences?.sexual_orientation === "") {
                return res.status(400).send({
                message: "User sexual orientation not found",
                });
            }
            if (user.birthday === null || user.birthday === undefined) {
                return res.status(400).send({
                message: "User birthday not found",
                });
            }
            if (user.gender === null || user.gender === undefined || user.gender === "") {
                return res.status(400).send({
                message: "user gender not found",
                });
            }
            if (user?.movie?.id === null || user?.movie?.id === undefined || user?.movie?.id === "") {
                return res.status(400).send({
                message: "user movie not found",        
                });
            }
            if (user?.music?.id === null || user?.music?.id === undefined || user?.music?.id === "") {
                return res.status(400).send({
                message: "user music not found",
                });
            }
            if (user.interests === null || user.interests === undefined || user.interests.length === 0) {
                return res.status(400).send({
                message: "user interests not found",    
                });
            }
            if (user.interests.length < 5) {
                return res.status(400).send({
                message: "user interests must be at least 5",
                });
            }
            next();
        })
        .catch(error => res.status(400).send(error));
    } catch (error) {
        return res.status(400).send({
            message: "User Not found",
        });
    }
};

module.exports = verifyAdmin;
