const express = require('express');

const router = express.Router();
const interestController = require('../controllers/interest.controller.js');
// const verifyAdmin = require('../middlewares/verifyAdmin.js');

router.get('/',  interestController.getAllinterest);
router.get('/:id',  interestController.getinterest);
router.post('/',  interestController.addinterest);
router.delete('/:id',  interestController.deleteinterest);
router.put('/:id',  interestController.updateinterest);

module.exports = router;

// getinterest
// getAllinterest
// addinterest
// deleteinterest
// updateinterest


