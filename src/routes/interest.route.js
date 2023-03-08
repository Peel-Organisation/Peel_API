const express = require('express');

const router = express.Router();
const interestController = require('../controllers/interest.controller.js');
// const verifyAdmin = require('../middlewares/verifyAdmin.js');

router.get('/',  interestController.getAllInterest);
router.get('/:id',  interestController.getInterest);
router.post('/',  interestController.addInterest);
router.delete('/:id',  interestController.deleteInterest);
router.put('/:id',  interestController.updateInterest);

module.exports = router;

// getinterest
// getAllinterest
// addinterest
// deleteinterest
// updateinterest


