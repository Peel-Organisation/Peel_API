const User = require('../models/user');
const Conversation = require('../models/conversation');


exports.getSwipeProfil = async (req, res, next) => {
    User.find()
    .populate("interests")
    .populate({path : 'questions', populate : "question"})
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));

    //récupérer le profil de l'utilisateur
};

/*
  * @route GET api/match/api/match/swipeProfil
  * @desc Get users filtered with criterias for the current user
  * @access Private
*/
exports.getCompatibleProfil = async (req, res, next) => {
  try {
    await User.findById(req.userToken.id)
      .populate("position")
      .populate("preferences")
      .then(user => {
        console.log(user);
        const userPosition = user.position;
        console.log(userPosition);
        const userPreferences = user.preferences;
        // const maxDistance = userPreferences.searchRange * 1000;
        const minAge = userPreferences.age.min ? userPreferences.age.min : 18;
        const maxAge = userPreferences.age.max ? userPreferences.age.max : 60;

        // console.log(minAge);
        // console.log(maxAge);
        console.log(userPosition);

        User.find({
          _id:{ $ne: req.userToken.id },
          position: {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates: [userPosition.longitude, userPosition.latitude]
              },
              $maxDistance: userPreferences.searchRange * 1000 || 100000,
            }
          },
          age: {
            $gte: userPreferences.age.min ? userPreferences.age.min : 18,
            $lte: userPreferences.age.max ? userPreferences.age.max : 60,
          },
      })
      .then(profiles => {
        console.log(profiles);
        res.send(profiles);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving profiles.'
        });
      });
    })
  } catch (error) {
      res.status(500).send({
        message:'Some error occurred with the server : ' + error.message,
        auth : false
      })
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
    const userTarget = await User.findById(req.params.id);
    const currentUser = await User.findById(req.userToken.id);

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
      console.log('You already liked this user.');
      return res.status(400).send({ 
        message: 'You already liked this user.' 
      });
    }

    currentUser.likes.push(like);
    userTarget.likedBy.push(likedby);
    await Promise.all([currentUser.save(), userTarget.save()]);

    const isMatch = userTarget.likes.find((like) => like.userID.toString() === currentUser._id.toString() && like.statelike === 'like');

    if (isMatch) {
      console.log('It\'s a match !');
      const conversation = new Conversation({
        members: [currentUser._id, userTarget._id],
      });
      await conversation.save();

      currentUser.matches.push(conversation._id);
      userTarget.matches.push(conversation._id);
      
      await Promise.all([currentUser.save(), userTarget.save()]);

      return res.status(200).send({
        message: 'It\'s a match !',
        data : {
          currentUser : like,
          userTarget : likedby
        }
      });
    } else {
      return res.status(200).send({
        message: 'Like or dislike added to the current User and target User',
        data : {
          currentUser : like,
          userTarget : likedby
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      message:'Some error occurred with the server : ' + error.message,
      auth : false
    })
  }
};
