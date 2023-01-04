const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
const {
  checkEmail, checkIdentity, checkPassword, validation,
} = require('../middlewares/validators');
const {verifyToken} = require('../middlewares/verifyToken');


router.post('/register', checkEmail, checkPassword, checkIdentity, validation, authController.register);
router.post('/login', checkEmail, checkPassword, validation, authController.login);
router.post("/get_user_by_token", authController.getUserByToken);

module.exports = router; 