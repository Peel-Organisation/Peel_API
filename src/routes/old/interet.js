const express = require('express');

const router = express.Router();

const interetController = require('../../controllers/old/interet');




router.get('/', interetController.getInteret);





module.exports = router;