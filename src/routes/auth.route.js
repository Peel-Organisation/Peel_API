const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
const {
  checkEmail, checkIdentity, checkPassword, validation,
} = require('../middlewares/validators');
const verifyToken = require('../middlewares/verifyToken');
const saveToken = require('../middlewares/saveToken');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/protected", verifyToken, saveToken, authController.getUserByToken);



module.exports = router; 