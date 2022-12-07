const express = require('express');
const router = express.Router();


const authController = require('../controllers/user');

router.post('/signup', authController.register);
router.post('/signin', authController.login);

module.exports = router;