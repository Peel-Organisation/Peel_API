const User = require('../models/user');
const Conversation = require('../models/conversation');
const moment = require('moment'); 
const interest = require('../models/interest');
const date = new Date();
const Score = require('../compatibilityScore.json');
const filterMultiplier = require('../compatibilityFilter.json');


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
    const filters = req.body
    console.log("filters : ", filters)
    User.findById(req.userToken.id)
      .then(user => {
        


        const userPreferences = user.preferences;
        const minBirth = moment(date).subtract(userPreferences.age.min, 'years');
        const maxBirth = moment(date).subtract(userPreferences.age.max, 'years');

         


        let age = (new Date() - new Date(user.birthday)) / (365.25 * 24 * 60 * 60 * 1000);


        // préférences sexuelles de l'utilisateur
        const userSexualOrientation = userPreferences.sexual_orientation;
        const userGender = user.gender;

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
          },
          birthday: {
            $gt: maxBirth,
            $lt: minBirth,
            $exists: true
          },
          // "preferences.age.min": {
          //   $lt: age,
            // $exists: true
          // },
          // "preferences.age.max": {
          //   $gt: age,
            // $exists: true
          // },
          gender: {
            $in: sexeTab,
            $exists: true
          },
          "preferences.sexual_orientation": {
            $in: orientationTab,
            $exists: true
          },
          "firstName": {
            $exists: true
          },
          "lastName": {
            $exists: true 
          },
          "gif.image.url": {
            $exists: true
          },
          "movie.image.poster_path": {
            $exists: true 
          },
          "movie.title": {
            $exists: true
          },
          // "music.image.url": {
          //   $exists: true
          // },
          "questions": {
            $exists: true
          },
          "interests": {
            $exists: true,
            $size: 5
          },
          "biographie": {
            $exists: true
          }
      },
      [
        "firstName", "lastName", "gender", "gif", "movie", "music", "music", "questions", "interests", "biographie", "isFake"
      ]
      )
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
        let compatibilityTab = profiles.map(profile =>{
          return calculateCompatibility(user, profile, filters)
        })

        compatibilityTab.sort(compareScore)
        
        res.send(compatibilityTab);
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

const compareScore = (user1, user2) => {
  return user1.compatibilityScore - user2.compatibilityScore
}

const calculateCompatibility = (user1, user2, filters) => {
  user2.compatibilityScore = 0
  let multiplier = 1

  //tri par gif 
  if (user1?.gif?.title === user2?.gif?.title ) user2.compatibilityScore += Score?.gif?.title

  //tri par interet
  multiplier = 1
  if (filters?.interest) multiplier = filterMultiplier.interest
  user1?.interests?.forEach(interest => {
    if (user2?.interests?.includes(interest)){
      user2.compatibilityScore += (Score?.interest?.title * multiplier)
    }
  })

  //tri par musique (a faire plus tard)
  multiplier = 1
  if (filters?.music) multiplier = filterMultiplier.music
  // console.log("multiplier music : ", multiplier)
  if (user1?.music?.title === user2?.music?.title){
    user2.compatibilityScore += (Score?.music?.title * multiplier)
  } 
  if (user1?.music?.artist?.name === user2?.music?.artist?.name){
    user2.compatibilityScore += (Score?.music?.artist * multiplier)
  }
  if (user1?.music?.album?.name === user2?.music?.album?.title){
    user2.compatibilityScore += (Score?.music?.album * multiplier)
  }
  //tri par sport (a faire plus tard)
  multiplier = 1
  if (filters?.sport) multiplier = filterMultiplier.sport
  // console.log("multiplier sport : ", multiplier)
  //tri par film
  multiplier = 1
  if (filters.movie ) multiplier = filterMultiplier.movie
  // console.log("multiplier movie : ", multiplier)
  if (user1?.movie?.title === user2?.movie?.title){
    user2.compatibilityScore += (Score?.movie?.title * multiplier)
  } 
  user1?.movie?.genres_ids?.forEach(genre => {
    if (user2?.movie?.genres_ids?.includes(genre)){
      console.log("movie")
      user2.compatibilityScore += (Score?.movie?.genre * multiplier)
    }
  });
  
  // tri par jeu vidéo (a faire plus tard)
  multiplier = 1
  if (filters.games) multiplier = filterMultiplier.games
  // console.log("multiplier games : ", multiplier)

  //Ajout d'aléatoire pour casser l'algorithme
  user2.compatibilityScore += Math.floor(Math.random() * Score.random.value);

  console.log(user2.compatibilityScore)
  return user2
}


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
