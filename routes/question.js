const express = require('express');

const router = express.Router();
const questionController = require('../controllers/question.controller.js');
const {verifyAdmin} = require('../middlewares/verifyAdmin');

router.get('/question',  questionController.getAllQuestion);
router.get('/question/:id',  questionController.getQuestion);
router.post('/question',  questionController.addQuestion);
router.delete('/question/:id',  questionController.deleteQuestion);
router.update('/question/:id',  questionController.updateQuestion);

module.exports = router;

// Routes Question:
// getRandomQuestion
// getQuestion
// addQuestion
// deleteQuestion
// updateQuestion
