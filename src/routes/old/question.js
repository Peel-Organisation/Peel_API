const express = require('express');

const router = express.Router();

const questionController = require('../../controllers/old/question');

router.get('/', questionController.getAllQuestion);

module.exports = router;