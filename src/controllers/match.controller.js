const User = require('../models/user');
const Conversation = require('../models/conversation');
const moment = require('moment'); 
const date = new Date();


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
        // const userPosition = user.position;
        // console.log(userPosition);
        // const maxDistance = userPreferences.searchRange * 1000;

        const userPreferences = user.preferences;
        const minBirth = moment(date).subtract(userPreferences.age.min, 'years');
        const maxBirth = moment(date).subtract(userPreferences.age.max, 'years');

        console.log("minAge : ", minBirth);
        console.log("maxAge : ", maxBirth);


        let age = (new Date() - new Date(user.birthday)) / (365.25 * 24 * 60 * 60 * 1000);
        console.log("age : ", age);
        console.log("user.birthday : ", user.birthday);

        // préférences sexuelles de l'utilisateur
        const userSexualOrientation = userPreferences.sexual_orientation;
        console.log("userSexualOrientation : ", userSexualOrientation);
        const userGender = user.gender;
        console.log("userGender : ", userGender);

        let sexeTab = []
        let orientationTab = []


        switch (userSexualOrientation) {
          case "bisexual":
            orientationTab.push("bisexual");
            orientationTab.push("homo")
            orientationTab.push("hetero")
            sexeTab.push("Female");
            sexeTab.push("Other");
            sexeTab.push("Male");
          case "homo":
            orientationTab.push("homo")
            orientationTab.push("bisexual");
            if (userGender == "Male") sexeTab.push("Male")
            else if (userGender == "Female") sexeTab.push("Female")
          case "hetero":
            orientationTab.push("hetero")
            orientationTab.push("bisexual");
            if (userGender == "Male") sexeTab.push("Female")
            else if (userGender == "Female") sexeTab.push("Male")
        }
        if (userGender === "other") {
          sexeTab.push("Female");
          sexeTab.push("Other");
          sexeTab.push("Male");
        } 



        // retirer les utilisateurs déja likés

        console.log("user Likes : ", user.likes)

        let likeTab = user.likes.map(like => {return like.userID})


        User.find({
          _id : { 
            $nin: likeTab
          }
          // birthday: {
          //   $gt: maxBirth,
          //   $lt: minBirth
          // },
          // "preferences.age.min": {
          //   $lt: age
          // },
          // "preferences.age.max": {
          //   $gt: age
          // },
          // gender: {
          //   $in: sexeTab
          // },
          // "preferences.sexual_orientation": {
          //   $in: orientationTab
          // }
      })
      .then(profiles => {
        if (userSexualOrientation === "bisexual") {
          profiles = profiles.filter(profile => {
            if (profile.preferences.sexual_orientation == "bisexual") return true;

            switch (userGender) {
              case "Male":
                if (profile.gender == "Male" && profile.preferences.sexual_orientation === "homo") return true;
                else if (profile.gender == "Female" && profile.preferences.sexual_orientation === "hetero") return true;
                else return false;
              case "Female":
                if (profile.gender == "Male" && profile.preferences.sexual_orientation === "hetero") return true;
                else if (profile.gender == "Female" && profile.preferences.sexual_orientation === "homo") return true;
                else return false;
              case "Other":
                return true
            }
          });
        }
        // console.log(profiles);
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

    console.log("currentUser : ", currentUser.likes)

    const isAlreadyLikedCurrent = currentUser.likes.find((like) => like?.userID?.toString() === userTarget?._id?.toString());

    if (isAlreadyLikedCurrent) {
      return res.status(400).send({ 
        message: 'You already liked this user in Current.' 
      });
    }

    const isAlreadyLikedTarget = currentUser.likes.find((like) => like?.userID?.toString() === userTarget?._id?.toString());

    if (isAlreadyLikedTarget) {
      return res.status(400).send({ 
        message: 'You already liked this user in target' 
      });
    }

    currentUser.likes.push(like);
    userTarget.likedBy.push(likedby);
    currentUser.save();
    userTarget.save();

    const isMatch = userTarget.likes.find((like) => like?.userID?.toString() === currentUser?._id?.toString() && like.statelike === 'like');

    if (isMatch) {
      const conversation = new Conversation({
        members: [currentUser._id, userTarget._id],
      });
      await conversation.save();

      currentUser.matches.push(conversation._id);
      userTarget.matches.push(conversation._id);
      
      currentUser.save();
      userTarget.save();

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
