
const express = require('express');

const router = express.Router();
const matchController = require('../controllers/match.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyProfileCompleted = require('../middlewares/verifyProfileCompleted');

router.get('/swipeProfil', verifyToken, matchController.getSwipeProfil);
router.post('/like_dislike/:id', verifyToken, matchController.PutLikeDislike);
router.post('/getSwipeProfilUser', verifyToken, matchController.getCompatibleProfil);

module.exports = router;


