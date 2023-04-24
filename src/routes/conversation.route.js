const express = require('express');

const router = express.Router();
const conversationController = require('../controllers/conversation.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// conversation
router.get('/', verifyToken, conversationController.getAllConversation);
// router.post('/', verifyAdmin, conversationController.createConversation);
// router.delete('/:id', verifyAdmin, conversationController.deleteConversation);
router.post('/block', verifyToken, conversationController.BlockConversation);
router.post('/unblock', verifyToken, conversationController.UnblockConversation);
router.post('/report', verifyToken, conversationController.ReportConversation);


// messages
router.get('/message', verifyToken, conversationController.getMessageConversation);
router.post('/message', verifyToken, conversationController.sendMessage);
router.delete('/message/:id', verifyToken, conversationController.deleteMessage);
router.post('/vocal', verifyToken, conversationController.sendVocal);





module.exports = router;