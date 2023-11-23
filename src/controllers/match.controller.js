const User = require('../models/user');
const Conversation = require('../models/conversation');


exports.getSwipeProfil = async (req, res, next) => {
  try {
    User.find()
      .populate("interests")
      .populate({ path: 'questions', populate: "question" })
      .then((users) => res.send(users))
      .catch((error) => {
        next(error);
      })

    //récupérer le profil de l'utilisateur

  } catch (error) {
    next(error)
  }
};

/*
  * @route POST api/match/like_dislike/:id
  * @desc Like or dislike an user. When it's a match, create a conversation. 
  * @access Private
  * @param {String} id
*/
exports.PutLikeDislike = async (req, res, next) => {
  try {
    const userTarget = User.findById(req.params.id);
    const currentUser = User.findById(req.userToken.id);

    if (!userTarget) {
      return res.status(404).send({
        message: 'userTarget not found in database',
      });
    }

    const like = {
      userID: req.params.id,
      statelike: req.body.statelike,
    };

    const likedby = {
      userID: req.userToken.id,
      statelike: req.body.statelike,
    };

    if (!like.userID || !like.statelike) {
      return res.status(400).send({
        message: 'Invalid like data',
      });
    }

    if (!likedby.userID || !likedby.statelike) {
      return res.status(400).send({
        message: 'Invalid likedBy data',
      });
    }

    const isAlreadyLiked = userTarget.likedBy.find((like) => like.userID.toString() === currentUser._id.toString());

    if (isAlreadyLiked) {
      return res.status(400).send({
        message: 'You already liked this user.'
      });
    }

    currentUser.likes.push(like);
    userTarget.likedBy.push(likedby);
    await Promise.all([currentUser.save(), userTarget.save()]);

    const isMatch = userTarget.likes.find((like) => like.userID.toString() === currentUser._id.toString() && like.statelike === 'like');

    if (isMatch) {
      const conversation = new Conversation({
        members: [currentUser._id, userTarget._id],
      });
      await conversation.save();

      currentUser.matches.push(conversation._id);
      userTarget.matches.push(conversation._id);

      await Promise.all([currentUser.save(), userTarget.save()]);

      return res.status(200).send({
        message: 'It\'s a match !',
        data: {
          currentUser: like,
          userTarget: likedby
        }
      });
    } else {
      return res.status(200).send({
        message: 'Like or dislike added to the current User and target User',
        data: {
          currentUser: like,
          userTarget: likedby
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
