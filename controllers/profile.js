const profile = require('../models/old/profile');
const interet_relation = require('../models/old/interet_relation')
const localisation = require('../models/old/localisation')
const question_relation = require('../models/old/question_relation')
const recherche = require('../models/old/recherche')

const auth = require('../middleware/auth');




exports.getProfileById = (req, res) => {
  console.log(req.params.id)
  profile.getProfileById(req.params.id)
  .then(response => {
    console.log(response)
    res.status(200).json(response[0]);
  })
}

exports.getLocalisationById = (req, res) => {
  localisation.getLocalisationById(req.params.id)
  .then(response => {res.status(200).json(response);})
}

exports.getRechercheById = (req, res) => {
  recherche.getRechercheById(req.params.id)
  .then(response => {res.status(200).json(response);})
}

exports.getInteretById = (req, res) => {
  interet_relation.getInteret_RelationById(req.params.id)
  .then(response => {res.status(200).json(response);})
}

exports.getQuestionById = (req, res) => {
  question_relation.getQuestion_RelationById(req.params.id)
  .then(response => {res.status(200).json(response);})
} 

//----modification-------


exports.updateProfileById = (req, res) => {
  profile.updateProfileById(req.body.user_id, req.body.firstname, req.body.lastname, req.body.gender, req.body.birthday, req.body.bio)
  .then(response => {res.status(200).json({message:"utilisateur modifié avec succés", response: response})})
}

exports.updateLocalisationById = (req, res) => {
  console.log(req.body)
  localisation.updateLocalisationById(req.body.user_id, req.body.longitude, req.body.latitude)
  .then(response => {res.status(200).json(response);})
}

exports.updateRechercheById = (req, res) => {
  
  recherche.updateRechercheById(req.body.user_id, req.body.preference_gender, req.body.zone_recherche, req.body.age_min, req.body.age_max)
  .then(response => {res.status(200).json(response);})
} 

exports.updateInteretById = (req, res) => {
  interet_relation.updateInteret_RelationById(req.body.user_id , req.body.interet)
  .then(response => {res.status(200).json(response);})
}

exports.updateQuestionById = (req, res) => {
  question_relation.updateQuestion_RelationById(req.body.user_id, req.body.question_id, req.body.response)
  .then(response => {res.status(200).json(response);})
}   