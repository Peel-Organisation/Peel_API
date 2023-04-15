


const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');


router.get('/', verifyToken, userController.getUser);
router.get('/one/:id', userController.getOneUser);
router.put('/',  verifyToken, userController.updateUser);
router.delete('/',  verifyToken, userController.deleteUser);
router.get('/all',  userController.getAllUsers);
router.post("/", userController.createUser);

// TODO: Avoir un utilisateur admin pour utiliser les routes ci-dessous :
// router.get('/useradmin/:id', verifyAdmin, userController.getUserAdmin);
// router.put('/useradmin/:id', userController.updateUserAdmin);
// router.delete('/useradmin/:id', verifyAdmin, userController.deleteUserAdmin);

module.exports = router;

// Routes user (jwt protected): 
// 	-updateUser (champs à update)
// -deleteUser
 