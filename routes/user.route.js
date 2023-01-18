


const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const {verifyAdmin} = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');


router.get('/user', verifyToken, userController.getUser);
router.put('/user',  verifyToken, userController.updateUser);
router.delete('/user',  verifyToken, userController.deleteUser);
router.get('/users',  userController.getAllUsers);

// TODO: Avoir un utilisateur admin pour utiliser les routes ci-dessous :
// router.get('/useradmin/:id', verifyAdmin, userController.getUserAdmin);
// router.put('/useradmin/:id', verifyAdmin, userController.updateUserAdmin);
// router.delete('/useradmin/:id', verifyAdmin, userController.deleteUserAdmin);

module.exports = router;

// Routes user (jwt protected): 
// 	-updateUser (champs à update)
// -deleteUser
 