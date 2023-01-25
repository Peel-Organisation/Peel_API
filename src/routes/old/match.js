const express = require('express');

const router = express.Router();

const auth = require('../../middleware/auth');

const matchController = require('../../controllers/old/match');




router.get('/:id',auth, matchController.findMatch);

router.post('/:id',auth, matchController.addLike);





module.exports = router;