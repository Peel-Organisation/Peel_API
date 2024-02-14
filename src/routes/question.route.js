const express = require('express');

const router = express.Router();
const questionController = require('../controllers/question.controller.js');

router.get('/', questionController.getAllQuestion);
router.get('/icebreaker/', questionController.getIceBreaker);
router.get('/:id', questionController.getQuestion);
router.post('/', questionController.addQuestion);
router.delete('/:id', questionController.deleteQuestion);
router.put('/:id', questionController.updateQuestion);


module.exports = router;


