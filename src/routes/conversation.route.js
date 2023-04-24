const express = require('express');

const router = express.Router();
const conversationController = require('../controllers/conversation.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/block', conversationController.BlockMatch);
router.get('/', verifyToken, conversationController.getAllConversation);
router.post('/',  conversationController.createConversation);
router.delete('/:id',  conversationController.deleteConversation);
router.get('/:id',  conversationController.getMessageConversation);
router.post('/message', verifyToken, conversationController.sendMessage);
router.delete('/message/:id',  conversationController.deleteMessage);
router.post('/vocal',  conversationController.sendVocal);





module.exports = router;