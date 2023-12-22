const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verifyToken');
const saveToken = require('../middlewares/saveToken');
const verifyProfileCompleted = require('../middlewares/verifyProfileCompleted');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/protected", verifyToken, saveToken, authController.getUserByToken);
router.get('/verifyProfileCompleted', verifyToken, verifyProfileCompleted, authController.getUserByToken);



module.exports = router; 