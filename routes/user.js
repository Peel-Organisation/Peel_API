const express = require('express');
const router = express.Router();

const user = require('../middleware/user');

const authController = require('../controllers/user');

router.get('/', user, authController.getAllUser);
router.post('/', user, authController.addUser);
router.get('/:id', user, authController.getUserById);
router.put('/:id', user, authController.updateUserById);
router.delete('/:id', user, authController.deleteThing);

module.exports = router;