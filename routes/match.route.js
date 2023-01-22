
const express = require('express');

const router = express.Router();
const matchController = require('../controllers/match.controller');
const {verifyToken} = require('../middlewares/verifyToken');

router.get('/swipeProfil',  matchController.getSwipeProfil);
router.get('/swipeVocal',  matchController.getSwipeVocal);
router.post('/like/:id',  matchController.like);

module.exports = router;

// 	-getSwipeProfilUser 
// 	-getSwipeVocalUser 
// 	-likeUser
