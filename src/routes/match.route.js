
const express = require('express');

const router = express.Router();
const matchController = require('../controllers/match.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/swipeProfil', verifyToken, matchController.getSwipeProfil);
router.get('/swipeVocal', verifyToken, matchController.getSwipeVocal);
router.post('/like/:id', verifyToken, matchController.like);

module.exports = router;

// 	-getSwipeProfilUser 
// 	-getSwipeVocalUser 
// 	-likeUser
