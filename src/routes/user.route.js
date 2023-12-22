


const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');
const verifyProfileCompleted = require('../middlewares/verifyProfileCompleted');


router.get('/', verifyToken, userController.getUser);
router.put('/', verifyToken, userController.updateUser);
router.delete('/', verifyToken, userController.deleteUser);


router.get('/useradmin/', verifyToken, verifyAdmin, userController.getAllUsersAdmin);
router.post('/useradmin/', verifyToken, verifyAdmin, userController.addUserAdmin);
router.get('/useradmin/:id', verifyToken, verifyAdmin, userController.getUserAdmin);
router.put('/useradmin/:id', verifyToken, verifyAdmin, userController.updateUserAdmin);
router.delete('/useradmin/:id', verifyToken, verifyAdmin, userController.deleteUserAdmin);

module.exports = router;

