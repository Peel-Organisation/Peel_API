const express = require('express');

const router = express.Router();
const interetController = require('../controllers/interet.controller.js');
const {verifyAdmin} = require('../middlewares/verifyAdmin.js');

router.get('/interet',  interetController.getAllInteret);
router.get('/interet/:id',  interetController.getInteret);
router.post('/interet',  interetController.addInteret);
router.delete('/interet/:id',  interetController.deleteInteret);
router.put('/interet/:id',  interetController.updateInteret);

module.exports = router;

// getInteret
// getAllInteret
// addInteret
// deleteInteret
// updateInteret


