


const express = require('express');

const router = express.Router();
const userController = require('../controllers/conversation.controller');
const {verifyAdmin} = require('../middlewares/verifyAdmin');
const {verifyToken} = require('../middlewares/verifyToken');


router.get('/user/:id',  userController.getUser);
router.update('/user',  userController.updateUser);
router.delete('/user/:id',  userController.deleteUser);

module.exports = router;

// Routes user (jwt protected): 
// 	-updateUser (champs à update)
// -deleteUser
 