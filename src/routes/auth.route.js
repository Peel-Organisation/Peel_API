const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
const {
  checkEmail, checkIdentity, checkPassword, validation,
} = require('../middlewares/validators');
const verifyToken = require('../middlewares/verifyToken');


router.get("/protected", verifyToken, authController.getUserByToken);
router.post('/register', authController.register);
router.post('/login', authController.login);



module.exports = router; 