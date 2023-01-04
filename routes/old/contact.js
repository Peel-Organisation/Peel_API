const express = require('express');

const auth = require('../../middleware/auth');

const router = express.Router();

const ContactController = require('../../controllers/old/contact');




router.get('/:id', auth, ContactController.getContactById);

router.get('/list/:id', auth, ContactController.getContactListById);
 



module.exports = router;