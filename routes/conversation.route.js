const express = require('express');

const router = express.Router();
const conversationController = require('../controllers/conversation.controller');
const {verifyToken} = require('../middlewares/verifyToken');

router.post('/block', conversationController.BlockMatch);
router.get('/', verifyToken, conversationController.getAllConversation);
router.get('/:id',  conversationController.getMessageConversation);
router.delete('/:id',  conversationController.deleteConversation);
router.post('/message',  conversationController.sendMessage);
router.delete('/message/:id',  conversationController.deleteMessage);
router.post('/vocal',  conversationController.sendVocal);





module.exports = router;