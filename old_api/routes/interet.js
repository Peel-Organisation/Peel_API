const express = require('express');

const router = express.Router();

const interetController = require('../controllers/interet');




router.get('/', interetController.getInteret);





module.exports = router;