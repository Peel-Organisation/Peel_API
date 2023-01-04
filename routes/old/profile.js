const express = require('express');

const auth = require('../../middleware/auth');

const router = express.Router();

const ProfileController = require('../../controllers/old/profile');




router.get('/:id',auth, ProfileController.getProfileById);

router.get('/localisation/:id',auth, ProfileController.getLocalisationById);

router.get('/recherche/:id',auth, ProfileController.getRechercheById);

router.get('/interet/:id',auth, ProfileController.getInteretById);

router.get('/question/:id',auth, ProfileController.getQuestionById);



//routes de modifications

router.post('/:id',auth, ProfileController.updateProfileById);

router.post('/localisation/:id',auth, ProfileController.updateLocalisationById);

router.post('/recherche/:id',auth, ProfileController.updateRechercheById);

router.post('/interet/:id',auth, ProfileController.updateInteretById);

router.post('/question/:id',auth, ProfileController.updateQuestionById);
 



module.exports = router;