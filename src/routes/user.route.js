


const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');


router.get('/', verifyToken, userController.getUser);
router.put('/',  verifyToken, userController.updateUser);
router.delete('/',  verifyToken, userController.deleteUser);
router.delete('/', verifyToken, verifyAdmin, userController.deleteUser);
router.get('/admin', verifyToken, verifyAdmin, userController.getUserAdmin);
router.put('/admin', verifyToken, verifyAdmin, userController.updateUserAdmin);
router.delete('/admin', verifyToken, verifyAdmin, userController.deleteUserAdmin);
router.get('/',  userController.getAllUsers);
router.post("/", userController.createUser);

// TODO: Avoir un utilisateur admin pour utiliser les routes ci-dessous :
// router.get('/useradmin/:id', verifyAdmin, userController.getUserAdmin);
// router.put('/useradmin/:id', verifyAdmin, userController.updateUserAdmin);
// router.delete('/useradmin/:id', verifyAdmin, userController.deleteUserAdmin);

module.exports = router;

// Routes user (jwt protected): 
// 	-updateUser (champs à update)
// -deleteUser
 