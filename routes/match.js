
const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const {verifyToken} = require('../middlewares/verifyToken');

router.get('/swipeProfil',  userController.getSwipeProfil);
router.get('/swipeVocal',  userController.getSwipeVocal);
router.post('/like/:id',  userController.like);

module.exports = router;

// 	-getSwipeProfilUser 
// 	-getSwipeVocalUser 
// 	-likeUser
