const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
const {
  checkEmail, checkIdentity, checkPassword, validation,
} = require('../middlewares/validators');
const {verifyToken} = require('../middlewares/verifyToken');


router.post('/register', authController.register);
router.post('/login', checkEmail, checkPassword, validation, authController.login);
router.post("/protected", authController.getUserByToken);


  // /api/auth/register/         -       register
  // /api/auth/login/         -       login
  // /api/auth/protected       -       testAutentification

module.exports = router; 