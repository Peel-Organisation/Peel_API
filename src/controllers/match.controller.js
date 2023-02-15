const User = require('../models/user');
const Conversation = require('../models/conversation');


exports.getSwipeProfil = async (req, res, next) => {
    User.find()
    .populate("interests")
    .populate({path : 'questions', populate : "question"})
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
    
    const like = {
      userID: req.params.id,
      statelike: req.body.statelike,
    };

    const likedby = {
      userID: req.userToken.id,
      statelike: req.body.statelike,
    };

    if (!userTarget) {
      return res.status(404).send({
        message: 'userTarget not found in database',
      });
    }

    if (userTarget.likedBy.find((data) => data.userID.toString() == req.userToken.id)
      && currentUser.likes.find((data) => data.userID.toString() == req.params.id)) {
      // VerifyMatch && CreateConversation
      // verifyMatch();
      console.log('Match !');
      return res.status(200).send({
        message: 'Match !',
      });
      // console.log(data);
    
    // } else if (userTarget.likedBy.find((data) => data.userID.toString() !== req.userToken.id)
    //   && currentUser.likes.find((data) => data.userID.toString() !== req.params.id))
    } else {

    
    
      // Like or dislike
      currentUser.likes.push(like);
      currentUser.save();
      // console.log(currentUser.likes);

      userTarget.likedBy.push(likedby);
      userTarget.save();
      // console.log(userTarget.likedBy);

      return res.status(200).send({
        message: 'Like or dislike added to the current User and target User',
        data : {
          currentUser : like,
          userTarget : likedby
        }
      });

    } 
    // } else {
    //   return res.status(400).send({
    //     message: 'Error with the like or dislike',
    //   });
    // }
  } catch (error) {
    res.status(500).send({
      message:'Some error occurred with the server : ' + error.message,
      auth : false
    })
  }
};



const verifyMatch = async (req, res) => {
  try {
    const userTarget = await User.findById(req.params.id);
    const currentUser = await User.findById(req.userToken.id);

          // L'utilisateur a déjà liké l'utilisateur cible
    console.log('L\'utilisateur a déjà liké l\'utilisateur cible');
    console.log('Check state of like');
    if (userTarget.likedBy.find((like) => like.userID === currentUser._id) 
        && userTarget.likedBy.find((like) => like.statelike === 'like') 
        && currentUser.likedBy.find((like) => like.userID === userTarget._id) 
        && currentUser.likedBy.find((like) => like.statelike === 'like')
    ) {
    
      // Création de la conversation
      // Conversation.create({}).then((conversation) => {});

      // Ajout des membres de la conversation
      // Ajout de la conversation dans la liste des conversations de l'utilisateur 1

      // Ajout de la conversation dans la liste des conversations de l'utilisateur 2
    } else if (userTarget.likedBy.find((like) => like.userID === currentUser._id) 
        && userTarget.likedBy.find((like) => like.statelike === 'dislike')
        && currentUser.likes.find((like) => like.userID === userTarget._id)
        && currentUser.likes.find((like) => like.statelike === 'dislike')
    )
    {
      // Les deux utilisateurs se sont déjà dislikés 

      // Retourner un message d'erreur 


    } else if (userTarget.likedBy.find((like) => like.userID === currentUser._id)
        && userTarget.likedBy.find((like) => like.statelike === 'like')
        && currentUser.likes.find((like) => like.userID === userTarget._id)
        && currentUser.likes.find((like) => like.statelike === 'dislike')
      )
    {
      // L'utilisateur cible a liké l'utilisateur current et l'utilisateur courant a disliké l'utilisateur cible

      // Retourner un message d'erreur

    } else if (userTarget.likedBy.find((like) => like.userID === currentUser._id)
        && userTarget.likedBy.find((like) => like.statelike === 'dislike')
        && currentUser.likes.find((like) => like.userID === userTarget._id)
        && currentUser.likes.find((like) => like.statelike === 'like')
      )
    {
      // L'utilisateur 1 a disliké l'utilisateur 2 et l'utilisateur 2 a liké l'utilisateur 1
      
    }
    


  } catch (error) {
    res.status(500).send({
      message:'Some error occurred with the server : ' + error.message,
      auth : false
    })
  }
};