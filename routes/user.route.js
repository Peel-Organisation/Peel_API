


const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const {verifyAdmin} = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');


router.get('/user/:id', verifyToken, userController.getUser);
router.put('/user/:id',  userController.updateUser);
router.delete('/user/:id',  userController.deleteUser);
router.get('/users',  userController.getAllUsers);

module.exports = router;

// Routes user (jwt protected): 
// 	-updateUser (champs à update)
// -deleteUser
 