const express = require('express');

const router = express.Router();
const conversationController = require('../controllers/conversation.controller');
const {verifyToken} = require('../middlewares/verifyToken');

router.post('/block', conversationController.BlockMatch);
router.get('/conversation',  conversationController.getAllConversation);
router.get('/conversation/:id',  conversationController.getMessageConversation);
router.delete('/conversation/:id',  conversationController.deleteConversation);
router.post('/message',  conversationController.sendMessage);
router.delete('/message/:id',  conversationController.deleteMessage);
router.post('/vocal',  conversationController.sendVocal);





module.exports = router;