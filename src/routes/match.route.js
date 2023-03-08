
const express = require('express');

const router = express.Router();
const matchController = require('../controllers/match.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/swipeProfil', verifyToken, matchController.getSwipeProfil);
router.post('/like_dislike/:id', verifyToken, matchController.PutLikeDislike);

module.exports = router;

// 	-getSwipeProfilUser 

